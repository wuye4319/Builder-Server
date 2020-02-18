/**
 * Created by nero on 2017/6/2.
 */
const fs = require('fs')
const path = require('path')
import { Service } from 'egg';
const crypto = require('crypto');
//故名思意 异步二进制 写入流
// const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
// const sendToWormhole = require('stream-wormhole');

export default class Upload extends Service {
  //上传图片
  async uploadImg(userID, stream) {
    // const stream = await ctx.getFileStream();
    //egg-multipart 已经帮我们处理文件二进制对象
    // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
    // node.js 和 其他语言（java c#） 一样操作文件流
    // let form = formstream();
    //新建一个文件名
    const filename = crypto.createHash('md5').update(stream.filename + userID).digest('hex') + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    const extName = path.extname(stream.filename).toLocaleLowerCase();
    const fileTypes = ['.png','.PNG','.jpg','.JPG','.jpeg','.JPEG'];
    if(fileTypes.indexOf(extName) === -1){
      return {data: false, msg: '该文件类型不支持,请上传下列类型文件: .png/.jpg/.jpeg/.PNG/.JPEG/.JPG'}
    }
    //文件生成绝对路径
    //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
    const target = path.join(this.config.baseDir, 'app/public/uploads/', filename);
    //生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await stream.pipe(writeStream);
      // await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      // await sendToWormhole(stream);
      throw err;
    }
    //文件响应
    return { fileUrl: '/file/getfile/' + filename, fileName: filename };
  }
  //上传音频
  async uploadAudio(userID, stream) {
    const filename = crypto.createHash('md5').update(stream.filename + userID).digest('hex') + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    const extName = path.extname(stream.filename).toLocaleLowerCase();
    const fileTypes = ['.wav', '.mp3'];
    if(!fileTypes.includes(extName)){
      return {data: false, msg: '该文件类型不支持,请上传下列类型文件: .mp3/.wav'}
    }
    //文件生成绝对路径
    //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
    const target = path.join(this.config.baseDir, '/app/public/uploads', filename);
    //生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await stream.pipe(writeStream);
      // await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      // await sendToWormhole(stream);
      throw err;
    }
    //文件响应
    return { fileUrl: '/file/getfile/' + filename, fileName: filename };
  }
  //上传视频
  async uploadVideo(userID, stream) {
    const filename = crypto.createHash('md5').update(stream.filename + userID).digest('hex') + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    const extName = path.extname(stream.filename).toLocaleLowerCase();
    const fileTypes = ['.mp4'];
    if(!fileTypes.includes(extName)){
      return {data: false, msg: '该文件类型不支持,请上传下列类型文件: .mp4'}
    }
    //文件生成绝对路径
    //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
    const target = path.join(this.config.baseDir, '/app/public/uploads', filename);
    //生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await stream.pipe(writeStream);
      // await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      // await sendToWormhole(stream);
      throw err;
    }
    //文件响应
    return { fileUrl: '/file/getfile/' + filename, fileName: filename };
  }

  async readFile(filename){
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    const fileData =  fs.readFileSync(target);
    return fileData;
  }
}
