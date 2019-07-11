import { Service } from 'egg';
// import base from '../base/mongodb';
// const mysql = new base();
// const ObjectID = require('mongodb').ObjectID;

/**
 * table service
 */
export default class Sheet extends Service {
  // 批量更新数据表的数据
  public async helloWorld(): Promise<string> {
    let result = "hello world"
    return result;
  }

  public async testpost(id, name, phone: number, age: number): Promise<object> {
    console.log(id)
    let temp = {
      myid: id,
      myname: name,
      myphone: phone,
      myage: age
    }
    return temp;
  }
}
