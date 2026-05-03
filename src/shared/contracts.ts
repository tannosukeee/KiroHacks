import { z } from "zod";

export const QuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
}).strict();

export const QuizQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(QuizOptionSchema).min(2),
  correctOptionId: z.string(),
  explanation: z.string(),
}).strict();

export const DocReferenceSchema = z.object({
  concept: z.string(),
  quote: z.string(),
  source: z.string(),
  url: z.string(),
}).strict();

export const TutorResponseSchema = z.object({
  mode: z.enum(["mock", "gemini"]),
  title: z.string(),
  explanation: z.string(),
  keyConcepts: z.array(z.string()),
  docReferences: z.array(DocReferenceSchema).optional().default([]),
  quiz: z.array(QuizQuestionSchema).min(1),
  guardrail: z.object({
    blocked: z.boolean(),
    reason: z.string().optional(),
  }).strict(),
}).strict();

export type TutorResponse = z.infer<typeof TutorResponseSchema>;
export type DocReference = z.infer<typeof DocReferenceSchema>;

export const HostToWebviewMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("tutorResponse"),
    payload: TutorResponseSchema,
  }).strict(),
  z.object({
    type: z.literal("loading"),
    payload: z.object({ isLoading: z.boolean() }).strict(),
  }).strict(),
  z.object({
    type: z.literal("error"),
    payload: z.object({ message: z.string() }).strict(),
  }).strict(),
  z.object({
    type: z.literal("quizFeedback"),
    payload: z.object({
      questionId: z.string(),
      isCorrect: z.boolean(),
      /** The correct option id — lets the UI highlight the right answer. */
      correctOptionId: z.string(),
      /** Explanation text from the quiz question, shown after answering. */
      explanation: z.string(),
      /** Concept that was tested, for display in the feedback banner. */
      concept: z.string(),
      /** Whether to show a hint (recovering or needsReview). */
      showHint: z.boolean(),
      /** Difficulty level for the next question on this concept (1–5). */
      nextDifficulty: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ]),
      totalXp: z.number().int().min(0),
      level: z.number().int().min(1),
      currentStreak: z.number().int().min(0),
    }).strict(),
  }).strict(),
]);

export type HostToWebviewMessage = z.infer<typeof HostToWebviewMessageSchema>;

export const WebviewToHostMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("ready"),
  }),
  z.object({
    type: z.literal("requestTutorResponse"),
    payload: z.object({
      selectedCode: z.string(),
      languageId: z.string().optional(),
    }).strict(),
  }).strict(),
  z.object({
    type: z.literal("submitQuizAnswer"),
    payload: z.object({
      questionId: z.string(),
      selectedOptionId: z.string(),
    }).strict(),
  }).strict(),
]);

export type WebviewToHostMessage = z.infer<typeof WebviewToHostMessageSchema>;
