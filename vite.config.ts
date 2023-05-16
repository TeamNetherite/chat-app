import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type UserConfig } from "vite";
import { internalIpV4 } from "internal-ip";

export default defineConfig(async () => {
  const host = await internalIpV4();
  return <UserConfig> {
    plugins: [sveltekit()],
    server: {
      host: "0.0.0.0", // listen on all addresses
      port: 5173,
      strictPort: true,
      hmr: {
        protocol: "ws",
        host,
        port: 5183,
      },
    },
  };
});
