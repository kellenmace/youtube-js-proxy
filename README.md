# YouTube.js with Proxy Test

Run `npm install` to install dependencies
Run `npx tsc` to compile the TypeScript
Run `node dist/index.js` to run the script

## Proxy Service Test

If you want to confirm that the proxy service works, you can do this:

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
