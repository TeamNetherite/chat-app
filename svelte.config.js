import abun from '@bun-community/sveltekit-adapter-bun'
import astatic from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

const isTauri = !!process.env.NETHERITE_TAURI;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: isTauri ? astatic({
      pages: 'build-tauri',
      assets: 'build-tauri',
      //strict: false,
      fallback: 'index.html',
    }) : abun({
      dynamic_origin: true,
      out: 'build-web',
    }),
    env: {
      publicPrefix: 'NETHERITE_'
    }
  },
}

export default config
