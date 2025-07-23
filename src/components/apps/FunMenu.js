import React from 'react';

const FUN_OPTIONS = [
  { key: 'riddle', label: 'Dev Riddles', emoji: '🧩' },
  { key: 'ascii', label: 'Typing Test', emoji: '💻' },
  { key: 'bug', label: 'Wordle', emoji: '📠' },
];

const FunMenu = ({ onSelect, onClose }) => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-black/95 border-2 border-neon-purple rounded-xl shadow-xl p-4 flex flex-col gap-3 z-50 min-w-[220px]">
    <div className="flex justify-between items-center mb-2">
      <span className="text-neon-teal font-mono text-lg font-bold">Choose a Game</span>
      <button
        className="text-neon-purple hover:text-red-500 text-2xl font-bold px-2"
        onClick={onClose}
        aria-label="Close menu"
      >
        ×
      </button>
    </div>
    {FUN_OPTIONS.map(opt => (
      <button
        key={opt.key}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-neon-black/80 hover:bg-neon-purple/30 text-neon-teal font-mono text-base font-semibold transition-all border border-neon-purple/40"
        onClick={() => onSelect(opt.key)}
      >
        <span className="text-2xl">{opt.emoji}</span> {opt.label}
      </button>
    ))}
  </div>
);

export default FunMenu;
