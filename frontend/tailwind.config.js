/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				black: '#000',
				white: '#fff',
				green: '#74AA9C',
				blue: '#147EFB',
				dark: '#282828',
				xdark: '#212121',
				light: '#DDDDDD',
				xlight: '#fff',
			},
			animation: {
				'slide-in': 'slide-in 150ms cubic-bezier(0.4, 0, 0.2, 1);',
			},
			keyframes: {
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
			},
		},
	},
	plugins: [],
	darkMode: 'class',
};
