/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            'primary-100': '#0085ff',
            'primary-200': '#69b4ff',
            'primary-300': '#e0ffff',
            'accent-100': '#006fff',
            'accent-200': '#e1ffff',
            'text-100': '#ffffff',
            'text-200': '#9e9e9e',
            'bg-dark': '#1e1e1e',
            'bg-regular': '#2d2d2d',
            'bg-light': '#454545',
        },
    },
    plugins: [],
};
