const Expense = require('../models/expense');
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3c = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  }
})

const putObject = async (req, res) => {
  try {
    const { userID } = req.query;
    const result = await Expense.find({ userID: userID });
    const resultString = JSON.stringify(result);
    const key = `user-data/userExpenses.txt`;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: 'text/plain',
    })
    const url = await getSignedUrl(s3c, command);

    await fetch(url, {
      method: 'PUT',
      body: resultString,
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    res.status(200).json({ url, key });
  } catch (e) {
    console.log(e);
  }
}

const getObject = async (req, res) => {
  try {
    const { key } = req.query;
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    });
    const location = await getSignedUrl(s3c, command);

    res.status(200).json({ url: location });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { putObject, getObject };