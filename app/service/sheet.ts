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
  // 获取行列的所有数据
  public async getSheetById(tableId): Promise<string> {
    let table: string = 'sheet'
    let colsTable = 'column'
    const where = { "tableId": tableId }

    let data = { rows: <any>[], cols: <any>[], viewData: {} }
    data.rows = await mysql.find(table, where)
    data.cols = await mysql.find(colsTable, where)
    let tableinfor: any = []
    tableinfor = await mysql.find('table', { "_id": ObjectID(tableId) })
    data.viewData = tableinfor[0].viewData

    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 获取单行的数据
  public async getRowsById(tableId, id): Promise<string> {
    // let table: string = 'sheet'
    const where = { "_id": ObjectID(id) }

    let data = await mysql.find(tableId, where)
    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 新增单行的数据
  public async insertSheetById(obj): Promise<string> {
    let table: string = 'sheet'
    let data = await mysql.insert(table, obj)

    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 更新单行的数据
  public async updateSheetById(id, data): Promise<string> {
    let table: string = 'sheet'
    let where = { "_id": ObjectID(id) }
    let result = await mysql.update(table, data, where)
    return JSON.stringify(result)
  }
}
