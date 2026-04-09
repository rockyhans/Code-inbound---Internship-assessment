import React, { useState, useCallback } from "react";
import { QUESTIONS } from "./data/questions";
import { Answer, SurveySession } from "./types";
import { createSession, saveAnswer, completeSession } from "./utils/storage";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import ConfirmDialog from "./components/ConfirmDialog";
import ThankYouScreen from "./components/ThankYouScreen";

type AppScreen = "welcome" | "survey" | "confirm" | "thankyou";

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const [session, setSession] = useState<SurveySession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const handleStart = useCallback(() => {
    const newSession = createSession();
    setSession(newSession);
    setAnswers({});
    setCurrentIndex(0);
    setScreen("survey");
  }, []);

  const handleAnswer = useCallback(
    (value: string | number | null) => {
      if (!session) return;
      const question = QUESTIONS[currentIndex];
      const answer: Answer = {
        questionId: question.id,
        value,
        skipped: false,
      };
      setAnswers((prev) => ({ ...prev, [question.id]: answer }));
      saveAnswer(session.sessionId, answer);
    },
    [session, currentIndex],
  );

  const handleSkip = useCallback(() => {
    if (!session) return;
    const question = QUESTIONS[currentIndex];
    const answer: Answer = {
      questionId: question.id,
      value: null,
      skipped: true,
    };
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));
    saveAnswer(session.sessionId, answer);
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setScreen("confirm");
    }
  }, [session, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setScreen("confirm");
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const handleConfirm = useCallback(() => {
    if (!session) return;
    completeSession(session.sessionId);
    setScreen("thankyou");
  }, [session]);

  const handleReset = useCallback(() => {
    setSession(null);
    setAnswers({});
    setCurrentIndex(0);
    setScreen("welcome");
  }, []);

  return (
    <div className="app">
      {screen === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {screen === "survey" && (
        <QuestionScreen
          key={currentIndex}
          question={QUESTIONS[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={QUESTIONS.length}
          answer={answers[QUESTIONS[currentIndex].id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onSkip={handleSkip}
          isFirst={currentIndex === 0}
          isLast={currentIndex === QUESTIONS.length - 1}
        />
      )}

      {screen === "confirm" && (
        <>
          <QuestionScreen
            key={currentIndex}
            question={QUESTIONS[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={QUESTIONS.length}
            answer={answers[QUESTIONS[currentIndex].id]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrev={handlePrev}
            onSkip={handleSkip}
            isFirst={currentIndex === 0}
            isLast={currentIndex === QUESTIONS.length - 1}
          />
          <ConfirmDialog
            onConfirm={handleConfirm}
            onCancel={() => setScreen("survey")}
          />
        </>
      )}

      {screen === "thankyou" && <ThankYouScreen onReset={handleReset} />}
    </div>
  );
};

export default App;
