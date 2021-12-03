const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			qukbuk: ['Open Sans', 'sans-serif']
		},
		extend: {}
	},

	plugins: [require('@tailwindcss/line-clamp')]
};

module.exports = config;
