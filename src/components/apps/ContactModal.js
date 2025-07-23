import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';

const ContactModal = ({ onClose, onMinimize, onMaximize, maximized }) => {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    setSending(true);
    setError('');
    setSent(false);
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name,
          user_email: userEmail,
          subject,
          message: body,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setSubject('');
      setBody('');
    } catch (err) {
      setError('Failed to send. Please try again.');
    }
    setSending(false);
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
        className={`bg-neon-black rounded-2xl shadow-2xl border-2 border-neon-purple relative flex flex-col ${maximized ? 'w-[98vw] h-[92vh] max-w-none max-h-none p-2' : 'max-w-md w-full p-8'}`}
        style={maximized ? { top: '1vh', left: '1vw', position: 'fixed' } : {}}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Window Top Bar */}
        <div className="flex items-center justify-between h-10 px-2 rounded-t-2xl bg-gradient-to-r from-neon-black via-neon-purple/30 to-neon-black border-b-2 border-neon-purple select-none">
          <span className="font-mono text-neon-teal text-lg tracking-wide">Send Mail App</span>
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
        <div className="flex-1 flex flex-col gap-2 mt-4 overflow-y-auto">
          <div className="text-white font-mono mb-2">To: <span className="text-neon-teal">anushkasharma1471@gmail.com</span></div>
          <input
            className="w-full mb-2 px-3 py-2 rounded bg-neon-black border border-neon-teal text-white font-mono focus:outline-none focus:ring-2 focus:ring-neon-purple"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={sending}
          />
          <input
            className="w-full mb-2 px-3 py-2 rounded bg-neon-black border border-neon-teal text-white font-mono focus:outline-none focus:ring-2 focus:ring-neon-purple"
            placeholder="Your Email"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            disabled={sending}
            type="email"
          />
          <input
            className="w-full mb-2 px-3 py-2 rounded bg-neon-black border border-neon-teal text-white font-mono focus:outline-none focus:ring-2 focus:ring-neon-purple"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            disabled={sending}
          />
          <textarea
            className="w-full mb-4 px-3 py-2 rounded bg-neon-black border border-neon-teal text-white font-mono focus:outline-none focus:ring-2 focus:ring-neon-purple"
            placeholder="Message"
            rows={4}
            value={body}
            onChange={e => setBody(e.target.value)}
            disabled={sending}
          />
          <button
            className="w-full bg-neon-teal text-neon-black font-bold py-2 rounded-lg hover:bg-neon-purple hover:text-white transition-all disabled:opacity-60"
            onClick={handleSend}
            disabled={sending || !name || !userEmail || !subject || !body}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
          {sent && <div className="text-green-400 font-mono mt-2">Message sent successfully!</div>}
          {error && <div className="text-red-400 font-mono mt-2">{error}</div>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ContactModal;