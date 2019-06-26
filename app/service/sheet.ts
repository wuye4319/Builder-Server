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
  public async getSheetById(tableId, page, size): Promise<string> {
    // let table: string = 'sheet'
    let colsTable = 'column'
    const where = { "tableId": tableId }
    let data = { rows: <any>[], cols: <any>[], id: '', viewData: { pagination: {} }, }
    let tableinfor: any = []
    tableinfor = await mysql.find('table', { "_id": ObjectID(tableId) })
    console.log(tableinfor[0].viewData.filter)

    data.rows = await mysql.find(tableId, undefined, page, size)
    data.cols = await mysql.find(colsTable, where, 0, 0, { "sortRank": 1 })

    // 改变列的ID
    let colsNameBox: any = []
    for (let i in data.cols) {
      let cols = data.cols[i]
      cols.id = cols._id
      delete cols._id
      colsNameBox.push(cols._id)
    }

    // 遍历动态获取行的内容
    for (let r in data.rows) {
      let row = data.rows[r]
      let tempRow: any = {}
      tempRow.id = row._id
      tempRow.createdTime = row.createdTime
      tempRow.cellValues = this.getRowByColList(row, colsNameBox)
      data.rows[r] = tempRow
    }

    Object.assign(data, tableinfor[0])
    data.id = tableinfor[0]._id
    let tempTotal = await mysql.countDocuments(tableId)
    data.viewData.pagination = {
      pageSize: size,
      currentPage: page,
      total: tempTotal
    }

    let result = util.status(data)
    return JSON.stringify(result)
  }

  getRowByColList(row, colList) {
    let tempObj = {}
    for (let i in colList) {
      let colName = colList[i]
      tempObj[colName] = row[colName]
    }
    return tempObj
  }

  // 获取单行的数据
  public async updateViewData(tableId, data): Promise<string> {
    let table: string = 'table'
    const where = { "_id": ObjectID(tableId) }

    let dataStr = await mysql.update(table, data, where)
    let result = util.status(dataStr)
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
  public async insertSheetById(tableId, obj): Promise<string> {
    obj.createdTime = new Date()
    let data = await mysql.insert(tableId, obj)

    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 更新单行的数据
  public async updateSheetById(tableId, id, data): Promise<string> {
    let where = { "_id": ObjectID(id) }
    data.createdTime = new Date()

    let dataStr = await mysql.update(tableId, data, where)
    let result = util.status(dataStr)
    return JSON.stringify(result)
  }

  // 根据ID删除单行的数据
  public async deleteSheetById(tableId, id): Promise<string> {
    let where = { "_id": ObjectID(id) }
    let dataStr = await mysql.delete(tableId, where)
    let result = util.status(dataStr)
    return JSON.stringify(result)
  }
}
