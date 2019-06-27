const date = new Date()
const time = date.getTime()

export default class tools {
  status(data) {
    let tempobj
    if (data) {
      tempobj = {
        status: 200,
        msg: "Success",
        serverTime: time,
        serverDate: date,
        data: data === true ? '操作成功' : data,
        total: data.length
      }
    } else {
      tempobj = {
        status: 500,
        msg: "Failed",
        serverTime: time,
        serverDate: date,
        data: '操作失败'
      }
    }

    return tempobj
  }
}
