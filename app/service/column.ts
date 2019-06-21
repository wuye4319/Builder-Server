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
  // 单独获取行的数据
  public async getColsById(id): Promise<string> {
    let table: string = 'column'
    const where = { "_id": ObjectID(id) }

    let data = await mysql.find(table, where)
    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 新增行的数据
  public async insertSheetById(obj): Promise<string> {
    let table: string = 'sheet'
    let data = await mysql.insert(table, obj)

    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 更新行的数据
  public async updateSheetById(id, data): Promise<string> {
    let table: string = 'sheet'
    let where = { "_id": ObjectID(id) }
    let result = await mysql.update(table, data, where)
    return JSON.stringify(result)
  }
}
