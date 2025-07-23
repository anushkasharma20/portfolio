import React, { useEffect, useState } from 'react';

export default function ShutdownScreen({ onPowerOn }) {
  const [showPower, setShowPower] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowPower(true), 1200);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-all duration-700 animate-fade-out">
      {!showPower && (
        <div className="text-5xl font-mono text-neon-teal animate-fade-in">Shutting down...</div>
      )}
      {showPower && (
        <button
          className="mt-8 w-32 h-32 rounded-full bg-gradient-to-br from-neon-teal via-neon-purple to-neon-black border-4 border-neon-teal flex flex-col items-center justify-center text-4xl text-white shadow-2xl hover:scale-105 hover:from-neon-purple/80 hover:to-neon-teal/80 transition-all animate-fade-in relative group"
          onClick={onPowerOn}
        >
          <span className="absolute animate-ping w-full h-full rounded-full bg-neon-teal/30 group-hover:bg-neon-purple/30 z-0" style={{ filter: 'blur(2px)' }} />
          <svg className="w-12 h-12 z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" stroke="#00ffe7" strokeOpacity="0.7" />
            <path d="M12 7v5" stroke="#a259f7" />
            <circle cx="12" cy="16.5" r="1.5" fill="#00ffe7" />
          </svg>
          <span className="font-mono text-lg z-10 mt-2 tracking-widest bg-black/40 px-3 py-1 rounded-full border border-neon-teal shadow-lg animate-glow">POWER ON</span>
        </button>
      )}
      <style>{`
        .animate-glow {
          box-shadow: 0 0 16px #00ffe7, 0 0 32px #a259f7, 0 0 8px #fff;
          animation: glowPulse 1.2s infinite alternate;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 8px #00ffe7, 0 0 16px #a259f7; }
          100% { box-shadow: 0 0 32px #00ffe7, 0 0 48px #a259f7, 0 0 16px #fff; }
        }
      `}</style>
    </div>
  );
}
