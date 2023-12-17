/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      gray: {
        100: '#1A1A1A',
        200: '#333333',
        250: '#3D3D3D',
        300: '#4D4D4D',
        400: '#666666',
        500: '#808080',
        600: '#999999',
        700: '#B3B3B3',
        800: '#CCCCCC',
        900: '#E6E6E6',
      },
      blue: {
        100: '#030E1A',
        200: '#061C33',
        300: '#092A4D',
        400: '#0C3866',
        500: '#0F4680',
        600: '#125399',
        700: '#1561B3',
        800: '#186FCC',
        900: '#1C7DE6',
        1000: '#1F8AFF',
      },
      red: {
        100: '#1A0000',
        200: '#330000',
        300: '#4D0000',
        400: '#660000',
        500: '#800000',
        600: '#990000',
        700: '#B3000',
        800: '#CC0000',
        900: '#E60000',
        1000: '#FF0000',
      },
    },
    extend: {
      height: {
        lvh: '100lvh',
        svh: '100svh',
        dvh: '100dvh',
      },
    },
  },
  plugins: [],
};
