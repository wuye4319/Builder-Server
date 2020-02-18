/**
 * Created by nero on 2017/6/2.
 */
const crypto = require('crypto');
import { Service } from 'egg';
import basesql from "../base/mysql";
const server = new basesql();

export default class Shop extends Service {
  async getpageconfig(userID, appID) {
    let data: any = {};
    let apps: any = await server.myquery('select pageInfor,appName,description,jsCode,global,tables from apps where appID=?', [appID])
    let app = apps[0] || {};
    let pageInfor = app.pageInfor && JSON.parse(app.pageInfor) || {};
    let tables = app.tables && JSON.parse(app.tables) || [];
    for (let i = 0; i < tables.length; i++) {
      let table = tables[i];
      let content: any = await server.myquery('select * from ??', [table.tableName]);
      content[0] && content[0].sort ? table.content = await server.myquery('select * from ?? order by sort', [table.tableName]) : table.content = content;
      table.struct = await server.myquery('select column_name,data_type,column_comment from information_schema.columns where table_name=?', [table.tableName])
      tables[i] = table;
    }
    data.global = app.global && JSON.parse(app.global) || {};
    data.tables = tables;
    app.pageInfor = pageInfor;
    delete app.global;
    delete app.tables;
    data.apps = app;
    data.userID = userID;
    return data;
  }

  async editpageconfig(appID, pagestr, globalstr) {
    pagestr = JSON.stringify(pagestr)
    if (pagestr === '{}') {
      pagestr = '{"default":{"title":"默认页","screen":"desktop","module":[]}}';
    }
    globalstr = JSON.stringify(globalstr)
    let result: any = await server.myquery('update apps set pageInfor=?,global=? WHERE appID=?', [pagestr, globalstr, appID])
    return result.affectedRows ? 'success' : 'failed'
  }

  async getApps(userID, query) {
    let sql = `SELECT appName,appID,pageInfor,global,description,screen,isMarket,jsCode FROM apps WHERE screen like ? and appName like ? and (userID=? or shareTo like ?) ORDER BY createTime DESC`;
    let resData: any = await server.myquery(sql, ['%' + query.screen + '%', '%' + query.appName + '%', userID, '%' + userID + '%']);
    return resData;
  }

  async addApp(userID, params) {
    let existAppNames: any = await server.myquery('select appName from apps where userID=?', [userID]);
    let isDuplicate = false;
    existAppNames && existAppNames.forEach(appName => {
      if (appName.appName == params.appName) {
        isDuplicate = true;
      }
    });
    if (isDuplicate) {
      return { data: false, msg: '该应用名称已使用过！' }
    }
    let appID = crypto.createHash('md5').update((new Date().getTime()).toString()).digest('hex');
    let sql = `INSERT INTO apps set userID=?,appID=?,appName=?,jsCode=?,description=?,pageInfor=?,global=?`;
    let global = '{}';
    let resData: any = await server.myquery(sql, [userID, appID, params.appName, params.jsCode, params.description, '{"default":{"title":"默认页","screen": "desktop","module":[]}}', global]);
    return { data: resData.affectedRows ? 'success' : 'failed' };
  }

  async shareApp(params) {
    let res: any = await server.myquery('select userID from user_infor where userPhone=?', [params.shareTo]);
    if (!(res[0] && res[0].userID)) { return '该用户不存在！' }
    let shareID = res[0] && res[0].userID;
    let oldShareIDstr: any = await server.myquery('select shareTo from apps where appID=?', [params.appID]);
    let oldShareID = oldShareIDstr[0] && oldShareIDstr[0].shareTo && JSON.parse(oldShareIDstr[0].shareTo) || [];
    oldShareID.push(shareID);
    let result: any = await server.myquery('update apps set shareTo=? where appID=?', [JSON.stringify(oldShareID), params.appID]);
    return result.affectedRows ? 'success' : 'error';
  }

  async editApp(appID, params) {
    let sql = `update apps set appName=?,description=?,jsCode=? where appID=?`;
    let resData: any = await server.myquery(sql, [params.appName, params.description, params.jsCode, appID]);
    return resData.affectedRows ? 'success' : 'failed';
  }

