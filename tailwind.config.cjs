/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'selected-text': '#7965b2',
                highlight: "rgb(192 132 252)",
				beige: "#F2EDE3",
				"grey-card": "#494949"
			},
			screens: {
				'3xl': '1600px'
			}
		},
	},
	plugins: [],
}
