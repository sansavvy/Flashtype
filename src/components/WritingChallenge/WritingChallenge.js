import React from "react";
import TestLetter from "../TestLetter/TestLetter";

import "./WritingChallenge.css";

const WritingChallenge = ({
  onInputChange,
  timerRemaining,
  timerStarted,
  testInfo,
}) => {
  return (
    <div className="typing-challenge">
      <div className="timer-container">
        <p className="timer">
          00:
          {timerRemaining >= 10 ? timerRemaining : `0${timerRemaining}`}
        </p>
        <p className="timer-info">
          {!timerStarted && "Start typing to start the test"}
        </p>
      </div>
      <div className="textarea-cont">
        <div className="textarea-left">
          <div className="textarea test-paragraph">
            {/* {selectedPara} */}
            {testInfo.map((individualLetterInfo,index) => {
              return <TestLetter
              key={index}
               individualLetterInfo={individualLetterInfo} />;
            })}
          </div>
        </div>

        <div className="textarea-right">
          <textarea
            onChange={(e) => onInputChange(e.target.value)}
            className="textarea"
            placeholder="Start typing here !"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default WritingChallenge;
