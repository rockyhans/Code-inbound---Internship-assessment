import React from "react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-icon">✓</div>
        <h2 className="dialog-title">Submit Survey?</h2>
        <p className="dialog-text">
          You've completed all the questions. Ready to submit your responses?
        </p>
        <div className="dialog-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Go Back
          </button>
          <button className="btn-primary" onClick={onConfirm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
