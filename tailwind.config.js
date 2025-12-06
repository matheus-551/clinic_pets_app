/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0C2E7B',
        primaryDark: '#092663',
        success: '#35CE8D',
        danger: '#ED474A',
        white: '#FFFAFF',
        black: '#1A1A1A',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'system-ui',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      fontSize: {
        title: '28px',
        base: '16px',
        small: '12px',
        large: '25px',
      },
    },
  },
  plugins: [],
};
