import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { environment } from '../../../environment';
import { IFile } from '../../files/interfaces/file.interface';
import { DeleteObjectsRequest, ManagedUpload } from 'aws-sdk/clients/s3';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;
  private readonly bucket: string;

  constructor() {
    this.s3 = new AWS.S3({
      credentials: new AWS.Credentials({
        accessKeyId: environment.s3.accessKey,
        secretAccessKey: environment.s3.secretKey,
      }),
      endpoint: environment.s3.baseUrl,
    });
    this.bucket = environment.s3.bucketName;
  }

  async uploadToS3(
    file: IFile,
    buffer: Buffer,
  ): Promise<ManagedUpload.SendData> {
    const params: S3.Types.PutObjectRequest = {
      Bucket: this.bucket,
      Key: file.id,
      Body: buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    try {
      return this.s3.upload(params).promise();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  removeFromS3(names: string[]): Promise<S3.Types.DeleteObjectsOutput> {
    const params: DeleteObjectsRequest = {
      Bucket: this.bucket,
      Delete: {
        Objects: names.map((item) => ({
          Key: item,
        })),
      },
    };

    try {
      return this.s3.deleteObjects(params).promise();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
