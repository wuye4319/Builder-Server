import { Service } from 'egg';
import base from '../base/mongodb'
const mysql = new base()
import tools from '../tools/util'
const util = new tools()

/**
 * table service
 */
export default class Sheet extends Service {
  // 获取表的数据
  public async getSheetListByAppId(appId): Promise<string> {
    let table: string = 'table'
    const where = { "appId": appId }

    let data = await mysql.find(table, where)
    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 获取行的数据
  public async getSheetById(tableId): Promise<string> {
    let table: string = 'sheet'
    let colsTable = 'column'
    const where = { "tableId": tableId }

    let data = { rows: <any>[], cols: <any>[] }
    data.rows = await mysql.find(table, where)
    data.cols = await mysql.find(colsTable, where)

    let result = util.status(data)
    return JSON.stringify(result)
  }

  public async insertSheetById(data): Promise<string> {
    let table: string = 'sheet'
    let result = await mysql.insert(table, data)
    return JSON.stringify(result)
  }

  public async updateSheetById(data): Promise<string> {
    let table: string = 'sheet'
    let result = await mysql.update(table, data)
    return JSON.stringify(result)
  }
}
