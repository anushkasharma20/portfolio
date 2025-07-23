import React, { useState } from 'react';

const WORDS = ['REACT', 'ARRAY', 'DEBUG', 'STACK', 'VSCODE', 'PYTHON', 'LOGIN', 'STATE', 'HOOKS', 'PROMPT'];

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}

function getLetterStatus(guess, answer) {
  // Returns array: 'correct', 'present', 'absent'
  return guess.split('').map((char, i) => {
    if (answer[i] === char) return 'correct';
    if (answer.includes(char)) return 'present';
    return 'absent';
  });
}

function FunWordle({ onBack }) {
  const [answer] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState('');
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState('');

  const maxLen = answer.length;
  const maxTries = 6;

  const handleGuess = () => {
    if (input.length !== maxLen) {
      setError(`Word must be ${maxLen} letters.`);
      return;
    }
    setError('');
    setGuesses([...guesses, input.toUpperCase()]);
    setInput('');
    if (input.toUpperCase() === answer) setSolved(true);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <div className="text-neon-teal font-mono text-lg mb-2">Guess the {maxLen}-letter tech word!</div>
      <div className="flex flex-col gap-1 mb-2">
        {guesses.map((guess, idx) => {
          const status = getLetterStatus(guess, answer);
          return (
            <div key={idx} className="flex gap-1 justify-center">
              {guess.split('').map((char, i) => (
                <span
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded font-mono text-xl border-2
                    ${status[i] === 'correct' ? 'bg-green-500/80 border-green-400 text-white' :
                      status[i] === 'present' ? 'bg-yellow-400/80 border-yellow-400 text-black' :
                      'bg-neon-black/80 border-neon-purple text-neon-teal'}`}
                >
                  {char}
                </span>
              ))}
            </div>
          );
        })}
        {(!solved && guesses.length < maxTries) && (
          <div className="flex gap-1 justify-center">
            {[...Array(maxLen)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-8 h-8 text-center font-mono text-xl rounded border-2 border-neon-purple bg-neon-black/80 text-neon-teal focus:bg-neon-purple/20 outline-none"
                value={input[i] || ''}
                autoFocus={i === input.length}
                onChange={e => {
                  let val = e.target.value.toUpperCase();
                  if (!/^[A-Z]?$/.test(val)) return;
                  let arr = input.split('');
                  arr[i] = val;
                  let newInput = arr.join('').slice(0, maxLen);
                  setInput(newInput);
                  // Move focus to next input automatically
                  if (val && i < maxLen - 1) {
                    const next = document.getElementById(`wordle-input-${i+1}`);
                    if (next) next.focus();
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleGuess();
                  if (e.key === 'Backspace' && !input[i] && i > 0) {
                    const prev = document.getElementById(`wordle-input-${i-1}`);
                    if (prev) prev.focus();
                  }
                }}
                id={`wordle-input-${i}`}
                disabled={!!input[i+1] || solved}
              />
            ))}
          </div>
        )}
      </div>
      {error && <div className="text-red-400 font-mono text-sm">{error}</div>}
      <div className="flex gap-2 mt-2">
        <button
          className="px-4 py-1 rounded bg-neon-purple/80 text-white font-mono hover:bg-neon-teal/80"
          onClick={handleGuess}
          disabled={solved || guesses.length >= maxTries}
        >
          Guess
        </button>
        <button
          className="px-4 py-1 rounded bg-neon-black/60 text-neon-purple font-mono border border-neon-purple/40 hover:bg-neon-purple/20"
          onClick={onBack}
        >
          Back
        </button>
      </div>
      {solved && <div className="text-green-400 font-mono mt-2">You got it! 🎉</div>}
      {!solved && guesses.length >= maxTries && (
        <div className="text-red-400 font-mono mt-2">Out of tries! The word was <span className="font-bold">{answer}</span>.</div>
      )}
    </div>
  );
}

export default FunWordle;
