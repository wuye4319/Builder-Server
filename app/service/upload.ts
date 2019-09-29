/**
 * Created by nero on 2017/6/2.
 */
const fs = require('fs')
const path = require('path')
import { Service } from 'egg';
const formstream = require('formstream');
const Writefile = require('keeper-core/lib/writefile')
let writefile = new Writefile()
const Render = require('keeper-core/lib/render')
let render = new Render()

export default class Shop extends Service {
  getpageconfig(user) {
    let data: any = ['compStore', 'mobileCompStore', 'pages']
    let obj = {}
    for (let i in data) {
      let di = data[i]
      let pageconf = './website/' + user + '/' + di + '.json'
      if (fs.existsSync(pageconf)) {
        let tempjson = JSON.parse(fs.readFileSync(pageconf).toString())
        obj[di] = tempjson
      } else {
        return 'params error!'
      }
    }
    return obj
  }

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

  vueFile(file) {
    if (file.filename) {
      // vue file
      let filename = file.filename.split('.')[0]
      const pwd = path.join(__dirname, '../../../PageDesigner/src/website/components/custom/', filename)
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

  ctrlFile(file) {
    if (file.filename) {
      // vue file
      let filename = file.filename.split('.')[0]
      const pwd = path.join(__dirname, '../../../PageDesigner/src/website/components/custom/', filename)
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

  checksavestr(obj) {
    // obj = JSON.parse(obj)
    let isjsonstr = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
    return isjsonstr
  }
}
