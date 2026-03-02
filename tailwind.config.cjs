/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'selected-text': '#7965b2',
                highlight: "rgb(192 132 252)",
				beige: "#F2EDE3",
				"grey-card": "#494949",
				accent: "#E85D26"
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			screens: {
				'3xl': '1600px'
			},
			keyframes: {
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.7s ease-out both',
			},
		},
	},
	plugins: [],
}
