import React, { useState, useRef, useEffect } from 'react';
import ParticleParallaxBG from './ParticleParallaxBG';
// Neon animated frame
// import React, { useEffect, useRef, useState } from 'react';
// import React, { useEffect, useRef, useState } from 'react';
function NeonFrame() {
  const [drawn, setDrawn] = useState(false);
  // Rectangle perimeter for dasharray/dashoffset: 2*(width+height) = 2*(100+100) = 400
  const ANIMATION_DURATION = 3.5; // seconds, slower and smoother
  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), ANIMATION_DURATION * 1000);
    return () => clearTimeout(timer);
  }, []);
  const animate = !drawn;
  return (
    <svg
      className="pointer-events-none fixed left-8 right-8 top-8 bottom-24 z-20"
      style={{ filter: 'drop-shadow(0 0 12px #a259f7) drop-shadow(0 0 24px #00ffe7)' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline
        points="0,0 100,0 100,100 0,100 0,0"
        fill="none"
        stroke="url(#neonGradient)"
        strokeWidth="0.7"
        strokeDasharray="400"
        strokeDashoffset={animate ? 400 : 0}
        style={{
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          animation: animate ? `drawFrame ${ANIMATION_DURATION}s cubic-bezier(.7,0,.3,1) 0s 1` : undefined,
        }}
      />
      <defs>
        <linearGradient id="neonGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a259f7" />
          <stop offset="50%" stopColor="#00ffe7" />
          <stop offset="100%" stopColor="#a259f7" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes drawFrame {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
import SignoffMenu from './SignoffMenu';
import ShutdownScreen from './ShutdownScreen';
import RebootScreen from './RebootScreen';
import LockScreen from './LockScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLaptopCode, FaChartLine, FaCertificate, FaBriefcase, FaEnvelope, FaGamepad } from 'react-icons/fa';
import AboutModal from './apps/AboutModal';
import ProjectsModal from './apps/ProjectsModal';
import ExperienceModal from './apps/ExperienceModal';
import CertificationsModal from './apps/CertificationsModal';
import ResumeModal from './apps/ResumeModal';
import ContactModal from './apps/ContactModal';
import FunModal from './apps/FunModal';



const ICONS = [
  { name: 'About Me', icon: FaUser, modal: 'about' },
  { name: 'Projects', icon: FaLaptopCode, modal: 'projects' },
  { name: 'Experience', icon: FaChartLine, modal: 'experience' },
  { name: 'Certifications', icon: FaCertificate, modal: 'certifications' },
  { name: 'Resume', icon: FaBriefcase, modal: 'resume' },
  { name: 'Contact', icon: FaEnvelope, modal: 'contact' },
  { name: 'Fun App', icon: FaGamepad, modal: 'fun' },
];


const initialModals = {
  about: { open: false, minimized: false, maximized: false },
  projects: { open: false, minimized: false, maximized: false },
  experience: { open: false, minimized: false, maximized: false },
  certifications: { open: false, minimized: false, maximized: false },
  resume: { open: false, minimized: false, maximized: false },
  contact: { open: false, minimized: false, maximized: false },
  fun: { open: false, minimized: false, maximized: false },
};

const Desktop = () => {
  const [modals, setModals] = useState(initialModals);
  const [showShutdown, setShowShutdown] = useState(false);
  const [showReboot, setShowReboot] = useState(false);
  const [locked, setLocked] = useState(false);

  const openModal = (modal) => {
    setModals((prev) => ({
      ...prev,
      [modal]: { open: true, minimized: false, maximized: false },
    }));
  };
  const closeModal = (modal) => {
    setModals((prev) => ({
      ...prev,
      [modal]: { ...prev[modal], open: false, minimized: false, maximized: false },
    }));
  };
  const minimizeModal = (modal) => {
    setModals((prev) => ({
      ...prev,
      [modal]: { ...prev[modal], minimized: true, open: true },
    }));
  };
  const restoreModal = (modal) => {
    setModals((prev) => ({
      ...prev,
      [modal]: { ...prev[modal], minimized: false, open: true },
    }));
  };
  const maximizeModal = (modal, value) => {
    setModals((prev) => ({
      ...prev,
      [modal]: { ...prev[modal], maximized: value },
    }));
  };

  if (showShutdown) {
    return <ShutdownScreen onPowerOn={() => { setShowShutdown(false); setShowReboot(true); setTimeout(() => setShowReboot(false), 1800); }} />;
  }
  if (showReboot) {
    return <RebootScreen onDone={() => setShowReboot(false)} />;
  }
  if (locked) {
    return <LockScreen onEnter={() => setLocked(false)} />;
  }

  return (
    <div className="relative min-h-screen w-full bg-neon-black flex flex-col items-center justify-center overflow-hidden">
      <NeonFrame />
      {/* Particle + Parallax Background */}
      <ParticleParallaxBG />
      {/* Desktop icons */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 flex gap-10 flex-wrap z-10">
        {ICONS.map(({ name, icon: Icon, modal }) => {
          const isActive = modals[modal].open && !modals[modal].minimized;
          return (
            <motion.button
              key={name}
              className="flex flex-col items-center p-5 m-2 bg-neon-black/80 rounded-2xl shadow-lg hover:bg-neon-purple/30 transition-all duration-200"
              whileHover={{ scale: 1.18, rotate: -4, boxShadow: '0 0 24px #a259f7' }}
              whileTap={{ scale: 0.97, rotate: 2 }}
              onClick={() => openModal(modal)}
              tabIndex={0}
              aria-label={name}
            >
              <motion.div animate={{ filter: isActive ? 'drop-shadow(0 0 24px #00ffe7)' : 'none' }}>
                <Icon size={48} className="mb-2 text-neon-teal drop-shadow-lg" />
              </motion.div>
              <span className="text-white font-mono text-base mt-1 select-none drop-shadow">{name}</span>
            </motion.button>
          );
        })}
      </div>
      {/* Glassmorphic dock - only show minimized modals */}
      {Object.entries(modals).some(([_, state]) => state.minimized) && (
        <motion.div
          className="fixed bottom-0 left-0 w-full flex items-center gap-4 px-6 py-2 z-30 shadow-2xl border-t-2 border-neon-purple bg-gradient-to-r from-neon-black via-neon-teal/30 to-neon-purple/40"
          style={{ minHeight: '54px', backdropFilter: 'blur(10px)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Start button or logo (optional) */}
          <div className="flex items-center mr-4 select-none">
            <span className="font-mono text-neon-teal text-lg tracking-widest">ANUSHKA OS</span>
          </div>
          {/* Minimized app icons */}
    {ICONS.filter(({ modal }) => modals[modal].minimized).map(({ name, icon: Icon, modal }) => (
      <TaskbarIcon
        key={name + '-dock'}
        name={name}
        Icon={Icon}
        onClick={() => restoreModal(modal)}
      />
    ))}
  </motion.div>
)}
<AnimatePresence>
  {modals.about.open && !modals.about.minimized && (
          <AboutModal
            onClose={() => closeModal('about')}
            onMinimize={() => minimizeModal('about')}
            onMaximize={(v) => maximizeModal('about', v)}
            maximized={modals.about.maximized}
          />
        )}
        {modals.projects.open && !modals.projects.minimized && (
          <ProjectsModal
            onClose={() => closeModal('projects')}
            onMinimize={() => minimizeModal('projects')}
            onMaximize={(v) => maximizeModal('projects', v)}
            maximized={modals.projects.maximized}
          />
        )}
        {modals.experience.open && !modals.experience.minimized && (
          <ExperienceModal
            onClose={() => closeModal('experience')}
            onMinimize={() => minimizeModal('experience')}
            onMaximize={(v) => maximizeModal('experience', v)}
            maximized={modals.experience.maximized}
          />
        )}
        {modals.certifications.open && !modals.certifications.minimized && (
          <CertificationsModal
            onClose={() => closeModal('certifications')}
            onMinimize={() => minimizeModal('certifications')}
            onMaximize={(v) => maximizeModal('certifications', v)}
            maximized={modals.certifications.maximized}
          />
        )}
        {modals.resume.open && !modals.resume.minimized && (
          <ResumeModal
            onClose={() => closeModal('resume')}
            onMinimize={() => minimizeModal('resume')}
            onMaximize={(v) => maximizeModal('resume', v)}
            maximized={modals.resume.maximized}
          />
        )}
        {modals.contact.open && !modals.contact.minimized && (
          <ContactModal
            onClose={() => closeModal('contact')}
            onMinimize={() => minimizeModal('contact')}
            onMaximize={(v) => maximizeModal('contact', v)}
            maximized={modals.contact.maximized}
          />
        )}
        {modals.fun.open && !modals.fun.minimized && (
          <FunModal
            onClose={() => closeModal('fun')}
            onMinimize={() => minimizeModal('fun')}
            onMaximize={(v) => maximizeModal('fun', v)}
            maximized={modals.fun.maximized}
          />
        )}
      </AnimatePresence>
      {/* Signoff menu bottom right */}
      <SignoffMenu
        onLock={() => setLocked(true)}
        onShutdown={() => setShowShutdown(true)}
        onReboot={() => setShowReboot(true)}
      />
    </div>
  );
};

export default Desktop;

// TaskbarIcon component for hover popover
function TaskbarIcon({ name, Icon, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div className="relative flex items-center">
      <button
        className="flex items-center justify-center w-12 h-12 rounded-lg bg-neon-black/80 hover:bg-neon-purple/40 border-2 border-neon-teal shadow-lg transition-all duration-150"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={onClick}
        tabIndex={0}
        aria-label={name + ' dock'}
      >
        <Icon size={28} className="text-neon-teal" />
      </button>
      {hovered && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-neon-purple text-white font-mono text-xs rounded-lg shadow-xl border border-neon-teal animate-fade-in z-50 whitespace-nowrap">
          {name}
        </div>
      )}
    </div>
  );
}