import { Service } from 'egg';
import base from '../base/mongodb'
const mysql = new base()
import tools from '../tools/util'
const util = new tools()
const ObjectID = require('mongodb').ObjectID

/**
 * table service
 */
export default class Sheet extends Service {
  // 获取表的数据
  public async getTableByAppId(appId): Promise<string> {
    let table: string = 'table'
    const where = { "appId": appId }

    let data: any = await mysql.find(table, where)
    for (let d in data) {
      data[d].id = data[d]._id
      delete data[d].viewData
    }
    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 获取列的单行数据
  public async getTableById(id): Promise<string> {
    let table: string = 'column'
    const where = { "_id": ObjectID(id) }

    let data = await mysql.find(table, where)
    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 新增行的数据
  public async insertColsBySheet(obj): Promise<string> {
    let table: string = 'column'
    let data = await mysql.insert(table, obj)

    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 更新行的数据
  public async updateColsById(id, data): Promise<string> {
    let table: string = 'sheet'
    let where = { "_id": ObjectID(id) }
    let result = await mysql.update(table, data, where)
    return JSON.stringify(result)
  }
}
