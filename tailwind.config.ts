import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        main: {
          50: '#e6f0f9',
          100: '#cce1f3',
          200: '#99c3e7',
          300: '#66a5db',
          400: '#3387cf',
          500: '#0069c3',
          600: '#00549c',
          700: '#003f75',
          800: '#003168', // Your original primary color
          900: '#00234e',
          950: '#001429',
        },
        secondary: {
          50: '#fff7e6',
          100: '#ffefc2',
          200: '#ffdf8a',
          300: '#ffcf52',
          400: '#ffbf1a',
          500: '#e6a500',
          600: '#b38200',
          700: '#805e00',
          800: '#4d3900',
          900: '#1a1300',
        },
        accent: {
          50: '#f0f9f6',
          100: '#d9f0e6',
          200: '#b3e0cd',
          300: '#8cd0b3',
          400: '#66c09a',
          500: '#40b080',
          600: '#338d66',
          700: '#26694d',
          800: '#1a4633',
          900: '#0d231a',
        },
        background: '#f5f6fa',
        color: {
          main: '#003168', // Same as primary-500 for main text
          secondary: '#4b5563', // Same as neutral-600 for secondary text
          muted: '#6b7280', // Same as neutral-500 for less emphasized text
          inverse: '#ffffff', // White text for dark backgrounds
        },
      },
    },
  },
};
