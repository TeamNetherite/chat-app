import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default Icons({
  compiler: 'svelte',
  customCollections: {
    'netherite-icons': {},
    'netherite-badges': FileSystemIconLoader('./assets/badges', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
  }
})
