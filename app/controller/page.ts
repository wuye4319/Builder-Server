import { Controller } from 'egg';
import { Get, Put, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary, Responses, Delete } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('页面信息接口')
@IgnoreJwtAll
export default class ShopController extends Controller {
  @Get('/pageconfig/:appID')
  @Description('根据appID，获取当前页面的数据信息')
  @Summary('获取页面信息')
  @Parameters([
    {name: 'appID', in: 'path', required: true, schema: { type: 'string',description: '应用ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getPageInfor({ params: { appID } }) {
    const { ctx } = this;
    try {
      let userID = util.getCookie('userID',ctx);
      let result = await ctx.service.page.getpageconfig(userID,appID)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/pageconfig/:appID')
  @Description('根据appID，修改对应的页面数据信息')
  @Summary('修改页面信息')
  @Parameters([
    {name: 'appID', in: 'path', required: true, schema: { type: 'string',description: '应用ID' }},
    {name: 'appID', in: 'path', required: true, schema: { type: 'object',properties: {
      pageInfor: {type: 'object',description: '页面信息'},
      global: {type: 'object',descrition: '页面全局样式'}
    } }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async editPageInfor({ params: { appID }, body: { page,global } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.editpageconfig(appID, page,global)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Get('/guidedoc/:docName')
  @Description('根据传来的文档名称，查询对应文档的信息')
  @Summary('查询开发指南')
  @Parameters([
    {name: 'docName', in: 'path', required: true, schema: { type: 'string',description: '文档ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getGuideDoc({ params: { docName }}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.getGuideDoc(docName)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Get('/apps/:userID')
  @Description('根据传来的用户ID，获取应用列表')
  @Summary('查询应用列表')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getApps({ params: { userID }, query }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.getApps(userID,query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  
  @Post('/apps/:userID')
  @Description('为用户新建应用')
  @Summary('新建应用')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
    { name: 'params', in: 'body', required: true, schema: { type: 'object',properties: {
      appName: {type: 'string',description: '应用名称'},
      description: {type: 'string',description: '应用描述'},
      screen: {type: 'string',description: '应用显示类型：desktop-pc端显示，mobile-移动端'},
    } } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async addApp({ params: { userID }, body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.addApp(userID,params)
      ctx.body = util.status(result.data,'','','',result.msg)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Post('/shareapp/:userID')
  @Description('分享app给对应手机号的用户')
  @Summary('分享app给对应手机号的用户')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
    { name: 'params', in: 'body', required: true, schema: { type: 'object',properties: {
      shareTo: {type: 'string',description: '分享的手机号'},
      appID: {type: 'string',description: '应用id'},
    } } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async shareApp({ body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.shareApp(params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Put('/apps/:appID')
  @Description('让用户可以修改现有应用的信息')
  @Summary('编辑应用')
  @Parameters([
    {name: 'appID', in: 'path', required: true, schema: { type: 'string',description: '应用ID' }},
    { name: 'params', in: 'body', required: true, schema: { type: 'object',properties: {
      appName: {type: 'string',description: '应用名称'},
      description: {type: 'string',description: '应用描述'},
      screen: {type: 'string',description: '应用显示类型：desktop-pc端显示，mobile-移动端'},
    } } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async editApp({ params: { appID }, body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.editApp(appID,params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  
  @Delete('/apps/:appID')
  @Description('通过传入的appID删除应用')
  @Summary('删除应用')
  @Parameters([
    {name: 'appID', in: 'path', required: true, schema: { type: 'string',description: '应用ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async deleteApp({ params: { appID }, query }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.deleteApp(appID,query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Get('/compstore/:userID')
  @Description('根据组件类型，获取对应用户下的自定义组件列表')
  @Summary('查询组件列表')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getCompStores({ params: { userID }, query }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.getCompStore(userID,query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/compstore/:userID')
  @Description('根据传来的参数在对应用户名下新增自定义组件')
  @Summary('新建自定义组件')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async saveCompStore({ params: { userID }, body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.saveCompStore(userID, params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Put('/compstore/:userID')
  @Description('根据组件名和用户ID，修改对应自定义组件的信息')
  @Summary('修改自定义组件信息')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
  ])
  @Responses({  
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async editCompStore({ params: { userID }, body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.editCompByName(userID, params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Delete('/compstore/:userID')
  @Description('根据用户ID和组件名称，删除自定义组件')
  @Summary('删除自定义组件')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async deleteCompStore({ params: { userID }, query }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.deleteCompStore(userID,query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/pageaction')
  @Description('根据appID')
  @Summary('保存页面动作信息')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async savePageActions({ body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.savePageActions(params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Get('/pageaction')
  @Description('根据appID')
  @Summary('保存页面动作信息')
  @Parameters([
    {name: 'appID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getPageActions({ query }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.getPageActions(query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/mobilecompstore/:userID')
  @Description('根据域名，修改应用下的手机版组件库信息')
  @Summary('修改手机版组件库信息')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async mobileCompStore({ params: { userID }, body: { body } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.page.editpageconfig(userID, body,'')
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
