import React from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Landing from "../Landing/Landing";
import Footer from "../Footer/Footer";
import Challenge from "../Challenge/Challenge";
import { SAMPLE_PARAGRAPHS } from "../../data/sampleParagraph";

const TotalTime = 60;
const apiUrl = "http://metaphorpsum.com/paragraphs/1/9";
const DefaultState = {
  selectedPara: "helo world",
  timerStarted: false,
  timerRemaining: TotalTime,
  words: 0,
  characters: 0,
  wpm: 0,
  testInfo: [],
};

class App extends React.Component {
  state = DefaultState;

  fetchNewParagraphFallback = () => {
    const information =
      SAMPLE_PARAGRAPHS[Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)];

      const selectedParaArray = information.split("");
        const testInfo = selectedParaArray.map((selectedLetter) => {
          return {
            testLetter: selectedLetter,
            status: "notAttempted",
          };
        });

        this.setState({
          ...DefaultState,
          testInfo,
          selectedPara: information,
        });
  };

  fetchNewParagraph = () => {
    fetch(apiUrl)
      .then((response) => response.text())
      .then((information) => {
        const selectedParaArray = information.split("");
        const testInfo = selectedParaArray.map((selectedLetter) => {
          return {
            testLetter: selectedLetter,
            status: "notAttempted",
          };
        });

        this.setState({
          ...DefaultState,
          testInfo,
          selectedPara: information,
        });
      });
  };

  componentDidMount() {
    this.fetchNewParagraphFallback();
  }

  startTimer = () => {
    this.setState({ timerStarted: true });
    const timer = setInterval(() => {
      if (this.state.timerRemaining > 0) {
        //change the wpm

        const timeSpent = TotalTime - this.state.timerRemaining;
        const wpm =
          timeSpent > 0 ? (this.state.words / timeSpent) * TotalTime : 0;
        this.setState({
          timerRemaining: this.state.timerRemaining - 1,
          wpm: parseInt(wpm),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
  };

  startAgain = () => this.fetchNewParagraphFallbacknpm ();

  handleUserInput = (inputValue) => {
    if (!this.state.timerStarted) this.startTimer();

    /**
     * 1.Handle the underflow case - all the characters should be shown as not attempted case.
     * 2.Handle the overflow case - early exit
     * 3.Handle the backspace
     *      - Mark the [index+1] element as not - attempted (irrespective of index <0).
     *      - (index+1) can go out of bound , when index == length-1
     * 4.Update the status in the test info
     *      - Find the last character in the input value and it's index
     *      - check if the character at same index in testinfo (state) matches
     *      - yes ->"correct"
     *      - No ->"incoreect"
     * 5.Irrespective of the case , characters,words,wpm should have to be updated.
     *
     */

    const characters = inputValue.length;
    const words = inputValue.split(" ").length;
    const index = characters - 1;

    if (index < 0) {
      this.setState({
        testInfo: [
          {
            testLetter: this.state.testInfo[0].testLetter,
            status: "notAttempted",
          },
          ...this.state.testInfo.slice(1),
        ],
        characters,
        words,
      });
      return;
    }

    if (index >= this.state.selectedPara.length) {
      this.setState({ characters, words });
      return;
    }

    //Make a copy of testInfo

    const testInfo = this.state.testInfo;
    if (!(index === this.state.selectedPara.length - 1))
      testInfo[index + 1].status = "notAttempted";

    //check for correct type letters

    const isCorrect = inputValue[index] === testInfo[index].testLetter;

    //update the testInfo

    testInfo[index].status = isCorrect ? "correct" : "incorrect";

    //update the state
    this.setState({
      testInfo,
      words,
      characters,
    });
  };

  render() {
    console.log("test Info -", this.state.testInfo);

    return (
      <div className="app">
        {/* nav sec */}
        <Nav />

        {/* landing page */}
        <Landing />
        {/* challenge sec */}
        <Challenge
          selectedPara={this.state.selectedPara}
          words={this.state.words}
          characters={this.state.characters}
          wpm={this.state.wpm}
          timerRemaining={this.state.timerRemaining}
          timerStarted={this.state.timerStarted}
          testInfo={this.state.testInfo}
          onInputChange={this.handleUserInput}
          startAgain={this.startAgain}
        />
        {/* footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