  async deleteApp(userID, query) {
    let sql = `delete from apps where appID=? and userID=?`;
    let tables: any = await server.myquery('select tables from apps where appID=?', [query.appID, userID]);
    let fortables = tables[0] && JSON.parse(tables[0].tables) || [];
    for (let i = 0; i < fortables.length; i++) {
      let table = fortables[i];
      await server.myquery('DROP TABLE ??', [table.tableName]);
    }
    let resData: any = await server.myquery(sql, [query.appID, userID]);
    return resData.affectedRows ? 'success' : 'failed';
  }

  async saveCompStore(user, params) {
    let compID = crypto.createHash('md5').update((new Date().getTime()).toString()).digest('hex');
    let sql = `INSERT INTO comp_store set isMobile=?,compImg=?,compName=?,compID=?,description=?,title=?,userID=?,type=?,boxSwitch=?,boxOptions=?,compAttr=?,useInfo=?,dataSwitch=?,dataModel=?,actionSwitch=?,actionModel=?`;
    let options = [params.isMobile,params.compImg, params.compName, compID, params.description, params.title, user, params.type, params.boxSwitch, params.boxOptions, params.compAttr, params.useInfo, params.dataSwitch, params.dataModel, params.actionSwitch, params.actionModel];
    let resData: any = await server.myquery(sql, options);
    return resData.affectedRows ? 'success' : 'failed';
  }

  async getCompStore(userID, query) {
    let sql = `SELECT isMarket,compID,compName,compImg, isMobile,type,title,description,compAttr,boxSwitch,boxOptions,dataSwitch,dataModel,actionSwitch,actionModel,useInfo FROM comp_store WHERE type=? and compName like ? and (userID=? or shareTo like ?) ORDER BY createTime DESC`;
    let options = [query.type, '%' + query.compName + '%', userID, '%' + userID + '%'];
    if (userID === '0') { // 系统组件
      sql = 'select isMarket,compID,compName,compImg,type,title,description,compAttr,boxSwitch,boxOptions,dataSwitch,dataModel,actionSwitch,actionModel,useInfo FROM comp_store WHERE userID=? and compName like ? ORDER BY createTime DESC'
      options = [userID, '%' + query.compName + '%']
    }
    let resData: any = await server.myquery(sql, options)
    return resData;
  }

  async deleteCompStore(userID, query) {
    let sql = 'DELETE FROM comp_store WHERE compName=? and userID=?';
    let resData: any = await server.myquery(sql, [query.compName, userID]);
    return resData.affectedRows ? 'success' : 'failed';
  }

  async editCompByName(user, params) {
    let sql = 'update comp_store set ? where compID=? and (userID=? or shareTo like ?)';
    let options = [params, params.compID, user, "%" + user + "%"];
    if (params.type !== 'custom') {
      sql = 'update comp_store set ? where compID=?';
      options = [params, params.compID];
    }
    let resData: any = await server.myquery(sql, options);

    return resData.affectedRows ? 'success' : 'failed';
  }

  async getGuideDoc(type) {
    let sql = 'select docContent from docs where docName=?';
    let resData: any = await server.myquery(sql, [type]);
    return resData[0] && resData[0].docContent || '';
  }

  async savePageActions(params) {
    //判断某个应用下的页面是否已存储代码；
    let isSaved: any = await server.myquery('select actionsStr from page_actions where appID=? and pageName=?', [params.appID, params.pageName]);
    let sql = 'insert into page_actions set ?';
    let options = params;
    if (isSaved[0]) {
      sql = 'update page_actions set actionsStr=? where appID=? and pageName=?';
      options = [params.actionsStr, params.appID, params.pageName];
    }
    let res: any = await server.myquery(sql, options);
    return res.affectedRows ? 'success' : false;
  }

  async getPageActions(query) {
    let res: any = await server.myquery('select actionsStr from page_actions where appID=? and pageName=?', [query.appID, query.pageName]);
    return res ? res : false;
  }

}
