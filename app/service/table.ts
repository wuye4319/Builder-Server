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

  async getTableByAppId2(appId): Promise<string> {
    let table: string = 'table'
    const where = { "appId": appId }

    let data: any = await mysql.find(table, where)
    return data
  }

  // 获取列的单行数据
  public async getTableById(id): Promise<string> {
    let table: string = 'table'
    const where = { "_id": ObjectID(id) }

    let data = await mysql.find(table, where)
    let result = util.status(data)
    return JSON.stringify(result)
  }

  // 新增行的数据
  public async insertTableByAppId(appId, obj): Promise<string> {
    let table: string = 'table'
    obj.appId = appId
    obj.viewData = {
      "filter": {
        "conjunction": "and",
        "filterSet": []
      },
      "sortBy": null,
      "meta": {
        "rowHeight": "short",
        "fixedColumns": []
      },
      "colActions": {
        "view": [
          {
            "code": "filter",
            "text": "筛选"
          },
          {
            "code": "hide",
            "text": "隐藏此列"
          }
        ],
        "data": [
          {
            "code": "modify",
            "text": "设置列属性"
          },
          {
            "code": "leftInsert",
            "text": "左侧插入列"
          },
          {
            "code": "rightInsert",
            "text": "右侧插入列"
          },
          {
            "code": "delete",
            "text": "删除此列"
          }
        ]
      }
    }
    let insertData = await mysql.insert(table, obj)

    if (insertData) {
      // 创建数据表
      let data = await this.getTableByAppId2(appId)
      let lastTable: any = data[data.length - 1]
      lastTable.id = lastTable._id
      await mysql.createCollection(lastTable._id.toString())

      let result = util.status(lastTable)
      return JSON.stringify(result)
    } else {
      let result = util.status(false)
      return JSON.stringify(result)
    }
  }

  // 更新行的数据
  public async updateTableById(id, data): Promise<string> {
    let table: string = 'table'
    let where = { "_id": ObjectID(id) }
    let dataStr = await mysql.update(table, data, where)
    let result = util.status(dataStr)
    return JSON.stringify(result)
  }

  // 删除行的数据
  public async deleteTableById(id): Promise<string> {
    let table: string = 'table'
    let where = { "_id": ObjectID(id) }
    let dataStr = await mysql.delete(table, where)
    if (dataStr) {
      await mysql.deleteCollection(id)
    }
    let result = util.status(dataStr)
    return JSON.stringify(result)
  }
}
