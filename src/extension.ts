import * as vscode from "vscode";
import { registerExplainSelectionCommand } from "./commands/explainSelection";
import { registerOpenTutorViewCommand } from "./commands/openTutorView";
import { getTutorResponse } from "./ai/geminiService";
import { TutorViewProvider } from "./views/TutorViewProvider";
import type { TutorResponse } from "./shared/contracts";
import { createConceptMastery } from "./schemas/mastery";
import { createGamificationState } from "./schemas/gamification";
import type { ConceptMastery } from "./schemas/mastery";
import type { GamificationState } from "./schemas/gamification";
import {
  gradeMultipleChoiceAnswer,
  updateMasteryState,
  shouldShowHint,
  chooseNextDifficulty,
} from "./services/adaptiveEngine";
import { awardQuizXp, updateDailyStreak } from "./services/gamification";

export function activate(context: vscode.ExtensionContext): void {
  const provider = new TutorViewProvider(context.extensionUri);

  // ---------------------------------------------------------------------------
  // In-memory tutor state (no persistence yet)
  // ---------------------------------------------------------------------------

  /** The most recent TutorResponse sent to the webview. Needed to look up
   *  correctOptionId when a submitQuizAnswer message arrives. */
  let lastTutorResponse: TutorResponse | null = null;

  /** Per-concept mastery records, keyed by concept name. */
  const masteryMap = new Map<string, ConceptMastery>();

  /** Single gamification state for the session. */
  let gamificationState: GamificationState = createGamificationState();

  // ---------------------------------------------------------------------------

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TutorViewProvider.viewType,
      provider
    )
  );

  provider.onDidReceiveMessage(async (message) => {
    if (message.type === "requestTutorResponse") {
      provider.postMessage({
        type: "loading",
        payload: { isLoading: true },
      });

      try {
        const response = await getTutorResponse({
          context,
          selectedCode: message.payload.selectedCode,
          languageId: message.payload.languageId,
          useMock: true,
        });

        // Store so submitQuizAnswer can look up correctOptionId.
        lastTutorResponse = response;

        provider.postMessage({
          type: "tutorResponse",
          payload: response,
        });
      } catch {
        provider.postMessage({
          type: "error",
          payload: {
            message: "Vybe Tutor could not generate an explanation. Try again.",
          },
        });
      } finally {
        provider.postMessage({
          type: "loading",
          payload: { isLoading: false },
        });
      }
    }

    if (message.type === "submitQuizAnswer") {
      if (!lastTutorResponse) {
        console.warn("[Vybe Tutor] submitQuizAnswer received but no active tutor response.");
        provider.postMessage({
          type: "error",
          payload: { message: "No active explanation. Please explain some code first." },
        });
        return;
      }

      const { questionId, selectedOptionId } = message.payload;

      // Find the question in the last response.
      const question = lastTutorResponse.quiz.find((q) => q.id === questionId);
      if (!question) {
        console.warn(`[Vybe Tutor] Unknown questionId: ${questionId}`);
        provider.postMessage({
          type: "error",
          payload: { message: "Could not find that question. Try explaining the code again." },
        });
        return;
      }

      // Grade the answer.
      // gradeMultipleChoiceAnswer(selected, correct) — order matters.
      const isCorrect = gradeMultipleChoiceAnswer(
        selectedOptionId,
        question.correctOptionId
      );

      // Derive the concept key from the response. keyConcepts may be empty so
      // we guard the index access explicitly for strict/noUncheckedIndexedAccess.
      const firstConcept: string | undefined = lastTutorResponse.keyConcepts[0];
      const conceptKey = firstConcept ?? questionId;

      // Read mastery BEFORE updating — wasRecovering must reflect the state
      // the learner was in when they answered, not after.
      const currentMastery =
        masteryMap.get(conceptKey) ?? createConceptMastery(conceptKey);
      const wasRecovering = currentMastery.recoveryState === "recovering";

      const updatedMastery = updateMasteryState({ state: currentMastery, isCorrect });
      masteryMap.set(conceptKey, updatedMastery);

      // Recovery bonus: learner was recovering AND just answered correctly.
      const isRecovery = wasRecovering && isCorrect;
      gamificationState = awardQuizXp({
        state: gamificationState,
        isCorrect,
        isRecovery,
      });

      // Update daily streak using local calendar date (YYYY-MM-DD via en-CA).
      const todayDate = new Date().toLocaleDateString("en-CA");
      gamificationState = updateDailyStreak({
        state: gamificationState,
        todayDate,
      });

      // Send feedback back to the webview.
      provider.postMessage({
        type: "quizFeedback",
        payload: {
          questionId,
          isCorrect,
          correctOptionId: question.correctOptionId,
          explanation: question.explanation,
          concept: conceptKey,
          showHint: shouldShowHint(updatedMastery),
          nextDifficulty: chooseNextDifficulty(updatedMastery),
          totalXp: gamificationState.totalXp,
          level: gamificationState.level,
          currentStreak: gamificationState.currentStreak,
        },
      });
    }
  });

  registerOpenTutorViewCommand(context);
  registerExplainSelectionCommand(context, provider);
}

export function deactivate(): void {}
