import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The site is fully static apart from the contact API, so no incremental cache is needed.
export default defineCloudflareConfig({});
