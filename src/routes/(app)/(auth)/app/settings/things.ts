import MdiAccountBox from "~icons/mdi/account-box";
import MdiLogout from "~icons/mdi/logout";
import MdiPalette from "~icons/mdi/palette";

export const tabs = [
  {
    account: [MdiAccountBox, "Account"],
  } as const,
  {
    appearance: [MdiPalette, "Appearance"],
  } as const,
  {
    "/": [MdiLogout, "Logout", () => {}],
  } as const,
];
