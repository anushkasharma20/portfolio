import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootScreen from './components/BootScreen';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';

const SCREENS = {
  BOOT: 'boot',
  LOCK: 'lock',
  DESKTOP: 'desktop',
};

function App() {
  const [screen, setScreen] = useState(SCREENS.BOOT);

  useEffect(() => {
    if (screen === SCREENS.BOOT) {
      // BootScreen now handles its own timing/scroll
    }
  }, [screen]);

  return (
    <div className="min-h-screen w-full bg-neon-black">
      <AnimatePresence mode="wait">
        {screen === SCREENS.BOOT && (
          <BootScreen key="boot" onScrollToNext={() => setScreen(SCREENS.LOCK)} />
        )}
        {screen === SCREENS.LOCK && (
          <LockScreen key="lock" onEnter={() => setScreen(SCREENS.DESKTOP)} />
        )}
        {screen === SCREENS.DESKTOP && (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App; 