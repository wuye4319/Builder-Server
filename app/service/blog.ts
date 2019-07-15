/**
 * author:nero
 * version:v1.0
 * plugin:init js
 */
'use strict'
const Basemysql = require('../base/mysql')
let basemysql = new Basemysql()
const Util = require('../util')
let util = new Util()

export default class mysql {
  addBlog(data) {
    let { main_img, title, context, label } = data
    return new Promise((resolve) => {
      basemysql.myquery(`insert into blogs set main_img=?,title=?,context=?,label=?`,
        [main_img, title, context, label],
        function (results) {
          if (results.insertId) {
            console.log('data insert success! insertid is : ' + results.insertId)
            resolve(results.insertId)
          } else {
            console.log('data insert failed!' + results)
            resolve(false)
          }
        })
    })
  }

  getBlogCount(type) {
    // 获取博客数量
    return new Promise((resolve) => {
      basemysql.myquery('SELECT COUNT(*) AS total FROM blogs WHERE is_pub=1 AND type=?', type, function (results) {
        let data = util.getarrt(results, ['total'], 1)
        resolve(data)
      })
    })
  }

  getBlogList(type, page, size) {
    // 获取博客列表信息
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM blogs WHERE is_pub=1 AND type=? LIMIT ?,?', [type, page, size], function (results) {
        let data = util.getarrt(results, [
          'id', 'title', 'main_img', 'edit_date'
        ])
        resolve(data)
      })
    })
  }

  getBlogLastId() {
    // 获取专题最后的ID
    return new Promise((resolve) => {
      basemysql.myquery('SELECT id FROM blogs ORDER BY id DESC', '', function (results) {
        let data = util.getarrt(results, ['id'], 1)
        resolve(data)
      })
    })
  }

  getBlog(id) {
    // 获取博客详情
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM blogs WHERE id=? and is_pub=1', id, function (results) {
        let data = util.getarrt(results, [
          'context', 'title', 'edit_date', 'kind'
        ], 1)
        resolve(data)
      })
    })
  }
}
