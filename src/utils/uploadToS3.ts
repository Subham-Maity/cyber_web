import S3 from 'aws-sdk/clients/s3'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

const getUrlForPdf = (fileName: string, type: string, candidateId: string,) => {

    const params = {
        Bucket: bucketName,
        Key: `resume/${candidateId}__${fileName}`,
        ContentType: 'application/pdf',
    };
    const signedUrl = s3.getSignedUrl('putObject', params);
    // console.log(signedUrl);
    return signedUrl;
}
const getUrlForDownloadPdf = (key: string) => {

    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 3600,
    };
    const signedUrl = s3.getSignedUrl('getObject', params);
    return signedUrl;
}
export { getUrlForPdf, getUrlForDownloadPdf }