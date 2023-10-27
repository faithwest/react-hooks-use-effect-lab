import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Timer Helper: Runs every second
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        // Takes away 1 second from the clock
        setTimeRemaining(timeRemaining - 1);
      } else {
        // Time's up! Call onAnswered with 'false'
        onAnswered(false);
      }
    }, 1000); // 1000 milliseconds = 1 second

    return () => {
      // Clean up: Stop the timer when unmounting
      clearTimeout(timer);
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Restart the timer by setting it back to 10
    setTimeRemaining(10);
    // If the answer is correct, we're happy; if not, we say "Oops!"
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
