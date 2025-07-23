import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

const NAME = 'Anushka Sharma';
const TAGLINE = 'Building AI Systems, Scalable Apps & SAP Solutions';
const TARGET = 'ENTER';
const PROFILE_PHOTO = '/profile.jpg'; // Place a profile.jpg in public/ or use a placeholder

const LockScreen = ({ onEnter }) => {
  const [input, setInput] = useState('');
  const [showWaves, setShowWaves] = useState(true);
  const [sinkWaves, setSinkWaves] = useState(false);
  const [focused, setFocused] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [flash, setFlash] = useState(false);
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Calculate fill percent
  const fillPercent = Math.min(input.length / TARGET.length, 1);
  const waveHeight = 100 - fillPercent * 100; // SVG y offset for wave

  // Handle input
  const handleChange = (e) => {
    let val = e.target.value.toUpperCase();
    if (val.length > TARGET.length) val = val.slice(0, TARGET.length);
    setInput(val);
    // Sink waves if access denied and first char is not E
    if (input.length === TARGET.length - 1 && val.length === TARGET.length && val !== TARGET) {
      setSinkWaves(true);
    }
    // Show waves again if user types E as first char
    if (sinkWaves && val[0] === 'E') {
      setSinkWaves(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (input === TARGET && (e.key === 'Enter' || e.key === ' ')) {
      handleAccessGranted();
    }
  };

  // Handle OK button
  const handleAccessGranted = () => {
    setAccessGranted(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 1200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-neon-black via-neon-purple/30 to-neon-teal/20 overflow-hidden">
      {/* Minimal, creative, full-page animated waves */}
      {(!sinkWaves && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {/* Pure sideways, layered waves */}
          <motion.path
            initial={false}
            animate={{
              d: (() => {
                const amp = 32;
                const baseY = 220;
                const phase = (input.length * 2 + Date.now() / 400) % 100;
                let d = `M0,320 `;
                for (let i = 0; i <= 20; i++) {
                  const x = i * (1440 / 20);
                  // Only sideways shuffle, not moving up
                  const y = baseY - amp * Math.sin((i + phase) * 0.7);
                  d += ` L${x},${y}`;
                }
                d += ` L1440,320 Z`;
                return d;
              })(),
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            fill="#a259f7"
            fillOpacity={0.13}
          />
          <motion.path
            initial={false}
            animate={{
              d: (() => {
                const amp = 24;
                const baseY = 240;
                const phase = (input.length * 2.5 + Date.now() / 500) % 100;
                let d = `M0,320 `;
                for (let i = 0; i <= 20; i++) {
                  const x = i * (1440 / 20);
                  const y = baseY - amp * Math.cos((i + phase) * 0.6);
                  d += ` L${x},${y}`;
                }
                d += ` L1440,320 Z`;
                return d;
              })(),
            }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            fill="#00ffe7"
            fillOpacity={0.10}
          />
          <motion.path
            initial={false}
            animate={{
              d: (() => {
                const amp = 16;
                const baseY = 260;
                const phase = (input.length * 3 + Date.now() / 600) % 100;
                let d = `M0,320 `;
                for (let i = 0; i <= 20; i++) {
                  const x = i * (1440 / 20);
                  const y = baseY - amp * Math.sin((i + phase) * 0.5);
                  d += ` L${x},${y}`;
                }
                d += ` L1440,320 Z`;
                return d;
              })(),
            }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            fill="#fff"
            fillOpacity={0.07}
          />
        </svg>
      )) || (sinkWaves && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {/* Sink the waves down out of the screen */}
          <motion.path
            initial={false}
            animate={{
              d: (() => {
                const amp = 32;
                const baseY = 220 + 200; // sink down
                const phase = (input.length * 2 + Date.now() / 400) % 100;
                let d = `M0,320 `;
                for (let i = 0; i <= 20; i++) {
                  const x = i * (1440 / 20);
                  const y = baseY - amp * Math.sin((i + phase) * 0.7);
                  d += ` L${x},${y}`;
                }
                d += ` L1440,320 Z`;
                return d;
              })(),
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            fill="#a259f7"
            fillOpacity={0.13}
          />
          <motion.path
            initial={false}
            animate={{
              d: (() => {
                const amp = 24;
                const baseY = 240 + 200;
                const phase = (input.length * 2.5 + Date.now() / 500) % 100;
                let d = `M0,320 `;
                for (let i = 0; i <= 20; i++) {
                  const x = i * (1440 / 20);
                  const y = baseY - amp * Math.cos((i + phase) * 0.6);
                  d += ` L${x},${y}`;
                }
                d += ` L1440,320 Z`;
                return d;
              })(),
            }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
            fill="#00ffe7"
            fillOpacity={0.10}
          />
          <motion.path
            initial={false}
            animate={{
              d: (() => {
                const amp = 16;
                const baseY = 260 + 200;
                const phase = (input.length * 3 + Date.now() / 600) % 100;
                let d = `M0,320 `;
                for (let i = 0; i <= 20; i++) {
                  const x = i * (1440 / 20);
                  const y = baseY - amp * Math.sin((i + phase) * 0.5);
                  d += ` L${x},${y}`;
                }
                d += ` L1440,320 Z`;
                return d;
              })(),
            }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            fill="#fff"
            fillOpacity={0.07}
          />
        </svg>
      ))}
      {/* Neon flash on access granted */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="absolute inset-0 bg-neon-teal/40 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      <div className="absolute top-6 left-6 text-left z-10">
        <div className="text-2xl font-mono text-white drop-shadow-lg">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-base text-neon-teal font-mono">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[60vh] z-10">
        {/* Minimal circle with AS */}
        <div className="mb-4 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-neon-purple flex items-center justify-center bg-transparent">
            <span className="text-2xl font-mono font-bold text-neon-purple select-none">AS</span>
          </div>
        </div>
        <div className="flex flex-col items-center mb-1">
          <span className="text-2xl font-bold text-white drop-shadow-lg tracking-tight">
            {NAME}
          </span>
          <span className="mt-1 px-2 py-1 rounded-full bg-gradient-to-r from-neon-purple/30 to-neon-teal/20 text-neon-teal font-mono text-sm font-semibold shadow-sm tracking-wide">
            {TAGLINE}
          </span>
        </div>
        <div className="flex flex-col items-center">
          {!accessGranted && <>
            <label htmlFor="enter-input" className="text-neon-teal font-mono text-lg mb-2">Type <span className="text-neon-purple font-bold">ENTER</span> to unlock</label>
            <motion.input
              id="enter-input"
              ref={inputRef}
              type="password"
              className={`text-center text-2xl font-mono px-6 py-2 rounded-lg bg-neon-black/80 border-2 text-white tracking-widest outline-none transition-all duration-200`}
              value={input}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyDown}
              maxLength={TARGET.length}
              autoComplete="off"
              spellCheck={false}
              autoCorrect="off"
              style={{
                letterSpacing: '0.5em',
                width: '10em',
                background: 'rgba(15,17,23,0.7)',
                borderColor: focused
                  ? '#00ffe7'
                  : input.length === 0
                  ? '#a259f7'
                  : input.length < TARGET.length
                  ? '#ff2ecd'
                  : '#00ffe7',
                boxShadow:
                  input.length > 0 && !accessGranted
                    ? '0 0 12px 2px #a259f7, 0 0 8px 2px #00ffe7'
                    : 'none',
              }}
              disabled={accessGranted}
              animate={{
                scale: focused ? 1.04 : 1,
                borderColor:
                  input.length === TARGET.length ? '#00ffe7' : focused ? '#00ffe7' : '#a259f7',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            />
            <div className="flex gap-1 mt-2">
              {TARGET.split('').map((char, i) => (
                <span key={i} className={`text-2xl font-mono ${input[i] === char ? 'text-neon-teal' : 'text-neon-purple/60'} transition-all`}>{char}</span>
              ))}
            </div>
            {input === TARGET && (
              <motion.button
                className="mt-6 px-8 py-3 bg-neon-purple/80 hover:bg-neon-teal/80 text-white font-mono rounded-full text-xl shadow-lg transition-all duration-300"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={handleAccessGranted}
              >
                OK
              </motion.button>
            )}
            {/* ACCESS DENIED message if input is full and wrong */}
            {input.length === TARGET.length && input !== TARGET && (
              <motion.div
                className="flex flex-col items-center mt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 1, 0.7, 1],
                  scale: [0.8, 1.15, 0.95, 1.1, 1],
                  color: ['#ff2e63', '#ff2e63', '#fff', '#ff2e63'],
                  textShadow: [
                    '0 0 8px #ff2e63',
                    '0 0 16px #ff2e63',
                    '0 0 24px #fff',
                    '0 0 8px #ff2e63',
                  ],
                }}
                transition={{ duration: 1, times: [0, 0.3, 0.6, 1] }}
              >
                <span className="flex items-center gap-2 text-2xl md:text-3xl font-mono animate-pulse">
                  <span className="text-red-500">&#9888;</span>
                  ACCESS DENIED
                </span>
              </motion.div>
            )}
          </>}
          {accessGranted && (
            <motion.div
              className="flex flex-col items-center mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0.7, 1],
                scale: [0.8, 1.15, 0.95, 1.1, 1],
                color: ['#a259f7', '#00ffe7', '#fff', '#a259f7'],
                textShadow: [
                  '0 0 8px #a259f7',
                  '0 0 16px #00ffe7',
                  '0 0 24px #fff',
                  '0 0 8px #a259f7',
                ],
              }}
              transition={{ duration: 1, times: [0, 0.3, 0.6, 1] }}
            >
              <span className="flex items-center gap-2 text-2xl md:text-3xl font-mono animate-pulse">
                <FaRobot className="text-neon-purple animate-bounce" size={32} />
                ACCESS GRANTED
              </span>
            </motion.div>
          )}
        </div>
        {!accessGranted && <div className="mt-4 text-sm text-gray-400 font-mono">Backspace to correct. Press OK or Enter to continue.</div>}
      </div>
    </div>
  );
};

export default LockScreen; 