# YouTube.js with Proxy Test

Test repo to get [YouTube.js](https://www.npmjs.com/package/youtubei.js) requests working with the [Smartproxy](https://smartproxy.com/) proxy service.

## Setup steps

1. Get the `SMARTPROXY_USERNAME` and `SMARTPROXY_PASSWORD` values from Kellen and paste them into the `src/index.ts` file.
2. Run `npm install` to install dependencies
3. Run `npx tsc` to compile the TypeScript
4. Run `node dist/index.js` to run the script

Each time you make a change to `src/index.ts`, do steps 3 & 4 again.

## Docs

### Example of how to implement a custom `fetch` function for YouTube.js

https://www.npmjs.com/package/youtubei.js#browser-usage

### Example of a YouTube.js proxy implementation in Deno

https://ytjs.dev/guide/browser-usage.html
https://github.com/LuanRT/YouTube.js/blob/main/examples/browser/proxy/deno.ts

## Smartproxy Test

If you want to confirm that the proxy service works in isolation, you can do this:

```ts
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";

const SMARTPROXY_USERNAME = "username-goes-here";
const SMARTPROXY_PASSWORD = "password-goes-here";

const proxyAgent = new HttpsProxyAgent(
  `http://${SMARTPROXY_USERNAME}:${SMARTPROXY_PASSWORD}@gate.smartproxy.com:10001`
);

async function testSmartProxy() {
  const response = await fetch("https://ip.smartproxy.com/json", {
    agent: proxyAgent,
  });
  const data = await response.json();

  // The location and IP address logged should indicate that the request
  // was routed through some far-away residential proxy.
  console.log(data);
}

testSmartProxy();
```

^ Note that `node-fetch` is being used in this example, but I'll gladly use Node's built-in fetch/undici/axios/node-fetch/whatever – as long as YouTube.js requests are routed through the proxy.
