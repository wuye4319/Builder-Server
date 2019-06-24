import { Controller } from 'egg';

export default class SheetController extends Controller {
  public async getTableByAppId() {
    const { ctx } = this;
    const appId = ctx.params.appId
    ctx.body = await ctx.service.table.getTableByAppId(appId);
  }

  public async getTableById() {
    const { ctx } = this;
    const id = ctx.params.id
    ctx.body = await ctx.service.table.getTableById(id);
  }

  public async insertColsBySheet() {
    const { ctx } = this;
    let data = ctx.request.body
    ctx.body = await ctx.service.column.insertColsBySheet(data);
  }

  public async updateColsBySheet() {
    const { ctx } = this;
    let data = ctx.request.body
    let id = ctx.params.id
    ctx.body = await ctx.service.column.updateColsById(id, data);
  }
}
