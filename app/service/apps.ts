import { Service } from 'egg';
import basesql from "../base/mysql";
const server = new basesql();

export default class Apps extends Service {
  async getAppList(userID) {
    let sql = 'select appName,description,appID,userID,jsCode from apps where userID=? order by createTime DESC';
    let res: any = await server.myquery(sql, [userID]);
    return res;
  }
  async getAppStore() {
    let sql = 'select appName,description,appID,userID from apps where isMarket="1" order by createTime DESC';
    let res: any = await server.myquery(sql, []);
    return res;
  }
  async updateAppStore(userID, params) {
    let sql = 'update apps set isMarket=? where userID=? and appID=?';
    let res: any = await server.myquery(sql, [params.isMarket, userID, params.appID])
    return res.affectedRows ? 'success' : 'failed';
  }
  async getAppCollect(userID) {
    let apps: any = await server.myquery('select apps from collections where userID=?', [userID]);
    let tempApps = apps && apps[0] && JSON.parse(apps[0].apps) || [];
    let sql = 'select appName,description,appID,userID from apps where appID=?';
    let resApps: any = [];
    for (let i = 0; i < tempApps.length; i++) {
      let appID = tempApps[i];
      let appInfo: any = await server.myquery(sql, [appID]);
      if (appInfo[0]) {
        resApps.push(appInfo[0]);
      }
    }
    return resApps;
  }
  async addAppCollect(userID, params) {
    //判断这个用户是否收藏过
    let isUser: any = await server.myquery('select apps from collections where userID=?', [userID]);
    if (isUser[0]) {
      //收藏过
      let oldApps: any = JSON.parse(isUser[0].apps);
      let index = oldApps.indexOf(params.appID);
      if (index != -1) {
        return '该应用已经收藏过了';
      }
      oldApps.push(params.appID);
      let res: any = await server.myquery('update collections set apps=? where userID=?', [JSON.stringify(oldApps), userID]);
      return res.affectedRows ? 'success' : 'error';
    } else {
      //没有收藏过
      let apps: any = [];
      apps.push(params.appID);
      let res: any = await server.myquery('insert into collections set userID=?,comps=?,apps=?', [userID, '[]', JSON.stringify(apps)]);
      return res.insertId ? 'success' : 'error';
    }
  }
  async deleteAppCollect(userID, params) {
    let apps: any = await server.myquery('select apps from collections where userID=?', [userID]);
    let appIDs = apps && apps[0] && JSON.parse(apps[0].apps);
    appIDs.forEach((appID, i) => {
      if (appID === params.appID) {
        appIDs.splice(i, 1);
      }
    });
    let res: any = await server.myquery('update collections set apps=? where userID=?', [JSON.stringify(appIDs), userID]);
    return res.affectedRows ? 'success' : 'failed';
  }
  async getAppDetail(appID) {
    let res: any = await server.myquery('select pageInfor,appName,description,global,jsCode from apps where appID=?', [appID]);
    return res[0];
  }
}