/**
 * Created by nero on 2017/6/2.
 */
const fs = require('fs')
const Writefile = require('keeper-core/lib/writefile')
let writefile = new Writefile()
import { Service } from 'egg';

export default class Shop extends Service {
  getpageconfig(user) {
    let data = {}
    let pageconf = './website/' + user + '/config.json'
    if (fs.existsSync(pageconf)) {
      data = JSON.parse(fs.readFileSync(pageconf).toString())
      return data
    } else {
      return 'params error!'
    }
  }

  editpageconfig(user, pagestr) {
    let fspageconf = './website/' + user + '/config.json'

    if (this.checksavestr(pagestr)) {
      writefile.writejs(fspageconf, JSON.stringify(pagestr))
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
