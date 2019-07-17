/**
 * author:nero
 * version:v1.0
 * plugin:init js
 */
'use strict'
import Basemysql from '../base/mysql'
let basemysql = new Basemysql()
import Tools from '../util';
const util = new Tools();

class mysql {
  getProCountByTopic(id) {
    // 获取专题商品总数
    return new Promise((resolve) => {
      basemysql.myquery('SELECT COUNT(*) AS total FROM product WHERE topic_id=? AND is_pub=1', id, function (results) {
        let data = util.getarrt(results, ['total'], 1)
        resolve(data)
      })
    })
  }

  getProListByTopic(id, page, size) {
    // 获取专题的商品
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM product WHERE topic_id=? AND is_pub=1 ORDER BY sales_volume DESC LIMIT ?,?', [
        id, page, size
      ], function (results) {
        let data = util.getarrt(results, [
          'pro_id', 'main_img', 'name', 'href', 'sell_price', 'currency', 'sales_volume', 'taoword', 'coupon', 'couponhref'
        ])
        resolve(data)
      })
    })
  }

  getRandProByTopic(id, size) {
    // 获取专题的商品
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM product WHERE topic_id=? AND is_pub=1 ORDER BY RAND() LIMIT ?', [
        id, size
      ], function (results) {
        let data = util.getarrt(results, [
          'pro_id', 'main_img', 'name', 'href', 'sell_price', 'currency', 'sales_volume', 'taoword', 'coupon', 'couponhref'
        ])
        resolve(data)
      })
    })
  }

  getTopicById(id) {
    // 获取专题信息
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM topics WHERE id=?', id, function (results) {
        let data = util.getarrt(results, [
          'id', 'title', 'cover_img', 'main_img', 'description'
        ], 1)
        resolve(data)
      })
    })
  }

  getTopicLastId() {
    // 获取专题最后的ID
    return new Promise((resolve) => {
      basemysql.myquery('SELECT id FROM topics ORDER BY id DESC', '', function (results) {
        let data = util.getarrt(results, ['id'], 1)
        resolve(data)
      })
    })
  }

  getTopicIdListByKind(kind) {
    // 根据类别获取专题的ID集
    return new Promise((resolve) => {
      basemysql.myquery('SELECT id FROM topics WHERE kind=? ORDER BY id ASC', kind, function (results) {
        let data = util.getarrt(results, ['id'])
        resolve(data)
      })
    })
  }

  addTopic(data) {
    // 添加专题
    let { title, code, main_img, description, kind } = data
    return new Promise((resolve) => {
      basemysql.myquery('insert into topics set title=?,code=?,main_img=?,description=?,kind=?',
        [title, code, main_img, description, kind],
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

  // robot
  getTopicIdByName(title) {
    // 通过名字获取专题信息
    return new Promise((resolve) => {
      basemysql.myquery('SELECT id FROM topics WHERE title=?', title, function (results) {
        let data = util.getarrt(results, [
          'id',
        ], 1)
        resolve(data)
      })
    })
  }

  // robot
  getTopicList() {
    // 获取分类下的专题信息
    return new Promise((resolve) => {
      // SELECT * FROM topics WHERE kind=? 还没做
      basemysql.myquery('SELECT * FROM topics', '', function (results) {
        let data = util.getarrt(results, [
          'id', 'title'
        ])
        resolve(data)
      })
    })
  }

  getTopicCount() {
    // 获取博客数量
    return new Promise((resolve) => {
      basemysql.myquery('SELECT COUNT(*) AS total FROM topics WHERE is_pub=1', '', function (results) {
        let data = util.getarrt(results, ['total'], 1)
        resolve(data)
      })
    })
  }

  getTopicListByKind(page, size) {
    // 获取分类下的专题信息
    return new Promise((resolve) => {
      // SELECT * FROM topics WHERE kind=? 还没做
      basemysql.myquery('SELECT * FROM topics WHERE is_pub=1 ORDER BY edit_date DESC LIMIT ?,?', [
        page, size
      ], function (results) {
        let data = util.getarrt(results, [
          'id', 'title', 'cover_img', 'main_img', 'description'
        ])
        resolve(data)
      })
    })
  }
}

module.exports = mysql
