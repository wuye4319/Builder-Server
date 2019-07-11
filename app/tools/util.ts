
export default class tools {
  status(data) {
    const date = new Date()
    const time = date.getTime()
    let tempobj
    if (data) {
      tempobj = {
        status: 200,
        serverTime: time,
        serverDate: date,
        data: data === true ? '操作成功' : data,
        total: data.length
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
