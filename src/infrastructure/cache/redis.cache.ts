import { createClient, type RedisClientType } from "redis";
import type { CachePort } from "../../application/ports/outbound/cache.port";
import { env } from "../config/env";

export class RedisCache implements CachePort {
  private readonly client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: env.REDIS_URL,
    });

    this.client.on("error", (err) => console.error("Redis error:", err));
    this.client.on("connect", () => console.log("Redis connected"));
    this.client.on("reconnecting", () => console.log("Redis reconnecting"));
    this.client.on("ready", () => console.log("Redis ready"));
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect() {
    await this.client.close();
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string, expiresIn: number | undefined = 60) {
    return this.client.set(key, value, { EX: expiresIn });
  }

  async delete(key: string) {
    return this.client.del(key);
  }
}
