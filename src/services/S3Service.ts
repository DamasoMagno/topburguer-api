import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class S3Service {
  constructor(private readonly s3Client: S3Client) {}

  async uploadFile(id: number, image: string) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `products/${id}.jpg`,
        Body: image,
      }),
    );
  }
}
