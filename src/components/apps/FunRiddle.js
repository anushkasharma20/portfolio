import React, { useState } from 'react';

const RIDDLES = [
  {
    question: 'I am a five-letter word and a popular programming language. Remove my first letter and I become a type of snake. What am I?',
    answer: 'PYTHON',
    hint: 'It is also a snake.'
  },
  {
    question: 'What runs but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?',
    answer: 'RIVER',
    hint: 'It flows.'
  },
  {
    question: 'I am not alive, but I can grow. I don’t have lungs, but I need air. What am I?',
    answer: 'FIRE',
    hint: 'I burn.'
  },
];

function FunRiddle({ onBack }) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * RIDDLES.length));
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const riddle = RIDDLES[idx];

  const check = () => {
    if (input.trim().toUpperCase() === riddle.answer) setSolved(true);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <div className="text-neon-teal font-mono text-lg text-center">{riddle.question}</div>
      <input
        className="px-4 py-2 rounded-lg border-2 border-neon-purple bg-neon-black/80 text-neon-teal font-mono text-lg text-center outline-none"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && check()}
        disabled={solved}
        placeholder="Your answer..."
      />
      <div className="flex gap-2">
        <button
          className="px-4 py-1 rounded bg-neon-purple/80 text-white font-mono hover:bg-neon-teal/80"
          onClick={check}
          disabled={solved}
        >
          Check
        </button>
        <button
          className="px-4 py-1 rounded bg-neon-black/60 text-neon-purple font-mono border border-neon-purple/40 hover:bg-neon-purple/20"
          onClick={() => setShowHint(h => !h)}
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          className="px-4 py-1 rounded bg-neon-black/60 text-neon-purple font-mono border border-neon-purple/40 hover:bg-neon-purple/20"
          onClick={onBack}
        >
          Back
        </button>
      </div>
      {showHint && <div className="text-neon-purple font-mono mt-2">Hint: {riddle.hint}</div>}
      {solved && <div className="text-green-400 font-mono mt-2">Correct! 🎉</div>}
    </div>
  );
}

export default FunRiddle;
