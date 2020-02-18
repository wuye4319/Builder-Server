const crypto = require('crypto');
const hash = crypto.createHash('sha256');

export default class tools {
  status(data, total?, page?, size?, msg?) {
    const date = new Date()
    const time = date.getTime()
    let tempobj
    if (data) {
      tempobj = {
        status: 200,
        msg: 'success',
        serverTime: time,
        serverDate: date,
        data: data === true ? '操作成功' : data,
        total: total || 0,
        currentPage: page || 0,
        pageSize: size || 0,
        totalPage: total && size ? Math.ceil(total / size):0
      }
    } else {
      tempobj = {
        status: 500,
        msg: msg || 'error',
        serverTime: time,
        serverDate: date,
        data: '结果错误，操作失败'
      }
    }

    return tempobj
  }

  getAllCookies(ctx){
    let cookie = ctx.request.header.cookie;
    if(!cookie){
      ctx.body = this.status('cookie失效')
      return '';
    }
    return cookie;
  }

  getCookie(cookie_name,ctx) {
    let allcookies = this.getAllCookies(ctx);
    //索引长度，开始索引的位置
    let cookie_pos = allcookies.indexOf(cookie_name);
    // 如果找到了索引，就代表cookie存在,否则不存在
    if (cookie_pos != -1) {
      let strcookie = allcookies; //获取cookie字符串
      let arrcookie = strcookie.split("; "); //分割
      let value = '';
      //遍历匹配
      for (let i = 0; i < arrcookie.length; i++) {
        let arr = arrcookie[i].split("=");
        if (arr[0] == cookie_name) {
          value = arr[1]
        }
      }
      if(cookie_name === 'userID' && !value){
        ctx.body = this.status('用户信息失效')
      }
      return value;
    }
  }

  getHash(numb) {
    let str = hash.digest('hex');
    return str.substr(numb)
  }

  getarrt(data, out, obj?: [0 | 1 | boolean]) {
    let temparr = <any>[]
    // get arrt you need
    for (let i in data) {
      let tempobj: any = {}
      for (let j in out) {
        tempobj[out[j]] = data[i][out[j]]
      }
      temparr.push(tempobj)
    }
    return obj ? temparr[0] : temparr
  }

  errorHandler(error: Error) {
    const date = new Date()
    const time = date.getTime()
    return {
      status: 500,
      msg: error.message,
      stack: error.stack,
      serverTime: time,
      serverDate: date,
      data: 'catch操作失败'
    }
  }
  
  randomRangeId(num) {
    var returnStr = "",
      charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < num; i++) {
      var index = Math.round(Math.random() * (charStr.length - 1));
      returnStr += charStr.substring(index, index + 1);
    }
    return returnStr;
  }
}
