<script lang="ts">
  import DmView from "../../DMView.svelte"
  import MeLayout from "../MeLayout.svelte"
  import type { PageData } from "./$types"

  export let data: PageData
</script>
<MeLayout>
  <DmView recipient={data.recipient} />
</MeLayout>
