const OSS = require('ali-oss');
const ObjectID = require('mongodb').ObjectID

const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI5GRjtmBIqUX8',
  accessKeySecret: 'iaYonbjx1Q2dWc7Dn0dduToBdJYwoV',
  bucket: 'h3yun-test-wind',
});

export async function uploadToOss(filePath: string) {
  const fileId: string = ObjectID();
  const result = await client.put(fileId, filePath);
  if (result) {
    return {
      fileId,
      result,
    }
  }
  console.log(result);
  return null;
}

export async function getFileUrl() {}