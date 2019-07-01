import { Service } from 'egg';
import base from '../base/mongodb'
const mysql = new base()
import tools from '../tools/util'
const util = new tools()
const ObjectID = require('mongodb').ObjectID

/**
 * login service
 */
export default class App extends Service {
  public async getUserApp(data): Promise<string> {
    let table: string = 'app'
    const where = { "telephone": data.telephone }
    const apps: any = await mysql.find(table, where);
    let app;
    let isNew = false;;
    if (apps && apps.length > 0) {
      app = apps[0];
    } else {
      data._id = ObjectID();
      data.name = '未命名应用';
      const randomIndex = Math.round(Math.random() * 15);
      data.avatar = `/images/head/${randomIndex}.png`;
      const res = await mysql.insert(table, data);
      app = res ? data : null;
      isNew = true;
    }
    const resultApp = app && {
      id: app._id,
      name: app.name,
      username: app.username,
      telephone: app.telephone,
      avatar: app.avatar,
      isNew,
    }
    let result = util.status(resultApp)
    return JSON.stringify(result)
  }

  public async updateApp(id, data): Promise<string> {
    let table: string = 'app';
    const where = { _id: ObjectID(id) };
    let res = await mysql.update(table, data, where);
    let result = util.status(res)
    return JSON.stringify(result)
  }

  public async getAllUsers(): Promise<string> {
    let table: string = 'app';
    let apps: any = await mysql.findAll(table);
    if (apps && apps.length) {
      const users = apps.map(user => ({
        id: user._id,
        username: user.username,
        avatar: user.avatar,
      }));
      return JSON.stringify(util.status(users));
    }
    return '';
  }

  public async getColUsersByTableId(tableId: string, columnId: string): Promise<string> {
    let rows: any = await mysql.findAll(tableId);
    let resultUsers;
    if (rows && rows.length) {
      const map = {};
      rows.forEach(row => {
        const value = row[columnId];
        if (value && value.id) {
          map[value.id] = value;
        }
      });
      resultUsers = Object.values(map);
      return JSON.stringify(util.status(resultUsers));
    }
    return util.status(resultUsers);
  }



  // 临时接口，用于MVP版本记录点赞数量
  public async giveThumbup(userId: string): Promise<string> {
    // 固定疾风项目组app
    const resultTables: any = await mysql.find('table', { "name": "疾风内部收集-private" });
    if (resultTables.length > 0) {
      const table = resultTables[0];
      const tableId = table._id;
      const cols: any = await mysql.find('column', { "tableId": tableId.toString() });
      const nameCol = cols.find(col => col.colType === 'FormUser');
      const valueCol = cols.find(val => val.colType === 'FormNumber');
      if (nameCol && valueCol) {
        const rows: any = await mysql.find(tableId.toString(), {
          [nameCol._id + '.id']: userId
        });
        if (rows.length > 0) {
          const row = rows[0];
          const val = row[valueCol.id];
          await mysql.update(tableId.toString(), { 
            [valueCol._id]: val + 1
          }, { [nameCol._id + '.id']: userId });
        } else {
          const apps: any = await mysql.find('app', { '_id': ObjectID(userId) })
          if (apps.length > 0) {
            const app = apps[0];
            const res = await mysql.insert(tableId.toString(), {
              [nameCol._id]: {
                id: app._id,
                avatar: app.avatar,
                username: app.username,
              },
              [valueCol._id]: 1,
            });
            if (res) {
              return JSON.stringify(util.status(true))
            }
          }
        }
      }
    }
    return JSON.stringify(util.status(false));
  }
}
