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
      let total = await ctx.service.topic.getTopicCount()
      let sqlpage = (page - 1) * pagesize
      let result = ctx.service.topic.getTopicListByKind(sqlpage, pagesize)
      ctx.body = util.status(result, total.total)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/multiple')
  @Description('根据ID获取当前商品的详细信息接口')
  @Summary('商品信息')
  @Parameters([
    { name: 'id', in: 'path', required: true, schema: { $ref: '#/definitions/ProID' } }
  ])
  // @Responses({ "200": { description: "test", schema: { $ref: 'User' } } })
  public async multiple({ params: { id } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.product.getPro(id);
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/:id/:pagesize/:page/')
  @Description('根据ID获取当前商品的详细信息接口')
  @Summary('商品信息')
  @Parameters([
    { name: 'id', in: 'path', required: true, schema: { $ref: '#/definitions/ProID' } }
  ])
  // @Responses({ "200": { description: "test", schema: { $ref: 'User' } } })
  public async getProduct({ params: { id } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.product.getPro(id);
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/recommend/:kind')
  @Description('根据ID获取当前商品的详细信息接口')
  @Summary('商品信息')
  @Parameters([
    { name: 'id', in: 'path', required: true, schema: { $ref: '#/definitions/Key' } }
  ])
  // @Responses({ "200": { description: "test", schema: { $ref: 'User' } } })
  public async recommend({ params: { id } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.product.getPro(id);
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
