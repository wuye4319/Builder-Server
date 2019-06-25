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

  public async insertTableByAppId() {
    const { ctx } = this;
    let data = ctx.request.body
    const appId = ctx.params.appId

    ctx.body = await ctx.service.table.insertTableByAppId(appId, data);
  }

  public async updateTableById() {
    const { ctx } = this;
    let data = ctx.request.body
    let id = ctx.params.id
    ctx.body = await ctx.service.table.updateTableById(id, data);
  }

  public async deleteTableById() {
    const { ctx } = this;
    let id = ctx.params.id
    ctx.body = await ctx.service.table.deleteTableById(id);
  }
}
