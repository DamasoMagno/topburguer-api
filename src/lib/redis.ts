import { createClient, type RedisClientType } from "redis";
import { env } from "../env";

export class Redis {
  private readonly client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: env.REDIS_URL,
    });

    this.client.on("error", (err) => console.error("Redis error:", err));
    this.client.on("connect", () => console.log("Redis connected"));
    this.client.on("disconnect", () => console.log("Redis disconnected"));
    this.client.on("reconnecting", () => console.log("Redis reconnecting"));
    this.client.on("ready", () => console.log("Redis ready"));
    this.client.on("end", () => console.log("Redis end"));
    this.client.on("close", () => console.log("Redis close"));
    this.client.on("error", (err) => console.error("Redis error:", err));
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.close();
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async set(key: string, value: string) {
    return await this.client.set(key, value);
  }
}
