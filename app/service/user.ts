/**
 * Created by nero on 2017/6/2.
 */
import { Service } from 'egg';
import basesql from "../base/mysql";
const server = new basesql();
const crypto = require('crypto');

export default class Upload extends Service {
  async getUserInfor(userPhone) {
    let result: any = await server.myquery('select userName,userPhone,userID,userAge,userType from user_infor where userPhone=?', [userPhone])
    return result.length ? result[0] : 'failed'
  }

  async addUser(userData) {
    let userTemp = userData;
    let userID = crypto.createHash('md5').update(userData.userPhone + (new Date().getTime()).toString()).digest('hex');
    let userName = 'u_' + userData.userPhone;
    let userAge = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    userTemp.userID = userID;
    userTemp.userName = userName;
    userTemp.userAge = userAge;
    let result: any = await server.myquery(`insert into user_infor set userName=?,userPhone=?,userID=?,userAge=?`, [userName, userData.userPhone, userID,userAge]);
    return result.insertId ? userTemp : 'failed'
  }

  async editUser(userID, infor) {
    let result: any = await server.myquery('update user_infor set userName=?,userAge=? where userID=?', [infor.userName, infor.userAge, userID])
    return result.changedRows ? 'success' : 'failed'
  }

  async deleteUser(userID) {
    let result: any = await server.myquery('delete from user_infor where userID=?', [userID])
    return result.changedRows ? 'success' : 'failed'
  }
}
