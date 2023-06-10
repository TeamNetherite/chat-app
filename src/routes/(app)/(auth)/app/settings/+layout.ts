import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ url }) => ({
  drawerOpen: url.pathname.endsWith('/app/settings')
})
