/**
 * Created by Nora on 2019/11/07.
 */
import { Service } from 'egg';
import basesql from "../base/mysql";
const path = require('path')
const fs = require('fs')
const server = new basesql();

export default class Shop extends Service {
  // 根据条件获取组件列表
  async getCompList(query) {
    let res: any = await server.myquery('SELECT isMobile,compName,compImg,compAttr,type,title,description,boxSwitch,boxOptions,dataModel,dataSwitch,actionModel,actionSwitch,styleID FROM comp_store WHERE isMobile=? and userID=?', [query.isMobile, '0']);
    res && res.forEach(element => {
      element.compAttr = element.compAttr && JSON.parse(element.compAttr) || {};
      element.boxOptions = element.boxOptions && JSON.parse(element.boxOptions) || {};
      element.dataModel = element.dataModel && JSON.parse(element.dataModel) || {};
      element.actionModel = element.actionModel && JSON.parse(element.actionModel) || [];
    });
    return res;
  }
  async getCustomCompList(query) {
    let res: any = await server.myquery('SELECT isMobile,userID,compName,compImg,compAttr,type,title,description,boxSwitch,boxOptions,dataModel,dataSwitch FROM comp_store WHERE type=? and isMobile=? and (userID=? or shareTo like ?)', ['custom', query.isMobile, query.userID, '%'+query.userID+'%'])
    res && res.forEach(element => {
      element.compAttr = element.compAttr && JSON.parse(element.compAttr) || {};
      element.boxOptions = element.boxOptions && JSON.parse(element.boxOptions) || {};
      element.dataModel = element.dataModel && JSON.parse(element.dataModel) || {};
      element.actionModel = element.actionModel && JSON.parse(element.actionModel) || [];
    });
    return res;
  }
  async getCompMarket() {
    let sql = 'select compName,compImg,title,description,userID,compID from comp_store where isMarket="1" order by createTime DESC';
    let res: any = await server.myquery(sql, []);
    return res;
  }
  async updateCompMarket(userID, params) {
    let sql = 'update comp_store set isMarket=? where userID=? and compID=?';
    let res: any = await server.myquery(sql, [params.isMarket, userID, params.compID])
    return res.affectedRows ? 'success' : 'failed';
  }
  async getCompCollect(userID) {
    let comps: any = await server.myquery('select comps from collections where userID=?', [userID]);
    let tempComps = comps && comps[0] && JSON.parse(comps[0].comps) || [];
    let sql = 'select compName,compImg,title,description,userID,compID from comp_store where compID=?';
    let resComps: any = [];
    for (let i = 0; i < tempComps.length; i++) {
      let compID = tempComps[i];
      let compInfo: any = await server.myquery(sql, [compID]);
      if (compInfo[0]) {
        resComps.push(compInfo[0]);
      }
    }
    return resComps;
  }
  async addCompCollect(userID, params) {
    //判断这个用户是否收藏过
    let isUser: any = await server.myquery('select comps from collections where userID=?', [userID]);
    if (isUser[0]) {
      //收藏过
      let oldComs: any = JSON.parse(isUser[0].comps);
      let index = oldComs.indexOf(params.compID);
      if (index != -1) {
        return '该组件已经收藏过了';
      }
      oldComs.push(params.compID);
      let res: any = await server.myquery('update collections set comps=? where userID=?', [JSON.stringify(oldComs), userID]);
      return res.affectedRows ? 'success' : 'error';
    } else {
      //没有收藏过
      let comps: any = [];
      comps.push(params.compID);
      let res: any = await server.myquery('insert into collections set userID=?,comps=?,apps=?', [userID, JSON.stringify(comps), '[]']);
      return res.insertId ? 'success' : 'error';
    }
  }
  async deleteCompCollect(userID, params) {
    let comps: any = await server.myquery('select comps from collections where userID=?', [userID]);
    let compIDs = comps && comps[0] && JSON.parse(comps[0].comps);
    compIDs.forEach((compID, i) => {
      if (compID === params.compID) {
        compIDs.splice(i, 1);
      }
    });
    let res: any = await server.myquery('update collections set comps=? where userID=?', [JSON.stringify(compIDs), userID]);
    return res.affectedRows ? 'success' : 'failed';
  }
  async getCompDetail(compID) {
    let res: any = await server.myquery('select compID,compName,compImg,type,title,description,compAttr,useInfo FROM comp_store WHERE compID=?', [compID]);
    return res[0];
  }

  async shareComp(params) {
    let res: any = await server.myquery('select userID from user_infor where userPhone=?', [params.shareTo]);
    if (!(res[0] && res[0].userID)) { return '该用户不存在！' }
    let shareID = res[0] && res[0].userID;
    let oldShareIDstr: any = await server.myquery('select shareTo from comp_store where compID=?', [params.compID]);
    let oldShareID = oldShareIDstr[0] && oldShareIDstr[0].shareTo && JSON.parse(oldShareIDstr[0].shareTo) || [];
    oldShareID.push(shareID);
    let result: any = await server.myquery('update comp_store set shareTo=? where compID=?', [JSON.stringify(oldShareID), params.compID]);
    return result.affectedRows ? 'success' : false;
  }

  async compImg(filename){
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    const fileData =  fs.readFileSync(target);
    return fileData;
  }
}