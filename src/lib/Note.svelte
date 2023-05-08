<script lang="ts">
export let title: string;
</script>

<div class='my-8 flex rounded-3xl p-6 bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10'>
  <div class="ml-4 flex-auto">
    <p class='m-0 font-sans text-xl text-sky-900 dark:text-sky-400'>{title}</p>
  <div class="prose mt-2.5 text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300">
    <slot />
  </div>
  </div>
</div>
