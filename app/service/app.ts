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
      const res = await mysql.insert(table, data)
      app = res ? data : null;
      isNew = true;
    }
    const resultApp = app && {
      id: app._id,
      name: app.name,
      username: app.username,
      telephone: app.telephone,
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
      }));
      return JSON.stringify(users)
    }
    return '';
  }
}
