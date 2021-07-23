import React from "react";
import TestContainer from "../TestContainer/TestContainer";
import "./Challenge.css";

const Challenge = ({
  selectedPara,
  words,
  characters,
  wpm,
  timerRemaining,
  timerStarted,
  testInfo,
  onInputChange,
  startAgain,
  
}) => {
  return (
    <div className="challenge-container">
      <h1 data-aos="fade-down" className="challenge-header">
        Take a Speed Test Now !
      </h1>
      <TestContainer
        selectedPara={selectedPara}
        timerStarted={timerStarted}
        timerRemaining={timerRemaining}
        words={words}
        characters={characters}
        wpm={wpm}
        testInfo={testInfo}
        onInputChange={onInputChange}
        startAgain={startAgain}
      />
    </div>
  );
};

export default Challenge;
