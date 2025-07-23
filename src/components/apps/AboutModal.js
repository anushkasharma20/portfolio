import React from 'react';
import { motion } from 'framer-motion';

const bio = `Hi, I'm Anushka Sharma. I'm passionate about building AI systems, scalable apps, and SAP solutions.`;

const philosophy = `I’m a final-year B.Tech student in Information Technology with a strong foundation in Data Science, Web Development, SAP ERP, and Generative AI. I specialize in building scalable data pipelines, real-time analytics dashboards, and intelligent AI applications, with hands-on experience across the full stack—from backend APIs to LLM integration and SAP FICO data validation.

My recent work includes designing ETL workflows for 2TB+ datasets, fine-tuning transformer models, automating invoice verification in SAP S/4HANA, and developing intelligent voice agents powered by JD parsing and GenAI. I thrive at the intersection of AI-powered automation and business processes, combining technologies like Python, PySpark, FastAPI, React.js, Power BI, and SAP Fiori.

Driven by impact and optimization, I bring an adaptive skillset that blends ML engineering, enterprise finance systems, and user-focused software development—making me a uniquely hybrid profile equipped for innovation in both tech startups and digital transformation teams.`;

const goals = `My goals:\n- Build AI products that make a real-world impact\n- Contribute to open-source and tech-for-good initiatives\n- Keep learning and innovating at the intersection of AI, business, and design`;


const AboutModal = ({ onClose, onMinimize, onMaximize, maximized }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    style={{ alignItems: 'flex-start', paddingTop: '5vh' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className={`bg-neon-black rounded-2xl shadow-2xl border-2 border-neon-purple relative flex flex-col ${maximized ? 'w-[98vw] h-[92vh] max-w-none max-h-none p-2' : 'max-w-lg w-full p-8'}`}
      style={maximized ? { top: '1vh', left: '1vw', position: 'fixed' } : {}}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Window Top Bar */}
      <div className="flex items-center justify-between h-10 px-2 rounded-t-2xl bg-gradient-to-r from-neon-black via-neon-purple/30 to-neon-black border-b-2 border-neon-purple select-none">
        <span className="font-mono text-neon-teal text-lg tracking-wide">Who Am I?</span>
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
      <div className="flex-1 flex flex-col gap-4 mt-4 overflow-y-auto" style={{ maxHeight: maximized ? '80vh' : '60vh' }}>
        <div className="text-white font-mono text-lg mb-4 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-neon-teal pr-2" style={{ animation: 'typing 2.5s steps(40, end), blink-caret .75s step-end infinite' }}>{bio}</div>
        <div className="text-neon-purple font-mono mb-2 whitespace-pre-line">{philosophy}</div>
        <div className="text-neon-teal font-mono whitespace-pre-line">{goals}</div>
      </div>
    </motion.div>
    <style>{`
      @keyframes typing { from { width: 0 } to { width: 100% } }
      @keyframes blink-caret { 0%,100% { border-color: transparent } 50% { border-color: #00ffe7; } }
      .animate-typing { animation: typing 2.5s steps(40, end), blink-caret .75s step-end infinite; }
    `}</style>
  </motion.div>
);

export default AboutModal; 