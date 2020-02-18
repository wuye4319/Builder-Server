/**
 * author:nero
 * version:v1.0
 * plugin:init js
 */
'use strict'
import Basemysql from '../base/mysql'
let basemysql = new Basemysql()
import { Service } from 'egg';
// import Tools from '../util';
// const util = new Tools();

export default class Topic extends Service {
  async getProCountByTopic(id) {
    // 获取专题商品总数
    let data = await basemysql.myquery('SELECT COUNT(*) AS total FROM product WHERE topicID=? AND isPub=1', id)
    return data
  }

  async getProListByTopic(id, page, size) {
    // 获取专题的商品
    let data = await basemysql.myquery('SELECT proID,mainImg,name,href,sellPrice,currency,salesVolume,taoword,coupon,couponhref FROM product WHERE topicID=? AND isPub=1 ORDER BY salesVolume DESC LIMIT ?,?', [
      id, page, size
    ])
    return data
  }

  async getRandProByTopic(id, size) {
    // 获取专题的商品
    let data = await basemysql.myquery('SELECT proID,mainImg,name,href,sellPrice,currency,salesVolume,taoword,coupon,couponhref FROM product WHERE topicID=? AND isPub=1 ORDER BY RAND() LIMIT ?', [
      id, size
    ])
    return data
  }

  async getTopicById(id) {
    // 获取专题信息
    let data = await basemysql.myquery('SELECT id,title,coverImg,mainImg,description FROM topics WHERE id=?', id)
    return data
  }

  async getTopicLastId() {
    // 获取专题最后的ID
    let data = await basemysql.myquery('SELECT id FROM topics ORDER BY id DESC', '')
    return data
  }

  async getTopicIdListByKind(kind) {
    // 根据类别获取专题的ID集
    let data = await basemysql.myquery('SELECT id FROM topics WHERE kind=? ORDER BY id ASC', kind)
    return data
  }

  async addTopic(data) {
    // 添加专题
    let { title, code, mainImg, description, kind } = data
    let results: any = await basemysql.myquery('insert into topics set title=?,code=?,mainImg=?,description=?,kind=?',
      [title, code, mainImg, description, kind])

    if (results.insertId) {
      console.log('data insert success! insertid is : ' + results.insertId)
      return (results.insertId)
    } else {
      console.log('data insert failed!' + results)
      return (false)
    }
  }

  // robot
  async getTopicIdByName(title) {
    // 通过名字获取专题信息
    let data = await basemysql.myquery('SELECT id FROM topics WHERE title=?', title)
    return data
  }

  // robot
  async getTopicList() {
    // 获取分类下的专题信息
    // SELECT * FROM topics WHERE kind=? 还没做
    let data = await basemysql.myquery('SELECT id,title FROM topics', '')
    return data
  }

  async getTopicCount() {
    // 获取博客数量
    let data = await basemysql.myquery('SELECT COUNT(*) AS total FROM topics WHERE isPub=1', '')
    return data
  }

  async getTopicListByKind(page, size) {
    // 获取分类下的专题信息
    // SELECT * FROM topics WHERE kind=? 还没做
    let data = await basemysql.myquery('SELECT id,title,coverImg,mainImg,description FROM topics WHERE isPub=1 ORDER BY editDate DESC LIMIT ?,?', [
      page, size
    ])
    return data
  }
}
