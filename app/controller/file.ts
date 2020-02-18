import { Controller } from 'egg';
import { IgnoreJwtAll, Description, TagsAll, Parameters, Post, Get, Summary, Responses } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();
@TagsAll('文件处理接口')
@IgnoreJwtAll
export default class ShopController extends Controller {
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
      let result = await ctx.service.file.uploadImg(userID, stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
	}
	@Post('/audiofile/:userID')
  @Summary('音频上传')
  @Description('音频上传接口')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async uploadAudio({ params: { userID }, body: { } }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.file.uploadAudio(userID, stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
	}
	@Post('/videofile/:userID')
  @Summary('视频上传')
  @Description('视频上传接口')
  @Parameters([
    { name: 'user', in: 'path', required: true, schema: { type: 'string', description: '用户ID' } },
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async uploadVideo({ params: { userID }, body: { } }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.file.uploadVideo(userID, stream)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
	}
	@Get('/getfile/:fileName')
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
      let file: any = await ctx.service.file.readFile(fileName);
      ctx.body = file
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
	}
	
}