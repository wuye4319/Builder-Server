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
    if (apps && apps.length > 0) {
      app = apps[0];
    } else {
      (data as any)._id = ObjectID();
      const res = await mysql.insert(table, data)
      app = res ? data : null;
    }
    const resultApp = app && {
      id: app._id,
      name: app.name,
      telephone: app.telephone,
    }
    let result = util.status(resultApp)
    return JSON.stringify(result)
  }
}
