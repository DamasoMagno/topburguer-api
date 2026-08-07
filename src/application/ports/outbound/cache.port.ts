export interface CachePort {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, expiresIn: number | undefined): Promise<unknown>;
  delete(key: string): Promise<unknown>;
}
