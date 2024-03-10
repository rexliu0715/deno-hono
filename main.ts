import { createMiddleware, addMiddleware } from "npm:@trigger.dev/hono@latest";
import { TriggerClient, invokeTrigger } from "npm:@trigger.dev/sdk@latest";
import { Hono } from "npm:hono"; // Make sure to use the npm specifier for hono as well
import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";
import { triggerClient } from "./trigger-client.ts";
import { exampleJob } from "./jobs.ts";

const env = await load();

const app = new Hono();

// const client = triggerClient(env.TRIGGER_API_KEY, env.TRIGGER_API_URL);
// console.log(client);
console.log(env.TRIGGER_API_KEY, env.TRIGGER_API_URL);
const client = new TriggerClient({
  id: "etsy",
  apiKey: env.TRIGGER_API_KEY,
  apiUrl: env.TRIGGER_API_URL,
});

exampleJob.attachToClient(client);

app.use("/api/trigger", createMiddleware(client));

Deno.serve(app.fetch);
