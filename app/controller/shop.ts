import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('店铺信息接口')
@IgnoreJwtAll
export default class BuilderController extends Controller {
  @Get('/userpageconfig/:type/:user')
  @Description('')
  @Summary('搜索商品')
  @Parameters([
    { name: 'pagesize', in: 'path', required: true, default: 100, schema: { $ref: 'PageSize' } },
    { name: 'page', in: 'path', required: true, default: 1, schema: { $ref: 'Page' } },
    { name: 'key', in: 'path', required: true, default: 1, schema: { $ref: 'Key' } }
  ])
  public async searchProduct({ params: { type, user }, body: { body } }) {
    const { ctx } = this;
    try {
      let result
      switch (type) {
        case 'get':
          result = ctx.service.builder.getpageconfig(user)
          break
        case 'edit':
          result = ctx.service.builder.editpageconfig(user, body)
          break
      }

      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/infor/:id')
  @Description('根据ID获取当前商品的详细信息接口')
  @Summary('商品信息')
  @Parameters([
    { name: 'id', in: 'path', required: true, default: '120', schema: { $ref: 'Key' } }
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
}
