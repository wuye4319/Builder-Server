import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary, Responses } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('商品接口')
@IgnoreJwtAll
export default class PorductController extends Controller {
  @Get('/search/:pagesize/:page/:key')
  @Description('根据关键词，搜索所有相关商品，返回商品列表')
  @Summary('搜索商品')
  @Parameters([
    { name: 'pagesize', in: 'path', required: true, default: 100, schema: { $ref: '#/definitions/PageSize' } },
    { name: 'page', in: 'path', required: true, default: 1, schema: { $ref: '#/definitions/Page' } },
    { name: 'key', in: 'path', required: true, default: 1, schema: { $ref: '#/definitions/Key' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async searchProduct({ params: { key, pagesize, page } }) {
    const { ctx } = this;
    pagesize = parseInt(pagesize)
    page = parseInt(page)
    try {
      let total: any = await ctx.service.product.getProCount(key)
      let sqlpage = (page - 1) * pagesize
      let tempPro = await ctx.service.product.getProListByKey(sqlpage, pagesize, key)
      ctx.body = util.status(tempPro, total.total, page, pagesize)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/infor/:id')
  @Description('根据ID获取当前商品的详细信息接口')
  @Summary('商品信息')
  @Parameters([
    { name: 'id', in: 'path', required: true, default: '120', schema: { $ref: '#/definitions/Key' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getProduct({ params: { id } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.product.getPro(id);
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
