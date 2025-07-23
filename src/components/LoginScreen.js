import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaEnvelope, FaGamepad } from 'react-icons/fa';

const projects = [
  { name: 'Mental Health Buddy', correct: true },
  { name: 'SAP Automation', correct: false },
  { name: 'AI Resume Parser', correct: false },
];

const LoginScreen = ({ onLogin }) => {
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState(false);

  const handlePuzzle = (project) => {
    if (project.correct) {
      setSolved(true);
      setTimeout(onLogin, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-neon-black via-neon-purple/40 to-neon-teal/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-neon-black/80 rounded-2xl p-8 shadow-2xl flex flex-col items-center">
        <div className="text-xl md:text-2xl text-white font-mono mb-4">
          Which of these projects did Anushka use <span className="text-neon-teal">DeepFace</span> in?
        </div>
        <div className="flex gap-6 mb-4">
          {projects.map((p) => (
            <button
              key={p.name}
              className={`px-4 py-2 rounded-lg font-mono text-lg shadow-md transition-all duration-200 ${error && !p.correct ? 'bg-red-500/70' : 'bg-neon-purple/70 hover:bg-neon-teal/70'} ${solved && p.correct ? 'ring-4 ring-neon-teal' : ''}`}
              onClick={() => handlePuzzle(p)}
              disabled={solved}
            >
              {p.name}
            </button>
          ))}
        </div>
        {error && <div className="text-red-400 font-mono">Try again!</div>}
        {solved && <div className="text-neon-teal font-mono animate-pulse">Access Granted!</div>}
      </div>
      <div className="flex gap-8 mt-12">
        <a href="/resume_fil_anushka.pdf" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-neon-teal hover:text-neon-purple">
          <FaBriefcase size={32} />
          <span className="text-xs mt-1 font-mono">Resume</span>
        </a>
        <a href="mailto:anushkasharma1471@gmail.com" className="flex flex-col items-center text-neon-teal hover:text-neon-purple">
          <FaEnvelope size={32} />
          <span className="text-xs mt-1 font-mono">Contact</span>
        </a>
        <button className="flex flex-col items-center text-neon-teal hover:text-neon-purple" onClick={() => alert('Welcome to Fun Mode! (Easter egg coming soon)')}>
          <FaGamepad size={32} />
          <span className="text-xs mt-1 font-mono">Fun Mode</span>
        </button>
      </div>
    </motion.div>
  );
};

export default LoginScreen; 