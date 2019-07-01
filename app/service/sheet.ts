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
    page = page || 0;
    const where = { "tableId": tableId }
    let data = { rows: <any>[], cols: <any>[], id: '', name: "", appId: "", viewData: <any>{}, }
    let tableInfor: any = []
    tableInfor = await mysql.find('table', { "_id": ObjectID(tableId) })
    let appInfor: any = await mysql.find('app', { "_id": ObjectID(tableInfor[0].appId) })

    // 排序
    let sort = this.getSortBy(tableInfor[0].sortBy)
    let filter = this.getFilter(tableInfor[0].filter)

    // 查询数据
    data.rows = await mysql.find(tableId, filter, page, size, sort)
    data.cols = await mysql.find(colsTable, where, 0, 0, { "sortRank": 1 })

    // 改变列的ID
    let colsNameBox: any = []
    for (let i in data.cols) {
      let cols = data.cols[i]
      cols.id = cols._id
      colsNameBox.push(cols._id)
    }

    // 遍历动态获取行的内容
    for (let r in data.rows) {
      let row = data.rows[r]
      let tempRow: any = {}
      tempRow.id = row._id
      tempRow.createdTime = row.createdTime
      tempRow.editTime = row.createdTime
      tempRow.userInfor = this.getRowByColList(appInfor[0], ["username", "avatar"])
      tempRow.userInfor.id = appInfor[0]._id
      tempRow.cellValues = this.getRowByColList(row, colsNameBox)
      data.rows[r] = tempRow
    }

    // Object.assign(data, tableInfor[0])
    data.id = tableInfor[0]._id
    data.name = tableInfor[0].name
    data.appId = tableInfor[0].appId
    let tempTotal = await mysql.countDocuments(tableId, filter)
    data.viewData = this.getRowByColList(tableInfor[0], ["filter", "sortBy", "meta", "colActions"])
    data.viewData.pagination = {
      pageSize: size,
      currentPage: page,
      total: tempTotal
    }

    let result = util.status(data)
    return JSON.stringify(result)
  }

  getFilter(filter) {
    if (filter) {
      let whereFilter = { $and: <any>[] }
      for (let i in filter.filterSet) {
        let { columnId, operator, value } = filter.filterSet[i];
        let result: any = {}
        // let range: any = {}
        switch (operator) {
          case 'empty':
            whereFilter[columnId] = ""
            break;
          case 'filled':
            whereFilter[columnId] = { $not: /^\s*$/ }
            break;
          case 'range':
            if (value.max) {
              whereFilter[columnId] = { $lte: value.max }
            }
            if (value.min && value.max) {
              Object.assign(whereFilter[columnId], { $gte: value.min })
            } else if (value.min) {
              whereFilter[columnId] = { $gte: value.min }
            }
            break;
          case 'rangedate':
            whereFilter[columnId] = { $lte: Date.parse(value[1]), $gte: Date.parse(value[0]) }
            break;
          case 'filetype':
            result[columnId] = this.hasValue(value)
            break;
          case 'contains':
            result[columnId] = this.hasValue(value)
            break;
          case 'user-contains':
            result[columnId + '.id'] = this.filterUser(value)
            console.log(result);
            break;
        }
        whereFilter.$and.push(result)
      }
      return whereFilter.$and.length ? whereFilter : undefined
    }
    return undefined
  }

  hasValue(value) {
    let tempObj: any = {}
    let rule
    if (Array.isArray(value)) {
      rule = eval(`/(${value.join('|')})/`)
    } else {
      rule = eval(`/${value}/`)
    }
    tempObj = { $regex: rule }
    return tempObj
  }

  filterUser(filterValue) {
    if (filterValue && filterValue.length > 0) {
      const ids = filterValue.map(val => val.id);
      return this.hasValue(ids);
    }
    return {};
  }

  getSortBy(tableData) {
    if (tableData) {
      let tempObj = {}
      let type
      if (tableData.type === "desc") {
        type = -1
      } else if (tableData.type === "asc") {
        type = 1
      }
      tempObj[tableData.columnId] = type
      return tempObj
    }
  }

  getRowByColList(row, colList) {
    let tempObj = {}
    for (let i in colList) {
      let colName = colList[i]
      tempObj[colName] = row[colName]
    }
    return tempObj
  }

  // 更新viewdata的数据
  // public async updateViewData(tableId, data): Promise<string> {
  //   let table: string = 'table'
  //   const where = { "_id": ObjectID(tableId) }

  //   let dataStr = await mysql.update(table, data, where)
  //   let result = util.status(dataStr)
  //   return JSON.stringify(result)
  // }

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
    const newId = ObjectID();
    obj._id = newId;
    const tables: any = await mysql.find('table', { _id: ObjectID(tableId) })
    const table = tables[0];
    let data = await mysql.insert(tableId, obj)
    if (data && table) {
      const apps: any = await mysql.find('app', { _id: ObjectID(table.appId) })
      const app = apps[0];
      if (app) {
        const where = { "_id": ObjectID(newId.toString()) }
        let rows: any = await mysql.find(tableId, where);
        if (rows.length) {
          const rowData = rows[0];
          const cols: any = await mysql.find('column', { tableId: tableId }, 0, 0, { "sortRank": 1 });
          const resultRow: any = {};
          resultRow.id = rowData._id;
          resultRow.createdTime = rowData.createdTime;
          resultRow.editTime = rowData.createdTime;
          resultRow.userInfor = this.getRowByColList(app, ["username", "avatar"])
          resultRow.userInfor.id = app._id
          resultRow.cellValues = {};
          for (const col of cols) {
            resultRow.cellValues[col._id] = rowData[col._id];
          }
          let result = util.status(resultRow)
          return JSON.stringify(result)
        }
      }
    }
    let result = util.status(false)
    return JSON.stringify(result)
  }

  // 更新单行的数据
  public async updateSheetById(tableId, id, data): Promise<string> {
    let where = { "_id": ObjectID(id) }
    data.createdTime = new Date()
    const tables: any = await mysql.find('table', { _id: ObjectID(tableId) })
    const table = tables[0];
    let dataStr = await mysql.update(tableId, data, where);
    if (dataStr && table) {
      const apps: any = await mysql.find('app', { _id: ObjectID(table.appId) })
      const app = apps[0];
      if (app) {
        const where = { "_id": ObjectID(id) }
        let rows: any = await mysql.find(tableId, where);
        if (rows.length) {
          const rowData = rows[0];
          const cols: any = await mysql.find('column', { tableId: tableId }, 0, 0, { "sortRank": 1 });
          const resultRow: any = {};
          resultRow.id = rowData._id;
          resultRow.createdTime = rowData.createdTime;
          resultRow.editTime = rowData.createdTime;
          resultRow.userInfor = this.getRowByColList(app, ["username", "avatar"])
          resultRow.userInfor.id = app._id
          resultRow.cellValues = {};
          for (const col of cols) {
            resultRow.cellValues[col._id] = rowData[col._id];
          }
          let result = util.status(resultRow)
          return JSON.stringify(result)
        }
      }
    }
    let result = util.status(dataStr)
    return JSON.stringify(result)
  }

  // 根据ID删除单行的数据
  // public async deleteSheetById(tableId, id): Promise<string> {
  //   let where = { "_id": ObjectID(id) }
  //   let dataStr = await mysql.delete(tableId, where)
  //   let result = util.status(dataStr)
  //   return JSON.stringify(result)
  // }

  // 根据ID删除单行的数据
  public async deleteSheetsByTableId(tableId, data): Promise<string> {
    if (Array.isArray(data)) {
      for (let i in data) {
        let where = { "_id": ObjectID(data[i]) }
        await mysql.delete(tableId, where)
      }
      let result = util.status(true)
      return JSON.stringify(result)
    }
    let result = util.status(false)
    return JSON.stringify(result)
  }

  public async deleteRowsByTableId(tableId: string, type: 'keep'|'del', ids: string[]): Promise<string> {
    let where = {};
    let result: any = false;
    console.log(ids);
    console.log(type);
    if (ids && ids.length > 0) {
      ids = ids.map(id => ObjectID(id));
    }
    if (type === 'keep') {
      // 为keep表示保留的id, 如果ids为空，则全部删除
      where = { "_id": { $nin: ids }};
      result = await mysql.delete(tableId, where);
    } else if (type === 'del') {
      if (ids && ids.length > 0) {
        where = { "_id": { $in: ids }};
        result = await mysql.delete(tableId, where);
      }
    }
    result = util.status(result);
    return JSON.stringify(result);
  }
}
