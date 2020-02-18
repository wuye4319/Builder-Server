/**
 * author:nero
 * version:v1.0
 * plugin:init js
 */
'use strict'
const mysql = require('mysql')

let config = {
  // host: 'localhost',
  host: '120.25.77.12',
  port: '3306',
  user: 'root',
  password: 'H3password',
  database: 'designer',
  queueLimit: 10
}
let pool = mysql.createPool(config)

export default class basesql {
  myquery(sql: string, param: Array<any>) {
    return new Promise((resolve) => {
      pool.getConnection((err, connection) => {
        // Use the connection
        if (err) throw err
        connection.query(sql, param, (error, results) => {
          connection.release()
          if (error) {
            console.log(error)
            throw error
          }
          resolve(results)
        })
      })
    })
  }

  endconn() {
    pool.end()
    console.log('mysql connection is cloes!')
  }
}
