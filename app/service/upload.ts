/**
 * Created by nero on 2017/6/2.
 */
const fs = require('fs')
const path = require('path')
import { Service } from 'egg';
const formstream = require('formstream');
const Writefile = require('keeper-core/lib/writefile')
const crypto = require('crypto');
//故名思意 异步二进制 写入流
// const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
// const sendToWormhole = require('stream-wormhole');
let writefile = new Writefile()
const Render = require('keeper-core/lib/render')
let render = new Render()

const option = {
  baseFilePath: '/Users/zhangxiang/work/company/PageDesigner/'
}

export default class Upload extends Service {
  ossFile(file) {
    if (this.checksavestr(file)) {
      const writable = fs.createWriteStream('./' + file.filename);
      let form = formstream();
      form.file(file.field, file.filepath, file.filename)
        .pipe(writable);
      return 'success'
    } else {
      return 'failed'
    }
  }

  vueFile(userID, file) {
    if (file.filename) {
      // vue file
      let filename = file.filename.split('.')[0]
      const pwd = path.join(option.baseFilePath, 'src/custom/' + userID + '/', filename)
      let savePath = pwd + '/' + file.filename
      writefile.writejs(savePath, '')
      const writable = fs.createWriteStream(savePath);
      file.pipe(writable);

      // ts file
      let tpl = fs.readFileSync('./tpl/index.txt').toString()
      let str = render.renderdata(tpl, { vuename: filename })
      writefile.writejs(pwd + '/index.ts', str)

      return 'success'
    } else {
      return 'failed'
    }
  }

  ctrlFile(userID, file) {
    if (file.filename) {
      // vue file
      let filename = file.filename.split('.')[0]
      const pwd = path.join(option.baseFilePath, 'src/custom/' + userID + '/', filename)
      let savePath = pwd + '/control/' + file.filename
      writefile.writejs(savePath, '')
      const writable = fs.createWriteStream(savePath);
      file.pipe(writable);

      // ts file
      let tpl = fs.readFileSync('./tpl/index.txt').toString()
      let str = render.renderdata(tpl, { vuename: filename })
      writefile.writejs(pwd + '/control/index.ts', str)

      return 'success'
    } else {
      return 'failed'
    }
  }

  newFile(userID, filename) {
    if (filename) {
      const pwd = path.join(option.baseFilePath, 'src/custom/' + userID + '/', filename)
      let savePath = pwd + '/' + filename + '.vue'
      let savePath2 = pwd + '/control/' + filename + '.vue'

      let infor = [
        { tpl: './tpl/vue.txt', outPath: savePath },
        { tpl: './tpl/index.txt', outPath: pwd + '/index.ts' },
        { tpl: './tpl/vue.txt', outPath: savePath2 },
        { tpl: './tpl/index.txt', outPath: pwd + '/control/index.ts' }
      ]

      for (let i in infor) {
        let tpl = fs.readFileSync(infor[i].tpl).toString()
        let str = render.renderdata(tpl, { vuename: filename })
        writefile.writejs(infor[i].outPath, str)
      }
    }
  }

  checksavestr(obj) {
    // obj = JSON.parse(obj)
    let isjsonstr = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
    return isjsonstr
  }

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
    console.log(extName)
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
    return { fileUrl: '/comps/compimg/' + filename, fileName: filename };
  }
  //上传音频
  async uploadAudio(userID, stream) {
    const filename = crypto.createHash('md5').update(stream.filename + userID).digest('hex') + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    const extName = path.extname(stream.filename).toLocaleLowerCase();
    const fileType = '.mp3';
    if(fileType !== extName){
      return {data: false, msg: '该文件类型不支持,请上传下列类型文件: .mp3'}
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
    return { fileUrl: '/comps/compImg/' + filename, fileName: filename };
  }
}
