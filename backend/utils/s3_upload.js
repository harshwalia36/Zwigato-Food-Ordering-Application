// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';
import crypto from 'crypto';

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

const getPublicImageUrl = async (bucket, key, region) => {
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

const uploadImageToS3 = async (image, bucketName) => {
    const image_buffer_string = image.buffer.toString('base64');
    const fileHash = crypto.createHash('sha256').update(image_buffer_string).digest('hex');
    const fileName = `${fileHash}/${image.originalname}`;


    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: image.buffer,
        ContentType: image.mimetype,
        ACL: 'public-read', // Make the file publicly readable ,
        Metadata: {
            fileHash: fileHash, // store the hash in metadata too.
        }
    };

    try {
        // Check if the object already exists
        try {
            await s3.headObject({ Bucket: bucketName, Key: params.Key }).promise();
            const imageUrl = getPublicImageUrl(bucketName, params.Key, process.env.AWS_REGION);
            console.log("Duplicate image detected");
            return imageUrl;
        } catch (headError) {
            if (headError.code === 'NotFound') {
                // object does not exist.
                const uploadResult = await s3.upload(params).promise();
                console.log('Uploaded Image:', uploadResult.Location);
                return uploadResult.Location;
            } else {
                throw headError;
            }
        }
    } catch (err) {
        throw err;
    }
};

export { uploadImageToS3 };
