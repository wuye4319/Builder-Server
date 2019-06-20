import { Controller } from 'egg';

export default class SheetController extends Controller {
  public async getSheetListByAppId() {
    const { ctx } = this;
    const appId = ctx.params.appId
    ctx.body = await ctx.service.sheet.getSheetListByAppId(appId);
  }

  public async getSheetById() {
    const { ctx } = this;
    const tableId = ctx.params.tableId
    ctx.body = await ctx.service.sheet.getSheetById(tableId);
  }

  public async insertSheetById() {
    const { ctx } = this;
    let data = ctx.request.body
    ctx.body = await ctx.service.sheet.insertSheetById(data);
  }

  public async updateSheetById() {
    const { ctx } = this;
    let data = ctx.request.body
    ctx.body = await ctx.service.sheet.insertSheetById(data);
  }
}
