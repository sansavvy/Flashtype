import React from "react";
import ChallengeDetails from "../ChallengeDetails/ChallengeDetails";
import WritingChallenge from "../WritingChallenge/WritingChallenge";
import "./TypingChallengeContainer.css";

const TypingChallengeContainer = ({
  selectedPara,
  words,
  characters,
  wpm,
  timerRemaining,
  timerStarted,
  testInfo,
  onInputChange
}) => {
  return (
    <div className="typing-challenge-container">
      {/* Details section */}
      <div className="details-container">
        {/* words typed */}
        <ChallengeDetails cardName="Words" cardValue={words} />

        {/* characters typed */}
        <ChallengeDetails cardName="Characters" cardValue={characters} />

        {/* speed */}
        <ChallengeDetails cardName="Speed" cardValue={wpm} />
      </div>

      {/* Real challenge */}
      <div className="writing-cont">
        <WritingChallenge
        onInputChange={onInputChange}
        testInfo={testInfo}
          selectedPara={selectedPara}
          timerStarted={timerStarted}
          timerRemaining={timerRemaining}
        />
      </div>
    </div>
  );
};

export default TypingChallengeContainer;
