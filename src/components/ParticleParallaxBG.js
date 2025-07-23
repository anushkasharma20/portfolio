import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 40;
const LAYERS = 3;
const COLORS = [
  'rgba(162,89,247,0.18)', // purple
  'rgba(0,255,231,0.13)', // teal
  'rgba(255,255,255,0.10)', // white
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function ParticleParallaxBG() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const particles = useRef([]);

  // Init particles
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    particles.current = Array.from({ length: PARTICLE_COUNT * LAYERS }, (_, i) => {
      const layer = Math.floor(i / PARTICLE_COUNT);
      return {
        x: randomBetween(0, w),
        y: randomBetween(0, h),
        r: randomBetween(2 + layer, 5 + layer * 2),
        dx: randomBetween(-0.1, 0.1) * (1 + layer * 0.5),
        dy: randomBetween(-0.1, 0.1) * (1 + layer * 0.5),
        color: COLORS[layer],
        layer,
      };
    });
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let running = true;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles.current) {
        // Parallax offset
        const px = p.x + (mouse.current.x - 0.5) * (p.layer + 1) * 40;
        const py = p.y + (mouse.current.y - 0.5) * (p.layer + 1) * 40;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.75 - p.layer * 0.10; // increased opacity
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 32 + p.layer * 12; // much stronger glow
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    function animate() {
      for (const p of particles.current) {
        // Make movement more continuous and smooth
        p.x += p.dx * 1.7;
        p.y += p.dy * 1.7;
        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      draw();
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  // Mouse move for parallax
  useEffect(() => {
    function onMove(e) {
      let x = e.clientX / window.innerWidth;
      let y = e.clientY / window.innerHeight;
      mouse.current = { x, y };
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7, transition: 'opacity 0.3s' }}
      tabIndex={-1}
    />
  );
}

export default ParticleParallaxBG;
