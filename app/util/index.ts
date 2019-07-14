
export default class tools {
  status(data, total?, page?, size?) {
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
        total: total,
        current_page: page,
        pagesize: size,
        total_page: Math.ceil(total / size)
      }
    } else {
      tempobj = {
        status: 500,
        msg: data,
        serverTime: time,
        serverDate: date,
        data: '结果错误，操作失败'
      }
    }

    return tempobj
  }

  getarrt(data, out, obj?: number) {
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
}
