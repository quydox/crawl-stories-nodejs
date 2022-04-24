import { UPLOADER } from 'configs/Env'
import AWS from 'aws-sdk'

// todo: remove ...
exports.upload = async (fileStream, filePath) => {
  filePath = UPLOADER.DIR + filePath

  const s3 = new AWS.S3({
    accessKeyId: UPLOADER.AWS.KEY,
    secretAccessKey: UPLOADER.AWS.SECRET,
    endpoint: UPLOADER.AWS.BASE_URL
  })

  const params = {
    Bucket: UPLOADER.AWS.BUCKET,
    Key: filePath,
    Body: fileStream,
    ACL: 'public-read'
  }

  let uploaded
  try {
    uploaded = await s3.upload(params).promise()
  } catch (err) {
    console.log('upload error', err)
    return false
  }

  return uploaded.Location
}
