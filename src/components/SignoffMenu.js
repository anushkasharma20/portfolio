import React, { useState } from 'react';
import { FiPower, FiLock, FiRefreshCw, FiLogOut } from 'react-icons/fi';

const MENU = [
  { key: 'lock', label: 'Lock', icon: <FiLock /> },
  { key: 'reboot', label: 'Reboot', icon: <FiRefreshCw /> },
  { key: 'shutdown', label: 'Shut Down', icon: <FiPower /> },
];

export default function SignoffMenu({ onLock, onShutdown, onReboot }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-8 z-50 flex flex-col items-end select-none">
      <button
        className="w-12 h-12 rounded-full bg-neon-black border-2 border-neon-purple flex items-center justify-center text-neon-teal text-2xl shadow-lg hover:bg-neon-purple/30 transition-all"
        onClick={() => setOpen((v) => !v)}
        aria-label="Sign off menu"
        tabIndex={0}
      >
        <FiLogOut />
      </button>
      {open && (
        <div className="mt-2 bg-neon-black/90 border border-neon-purple rounded-xl shadow-xl flex flex-col py-2 px-3 animate-fade-in min-w-[120px]">
          {MENU.map((item) => (
            <button
              key={item.key}
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-neon-purple/30 text-neon-teal font-mono text-base transition-all"
              onClick={() => {
                setOpen(false);
                if (item.key === 'lock') onLock();
                if (item.key === 'shutdown') onShutdown();
                if (item.key === 'reboot') onReboot();
              }}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
