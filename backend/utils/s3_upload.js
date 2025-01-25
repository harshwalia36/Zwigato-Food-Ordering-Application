// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

const uploadImageToS3 = (file, bucketName) => {
    const fileName = `${uuidv4()}_${file.originalname}`;

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read', // Make the file publicly readable 
    };

    console.log('Params:', params);

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file:', err);
                reject(err);
            } else {
                console.log(`File uploaded successfully. ${data.Location}`);
                resolve(data.Location);
            }
        });
    });
};

export { uploadImageToS3 };
