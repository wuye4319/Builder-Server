import { Controller } from 'egg';
import { Get, Post, IgnoreJwtAll, Description, TagsAll, Parameters, Summary, Responses, Delete } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('app应用接口')
@IgnoreJwtAll
export default class ShopController extends Controller {
  @Get('/appstore')
  @Description('获取appstore中的数据')
  @Summary('获取appstore中的数据')
  @Parameters([])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getAppStore() {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.apps.getAppStore()
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/appstore/:userID')
  @Description('将应用发布到应用市场')
  @Summary('将应用发布到应用市场')
  @Parameters([
    { name: 'userID', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
    {
      name: 'params', in: 'body', required: true, schema: {
        type: 'object', properties: {
          isMarket: { type: 'nember: 0/1', description: '是否发布到应用市场' },
          appID: { type: 'string', description: '应用ID' }
        }
      }
    }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async addAppStore({ params: { userID }, body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.apps.updateAppStore(userID, params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Get('/appcollect/:userID')
  @Description('获取收藏的应用')
  @Summary('获取收藏的应用')
  @Parameters([
    { name: 'userID', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getAppCollect({ params: { userID } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.apps.getAppCollect(userID)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/appcollect/:userID')
  @Description('收藏应用市场的应用')
  @Summary('收藏应用市场的应用')
  @Parameters([
    { name: 'userID', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
    {
      name: 'params', in: 'body', required: true, schema: {
        type: 'object', properties: {
          appID: { type: 'string', description: '需要收藏的应用ID' }
        }
      }
    }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async addAppCollect({ params: { userID }, body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.apps.addAppCollect(userID, params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Delete('/appcollect/:userID')
  @Description('删除我的收藏中的应用')
  @Summary('删除我的收藏中的应用')
  @Parameters([
    { name: 'userID', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
    {
      name: 'params', in: 'query', required: true, schema: {
        type: 'object', properties: {
          appID: { type: 'string', description: '应用ID' }
        }
      }
    }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async deleteAppCollect({ params: { userID }, query }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.apps.deleteAppCollect(userID, query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Get('/appdetail/:appID')
  @Description('获取应用详情')
  @Summary('获取应用详情')
  @Parameters([
    { name: 'appID', in: 'path', required: true, schema: { type: 'string', description: '应用ID' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getAppDetails({ params: { appID } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.apps.getAppDetail(appID)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}