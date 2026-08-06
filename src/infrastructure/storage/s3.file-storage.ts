import { PutObjectCommand, type S3Client } from "@aws-sdk/client-s3";
import type { FileStoragePort } from "../../application/ports/outbound/file-storage.port";
import { env } from "../config/env";

export class S3FileStorage implements FileStoragePort {
  constructor(private readonly s3Client: S3Client) {}

  async uploadFile(id: number, content: string) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: `products/${id}.jpg`,
        Body: content,
      }),
    );
  }
}
