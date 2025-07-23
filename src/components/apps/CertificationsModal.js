
import React, { useState } from 'react';
import { motion } from 'framer-motion';


const certs = [
  {
    title: 'SAP Business Analyst Specialization',
    org: 'SAP',
    details: [
      'Foundations of Business Analysis',
      'Requirements Gathering and Documentation',
      'Business Process Modeling and Analysis',
      'Strategic Analysis and Solution Design',
    ],
    logo: '',
  },
  {
    title: 'Generative AI',
    org: 'Google Cloud',
    details: ['Deep Learning Fundamentals, NVIDIA DLI'],
    logo: '',
  },
  {
    title: 'Architecting with Google Kubernetes Engine Specialization',
    org: 'Google Cloud',
    logo: '',
  },
  {
    title: 'ML on AWS',
    org: 'Amazon Web Services',
    logo: '',
  },
  {
    title: 'MLOps (ML Engineering)',
    org: 'DeepLearning.AI',
    logo: '',
  },
  {
    title: 'Structured Problem Solving',
    org: 'Fractal Analytics',
    logo: '',
  },
];



const CertificationsModal = ({ onClose, onMinimize, onMaximize, maximized }) => {
  return (
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
          <span className="font-mono text-neon-teal text-lg tracking-wide">Cert Wallet</span>
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
        <div className={`flex-1 flex flex-col gap-4 mt-4`} style={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {certs.map((c, i) => (
            <div key={i} className="flex items-start gap-4 bg-neon-purple/10 rounded-lg p-3 relative">
              <div className="w-10 h-10 bg-neon-teal/30 rounded-full flex items-center justify-center mt-1">
                {/* Placeholder for logo */}
                <span className="text-neon-teal font-bold text-lg">🏅</span>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-neon-purple">{c.title}</div>
                <div className="text-sm text-neon-teal font-mono mb-1">{c.org}</div>
                {c.details && Array.isArray(c.details) && (
                  <ul className="list-disc list-inside text-xs text-white/80 font-mono pl-2">
                    {c.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                )}
                {c.details && typeof c.details === 'string' && (
                  <div className="text-xs text-white/80 font-mono pl-2">{c.details}</div>
                )}
              </div>
              <div className="absolute -top-2 -right-2 bg-neon-teal text-neon-black text-xs font-bold px-2 py-1 rounded-full shadow">CERT</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificationsModal; 