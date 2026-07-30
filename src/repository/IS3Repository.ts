export interface IS3Repository {
  uploadFile(id: number, image: string): Promise<void>;
}