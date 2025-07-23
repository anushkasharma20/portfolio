import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

// Generate a simple parallax star background
const StarField = () => (
  <svg className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }}>
    {[...Array(40)].map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 1440}
        cy={Math.random() * 900}
        r={Math.random() * 1.5 + 0.5}
        fill="#a259f7"
        opacity={Math.random() * 0.5 + 0.2}
      />
    ))}
  </svg>
);

const BootScreen = ({ onScrollToNext }) => {
  const [typedText, setTypedText] = useState('');
  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [showSwipePrompt, setShowSwipePrompt] = useState(false);
  const [swipeActive, setSwipeActive] = useState(false);
  const fullText = '> Booting Anushka OS...';
  const rocketControls = useAnimation();
  const trailControls = useAnimation();
  const containerControls = useAnimation();
  const swipePromptControls = useAnimation();
  const containerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    function type() {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
        setTimeout(type, 110); // slower, more natural typing speed
      } else {
        setShowRocket(true);
        setTimeout(() => setShowSwipePrompt(true), 800);
      }
    }
    type();
    // eslint-disable-next-line
  }, []);

  // Animate rocket and swipe
  const handleSwipe = () => {
    setSwipeActive(true);
    rocketControls.start('launch');
    trailControls.start('trail');
    swipePromptControls.start('swipe');
    setTimeout(() => {
      containerControls.start('swipeDown').then(() => {
        if (onScrollToNext) onScrollToNext();
      });
    }, 1200);
  };

  // Listen for scroll or swipe
  useEffect(() => {
    function handleScroll(e) {
      if (showSwipePrompt && !swipeActive && (e.deltaY > 0 || e.type === 'touchmove')) {
        handleSwipe();
      }
    }
    const node = containerRef.current;
    if (node) {
      node.addEventListener('wheel', handleScroll);
      node.addEventListener('touchmove', handleScroll);
    }
    return () => {
      if (node) {
        node.removeEventListener('wheel', handleScroll);
        node.removeEventListener('touchmove', handleScroll);
      }
    };
    // eslint-disable-next-line
  }, [showSwipePrompt, swipeActive]);

  const rocketVariants = {
    initial: { y: 0, opacity: 1, scale: 1, filter: 'drop-shadow(0 0 0 #a259f7)' },
    launch: {
      y: -220,
      opacity: 1,
      scale: 1.3,
      filter: 'drop-shadow(0 0 32px #a259f7)',
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const trailVariants = {
    initial: { opacity: 0, scaleY: 0.2 },
    trail: {
      opacity: [0.7, 0.2, 0],
      scaleY: [0.2, 1.2, 2.2],
      transition: { duration: 1.5, ease: 'easeIn' },
    },
  };

  const swipePromptVariants = {
    initial: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    swipe: { opacity: 0, y: 60, transition: { duration: 0.7 } },
  };

  const containerVariants = {
    initial: { y: 0, opacity: 1 },
    swipeDown: {
      y: 600,
      opacity: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-screen w-full bg-neon-black select-none overflow-hidden relative"
      variants={containerVariants}
      initial="initial"
      animate={containerControls}
      exit={{ opacity: 0 }}
      style={{ touchAction: 'none' }}
    >
      <StarField />
      <div className="flex flex-col items-center justify-center h-full z-10">
        <div className="text-neon-teal text-2xl md:text-3xl font-mono mb-8 whitespace-pre">
          <span className="text-neon-purple">{typedText.slice(0, 1)}</span>{typedText.slice(1)}
          <span className="animate-pulse text-neon-teal">|</span>
        </div>
        {showRocket && (
          <div className="relative mb-8" style={{ height: 120 }}>
            <motion.div
              variants={rocketVariants}
              initial="initial"
              animate={rocketControls}
              className="z-10"
              style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            >
              <FaRocket size={64} className="text-neon-teal drop-shadow-lg animate-pulse" />
            </motion.div>
            {/* Glowing trail */}
            <motion.div
              variants={trailVariants}
              initial="initial"
              animate={trailControls}
              className="z-0"
              style={{ position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)' }}
            >
              <svg width="16" height="120" viewBox="0 0 16 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="0" width="8" height="120" rx="4" fill="#a259f7" fillOpacity="0.5" />
                <rect x="6" y="0" width="4" height="120" rx="2" fill="#00ffe7" fillOpacity="0.3" />
              </svg>
            </motion.div>
          </div>
        )}
        {showSwipePrompt && (
          <motion.div
            variants={swipePromptVariants}
            initial="initial"
            animate={swipeActive ? 'swipe' : 'show'}
            className="text-neon-purple font-mono text-lg mt-8 flex flex-col items-center cursor-pointer z-20"
            onClick={() => !swipeActive && handleSwipe()}
          >
            <span className="animate-pulse">Swipe or scroll down</span>
            <span className="animate-bounce text-3xl">↓</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BootScreen; 