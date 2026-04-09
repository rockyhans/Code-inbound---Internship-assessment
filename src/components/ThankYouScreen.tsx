import React, { useEffect, useState } from "react";

interface Props {
  onReset: () => void;
}

const ThankYouScreen: React.FC<Props> = ({ onReset }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      onReset();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onReset]);

  return (
    <div className="welcome-container">
      <div className="welcome-card thankyou-card">
        <div className="thankyou-icon">🎉</div>

        <h1 className="welcome-title">Thank You!</h1>

        <p className="welcome-subtitle">
          Your feedback means a lot to us.
          <br />
          We'll use it to improve your experience.
        </p>

        <div className="countdown-ring">
          <span className="countdown-number">{countdown}</span>
        </div>

        <p className="countdown-label">Returning to home screen...</p>
      </div>
    </div>
  );
};

export default ThankYouScreen;
