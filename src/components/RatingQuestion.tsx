import React from "react";

interface Props {
  min: number;
  max: number;
  value: number | null;
  onChange: (val: number) => void;
}

const RatingQuestion: React.FC<Props> = ({ min, max, value, onChange }) => {
  const count = max - min + 1;

  // Use dots for 1–10, stars for 1–5
  const isLarge = count > 5;

  return (
    <div
      className={`rating-wrapper ${isLarge ? "rating-dots" : "rating-stars"}`}
    >
      {Array.from({ length: count }, (_, i) => {
        const val = min + i;
        const selected = value !== null && val <= value;
        const isActive = value === val;
        return (
          <button
            key={val}
            className={`rating-item ${selected ? "selected" : ""} ${isActive ? "active" : ""}`}
            onClick={() => onChange(val)}
            aria-label={`Rate ${val}`}
          >
            {isLarge ? (
              <span className="dot-label">{val}</span>
            ) : (
              <span className="star-symbol">{selected ? "★" : "☆"}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default RatingQuestion;
