import { Controller } from 'egg';
import { Get,Post,Delete,Put, IgnoreJwtAll, Description, TagsAll, Parameters, Summary, Responses } from 'egg-shell-decorators';

import Tools from '../util';
const util = new Tools();

@TagsAll('app应用接口')
@IgnoreJwtAll
export default class ShopController extends Controller {
  @Get('/alltables/:appID')
  @Description('获取数据库中的所有表')
  @Summary('获取数据库中的所有表')
  @Parameters([
    {name: 'appID', in: 'path', required: true, schema: { type: 'string',description: '应用ID' }},
    {name: 'pageSize', in: 'query', required: true, schema: { type: 'string',description: '每页数据条数' }},
    {name: 'pageIndex', in: 'query', required: true, schema: { type: 'string',description: '要查询的页码，从1开始' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getAllTables({params: {appID},query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.getAllTables(appID,query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Get('/tablemessage/:tableName')
  @Description('获取数据对象中的数据和字段数据')
  @Summary('获取数据对象中的数据和字段数据')
  @Parameters([
    {name: 'tableName', in: 'path', required: true, schema: { type: 'string',description: '表名' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getTableMessage({params:{tableName},query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result:any = await ctx.service.tables.getTableMessage(tableName,query)
      ctx.body = util.status(result.data,result.total,result.page,result.size)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Delete('/tablemessage/:tableName')
  @Description('根据传入表明删除对应数据对象')
  @Summary('根据传入表明删除对应数据对象')
  @Parameters([
    {name: 'tableName', in: 'path', required: true, schema: { type: 'string',description: '表名' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async deleteTableMessage({params:{tableName},query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.deleteTableMessage(tableName,query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Post('/addtable/:appID')
  @Description('添加数据对象')
  @Summary('添加数据对象')
  @Parameters([
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async addTable({params: {appID},body:{params}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.addTable(appID,params)
      ctx.body = util.status(result.data,'','','',result.msg || '')
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Post('/tablecolumn/:tableName')
  @Description('在现有数据对象中添加字段')
  @Summary('在现有数据对象中添加字段')
  @Parameters([
    {name: 'tableName', in: 'path', required: true, schema: { type: 'string',description: '表名' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async addTableColumn({params:{tableName},body:{params}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.addTableColumn(tableName,params)
      ctx.body = util.status(result.data,'','','',result.msg || '')
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Delete('/tablecolumn/:tableName')
  @Description('删除数据对象的某个字段')
  @Summary('删除数据对象的某个字段')
  @Parameters([
    {name: 'tableName', in: 'path', required: true, schema: { type: 'string',description: '表名' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async deleteTableColumn({params:{tableName},query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.deleteTableColumn(tableName,query)
      ctx.body = util.status(result.data,'','','',result.msg)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Get('/tablecontent/:tableName')
  @Description('查询现有对象中的数据')
  @Summary('查询现有对象中的数据')
  @Parameters([
    {name: 'tableName', in: 'path', required: true, schema: { type: 'string',description: '表名' }},
    {name: 'pageSize', in: 'query', schema: { type: 'string',description: '每页数据条数' }},
    {name: 'pageIndex', in: 'query', schema: { type: 'string',description: '要查询的页码，从1开始' }},
    {name: 'orderBy', in: 'query', schema: { type: 'json',description: '排序规则，以“排序字段-排序方法”的格式来传，排序方法有：desc-倒序，asc-顺序' }},
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async getTableContent({params:{tableName},query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.getTableContent(tableName,query)
      ctx.body = util.status(result.data,result.total,result.page,result.size)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Post('/tablecontent/:tableName')
  @Description('在现有数据对象中添加数据')
  @Summary('在现有数据对象中添加数据')
  @Parameters([
    {name: 'tableName', in: 'path', required: true, schema: { type: 'string',description: '表名' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async addTableContent({params:{tableName},body: {params}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.addTableContent(tableName,params)
      ctx.body = util.status(result.data,result.total,'','',result.msg)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Delete('/tablecontent/:tableName')
  @Description('在现有数据对象中添加数据')
  @Summary('在现有数据对象中添加数据')
  @Parameters([
    {name: 'tableName', in: 'path', required: true, schema: { type: 'string',description: '表名' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async deleteTableContent({params:{tableName},query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.deleteTableContent(tableName,query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Put('/tablecontent/:tableName')
  @Description('在现有数据对象中添加数据')
  @Summary('在现有数据对象中添加数据')
  @Parameters([
    {name: 'tableName', in: 'path', required: true, schema: { type: 'string',description: '表名' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async updateTableContent({params:{tableName},body:{params}}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.updateTableContent(tableName,params)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Get('/settop')
  @Description('在现有数据对象中添加数据')
  @Summary('在现有数据对象中添加数据')
  @Parameters([
    {name: 'tableName', in: 'query', required: true, schema: { type: 'string',description: '表名' }},
    {name: 'id', in: 'query', required: true, schema: { type: 'string',description: '置顶ID' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async setContentTop({query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result:any = await ctx.service.tables.setContentTop(query)
      if(result.msg){
        ctx.body = util.status(result.data,'','','',result.msg);
      }else{
        ctx.body = util.status(result)
      }
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
  @Get('/canceltop')
  @Description('在现有数据对象中添加数据')
  @Summary('在现有数据对象中添加数据')
  @Parameters([
    {name: 'tableName', in: 'query', required: true, schema: { type: 'string',description: '表名' }},
    {name: 'id', in: 'query', required: true, schema: { type: 'string',description: '置顶ID' }}
  ])
  @Responses({
    '200': { type: 'object', description: '操作成功' },
    '500': { type: 'object', description: '操作失败' }
  })
  public async cancelContentTop({query}) {
    const { ctx } = this;
    try {
      util.getAllCookies(ctx);
      let result = await ctx.service.tables.cancelContentTop(query)
      ctx.body = util.status(result)
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}