// import { defineNitroPreset } from 'nitropack';
// import { fileURLToPath } from 'node:url';

// export default defineNitroPreset({
//   extends: 'node-server',
//   entry: fileURLToPath(new URL('./entry.ts', import.meta.url)),
// });

import type { NitroPreset } from "nitropack";
import { fileURLToPath } from "node:url"

export default <NitroPreset>{
  extends: "node-server",
  entry: fileURLToPath(new URL("./entry.ts", import.meta.url)),
};