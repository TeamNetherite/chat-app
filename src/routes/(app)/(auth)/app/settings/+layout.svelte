<script>
  import SettingsSidebar from "./SettingsSidebar.svelte"

</script>
<div class="grid w-full box-border h-full" style:grid-template-columns="1fr 9fr">
  <SettingsSidebar />
  <slot />
</div>
