import { Service } from 'egg';
import Basemysql from '../base/mysql'
let basemysql = new Basemysql()
// import Tools from '../util';
// const util = new Tools();

/**
 * table service
 */
export default class Product extends Service {
  async addPro(data) {
    let { proID, mainImg, name, href, sellPrice, salesVolume, taoword, coupon, couponhref, topicID } = data
    let results: any = await basemysql.myquery(`insert into product set proID=?,mainImg=?,name=?,href=?,sellPrice=?,salesVolume=?,taoword=?,coupon=?,couponhref=?,topicID=?`,
      [proID, mainImg, name, href, sellPrice, salesVolume, taoword, coupon, couponhref, topicID])

    if (results.insertId) {
      console.log('data insert success! insertid is : ' + results.insertId)
      return (results.insertId)
    } else {
      console.log('data insert failed!' + results)
      return (false)
    }
  }

  async updatePro(data) {
    let { proID, mainImg, name, href, sellPrice, salesVolume, taoword, coupon, couponhref, topicID } = data
    let results: any = await basemysql.myquery(`update product set mainImg=?,name=?,href=?,sellPrice=?,salesVolume=?,taoword=?,coupon=?,couponhref=?,topicID=? where proID=?`,
      [mainImg, name, href, sellPrice, salesVolume, taoword, coupon, couponhref, topicID, proID])
    if (results) {
      console.log('changed ' + results.changedRows + ' rows');
      // console.log('deleted ' + results.affectedRows + ' rows');
      return (results.changedRows)
    }
  }

  async getProID() {
    // 获取商品信息
    let data = await basemysql.myquery('SELECT id FROM product ORDER BY id DESC', '')
    return data
  }

  async getPro(id) {
    // 获取商品信息
    let data = await basemysql.myquery('select mainImg,name,href,sellPrice,currency from product where id=?', id)
    return data
  }

  async hasPro(id) {
    // 获取商品信息
    let data = await basemysql.myquery('select name from product where proID=?', id)
    return data
  }

  async getProCount(key) {
    // 获取博客数量
    let data = await basemysql.myquery('SELECT COUNT(*) AS total FROM product WHERE name LIKE ? AND isPub=1', '%' + key + '%')
    return data
  }

  async getProListByKey(page, size, key) {
    // 根据关键词搜索商品
    let data = await basemysql.myquery('SELECT mainImg,name,href,sellPrice,currency,salesVolume,taoword,coupon,couponhref FROM product WHERE name LIKE ? AND isPub=1 ORDER BY editDate LIMIT ?,?', [
      '%' + key + '%', page, size
    ])
    return data
  }
}
