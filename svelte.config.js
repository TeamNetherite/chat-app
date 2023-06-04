import abun from '@bun-community/sveltekit-adapter-bun'
import astatic from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import path from 'node:path'
const isTauri = !!process.env.NETHERITE_TAURI
/** @type {import('@sveltejs/kit').Config}*/
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: isTauri
      ? astatic({
          pages: 'build-tauri',
          assets: 'build-tauri',
          // strict: false,
          fallback: 'index.html',
        })
      : abun({
          dynamic_origin: true,
          out: 'build-web',
        }),
    alias: {
      $houdini: path.resolve('.', '$houdini'),
    },
    env: {
      publicPrefix: 'NETHERITE_',
    },
  },
  shadcn: {
    componentPath: './src/lib/nui-next',
  },
}
export default config
