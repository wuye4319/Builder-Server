import { Service } from 'egg';
import base from '../base/mongodb';
const mysql = new base();
import tools from '../tools/util';
const util = new tools();
const ObjectID = require('mongodb').ObjectID;

/**
 * table service
 */
export default class Sheet extends Service {
  // 批量更新数据表的数据
  public async updateAllSheet(): Promise<string> {
    const app: any = await mysql.find('app', {});
    let dataStr
    for (let i in app) {
      const table: any = await mysql.find('table', { appId: app[i]._id.toString() })
      for (let t in table) {
        const column: any = await mysql.find('column', { 'tableId': table[t]._id.toString() })
        for (let c in column) {
          if (column[c].colType === 'FormPhoto') {
            let { tableId } = column[c]
            let { _id } = column[c]
            console.log(tableId)
            const sheet: any = await mysql.find(tableId, {})
            for (let s in sheet) {
              const sheetId = sheet[s]._id
              let sheetItem = sheet[s][_id]
              if (sheetItem.length) {
                let newData: any = {}
                newData[_id] = []
                for (let item in sheetItem) {
                  if (typeof (sheetItem[item]) === "string") {
                    console.log(sheetItem[item])
                    let its = sheetItem[item]
                    let data = {
                      "fileName": its.substr(its.lastIndexOf('/')),
                      "url": its,
                      "extension": '.' + its.substr(its.lastIndexOf('/')).split('.')[1]
                    }
                    newData[_id].push(data)
                  }
                }
                let where = { _id: ObjectID(sheetId) }
                console.log(where, newData, sheetId)
                dataStr = await mysql.update(tableId, newData, where);
              }
            }
          }
        }
      }
    }
    const result = util.status(dataStr);
    return JSON.stringify(result);
  }
}
