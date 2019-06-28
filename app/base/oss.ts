const OSS = require('ali-oss');

const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI5GRjtmBIqUX8',
  accessKeySecret: 'iaYonbjx1Q2dWc7Dn0dduToBdJYwoV',
  bucket: 'h3yun-test-wind',
});

export async function uploadToOss(fileName: string, filePath: string) {
  const result = await client.put(fileName, filePath);
  if (result) {
    return result;
  }
  return null;
}

export async function getFileUrl() {}