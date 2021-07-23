import React from "react";
import TryAgain from "../TryAgain/TryAgain";
import TypingChallengeContainer from "../TypingChallengeContainer/TypingChallengeContainer";
import "./TestContainer.css";

const TestContainer = ({
  selectedPara,
  words,
  characters,
  wpm,
  timerRemaining,
  timerStarted,
  testInfo,
  onInputChange,
  startAgain
}) => {
  return (
    <div className="test-container">
      {timerRemaining > 0 ? (
        <div data-aos="fade-up" className="typing-challenge-cont">
          <TypingChallengeContainer
            selectedPara={selectedPara}
            timerStarted={timerStarted}
            timerRemaining={timerRemaining}
            words={words}
            characters={characters}
            wpm={wpm}
            testInfo={testInfo}
            onInputChange={onInputChange}
            
          />
        </div>
      ) : (
        <div className="try-again-container">
          <TryAgain words={words} characters={characters} wpm={wpm}
          startAgain={startAgain} />
        </div>
      )}
    </div>
  );
};

export default TestContainer;
