module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'neon-black': '#0f1117',
        'neon-purple': '#a259f7',
        'neon-teal': '#00ffe7',
        'neon-magenta': '#ff2ecd',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'IBM Plex Sans', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}; 