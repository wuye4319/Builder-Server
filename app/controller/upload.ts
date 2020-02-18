import { Controller } from 'egg';
import { IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary, Responses } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('上传接口')
@IgnoreJwtAll
export default class ShopController extends Controller {
  @Post('/upload/:userID')
  @Description('上传接口')
  @Summary('修改页面信息')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async uploadFile({ params: { userID }, body: { } }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // ctx.request.files[0]
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.upload.vueFile(userID, stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Post('/imgfile/:userID')
  @Summary('图片上传')
  @Description('设计器统一图片上传接口')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async uploadImg({ params: { userID }, body: { } }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // ctx.request.files[0]
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.upload.uploadImg(userID, stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Post('/audiofile/:userID')
  @Summary('音频上传')
  @Description('音频文件上传')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async uploadComp({ params: { userID }, body: { } }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // ctx.request.files[0]
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.upload.uploadAudio(userID, stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/ctrl/:userID')
  @Description('根据域名，修改对应的页面数据信息')
  @Summary('修改页面信息')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async uploadCtrl({ params: { userID }, body: { } }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // ctx.request.files[0]
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.upload.ctrlFile(userID, stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/newcomp/:userID')
  @Description('快速创建自定义组件')
  @Summary('根据名称和标题快速创建自定义组件')
  @Parameters([
    { name: 'userID', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async newComp({ params: { userID }, body: { params } }) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      await ctx.service.upload.newFile(userID, params.compName);
      let dbRes = await ctx.service.page.saveCompStore(userID, params);
      ctx.body = util.status(dbRes);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
