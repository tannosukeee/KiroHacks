import { z } from "zod";

export const QuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const QuizQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(QuizOptionSchema).min(2),
  correctOptionId: z.string(),
  explanation: z.string(),
});

export const TutorResponseSchema = z.object({
  mode: z.enum(["mock", "gemini"]),
  title: z.string(),
  explanation: z.string(),
  keyConcepts: z.array(z.string()),
  quiz: z.array(QuizQuestionSchema).min(1),
  guardrail: z.object({
    blocked: z.boolean(),
    reason: z.string().optional(),
  }),
});

export type TutorResponse = z.infer<typeof TutorResponseSchema>;

export const HostToWebviewMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("tutorResponse"),
    payload: TutorResponseSchema,
  }),
  z.object({
    type: z.literal("loading"),
    payload: z.object({ isLoading: z.boolean() }),
  }),
  z.object({
    type: z.literal("error"),
    payload: z.object({ message: z.string() }),
  }),
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
    }),
  }),
  z.object({
    type: z.literal("submitQuizAnswer"),
    payload: z.object({
      questionId: z.string(),
      selectedOptionId: z.string(),
    }),
  }),
]);

export type WebviewToHostMessage = z.infer<typeof WebviewToHostMessageSchema>;
