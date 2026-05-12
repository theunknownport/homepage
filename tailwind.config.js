/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050508',
        surface: 'rgba(8, 10, 18, 0.92)',
        'surface-strong': 'rgba(10, 12, 22, 0.97)',
        text: '#f5f5f8',
        muted: '#9aa2b8',
        accent: '#4ade80',
        'accent-soft': 'rgba(74, 222, 128, 0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.02em',
        'wide': '0.08em',
        'wider': '0.24em',
      },
    },
  },
  plugins: [],
}