import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
  'AI, SAP, and Full Stack projects',
  'DeepFace, NLP, RPA, Cloud',
  'Internships at TechCorp, SAP Solutions',
];


const ResumeModal = ({ onClose, onMinimize, onMaximize, maximized }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    style={{ alignItems: 'flex-start', paddingTop: '5vh' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className={`bg-neon-black rounded-2xl shadow-2xl border-2 border-neon-purple relative flex flex-col ${maximized ? 'w-[98vw] h-[92vh] max-w-none max-h-none p-2' : 'max-w-md w-full p-8'}`}
      style={maximized ? { top: '1vh', left: '1vw', position: 'fixed' } : {}}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Window Top Bar */}
      <div className="flex items-center justify-between h-10 px-2 rounded-t-2xl bg-gradient-to-r from-neon-black via-neon-purple/30 to-neon-black border-b-2 border-neon-purple select-none">
        <span className="font-mono text-neon-teal text-lg tracking-wide">Download Center</span>
        <div className="flex gap-2">
          {/* Minimize */}
          <button
            aria-label="Minimize"
            className="w-6 h-6 rounded-full bg-yellow-400 hover:bg-yellow-300 flex items-center justify-center text-black font-bold text-base shadow border-2 border-yellow-500"
            onClick={onMinimize}
          >
            &ndash;
          </button>
          {/* Maximize */}
          <button
            aria-label="Maximize"
            className={`w-6 h-6 rounded-full bg-green-400 hover:bg-green-300 flex items-center justify-center text-black font-bold text-base shadow border-2 border-green-500 ${maximized ? 'ring-2 ring-neon-purple' : ''}`}
            onClick={() => onMaximize(!maximized)}
          >
            {maximized ? <span className="text-xs">&#9633;</span> : <span className="text-xs">&#9723;</span>}
          </button>
          {/* Close */}
          <button
            aria-label="Close"
            className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center text-black font-bold text-base shadow border-2 border-red-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
      {/* Modal Content */}
      <div className="flex-1 flex flex-col gap-4 mt-4 overflow-y-auto">
        <div className="flex flex-col items-center gap-4 mt-8">
          <a
            href="/resume s_anushka_sharma.pdf"
            download
            className="px-6 py-2 rounded bg-neon-teal text-black font-mono text-lg font-bold shadow hover:bg-neon-purple hover:text-white transition-all duration-200"
          >
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default ResumeModal; 