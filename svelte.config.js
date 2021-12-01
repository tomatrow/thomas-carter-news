import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		target: '#svelte',
		adapter: adapter(),
        ssr: false,
        prerender: {
            enabled: false
        },
        vite: {
            optimizeDeps: {
                exclude: ["wpapi"]
            }
        }
	}
};

export default config;