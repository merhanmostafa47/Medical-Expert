// import '#internal/nitro/virtual/polyfill';
// import { Server } from 'node:http';

// const nitroApp = useNitroApp()
// const server = new Server(nitroApp.h3App.nodeHandler)

// // @ts-ignore
// server.listen(3021, (err) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   // console.log(`Listening on http://localhost:3021 (custom preset)`)
// })


import "#internal/nitro/virtual/polyfill";
import { Server } from "node:http";
import { toNodeListener } from "h3";

const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));

// @ts-ignore
server.listen(3021, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Listening on http://localhost:3021 (custom preset)`);
});