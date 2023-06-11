import { extractorAttributify, presetAttributify } from '@unocss/preset-attributify'
import { defineConfig, presetMini, presetUno, presetWind } from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
import extractorArbitrary from '@unocss/extractor-arbitrary-variants'

export default defineConfig({
  presets: [
    presetMini(),
    presetWind({
      dark: 'class',
      preflight: true,
      variablePrefix: 'nui-',
    }),
    presetUno({

    }),
    presetAttributify({
      prefix: 'nui-',
    })
  ],
  extractors: [
    extractorSvelte(),
    extractorArbitrary,
    extractorAttributify()
  ]
})
