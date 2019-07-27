import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('店铺信息接口')
@IgnoreJwtAll
export default class ShopController extends Controller {
  @Get('/pageconfig/:user')
  @Description('根据域名，获取当前页面的数据信息')
  @Summary('获取页面信息')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { $ref: '#/definitions/Domain' } }
  ])
  public async searchProduct({ params: { user } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.shop.getpageconfig(user)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/pageconfig/:user')
  @Description('根据域名，修改对应的页面数据信息')
  @Summary('修改页面信息')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { $ref: '#/definitions/Key' } }
  ])
  // @Responses({ "200": { description: "test", schema: { $ref: 'User' } } })
  public async getProduct({ params: { user }, body: { body } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.shop.editpageconfig(user, body)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
