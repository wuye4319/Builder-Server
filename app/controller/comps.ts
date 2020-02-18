import { Controller } from 'egg';
import { Get, Post, IgnoreJwtAll, Description, TagsAll, Parameters, Summary, Responses, Delete } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('自定义组件接口')
@IgnoreJwtAll
export default class CompsController extends Controller {
  @Get('/complist')
  @Description('获取组件列表')
  @Summary('获取组件列表')
  @Parameters([
    {name: 'params', in: 'query', required: true, schema: { type: 'object',properties: {
    userID: {type: 'string',description: '用户ID，用于获取用户的自定义组件'},
    isMobile: {type: 'number',descrition: '判断组件支持端口，0:支持PC端，1:支持移动端，2:两端都支持，请求到的组件即为两端都支持的组件'}
  } }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getCompList({query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let userID = query.userID;
      // 查询对应终端的组件
      let sysComp = await ctx.service.comps.getCompList({userID: 0, isMobile: Number(query.isMobile)});
      let customComp = await ctx.service.comps.getCustomCompList({userID: userID, isMobile: Number(query.isMobile)});
      let sysCompB = [];
      let customCompB = [];
      // 判断支持终端类型，如果是只支持一个终端，那么需要将两端都支持的组件也查出来
      if (query.isMobile !== 2 && query.isMobile !== '2') {
        sysCompB = await ctx.service.comps.getCompList({userID: 0, isMobile: 2});
        customCompB = await ctx.service.comps.getCustomCompList({userID: userID, isMobile: 2})
      }
      let result: any = [...sysComp,...customComp,...sysCompB,...customCompB];
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Get('/compimg/:fileName')
  @Description('获取组件缩略图')
  @Summary('获取组件缩略图')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getCompImg({params: {fileName}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let file: any = await ctx.service.comps.compImg(fileName);
      ctx.body = file
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Get('/compsmarket')
  @Description('获取发布到应用市场中的组件')
  @Summary('获取发布到应用市场中的组件')
  @Parameters([
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getCompMarket() {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.comps.getCompMarket()
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Post('/compsmarket/:userID')
  @Description('更新应用市场中的组件')
  @Summary('更新应用市场中的组件')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
    {name: 'params', in: 'body', required: true, schema: { type: 'object',properties: {
      compID: {type: 'string',description: '组件ID'},
      isMarket: {type: 'number',descrition: '是否发布到组件市场，0-从组件市场下架，1-发布到组件市场'}
    } }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async updateCompMarket({params:{userID},body:{params}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.comps.updateCompMarket(userID,params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Get('/compcollect/:userID')
  @Description('获取收藏的应用')
  @Summary('获取收藏的应用')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getAppCollect({params: {userID}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.comps.getCompCollect(userID)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Post('/compcollect/:userID')
  @Description('获取收藏的应用')
  @Summary('获取收藏的应用')
  @Parameters([    
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async addCompCollect({params:{userID},body:{params}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.comps.addCompCollect(userID,params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Delete('/compcollect/:userID')
  @Description('删除收藏的应用')
  @Summary('删除收藏的应用')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async deleteCompCollect({params:{userID},query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.comps.deleteCompCollect(userID,query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Get('/compdetail/:compID')
  @Description('获取组件详情')
  @Summary('获取组件详情')
  @Parameters([
    {name: 'compID', in: 'path', required: true, schema: { type: 'string',description: '组件ID' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getCompDetails({params:{compID}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.comps.getCompDetail(compID)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  
  @Post('/sharecomp/:userID')
  @Description('分享组件给对应手机号的用户')
  @Summary('分享组件给对应手机号的用户')
  @Parameters([
    {name: 'userID', in: 'path', required: true, schema: { type: 'string',description: '用户ID' }},
    { name: 'params', in: 'body', required: true, schema: { type: 'object',properties: {
      shareTo: {type: 'string',description: '分享的手机号'},
      appID: {type: 'string',description: '组件id'},
    } } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async shareComp({ body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.comps.shareComp(params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}