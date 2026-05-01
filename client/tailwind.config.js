/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bs: {
          accent: '#7C5CFC',
          'accent-bright': '#9B7DFF',
          'accent-dim': '#5B3FD4',
          'accent-glow': 'rgba(124,92,252,0.35)',

          /* Light */
          bg: '#F5F4FF',
          card: '#FFFFFF',
          subtle: '#EDEAFF',
          input: '#F0EEFF',
          border: 'rgba(124,92,252,0.18)',
          'border-strong': 'rgba(124,92,252,0.38)',

          primary: '#0D0B1A',
          secondary: '#5E5B7A',
          muted: '#9E9BB8',

          error: '#EF4444',
          success: '#22C55E',
        },
      },
      borderRadius: {
        'bs-sm': '6px',
        'bs': '12px',
        'bs-lg': '20px',
        'bs-xl': '28px',
      },
      boxShadow: {
        'bs-sm': '0 1px 3px rgba(13,11,26,0.06), 0 1px 2px rgba(13,11,26,0.04)',
        'bs': '0 4px 16px rgba(124,92,252,0.12), 0 1px 4px rgba(13,11,26,0.06)',
        'bs-lg': '0 16px 48px rgba(124,92,252,0.18), 0 4px 12px rgba(13,11,26,0.08)',
        'bs-glow': '0 0 32px rgba(124,92,252,0.28)',
      },
      backgroundImage: {
        'bs-gradient': 'linear-gradient(135deg, #5B3FD4 0%, #7C5CFC 50%, #9B7DFF 100%)',
        'bs-mesh': 'radial-gradient(at 30% 20%, rgba(124,92,252,0.25) 0px, transparent 55%), radial-gradient(at 80% 80%, rgba(91,63,212,0.20) 0px, transparent 55%)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
