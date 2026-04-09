import { v4 as uuidv4 } from "uuid";
import { SurveySession, Answer } from "../types";

const STORAGE_KEY = "survey_sessions";

const getSessions = (): SurveySession[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveSessions = (sessions: SurveySession[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

export const createSession = (): SurveySession => {
  const session: SurveySession = {
    sessionId: uuidv4(),
    startedAt: new Date().toISOString(),
    status: "IN_PROGRESS",
    answers: {},
  };
  const sessions = getSessions();
  sessions.push(session);
  saveSessions(sessions);
  return session;
};

export const saveAnswer = (sessionId: string, answer: Answer): void => {
  const sessions = getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === sessionId);
  if (idx === -1) return;
  sessions[idx].answers[answer.questionId] = answer;
  saveSessions(sessions);
};

export const completeSession = (sessionId: string): void => {
  const sessions = getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === sessionId);
  if (idx === -1) return;
  sessions[idx].status = "COMPLETED";
  sessions[idx].completedAt = new Date().toISOString();
  saveSessions(sessions);
};

export const getSession = (sessionId: string): SurveySession | null => {
  return getSessions().find((s) => s.sessionId === sessionId) ?? null;
};
