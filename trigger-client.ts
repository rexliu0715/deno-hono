import { TriggerClient } from "@trigger.dev/sdk";
import { exampleJob } from "./jobs.ts";

export function triggerClient(apiKey: string, apiUrl: string) {
  const client = new TriggerClient({
    id: "etsy",
    apiKey,
    apiUrl,
  });

  exampleJob.attachToClient(client);

  return client;
}
