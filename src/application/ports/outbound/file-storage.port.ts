export interface FileStoragePort {
  uploadFile(id: number, content: string): Promise<void>;
}
