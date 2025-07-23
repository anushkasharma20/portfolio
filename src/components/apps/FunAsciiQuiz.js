
import React, { useState, useRef } from 'react';

const SENTENCES = [
  'The quick brown fox jumps over the lazy dog.',
  'Typing speed tests are fun and challenging.',
  'React makes building UIs interactive and easy.',
  'Practice makes perfect for fast typing.',
  'AI is transforming the world of technology.',
  'Stay curious and keep learning new things.',
  'JavaScript powers the modern web.',
  'Never stop exploring and building.',
  'Open source helps everyone grow.',
  'Creativity and code go hand in hand.'
];


function FunAsciiQuiz({ onBack }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [sentence, setSentence] = useState(() => SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
  const inputRef = useRef();

  const startTest = () => {
    setStarted(true);
    setFinished(false);
    setInput('');
    setSentence(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);
    if (!startTime) setStartTime(Date.now());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && started && !finished) {
      setEndTime(Date.now());
      setFinished(true);
    }
  };

  const getWPM = () => {
    if (!endTime || !startTime) return 0;
    const minutes = (endTime - startTime) / 60000;
    const words = sentence.trim().split(/\s+/).length;
    return Math.round(words / minutes);
  };

  const getAccuracy = () => {
    if (!finished && !input.length) return 100;
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === sentence[i]) correct++;
    }
    return Math.round((correct / Math.max(input.length, sentence.length)) * 100);
  };

  // Highlight logic
  const renderSentence = () => {
    const chars = [];
    for (let i = 0; i < sentence.length; i++) {
      let color = 'text-gray-500';
      if (i < input.length) {
        color = input[i] === sentence[i] ? 'text-green-400' : 'text-red-400';
      }
      chars.push(
        <span key={i} className={color + ' font-mono'} style={{ background: i === input.length && started && !finished ? '#222' : 'none' }}>
          {sentence[i]}
        </span>
      );
    }
    return chars;
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <div className="font-mono text-lg text-center select-none break-words text-neon-teal" style={{ wordBreak: 'break-word', lineHeight: 1.6 }}>
        {started ? renderSentence() : 'Test your typing speed!'}
      </div>
      {started && !finished && (
        <input
          ref={inputRef}
          className="px-4 py-2 rounded-lg border-2 border-neon-purple bg-neon-black/80 text-neon-teal font-mono text-lg text-center outline-none w-full max-w-md"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Start typing..."
          autoFocus
        />
      )}
      {!started && (
        <button
          className="px-6 py-2 rounded bg-neon-purple/80 text-white font-mono text-lg hover:bg-neon-teal/80"
          onClick={startTest}
        >
          Start Test
        </button>
      )}
      {finished && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="text-green-400 font-mono text-lg">Done! Your speed: <span className="font-bold">{getWPM()} WPM</span></div>
          <div className="text-neon-purple font-mono text-lg">Accuracy: <span className="font-bold">{getAccuracy()}%</span></div>
          <button
            className="px-4 py-1 rounded bg-neon-purple/80 text-white font-mono hover:bg-neon-teal/80"
            onClick={startTest}
          >
            Try Again
          </button>
        </div>
      )}
      <button
        className="px-4 py-1 rounded bg-neon-black/60 text-neon-purple font-mono border border-neon-purple/40 hover:bg-neon-purple/20 mt-2"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
}

export default FunAsciiQuiz;
