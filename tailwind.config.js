/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./schedule-demo.html",
    "./404.html",
    "./main.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0f172a',
          purple: '#d946ef',
          blue: '#3b82f6',
          accent: '#8b5cf6',
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 10s infinite',
        'spin-slow': 'spin 15s linear infinite',
        'spin-reverse-slow': 'spin-reverse 20s linear infinite',
        scan: 'scan 3s linear infinite',
        radar: 'radar 2s linear infinite',
        'scan-horizontal': 'scanHorizontal 4s linear infinite',
        'marker-reveal': 'markerReveal 4s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        progress: 'progress 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        scan: {
          '0%': { top: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        radar: {
          '0%': { width: '0%', height: '0%', opacity: '0.8' },
          '100%': { width: '100%', height: '100%', opacity: '0' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        scanHorizontal: {
            '0%': { left: '0%', opacity: '0' },
            '10%': { opacity: '1' },
            '90%': { opacity: '1' },
            '100%': { left: '100%', opacity: '0' },
        },
        markerReveal: {
            '0%, 25%': { fill: '#475569', transform: 'scale(1)' },
            '30%': { transform: 'scale(1.2)' },
            '35%, 100%': { fill: 'var(--marker-color)', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'radial-gradient-blue': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(15, 23, 42, 0) 70%)',
      },
    },
  },
  plugins: [],
}