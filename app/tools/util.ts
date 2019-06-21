const date = new Date()
const time = date.getTime()

export default class tools {
  status(data) {
    let tempobj = {
      status: 200,
      msg: "success",
      serverTime: time,
      serverDate: date,
      data: data === true ? '操作成功' : data,
      total: data.length
    }

    return tempobj
  }
}
