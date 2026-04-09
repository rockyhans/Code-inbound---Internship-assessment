import React from "react";
import { Question, Answer } from "../types";
import RatingQuestion from "./RatingQuestion";
import TextQuestion from "./TextQuestion";

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  answer: Answer | undefined;
  onAnswer: (value: string | number | null) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuestionScreen: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswer,
  onNext,
  onPrev,
  onSkip,
  isFirst,
  isLast,
}) => {
  const progress = (questionNumber / totalQuestions) * 100;
  const currentValue = answer?.skipped ? null : (answer?.value ?? null);

  return (
    <div className="question-container">
      <div className="question-card">
        {/* Header */}
        <div className="q-header">
          <span className="q-counter">
            {questionNumber} <span className="q-counter-sep">/</span>{" "}
            {totalQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Question text */}
        <p className="question-text">{question.text}</p>

        {/* Answer input */}
        <div className="answer-area">
          {question.type === "rating" ? (
            <RatingQuestion
              min={question.min!}
              max={question.max!}
              value={currentValue as number | null}
              onChange={(val) => onAnswer(val)}
            />
          ) : (
            <TextQuestion
              value={(currentValue as string) || ""}
              onChange={(val) => onAnswer(val)}
            />
          )}
        </div>

        {/* Skip */}
        <button className="btn-skip" onClick={onSkip}>
          {answer?.skipped ? "✓ Skipped" : "Skip this question"}
        </button>

        {/* Navigation */}
        <div className="nav-row">
          <button className="btn-secondary" onClick={onPrev} disabled={isFirst}>
            ← Previous
          </button>
          <button className="btn-primary" onClick={onNext}>
            {isLast ? "Finish →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
