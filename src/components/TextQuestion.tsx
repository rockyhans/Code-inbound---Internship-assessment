import React from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const TextQuestion: React.FC<Props> = ({ value, onChange }) => {
  return (
    <textarea
      className="text-answer"
      placeholder="Type your answer here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
    />
  );
};

export default TextQuestion;
