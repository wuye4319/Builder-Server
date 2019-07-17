import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('专题接口')
@IgnoreJwtAll
export default class BuilderController extends Controller {
  @Get('/:pagesize/:page')
  @Description('')
  @Summary('搜索商品')
  @Parameters([
    { name: 'pagesize', in: 'path', required: true, default: 100, schema: { $ref: '#/definitions/PageSize' } },
    { name: 'page', in: 'path', required: true, default: 1, schema: { $ref: '#/definitions/Page' } },
    { name: 'key', in: 'path', required: true, default: 1, schema: { $ref: '#/definitions/Key' } }
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

  @Post('/multiple')
  @Description('根据ID获取当前商品的详细信息接口')
  @Summary('商品信息')
  @Parameters([
    { name: 'id', in: 'path', required: true, default: '120', schema: { $ref: '#/definitions/Key' } }
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
    { name: 'id', in: 'path', required: true, default: '120', schema: { $ref: '#/definitions/Key' } }
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
    { name: 'id', in: 'path', required: true, default: '120', schema: { $ref: '#/definitions/Key' } }
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
