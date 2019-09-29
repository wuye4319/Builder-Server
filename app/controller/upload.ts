import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary, Responses } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('页面信息接口')
@IgnoreJwtAll
export default class ShopController extends Controller {
  @Get('/upload/:user')
  @Description('根据域名，获取当前页面的数据信息')
  @Summary('获取页面信息')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { $ref: '#/definitions/Domain' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getPageInfor({ params: { user } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.upload.getpageconfig(user)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/upload/:user')
  @Description('根据域名，修改对应的页面数据信息')
  @Summary('修改页面信息')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { $ref: '#/definitions/Key' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async editPageInfor({ body: { } }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // ctx.request.files[0]
    try {
      let result = await ctx.service.upload.vueFile(stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/ctrl/:user')
  @Description('根据域名，修改对应的页面数据信息')
  @Summary('修改页面信息')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { $ref: '#/definitions/Key' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async uploadCtrl({ body: { } }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // ctx.request.files[0]
    try {
      let result = await ctx.service.upload.ctrlFile(stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
