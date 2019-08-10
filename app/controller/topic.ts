import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary, Responses } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('专题接口')
@IgnoreJwtAll
export default class BuilderController extends Controller {
  @Get('/:pagesize/:page')
  @Description('获取专题列表信息接口')
  @Summary('专题列表')
  @Parameters([
    { name: 'pagesize', in: 'path', required: true, schema: { $ref: '#/definitions/PageSize' } },
    { name: 'page', in: 'path', required: true, schema: { $ref: '#/definitions/Page' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getTopicList({ params: { pagesize, page } }) {
    const { ctx } = this;
    pagesize = parseInt(pagesize)
    page = parseInt(page)
    try {
      let total: any = await ctx.service.topic.getTopicCount()
      let sqlpage = (page - 1) * pagesize
      let result = await ctx.service.topic.getTopicListByKind(sqlpage, pagesize)
      ctx.body = util.status(result, total.total, page, pagesize)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/multiple')
  @Description('根据多个ID查询专题信息')
  @Summary('获取多个专题信息')
  @Parameters([
    { name: 'id', in: 'path', required: true, schema: { $ref: '#/definitions/ProID' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async multiple({ body: { ids } }) {
    const { ctx } = this;

    try {
      let result = <any>[]
      for (let i in ids) {
        let tempPro: any = await ctx.service.topic.getTopicById(ids[i])
        if (tempPro) {
          result.push(tempPro)
        }
      }
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Get('/:id/:pagesize/:page/')
  @Description('专题详情接口，包括专题信息和专题相关商品列表')
  @Summary('专题详情')
  @Parameters([
    { name: 'id', in: 'path', required: true, schema: { $ref: '#/definitions/topicProID' } },
    { name: 'pagesize', in: 'path', required: true, schema: { $ref: '#/definitions/topicPageSize' } },
    { name: 'page', in: 'path', required: true, schema: { $ref: '#/definitions/Page' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getProduct({ params: { id, pagesize, page } }) {
    const { ctx } = this;
    pagesize = parseInt(pagesize)
    page = parseInt(page)
    try {
      let total: any = await ctx.service.topic.getProCountByTopic(id)
      let sqlpage = (page - 1) * pagesize

      let result: any = {}
      result.product_list = await ctx.service.topic.getProListByTopic(id, sqlpage, pagesize);
      result.collection = await ctx.service.topic.getTopicById(id)
      ctx.body = util.status(result, total.total, page, pagesize)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/recommend/:kind')
  @Description('根据类型获取当前专题的推荐商品')
  @Summary('专题推荐')
  @Parameters([
    { name: 'kind', in: 'path', required: true, schema: { $ref: '#/definitions/Key' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async recommend({ params: { kind } }) {
    const { ctx } = this;
    try {
      let topicidlist: any = await ctx.service.topic.getTopicIdListByKind(kind)
      let randid = Math.floor(Math.random() * topicidlist.length)
      let result = await ctx.service.topic.getRandProByTopic(topicidlist[randid].id, 6)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
