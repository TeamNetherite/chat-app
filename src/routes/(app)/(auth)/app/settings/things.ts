import MdiAccount from "~icons/mdi/account";
import MdiLogout from "~icons/mdi/logout";
import MdiPalette from "~icons/mdi/palette";

export const tabs = [
  {
    account: [MdiAccount, "Account"],
  } as const,
  {
    appearance: [MdiPalette, "Appearance"],
  } as const,
];
