import { basedb } from 'mysql'
const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
const dbName = 'h3wind';

export default class base implements basedb {
  connect() {
    return new Promise((resolve) => {
      MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        console.log("数据库已链接!");
        let db = client.db(dbName);
        resolve({ 'db': db, 'client': client })
      })
    })
  }

  // 创建集合
  createCollection(table: string) {
    return new Promise(async (resolve) => {
      let conn: any = await this.connect()
      conn.db.createCollection(table, function (err) {
        if (err) throw err;
        console.log("创建集合成功!");
        resolve(true)
        conn.client.close()
      })
    })
  }

  // 删除集合
  deleteCollection(table: string) {
    return new Promise(async (resolve) => {
      let conn: any = await this.connect()
      conn.db.collection(table).drop(function (err, delOK) { // 返回集合中所有数据
        if (err) throw err;
        if (delOK) console.log("集合已删除");
        resolve(delOK);
        conn.client.close()
      });
    })
  }

  // 更新操作，如果传入数组，则批量修改
  async update(table: string, myobj, where) {
    return new Promise(async (resolve) => {
      let conn: any = await this.connect()
      if (Array.isArray(myobj)) {
        let updateStr = { $set: { "url": "https://www.runoob.com" } };
        conn.db.collection(table).updateMany(where, updateStr, function (err, res) {
          if (err) throw err;
          console.log(res.result.nModified + " 条文档被更新");
          resolve(res.result.nModified)
          conn.client.close()
        });
      } else {
        let updateStr = { $set: myobj };
        conn.db.collection(table).updateOne(where, updateStr, function (err) {
          if (err) throw err;
          console.log("文档更新成功");
          resolve(true)
          conn.client.close()
        });

      }
    })
  }

  // 删除数据，如果传入数组，则批量删除
  async delete(table: string, myobj) {
    return new Promise(async (resolve) => {
      let conn: any = await this.connect()
      if (Array.isArray(myobj)) {
        let whereStr = { "name": '菜鸟教程' };  // 查询条件
        conn.db.collection(table).deleteOne(whereStr, function (err) {
          if (err) throw err;
          console.log("文档更新成功");
          resolve(true)
          conn.client.close()
        });
      } else {
        let whereStr = { "name": '菜鸟教程' };  // 查询条件
        conn.db.collection(table).deleteMany(whereStr, function (err, res) {
          if (err) throw err;
          console.log(res.result.n + " 条文档被更新");
          resolve(res.result.n)
          conn.client.close()
        });
      }
    })
  }

  // 新增数据，如果传入数组，则批量插入
  async insert(table: string, myobj) {
    return new Promise(async (resolve) => {
      let conn: any = await this.connect()
      if (Array.isArray(myobj)) {
        conn.db.collection(table).insertMany(myobj, function (err, res) {
          if (err) throw err;
          console.log("插入的文档数量为: " + res.insertedCount);
          resolve(res.insertedCount)
          conn.client.close()
        });
      } else {
        conn.db.collection(table).insertOne(myobj, function (err) {
          if (err) throw err;
          console.log("文档插入成功");
          resolve(true)
          conn.client.close()
        });
      }
    })
  }

  async find(table: string, where?: object, skip: number = 0, limit: number = 0) {
    return new Promise(async (resolve) => {
      let conn: any = await this.connect()
      conn.db.collection(table).find(where || {}).skip(skip).limit(limit).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        resolve(result);
        conn.client.close()
      });
    })
  }
}