const date = new Date()
const time = date.getTime()

export default class tools {
  status(data) {
    return {
      status: 200,
      msg: "success",
      serverTime: time,
      serverDate: date,
      data: data,
      total: data.length
    }
  }
}
