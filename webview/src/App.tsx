import { useEffect, useState } from "react";
import { EmptyState } from "./components/EmptyState";
import { HeaderBar } from "./components/HeaderBar";
import { TutorResponseView } from "./components/TutorResponseView";
import { useVSCodeApi } from "./hooks/useVSCodeApi";
import { createInitialGameState } from "./state/gameState";
import type { GameState } from "./state/gameState";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface TutorResponse {
  mode: "mock" | "gemini";
  title: string;
  explanation: string;
  keyConcepts: string[];
  quiz: QuizQuestion[];
  guardrail: {
    blocked: boolean;
    reason?: string;
  };
}

export interface QuizFeedback {
  questionId: string;
  isCorrect: boolean;
  correctOptionId: string;
  explanation: string;
  concept: string;
  showHint: boolean;
  nextDifficulty: 1 | 2 | 3 | 4 | 5;
  totalXp: number;
  level: number;
  currentStreak: number;
}

type ViewState =
  | { status: "empty" }
  | { status: "loading"; response?: TutorResponse }
  | { status: "ready"; response: TutorResponse }
  | { status: "feedback"; feedback: QuizFeedback; response: TutorResponse }
  | { status: "error"; message: string };

export function App() {
  const vscodeApi = useVSCodeApi();
  const [viewState, setViewState] = useState<ViewState>({ status: "empty" });
  const [gameState, setGameState] = useState<GameState>(createInitialGameState(""));

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.type === "loading" && message.payload.isLoading) {
        setViewState((current) => ({
          status: "loading",
          response:
            current.status === "ready" || current.status === "loading"
              ? current.response
              : undefined,
        }));
      }

      if (message.type === "tutorResponse") {
        setViewState({ status: "ready", response: message.payload });
      }

      if (message.type === "error") {
        setViewState({ status: "error", message: message.payload.message });
      }

      if (message.type === "quizFeedback") {
        console.log("[Vybe Tutor] quizFeedback received:", message.payload);
        // Update gameState so HeaderBar shows current XP/level/streak.
        setGameState((prev) => ({
          ...prev,
          totalXp: message.payload.totalXp,
          level: message.payload.level,
          xpInLevel: message.payload.totalXp % 100,
          streak: message.payload.currentStreak,
          isRecovering: message.payload.showHint,
          difficulty: message.payload.nextDifficulty,
          concept: message.payload.concept,
        }));
        setViewState((current) => {
          // Keep the current response so the quiz stays visible alongside feedback.
          const response =
            current.status === "ready" ||
            current.status === "feedback" ||
            current.status === "loading"
              ? current.response
              : undefined;
          if (!response) {
            return current;
          }
          return { status: "feedback", feedback: message.payload, response };
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-vybe-bg text-vybe-text font-mono">
      <HeaderBar isLive={viewState.status === "ready" || viewState.status === "feedback"} gameState={gameState} />
      <main className="p-4">
        {viewState.status === "empty" && <EmptyState />}
        {viewState.status === "error" && (
          <div className="rounded border border-vybe-border bg-vybe-raised p-4 text-sm text-vybe-muted">
            {viewState.message}
          </div>
        )}
        {viewState.status === "loading" && !viewState.response && (
          <div className="rounded border border-vybe-border bg-vybe-raised p-4 text-sm text-vybe-muted">
            Building explanation...
          </div>
        )}
        {viewState.status === "loading" && viewState.response && (
          <TutorResponseView data={viewState.response} vscodeApi={vscodeApi} />
        )}
        {viewState.status === "ready" && (
          <TutorResponseView data={viewState.response} vscodeApi={vscodeApi} />
        )}
        {viewState.status === "feedback" && (
          <>
            <TutorResponseView data={viewState.response} vscodeApi={vscodeApi} />
            <div className="mt-4 rounded border border-vybe-border bg-vybe-raised p-3 text-sm">
              <p className="font-semibold text-vybe-amber">
                {viewState.feedback.isCorrect ? "✓ Correct" : "✗ Incorrect"}
              </p>
              <p className="mt-1 text-vybe-text">{viewState.feedback.explanation}</p>
              {viewState.feedback.showHint && (
                <p className="mt-1 text-vybe-muted">
                  Hint: try a slightly easier question on{" "}
                  <span className="text-vybe-amber">{viewState.feedback.concept}</span>.
                </p>
              )}
              <p className="mt-2 text-vybe-muted text-xs">
                XP: {viewState.feedback.totalXp} · Level: {viewState.feedback.level} · Streak: {viewState.feedback.currentStreak}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
