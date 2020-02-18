/**
 * author:nero
 * version:v1.0
 * plugin:init js
 */
'use strict'
import Basemysql from '../base/mysql'
let basemysql = new Basemysql()
// import Tools from '../util';
import { Service } from 'egg';
// const util = new Tools();

export default class Blog extends Service {
  async addBlog(data) {
    let { mainImg, title, context, label } = data
    let results: any = await basemysql.myquery(`insert into blogs set mainImg=?,title=?,context=?,label=?`,
      [mainImg, title, context, label])

    if (results.insertId) {
      console.log('data insert success! insertid is : ' + results.insertId)
      return (results.insertId)
    } else {
      console.log('data insert failed!' + results)
      return (false)
    }
  }

  async getBlogCount(type) {
    // 获取博客数量
    let data = await basemysql.myquery('SELECT COUNT(*) AS total FROM blogs WHERE isPub=1 AND type=?', type)
    return data
  }

  async getBlogList(type, page, size) {
    // 获取博客列表信息
    let results = await basemysql.myquery('SELECT id,title,mainImg,editDate FROM blogs WHERE isPub=1 AND type=? LIMIT ?,?', [type, page, size])
    return results
  }

  async getBlogLastId() {
    // 获取专题最后的ID
    let data = await basemysql.myquery('SELECT id FROM blogs ORDER BY id DESC', '')
    return data
  }

  async getBlog(id) {
    // 获取博客详情
    let data = await basemysql.myquery('SELECT context,title,editDate,kind FROM blogs WHERE id=? and isPub=1', id)
    return data
  }
}
