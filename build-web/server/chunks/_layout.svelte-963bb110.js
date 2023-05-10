import { c as create_ssr_component, v as validate_component } from './index-144530ea.js';

const css = {
  code: "#gloryx-header.svelte-1hp0llj.svelte-1hp0llj{margin:1.5rem;display:flex;width:100vw;flex-direction:row;border-bottom:3px dashed #4b5563\n}#gloryx-header.svelte-1hp0llj #title.svelte-1hp0llj{justify-content:flex-start;padding:1rem;font-family:ABC Ginto Nord, Noto Sans, Helvetica Neue, Helvetica, Arial, sans-serif;--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity))\n}.svelte-1hp0llj.svelte-1hp0llj:is(.dark #gloryx-header #title){--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}#gloryx-header.svelte-1hp0llj #title #h.svelte-1hp0llj{color:transparent;background-image:url(/assets/0198273icsahn9ew8rnaioeuw0ekt.png);background-repeat:round no-repeat;background-size:contain;-webkit-background-clip:text;background-clip:text;-webkit-text-stroke:1.5px #3E3232\n}#gloryx-header.svelte-1hp0llj #open-netherite.svelte-1hp0llj{border-radius:0.125rem;--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity))\n}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div id="gloryx-header" class="prose svelte-1hp0llj"><h1 id="title" class="svelte-1hp0llj">
    <span id="h" class="svelte-1hp0llj">netherite</span>.<span class="text-blue-celestial svelte-1hp0llj">chat</span></h1>

  <a id="open-netherite" href="/app" class="svelte-1hp0llj">Open Netherite.chat</a>
</div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col flex-grow flex-shrink">${validate_component(Header, "H").$$render($$result, {}, {}, {})}
  ${slots.default ? slots.default({}) : ``}</div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-963bb110.js.map
