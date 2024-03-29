<script lang="ts">
  import classNames from 'classnames';

  export let icon: boolean = false;
  export let width: string = 'w-full';
  export let height: string = 'h-px';
  export let divClass: string = 'inline-flex justify-center items-center w-full';
  export let hrClass: string = 'bg-gray-200 rounded border-0 dark:bg-gray-700';
  export let iconDivClass: string = 'absolute left-1/2 px-4 bg-white -translate-x-1/2 ';
  export let textSpanClass: string =
    'absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white ';
  export let middleBgColor: string = 'dark:bg-gray-900';

  let horizontalClass: string = classNames(hrClass, width, height, $$props.class);
  let classDiv = classNames(divClass, $$slots && 'relative', $$props.classDiv);
  let middleClass = classNames(middleBgColor, icon ? iconDivClass : textSpanClass);
</script>

{#if $$slots}
  <div {...$$restProps} class={classDiv}>
    <hr class={horizontalClass} />
    <div class={middleClass}>
      <slot />
    </div>
  </div>
{:else}
  <hr class={horizontalClass} />
{/if}

<!--
  @component
  ## Features
  [Go to Horizontal Line](https://flowbite-svelte.com/docs/typography/hr)
  - Setup
  - Default HR
  - Trimmed
  - Icon HR
  - HR with text
  - HR shape
  ## Props
  @prop icon: boolean = false;
  @prop width: string = 'w-full';
  @prop height: string = 'h-px';
  @prop divClass: string = 'inline-flex justify-center items-center w-full';
  @prop hrClass: string = 'bg-gray-200 rounded border-0 dark:bg-gray-700';
  @prop iconDivClass: string = 'absolute left-1/2 px-4 bg-white -translate-x-1/2 ';
  @prop textSpanClass: string = 'absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white ';
  @prop middleBgColor: string = 'dark:bg-gray-900';
  ## Example
  ```
  <script>
    import { Hr, P } from 'flowbite-svelte'
  </script>
  
  <P>Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</P>
  <Hr class="my-8" height="h-px" />
  <P>Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work, eliminate toil, and deploy changes with ease, with a complete audit trail for every change.</P>
  ```
-->
