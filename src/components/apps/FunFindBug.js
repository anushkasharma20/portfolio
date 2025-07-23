import React, { useState } from 'react';

const BUGS = [
  {
    code: `function add(a, b) {
  return a - b;
}`,
    answer: 'return a + b;',
    hint: 'Check the operator.'
  },
  {
    code: `const arr = [1,2,3];
console.log(arr[3]);`,
    answer: 'arr[2]',
    hint: 'Array indices start at 0.'
  },
  {
    code: `let x = 10;
if (x = 5) {
  console.log('Five');
}`,
    answer: 'x == 5',
    hint: 'Assignment vs comparison.'
  },
];

function FunFindBug({ onBack }) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * BUGS.length));
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const bug = BUGS[idx];

  const check = () => {
    if (input.trim().toLowerCase().includes(bug.answer.toLowerCase())) {
      setSolved(true);
      setWrong(false);
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <pre className="text-neon-teal font-mono text-base text-left leading-tight select-none bg-neon-black/60 rounded p-2 border border-neon-purple/30 w-full max-w-md">{bug.code}</pre>
      <input
        className="px-4 py-2 rounded-lg border-2 border-neon-purple bg-neon-black/80 text-neon-teal font-mono text-lg text-center outline-none"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && check()}
        disabled={solved}
        placeholder="How would you fix it?"
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
      {showHint && <div className="text-neon-purple font-mono mt-2">Hint: {bug.hint}</div>}
      {wrong && !solved && <div className="text-red-400 font-mono mt-2">Not quite! Try again.</div>}
      {solved && <div className="text-green-400 font-mono mt-2">Correct! 🎉</div>}
    </div>
  );
}

export default FunFindBug;
