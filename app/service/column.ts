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
  // 获取列的单行数据
  public async getColsById(id): Promise<string> {
    let table: string = 'column'
    const where = { "_id": ObjectID(id) }

    let data = await mysql.find(table, where)
    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 根据tableID新增列的数据
  public async insertColsBySheet(obj): Promise<string> {
    let table: string = 'column'
    let data = await mysql.insert(table, obj)

    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 根据ID更新列的数据
  public async updateColsById(id, data): Promise<string> {
    let table: string = 'column'
    let where = { "_id": ObjectID(id) }
    let datastr = await mysql.update(table, data, where)
    let result = util.status(datastr)
    return JSON.stringify(result)
  }

  // 根据ID删除列的数据
  public async deleteColsById(id): Promise<string> {
    let table: string = 'column'
    let where = { "_id": ObjectID(id) }
    let datastr = await mysql.delete(table, where)
    let result = util.status(datastr)
    return JSON.stringify(result)
  }
}
