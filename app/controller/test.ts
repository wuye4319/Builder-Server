import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('全局备注，一般按大的功能进行分类')
@IgnoreJwtAll
export default class SheetController extends Controller {
  @Get('/hello')
  @Description('示例接口,正确的查询')
  @Summary('短标题')
  public async helloWorld() {
    const { ctx } = this;
    try {
      let result = await ctx.service.test.helloWorld();
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Get('/testError')
  @Description('示例接口，错误的查询')
  @Summary('错误')
  public async test() {
    throw Error('故意的')
  }

  @Post('/testPost/:id')
  @Description('示例接口，参数')
  @Summary('参数')
  @Parameters([
    { name: 'body', in: 'body', required: true, schema: { $ref: 'User' } },
    { name: 'id', in: 'path', required: true, schema: { $ref: 'User-Id' } }
  ])
  // @Responses({ "200": { description: "test", schema: { $ref: 'User' } } })
  public async testpost({ params: { id }, body: { name, phone, age } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.test.testpost(id, name, phone, age);
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
