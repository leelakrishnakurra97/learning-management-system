import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';
import path from 'path';

const endpointHost = process.env.MINIO_ENDPOINT || 'localhost';
const endpointPort = process.env.MINIO_PORT || '9000';
const useSSL = process.env.MINIO_USE_SSL === 'true';
const protocol = useSSL ? 'https' : 'http';
const endpoint = `${protocol}://${endpointHost}:${endpointPort}`;

const accessKeyId = process.env.MINIO_ACCESS_KEY || '';
const secretAccessKey = process.env.MINIO_SECRET_KEY || '';
const bucketName = process.env.MINIO_BUCKET || 'lms-files';

export const minioClient = new S3Client({
  region: 'us-east-1', // MinIO requires region, us-east-1 is standard fallback
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true, // Required for MinIO local connection
});

export const MINIO_BUCKET = bucketName;

/**
 * Upload a file buffer to MinIO
 */
export async function uploadToMinio(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  try {
    await minioClient.send(
      new PutObjectCommand({
        Bucket: MINIO_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
    // Return the public access URL for the uploaded file
    return `${endpoint}/${MINIO_BUCKET}/${key}`;
  } catch (err) {
    console.warn('MinIO upload failed, using local disk fallback:', err);
    const localPath = path.join(process.cwd(), 'uploads', key);
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localPath, body);
    return `/uploads/${key}`;
  }
}

/**
 * Delete a file from MinIO
 */
export async function deleteFromMinio(key: string): Promise<void> {
  try {
    await minioClient.send(
      new DeleteObjectCommand({
        Bucket: MINIO_BUCKET,
        Key: key,
      }),
    );
  } catch (err) {
    console.warn('MinIO delete failed, using local disk fallback:', err);
    const localPath = path.join(process.cwd(), 'uploads', key);
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
  }
}

/**
 * Generate a signed download URL (expires in 1 hour)
 */
export async function getSignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  try {
    const command = new PutObjectCommand({ Bucket: MINIO_BUCKET, Key: key });
    return await getSignedUrl(minioClient, command, { expiresIn });
  } catch (err) {
    console.warn('MinIO getSignedDownloadUrl failed, using local link fallback:', err);
    return `/uploads/${key}`;
  }
}

/**
 * Derive storage key from upload context
 */
export function buildStorageKey(
  type: 'notes' | 'assignment' | 'video',
  classTitle: string,
  subjectTitle: string,
  filename: string,
): string {
  const sanitize = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${type}/${sanitize(classTitle)}/${sanitize(subjectTitle)}/${Date.now()}-${filename}`;
}
