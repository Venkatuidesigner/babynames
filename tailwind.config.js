/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
    './src/index.html'
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          background: '#F5F9FF',
          text: '#10233F',
          muted: '#5B6472',
          clay: '#0B74D1',
          sage: '#12B8A6',
          card: '#FFFFFF',
          border: '#DCEBFA',
          highlight: '#FF9F1C'
        }
      }
    }
  },
  plugins: []
};
