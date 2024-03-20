import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [scores, setScores] = useState([]);
  const [manualSum, setManualSum] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  const [finalScore, setFinalScore] = useState("");

  useEffect(() => {
    // Calculate final score whenever scores or manualSum change
    calculateFinalScore();
  }, [scores, manualSum]);

  const handleScoreChange = (event) => {
    const newScore = event.target.value;
    if (newScore.length <= 2) {
      setCurrentScore(newScore);
      if (newScore.length === 2) {
        // Automatically add the score to the list when it reaches two digits
        addScore(parseFloat(newScore));
      }
    }
  };

  const addScore = (score) => {
    setScores([...scores, score]);
    setCurrentScore("");
  };

  const handleManualSumChange = (event) => {
    const sum = event.target.value;
    setManualSum(sum);
    setScores([])
    calculateFinalScore();
  };

  const calculateFinalScore = () => {
    const listedTotal = scores.reduce((acc, score) => acc + score, 0);
    const final = ((listedTotal + parseFloat(manualSum || 0)) / 240) * 70;
    setFinalScore(final.toFixed(2));
  };

  const handleListScoreChange = (event, index) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(event.target);
    range.collapse(false); // Set cursor at the end of the content
    selection.removeAllRanges();
    selection.addRange(range);

    const newScores = [...scores];
    newScores[index] = parseFloat(event.target.textContent) || 0;
    setScores(newScores);
    calculateFinalScore(); // Recalculate final score immediately
  };

  return (
    <div>
      <h1>Welcome To Momzay's Score Calculator</h1>
      <hr />
      <div>
        <h2>Input Scores Per Section</h2>
        <ul className="score-list">
          {scores.map((score, index) => (
            <li
              key={index}
              contentEditable={true}
              onInput={(event) => handleListScoreChange(event, index)}
            >
              <span>{score}</span>
            </li>
          ))}
        </ul>
        {/* Input field for entering scores */}
        <input
          type="number"
          value={currentScore}
          onChange={handleScoreChange}
          placeholder="Enter score"
        />
      </div>
      <br />
      <div>
      <h3>OR</h3>
      </div>
      <br />
      
      <div>
        <h2>Input Sum Of All Sections</h2>
        <input
          type="number"
          value={manualSum}
          onChange={handleManualSumChange}
          placeholder="Enter sum"
        />
      </div>
      <br />
      <hr />
      <div>
        <h2>Student's Final Score</h2>
        <p>{finalScore}</p>
      </div>
    </div>
  );
}

export default App;
