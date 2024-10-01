import { Innertube } from "youtubei.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";

const SMARTPROXY_USERNAME = "username-goes-here";
const SMARTPROXY_PASSWORD = "password-goes-here";

const proxyAgent = new HttpsProxyAgent(
  `http://${SMARTPROXY_USERNAME}:${SMARTPROXY_PASSWORD}@gate.smartproxy.com:10001`
);

async function testYouTubeJsProxy() {
  let youtube;
  try {
    youtube = await Innertube.create({
      lang: "en",
      location: "US",
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {

        // This fetch call doesn't work. It's not compatible with the `fetch`
        // that `youtubei.js` expects.
        return fetch(input, {
          ...init,
          agent: proxyAgent,
        });

      },
    });
  } catch (err) {
    console.error("⛔️ Failed to initialize YouTube client.");
    console.error(err);
    return;
  }

  const videoId = "NhHi0OjHUMQ";

  try {
    const info = await youtube.getInfo(videoId);
    console.log("✅ Video fetched successfully.");
    console.log(`Video title: ${info.basic_info.title}`);
  } catch (err) {
    console.error("⛔️ Failed to get video info.");
    console.error(err);
  }
}

testYouTubeJsProxy();
