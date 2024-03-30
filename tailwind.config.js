/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	mode: 'jit',
	plugins: [
		require('@martijn.cuppens/tailwindcss-fluid')({
			minimum: 1.125, // Minimum size that needs fluid rescaling (in rem).
			breakpoint: 1200, // Max screen width where the fluid rescaling is applied to (in px).
			factor: 10, // Strength of resizing.
			twoDimensional: false, // Set to true if you want to resize to the smallest size of your device.
			unitPrecision: 5, // Rounding accuracy for calculated fluid resizing.
			remValue: 16, // Value of 1rem, needed for calculations.
		}),
		require('@tailwindcss/typography'),
	],
	darkMode: ['selector', '[class="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				inter: 'Inter Variable, sans-serif',
				nunito: 'Nunito Sans Variable, sans-serif',
				jetbrains: 'JetBrains Mono Variable, monospace',
			},
			h1: {
				fontFamily: 'inter, sans-serif',
			},
			colors: {
				dark: '#020202',
				'gray-light': '#e0e0e1',
				gray: '#8a8a93',
				'gray-dark': '#6a6a6a',
				'gray-light': '#e1e3e5',
				orange: '#ff5e1a',
				'orange-light': '#ff6e31',
				'box-light': '#1a1a1c',
				box: '#fff',
				// box: '#e5e5e5', // good i like it
				// box: '#fbf8f4',
				// box: '#d2f0fe', // not
				// box: '#fce4e1', // maybe
				'box-dark': '#131315',
				main: '#fafafa',
				violet: '#bc63ff', // violet
				'violet-light': '#ddb0ff', // violet
				'violet-dark': '#b14aff', // violet-dark
				sky: '#d2f0fe',
				blue: '#0B5DD7', // light blue
				'blue-light': '#ebf8ff',
				'blue-dark': '#073e8e',
				red: '#fce4e1 ',
				'red-light': '#fef9f8',
			},
			backgroundColor: {
				input: 'rgba(255, 255, 255, 0.11)',
			},
			backgroundImage: {
				circle:
					'radial-gradient(50% 50% at 50% 50%, #FFF 0%, #FDF4EC 58.33%, rgba(253, 244, 236, 0.00) 97.4%)',
				cell: 'radial-gradient(circle at center center,transparent 0%,rgba(255,255,255,0) 99%),repeating-linear-gradient(0deg,rgba(205,205,205,.2) 0px,rgba(205,205,205,.2) 1px,transparent 1px,transparent 6px),repeating-linear-gradient(90deg,rgba(205,205,205,.2) 0px,rgba(205,205,205,.2) 1px,transparent 1px,transparent 6px),linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0))',
			},
			boxShadow: {
				btn: '0px 0px 20px 0px #CE8C65',
			},
		},
	},
};
