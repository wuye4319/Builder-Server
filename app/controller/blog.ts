import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('博客接口')
@IgnoreJwtAll
export default class PorductController extends Controller {
  @Get('/:type/:pagesize/:page')
  @Description('根据关键词，搜索所有相关商品，返回商品列表')
  @Summary('搜索商品')
  @Parameters([
    { name: 'pagesize', in: 'path', required: true, default: 100, schema: { $ref: '#/definitions/PageSize' } },
    { name: 'page', in: 'path', required: true, default: 1, schema: { $ref: '#/definitions/Page' } },
    { name: 'key', in: 'path', required: true, default: 1, schema: { $ref: '#/definitions/Key' } }
  ])
  public async searchProduct({ params: { type, pagesize, page } }) {
    const { ctx } = this;
    pagesize = parseInt(pagesize)
    page = parseInt(page)
    try {
      let total = await ctx.service.blog.getBlogCount(type)

      let sqlpage = (page - 1) * pagesize
      let tempPro = await ctx.service.blog.getBlogList(type, sqlpage, pagesize)
      ctx.body = util.status(tempPro, total.total, page, pagesize)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/:id')
  @Description('根据ID获取当前商品的详细信息接口')
  @Summary('商品信息')
  @Parameters([
    { name: 'id', in: 'path', required: true, default: '120', schema: { $ref: '#/definitions/Key' } }
  ])
  // @Responses({ "200": { description: "test", schema: { $ref: 'User' } } })
  public async getProduct({ params: { id } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.blog.getBlog(id)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
