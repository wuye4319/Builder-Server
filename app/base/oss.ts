import { EggFile } from 'egg-multipart';

const OSS = require('ali-oss');
const path = require('path');

const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI5GRjtmBIqUX8',
  accessKeySecret: 'iaYonbjx1Q2dWc7Dn0dduToBdJYwoV',
  bucket: 'h3yun-test-wind',
  timeout: '30s',
});

client.putBucketACL('h3yun-test-wind', 'public-read');

export async function uploadToOss(file: EggFile) {
  const { filename, filepath } = file;
  const result = await client.put('h3yun-wind-test/' + filename, filepath);
  if (result) {
    return {
      url: result.url,
      name: result.name,
      filename,
      extension: path.extname(filepath),
    };
  }
  return null;
}
