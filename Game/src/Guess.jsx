import React, { useState, useEffect } from 'react';
import './Guess.css';

const GuessTheNumber = () => {
  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate random number on component mount
  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(newNumber);
    setGuess('');
    setFeedback('');
    setAttempts(0);
    setGameWon(false);
    setGameOver(false);
    setIsAnimating(false);
  };

  const handleGuess = () => {
    // Validate input
    if (!guess.trim() || isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Please enter a valid number between 1 and 100');
      return;
    }

    const guessNum = parseInt(guess);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNum === secretNumber) {
      setFeedback('Correct! 🎉');
      setGameWon(true);
      setIsAnimating(true);
      // Stop animation after 3 seconds
      setTimeout(() => setIsAnimating(false), 3000);
    } else if (guessNum > secretNumber) {
      setFeedback('Too high!');
    } else {
      setFeedback('Too low!');
    }

    // Check for game over (10 attempts)
    if (newAttempts >= 10 && guessNum !== secretNumber) {
      setGameOver(true);
      setFeedback(`Game Over! The number was ${secretNumber}`);
    }

    setGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const restartGame = () => {
    generateNewNumber();
  };

  return (
    <div className={`game-container ${gameWon ? 'won' : ''} ${isAnimating ? 'animate' : ''}`}>
      <h1 className={`title ${isAnimating ? 'bounce' : ''}`}>
        🎯 Guess the Number Game
      </h1>
      
      <div className="game-info">
        <p>I'm thinking of a number between 1 and 100</p>
        <p className="attempts">Attempts: {attempts}/10</p>
      </div>

      {!gameWon && !gameOver && (
        <div className="input-section">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your guess (1-100)"
            min="1"
            max="100"
            className="guess-input"
          />
          <button onClick={handleGuess} className="submit-btn">
            Submit Guess
          </button>
        </div>
      )}

      {feedback && (
        <div className={`feedback ${gameWon ? 'correct' : gameOver ? 'game-over' : ''}`}>
          {feedback}
        </div>
      )}

      {gameWon && (
        <div className="win-section">
          <div className="confetti">
            🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉
          </div>
          <button onClick={restartGame} className="restart-btn">
            Play Again! 🚀
          </button>
        </div>
      )}

      {gameOver && !gameWon && (
        <div className="game-over-section">
          <button onClick={restartGame} className="restart-btn">
            Try Again! 🔄
          </button>
        </div>
      )}

      {!gameWon && !gameOver && attempts > 0 && (
        <div className="hint">
          💡 {feedback.includes('high') ? 'Try a lower number' : 'Try a higher number'}
        </div>
      )}
    </div>
  );
};

export default GuessTheNumber;