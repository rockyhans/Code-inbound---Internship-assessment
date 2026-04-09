import React from "react";

interface Props {
  onStart: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-icon">★</div>
        <h1 className="welcome-title">Welcome!</h1>
        <p className="welcome-subtitle">
          We'd love to hear about your experience today.
          <br />
          This quick survey takes less than 2 minutes.
        </p>
        <button className="btn-primary btn-large" onClick={onStart}>
          Start Survey
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
