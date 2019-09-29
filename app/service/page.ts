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

  saveCompStore(user, params, file) {
    let fspageconf = './website/' + user + '/' + file + '.json'
    if (fs.existsSync(fspageconf)) {
      let fileData: any = JSON.parse(fs.readFileSync(fspageconf).toString());
      console.log(params)
      if (params.edit) {
        fileData.forEach((item, i) => {
          if (item.compName == params.compName) {
            fileData[i] = params;
          }
        })
      } else {
        fileData.push(params);
      }
      writefile.writejs(fspageconf, JSON.stringify(fileData))
      return {};
    } else {
      return 'params error!'
    }
  }

  async getCompStore(user, file, query) {
    let resData: any = await this.getCompsByType(user, file, query.type);
    if (query.compName) {
      resData.forEach((item) => {
        if (item.compName == query.compName) {
          return item;
        }
      })
    }
    return resData;
  }

  async deleteCompStore(user, file, query) {
    let fspageconf = './website/' + user + '/' + file + '.json';
    let fileData = await this.getFileData(user, file);
    let resData: any = await this.getCompsByType(user, file, query.type);
    let tempData: any = [];
    resData.forEach((item) => {
      if (item.compName !== query.compName) {
        tempData.push(item)
      }
    })
    fileData.forEach((item, i) => {
      if (item.compName === query.compName) {
        fileData.splice(i, 1)
      }
    })
    writefile.writejs(fspageconf, JSON.stringify(fileData))
    return tempData;
  }

  async editCompByName(user, file, params) {
    let fspageconf = './website/' + user + '/' + file + '.json';
    let fileData = await this.getFileData(user, file);
    fileData.forEach((item) => {
      if (item.compName == params.compName) {
        item.apiDesc = params.apiDesc;
      }
    })
    writefile.writejs(fspageconf, JSON.stringify(fileData))
  }

  async getCompsByType(user, file, type) {
    let fileData = await this.getFileData(user, file);
    let resData: any = [];
    fileData.length && fileData.forEach((item) => {
      if (item.type == type) {
        resData.push(item);
      }
    })
    return resData;
  }

  getFileData(user, file) {
    let fspageconf = './website/' + user + '/' + file + '.json';
    if (fs.existsSync(fspageconf)) {
      let fileData = JSON.parse(fs.readFileSync(fspageconf).toString());
      return fileData;
    } else {
      return 'params error!'
    }
  }

  checksavestr(obj) {
    let isjsonstr = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
    return isjsonstr
  }
}
