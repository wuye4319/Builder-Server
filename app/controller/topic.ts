/**
 * Created by nero on 2017/6/2.
 */
const koa = require('../../koa/http')
const Topic = require('../service/topic')
let topic = new Topic()
const Util = require('../util')
let util = new Util()

let globparam = '/web/v1/'

// collection list
koa.addrouter(globparam + 'collections/:pagesize/:page', async (ctx) => {
  let page = parseInt(ctx.params.page)
  let size = parseInt(ctx.params.pagesize)
  let total = await topic.getTopicCount()
  let result = util.result(0, total.total, page, size)

  let sqlpage = (page - 1) * size
  let temptopic = await topic.getTopicListByKind(sqlpage, size)
  if (temptopic) {
    result.data.collection = temptopic
  }
  ctx.response.body = result
})
// 获取多个专题集合
koa.addrouter(globparam + 'collections/multiple', async (ctx) => {
  let body = ctx.request.body
  let ids = body.collection_ids.split(',')
  let result = util.result(0)

  result.data = []
  for (let i in ids) {
    let tempPro = await topic.getTopicById(ids[i])
    if (tempPro) {
      result.data.push(tempPro)
    }
  }

  ctx.response.body = result
})
// 专题详情 搜索
// 获取商品列表信息
koa.addrouter(globparam + 'collections/:id/:pagesize/:page/', async (ctx) => {
  let id = ctx.params.id
  let page = parseInt(ctx.params.page)
  let size = parseInt(ctx.params.pagesize)
  let total = await topic.getProCountByTopic(id)
  let result = util.result(0, total.total, page, size)

  let sqlpage = (page - 1) * size
  let tempPro = await topic.getProListByTopic(id, sqlpage, size)
  let temptopic = await topic.getTopicById(id)
  if (temptopic && tempPro) {
    result.data.collection = temptopic
    result.data.product_list = tempPro
  }
  ctx.response.body = result
})
// 随机推荐专题
// 获取商品列表信息
koa.addrouter(globparam + 'recommend/:kind', async (ctx) => {
  let kind = ctx.params.kind
  let result = util.result(0)

  let topicidlist = await topic.getTopicIdListByKind(kind)
  let randid = Math.floor(Math.random() * topicidlist.length)
  let tempPro = await topic.getRandProByTopic(topicidlist[randid].id, 6)
  if (tempPro) {
    result.data.product_list = tempPro
  }
  ctx.response.body = result
})
