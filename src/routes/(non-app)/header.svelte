<div id="gloryx-header" class="prose">
  <h1 id="title">
    <!-- >.< -->
    <span id="h">netherite</span>.<span class="text-blue-celestial">chat</span>
  </h1>

  <a id="open-netherite" href="/app">Open Netherite.chat</a>
</div>

<style lang="scss">
  #gloryx-header {
    @apply flex flex-row m-6 w-screen items-center bg-gray-700;
    #title {
      @apply font-heading p-4 dark:text-white text-black justify-start self-end mb-0;
      #h {
        @apply text-transparent;
        background-image: url(/assets/0198273icsahn9ew8rnaioeuw0ekt.png);
        background-repeat: round no-repeat;
        background-size: contain;
        background-clip: text; 
        -webkit-text-stroke: 1.5px theme('colors.brown.netherite-outline');
        //color: theme('colors.brown.netherite');
      }
    }
    #open-netherite {
      @apply dark:bg-gray-200 rounded-2xl py-1 px-2 text-black h-min;
      text-decoration: none;
    }
    border-bottom: 3px dashed theme("colors.gray.600");
  }
</style>
