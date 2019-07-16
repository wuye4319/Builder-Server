import { Service } from 'egg';
import Basemysql from '../base/mysql'
let basemysql = new Basemysql()
import Tools from '../util';
const util = new Tools();

/**
 * table service
 */
export default class Sheet extends Service {
  addPro(data) {
    let { pro_id, main_img, name, href, sell_price, sales_volume, taoword, coupon, couponhref, topic_id } = data
    return new Promise((resolve) => {
      basemysql.myquery(`insert into product set pro_id=?,main_img=?,name=?,href=?,sell_price=?,sales_volume=?,taoword=?,coupon=?,couponhref=?,topic_id=?`,
        [pro_id, main_img, name, href, sell_price, sales_volume, taoword, coupon, couponhref, topic_id],
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

  updatePro(data) {
    let { pro_id, main_img, name, href, sell_price, sales_volume, taoword, coupon, couponhref, topic_id } = data
    return new Promise((resolve) => {
      basemysql.myquery(`update product set main_img=?,name=?,href=?,sell_price=?,sales_volume=?,taoword=?,coupon=?,couponhref=?,topic_id=? where pro_id=?`,
        [main_img, name, href, sell_price, sales_volume, taoword, coupon, couponhref, topic_id, pro_id],
        function (results) {
          if (results) {
            console.log('changed ' + results.changedRows + ' rows');
            // console.log('deleted ' + results.affectedRows + ' rows');
            resolve(results.changedRows)
          }
        })
    })
  }

  getProID() {
    // 获取商品信息
    return new Promise((resolve) => {
      basemysql.myquery('SELECT id FROM product ORDER BY id DESC', '', function (results) {
        let data = util.getarrt(results, ['id'], 1)
        resolve(data)
      })
    })
  }

  getPro(id) {
    // 获取商品信息
    return new Promise((resolve) => {
      basemysql.myquery('select * from product where id=?', id, function (results) {
        let data = util.getarrt(results, ['main_img', 'name', 'href', 'sell_price', 'currency'], 1)
        resolve(data)
      })
    })
  }

  hasPro(id) {
    // 获取商品信息
    return new Promise((resolve) => {
      basemysql.myquery('select * from product where pro_id=?', id, function (results) {
        let data = util.getarrt(results, ['name'], 1)
        resolve(data)
      })
    })
  }

  getProCount(key) {
    // 获取博客数量
    return new Promise((resolve) => {
      basemysql.myquery('SELECT COUNT(*) AS total FROM product WHERE name LIKE ? AND is_pub=1', '%' + key + '%', function (results) {
        let data = util.getarrt(results, ['total'], 1)
        resolve(data)
      })
    })
  }

  getProListByKey(page, size, key) {
    // 根据关键词搜索商品
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM product WHERE name LIKE ? AND is_pub=1 ORDER BY edit_date LIMIT ?,?', [
        '%' + key + '%', page, size
      ],
        function (results) {
          let data = util.getarrt(results, [
            'main_img', 'name', 'href', 'sell_price', 'currency', 'sales_volume', 'taoword', 'coupon', 'couponhref'
          ])
          resolve(data)
        })
    })
  }
}
