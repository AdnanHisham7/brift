/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E1116',
          2: '#2A3040',
        },
        muted: '#5A6373',
        line: '#E4E7EF',
        bg: '#FAFAFB',
        white: '#FFFFFF',
        blue: {
          DEFAULT: '#3A46E1',
          soft: '#E9EBFD',
          hover: '#2D38C8',
        },
        lavender: '#ECE8FB',
        'pale-blue': '#E4EEFB',
        yellow: {
          DEFAULT: '#FFE27A',
          subtle: '#FFF8E1',
        },
        navy: {
          DEFAULT: '#0B1020',
          line: '#2A3357',
          surface: '#12182E',
        },
        'on-dark': {
          DEFAULT: '#F4F5F9',
          muted: '#A9B0C3',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(14, 17, 22, 0.05), 0 10px 25px -5px rgba(14, 17, 22, 0.04)',
        'elevated': '0 4px 6px -1px rgba(14, 17, 22, 0.06), 0 20px 30px -10px rgba(14, 17, 22, 0.08)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
