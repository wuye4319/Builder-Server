import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Description, TagsAll, Parameters, Post, Summary, Responses } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('博客接口')
@IgnoreJwtAll
export default class PorductController extends Controller {
  @Get('/:type/:pagesize/:page')
  @Description('根据类型，类型包括：漫画，美文，图文等，获取博客列表信息')
  @Summary('博客列表')
  @Parameters([
    { name: 'pagesize', in: 'path', required: true, schema: { $ref: '#/definitions/PageSize' } },
    { name: 'page', in: 'path', required: true, schema: { $ref: '#/definitions/Page' } },
    { name: 'type', in: 'path', required: true, schema: { $ref: '#/definitions/Key' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getBlogList({ params: { type, pagesize, page } }) {
    const { ctx } = this;
    pagesize = parseInt(pagesize)
    page = parseInt(page)
    try {
      let total:any = await ctx.service.blog.getBlogCount(type)

      let sqlpage = (page - 1) * pagesize
      let tempPro = await ctx.service.blog.getBlogList(type, sqlpage, pagesize)
      ctx.body = util.status(tempPro, total.total, page, pagesize)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  @Post('/:id')
  @Description('根据ID获取当前博客文章的详细信息接口')
  @Summary('博文详情')
  @Parameters([
    { name: 'id', in: 'path', required: true, schema: { $ref: '#/definitions/Key' } }
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getBlogDetail({ params: { id } }) {
    const { ctx } = this;
    try {
      let result = await ctx.service.blog.getBlog(id)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
