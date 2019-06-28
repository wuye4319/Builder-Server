import { Service } from 'egg';
import base from '../base/mongodb'
const mysql = new base()
import tools from '../tools/util'
const util = new tools()
const ObjectID = require('mongodb').ObjectID

type summaryType = 'filled' | 'empty' | 'none' | 'sum' | 'average' | 'max' | 'min';

/**
 * table service
 */
export default class Sheet extends Service {
  // 获取列的单行数据
  public async getColsByTableId(tableId): Promise<string> {
    let table: string = 'column'
    const where = { "tableId": tableId }

    let data = await mysql.find(table, where)
    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 根据tableID新增列的数据
  public async insertColsBySheet(obj): Promise<string> {
    let table: string = 'column'
    let colsIndex: any = await mysql.countDocuments(table, { "tableId": obj.tableId })
    if (obj.srotRank) {

    } else {
      obj.srotRank = (parseInt(colsIndex) + 1) * 10
    }
    let data = await mysql.insert(table, obj)

    // update rows
    let tableId = obj.tableId
    const where = { "tableId": tableId }
    let cols: any = await mysql.find(table, where)
    if (cols) {
      let lastCols: any = cols[cols.length - 1]

      let tempCols = lastCols._id.toString()
      let newStr = {}
      newStr[tempCols] = ""
      await mysql.update(tableId, newStr, {}, true)

      let result = util.status(data)
      return JSON.stringify(result)
    }
    return '';
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

  public async updateColSummary(tableId: string, columnId: string, type: summaryType): Promise<string> {
    const service = this.ctx.service.sheet;
    const tableInfor: any = await mysql.find('table', { "_id": ObjectID(tableId) })

    let resultObj: any = null;
    // 排序 筛选
    if (tableInfor.length) {
      let summaryResult = 0;
      if (type !== 'none') {
        let sort = service.getSortBy(tableInfor[0].sortBy)
        let filter = service.getFilter(tableInfor[0].filter)
        const rows: any = await mysql.findAll(tableId, filter, sort);
        if (rows.length > 0) {
          rows.forEach((row, index) => {
            let value = row[columnId];
            switch(type) {
              case 'sum':
              case 'average':
                value = Number(value);
                if (!Number.isNaN(value)) {
                  summaryResult += value;
                }
                break;
              case 'filled':
                if (value !== undefined && value !== null && value !== '') {
                  summaryResult += 1;
                }
                break;
              case 'empty':
                if (value === undefined && value === null  && value === '') {
                  summaryResult += 1;
                }
                break;
              case 'max':
                value = Number(value);
                if (!Number.isNaN(value)) {
                  if (index === 0) {
                    summaryResult = value;
                  }
                  if (value > summaryResult) {
                    summaryResult = value;
                  }
                }
                break;
              case 'min':
                value = Number(value);
                if (!Number.isNaN(value)) {
                  if (index === 0) {
                    summaryResult = value;
                  }
                  if (value < summaryResult) {
                    summaryResult = value;
                  }
                }
                break;
              }
          });
          if (type === 'average') {
            summaryResult = summaryResult / rows.length;
          }
        }
      }
      resultObj = { value: summaryResult, type };
      const res = mysql.update('column', {
        summary: resultObj
      }, { _id: ObjectID(columnId), tableId });
      resultObj = res ? resultObj : null;
    }

    let result = util.status(resultObj)
    return JSON.stringify(result)
  }
}
