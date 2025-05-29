import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			//base: process.env.NODE_ENV === 'production' ? '/stablehub.aid-lab.hfg-gmuend.de' : ''
		}
	}
};

export default config;
