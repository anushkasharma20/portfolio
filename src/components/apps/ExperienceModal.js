import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Five Minutes Auro Hosting',
    location: 'Chennai',
    role: 'AI Research Intern',
    period: 'Feb 2025 – Present',
    details: [
      'Built scalable ETL data pipelines using Python, PySpark, and distributed systems, handling 2TB+ daily',
      'Integrated LoRA fine-tuning and RAG techniques, improving LLM inference by 35%, reducing hallucinations',
      'Architected backend functionality for knowledge base using RAG, tool calling, and LLM selection for voice agent with FastAPI',
      'Created backend services using Python, FastAPI, Node.js, integrating Whisper ASR, Silero VAD',
      'Optimized transformer-based NLP models, reducing inference time by 40% with GPU caching',
    ],
  },
  {
    company: 'Huplus Market Innovations Pvt Ltd',
    location: 'Remote',
    role: 'Web Development Intern',
    period: 'June – July 2024',
    details: [
      'Engineered responsive web app using Wix Studio, JavaScript, React, increasing mobile conversions by 45%',
      'Collaborated with cross-functional teams; explained technical concepts to non-technical stakeholders',
    ],
  },
];



import { useState } from 'react';

const ExperienceModal = ({ onClose, onMinimize, onMaximize, maximized }) => {
  const [expanded, setExpanded] = useState(Array(experiences.length).fill(false));
  const toggleExpand = (idx) => {
    setExpanded((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      style={{ alignItems: 'flex-start', paddingTop: '5vh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`bg-neon-black rounded-2xl shadow-2xl border-2 border-neon-purple relative flex flex-col ${maximized ? 'w-[98vw] h-[92vh] max-w-none max-h-none p-2' : 'max-w-2xl w-full p-8'}`}
        style={maximized ? { top: '1vh', left: '1vw', position: 'fixed' } : {}}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Window Top Bar */}
        <div className="flex items-center justify-between h-10 px-2 rounded-t-2xl bg-gradient-to-r from-neon-black via-neon-purple/30 to-neon-black border-b-2 border-neon-purple select-none">
          <span className="font-mono text-neon-teal text-lg tracking-wide">Work Journal</span>
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
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 overflow-y-auto" style={{ maxHeight: maximized ? '80vh' : '60vh' }}>
          {experiences.map((exp, i) => (
            <div key={i} className="flex flex-col items-stretch">
              <button
                className={`flex items-center justify-between px-4 py-3 rounded-xl bg-neon-black/80 border-2 border-neon-teal shadow-lg hover:bg-neon-purple/20 transition-all duration-200 focus:outline-none ${expanded[i] ? 'ring-2 ring-neon-purple' : ''}`}
                onClick={() => toggleExpand(i)}
                aria-expanded={expanded[i]}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-lg font-bold text-neon-purple">{exp.role}</span>
                  <span className="text-neon-teal font-mono text-base">{exp.company}</span>
                  <span className="text-xs text-neon-teal font-mono">{exp.location}</span>
                  <span className="text-xs text-white font-mono">{exp.period}</span>
                </div>
                <span className="ml-4 text-neon-teal text-2xl">{expanded[i] ? '–' : '+'}</span>
              </button>
              {expanded[i] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden mt-2 px-4"
                >
                  <ul className="list-disc pl-5 text-white font-mono text-sm space-y-2">
                    {exp.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceModal; 