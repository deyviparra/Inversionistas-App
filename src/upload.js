// const AWS = require('aws-sdk');
const path = require("path");
const fs = require('fs');
const AWS = require('aws-sdk');
const {AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY}=process.env

// Enter copied or downloaded access ID and secret key here
const ID = AWS_ACCESS_KEY_ID;
const SECRET = AWS_SECRET_ACCESS_KEY;

// The name of the bucket that you have created
const BUCKET_NAME = 'inversionistas-bucket';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

function uploadFile(fileName,key) {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: key, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};



module.exports = {
    'uploadFile':uploadFile
}