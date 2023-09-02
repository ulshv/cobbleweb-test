import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
  });

  async uploadFiles(files: Array<Express.Multer.File>) {
    const filesUploadParams = files.map((file) => ({
      Bucket: process.env.AWS_S3_BUCKET,
      // file name on S3 - uuidv4 + original file extension
      Key: uuidv4() + '.' + file.originalname.split('.').slice(-1),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_REGION,
      },
    }));

    const s3Responses = await Promise.all(
      filesUploadParams.map((params) => this.s3.upload(params).promise()),
    );

    return s3Responses.map((response, idx) => ({
      name: files[idx].originalname,
      url: response.Location,
    }));
  }
}
