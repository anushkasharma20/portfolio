import React, { useEffect, useState } from 'react';

export default function RebootScreen({ onDone }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setLoading(false), 1600);
    const t2 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-all duration-700">
      {loading ? (
        <div className="text-5xl font-mono text-neon-teal animate-fade-in">Loading Anushka OS...</div>
      ) : (
        <div className="text-4xl font-mono text-neon-purple animate-fade-in">Welcome Back!</div>
      )}
    </div>
  );
}
