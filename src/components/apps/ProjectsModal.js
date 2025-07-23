import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'AIRA - Mental Health Buddy',
    desc: 'AI-powered chatbot for mental health support using DeepFace.',
    github: 'https://github.com/anushka/mental-health-buddy',
    demo: '#',
    tech: ['React', 'DeepFace', 'Flask', 'Tailwind', 'WebRTC', 'LLM', 'OpenCV', 'NLP'],
    img: '',
  },
  {
    name: ' AI Job Recruiter Voice Agent ',
    desc: ' Engineered intelligent recruiting system with JD parsing and voice-based interviews.',
    github: 'https://github.com/anushka/sap-automation',
    demo: '#',
    tech: ['Python', 'LLM', 'Speech-to-Text', 'NLP', 'FastAPI', 'Job Description Parser'],
    img: '',
  },
  {
    name: ' Travel Experience Sentiment Analysis ',
    desc: 'Constructed full-stack web app using Streamlit, REST APIs, and DistilBERT to analyze 10K+ Reddit travel reviews with 92% accuracy',
    github: 'https://github.com/anushka/ai-resume-parser',
    demo: '#',
    tech: ['Python', 'NLP', 'DistilBERT', 'PRAW', 'Streamlit', 'Plotly', 'REST APIs'],
    img: '',
  },

,
  {
    name: ' SAP FICO DASHBOARD  ',
    desc: 'A website that validates journal entries and visualizes key metrics like GL trends, Profit Centers, and AP/AR using ACDOCA-style data.',
    github: 'https://github.com/anushka/ai-resume-parser',
    demo: '#',
    tech: ['Python', 'SAP','SAP FICO'],
    img: '',
  }
];


const ProjectsModal = ({ onClose, onMinimize, onMaximize, maximized }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    style={{ alignItems: 'flex-start', paddingTop: '5vh' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className={`bg-neon-black rounded-2xl shadow-2xl border-2 border-neon-purple relative flex flex-col ${maximized ? 'w-[98vw] h-[92vh] max-w-none max-h-none p-2' : 'max-w-3xl w-full p-8'}`}
      style={maximized ? { top: '1vh', left: '1vw', position: 'fixed' } : {}}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Window Top Bar */}
      <div className="flex items-center justify-between h-10 px-2 rounded-t-2xl bg-gradient-to-r from-neon-black via-neon-purple/30 to-neon-black border-b-2 border-neon-purple select-none">
        <span className="font-mono text-neon-teal text-lg tracking-wide">Projects Explorer</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 overflow-y-auto" style={{maxHeight: '60vh'}}>
        {projects.map((p) => (
          <motion.div key={p.name} className="bg-neon-black/80 rounded-xl p-4 shadow-lg border border-neon-purple flex flex-col"
            whileHover={{ scale: 1.04 }}>
            <div className="text-xl font-bold text-neon-purple mb-1">{p.name}</div>
            <div className="text-white font-mono mb-2">{p.desc}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {p.tech.map(t => <span key={t} className="bg-neon-teal/20 text-neon-teal px-2 py-1 rounded text-xs font-mono">{t}</span>)}
            </div>
            <div className="flex gap-4 mt-auto">
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-neon-teal hover:text-neon-purple font-mono underline">GitHub</a>
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-neon-teal hover:text-neon-purple font-mono underline">Demo</a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default ProjectsModal; 