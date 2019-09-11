/**
 * Created by nero on 2017/6/2.
 */
const fs = require('fs')
const Writefile = require('keeper-core/lib/writefile')
let writefile = new Writefile()
import { Service } from 'egg';

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

  editpageconfig(user, pagestr, file) {
    let fspageconf = './website/' + user + '/' + file + '.json'

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
