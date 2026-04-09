export type QuestionType = "rating" | "text";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  min?: number;
  max?: number;
}

export interface Answer {
  questionId: string;
  value: string | number | null;
  skipped: boolean;
}

export interface SurveySession {
  sessionId: string;
  startedAt: string;
  completedAt?: string;
  status: "IN_PROGRESS" | "COMPLETED";
  answers: Record<string, Answer>;
}
