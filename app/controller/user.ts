import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary, Responses, Put, Delete } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('用户信息接口')
@IgnoreJwtAll
export default class ShopController extends Controller {
  @Get('/infor/:userID')
  @Description('用户信息查询接口,登录用户，设置cookie')
  @Summary('登录接口，查询用户信息')
  @Parameters([
    { name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getUserInfor({ params: { userID }, body: { } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.user.getUserInfor(userID)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/infor')
  @Description('新增用户信息接口')
  @Summary('新增用户信息')
  @Parameters([
    { name: 'params', in: 'body', required: true, schema: { type: 'object',properties: {
      userPhone: {type: 'string',description: '用户手机号'}
    } } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async addUser({ body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.user.addUser(params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Put('/infor/:userID')
  @Description('用户信息修改接口')
  @Summary('修改用户信息')
  @Parameters([
    { name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async editUser({ params: { userID }, body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.user.editUser(userID, params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Delete('/infor/:userID')
  @Description('删除用户信息接口')
  @Summary('删除用户信息')
  @Parameters([
    { name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async deleteUser({ params: { userID }, body: { } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.user.deleteUser(userID)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
