<script lang="ts">
  import MdiVue from '~icons/mdi/vuejs'
  import MdiHaskell from '~icons/mdi/language-haskell'
  import MdiPolymer from '~icons/mdi/polymer'
</script>

<div class="flex flex-row gap-16 xyi mt-16 ml-5">
  <div class="flex flex-col gap-1">
    <MdiVue style="transform: scale(3.5)" />
    <MdiVue style="transform: scaleX(3.5) scaleY(-3.5)" />
  </div>
  <MdiHaskell id="haskell" style="transform: scaleX(5.75) scaleY(-6.55) translateY(-8.5%);" />
  <div class="flex flex-col gap-3" style="transform: translateY(-55%) scale(1.66) translateX(75%)">
    <MdiVue style="transform: scale(1.5)" />
    <MdiPolymer style="transform: scale(3.55)" />
  </div>
</div>
