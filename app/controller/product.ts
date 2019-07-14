import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('商品接口')
@IgnoreJwtAll
export default class SheetController extends Controller {
  @Get('/searchpro/:key/:pagesize/:page')
  @Description('根据关键词，搜索所有相关商品')
  @Summary('搜索商品')
  public async searchProduct({ params: { key, pagesize, page } }) {
    const { ctx } = this;
    try {
      let total: any = await ctx.service.product.getProCount(key)
      let sqlpage = (page - 1) * pagesize
      let tempPro = await ctx.service.product.getProListByKey(sqlpage, pagesize, key)
      ctx.body = util.status(tempPro, total.total, page, pagesize)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/products/:id')
  @Description('示例接口，参数')
  @Summary('参数')
  @Parameters([
    { name: 'body', in: 'body', required: true, schema: { $ref: 'User' } },
    { name: 'id', in: 'path', required: true, schema: { $ref: 'User-Id' } }
  ])
  // @Responses({ "200": { description: "test", schema: { $ref: 'User' } } })
  public async testpost({ params: { id }}) {
    const { ctx } = this;
    try {
      let result = await ctx.service.product.getPro(id);
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
