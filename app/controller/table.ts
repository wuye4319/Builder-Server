import { Controller } from 'egg';
import Tools from '../tools/util';
const util = new Tools();

export default class SheetController extends Controller {
  public async getTableByAppId() {
    const { ctx } = this;
    try {
      const appId = ctx.params.appId
      ctx.body = await ctx.service.table.getTableByAppId(appId);
    } catch(e) {
      ctx.body =  util.errorHandler(e);
    }
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

  public async updateFilterByTableId() {
    const { ctx } = this;
    let data = ctx.request.body
    let tableId = ctx.params.tableId
    ctx.body = await ctx.service.table.updateFilterByTableId(tableId, data);
  }

  public async deleteTableById() {
    const { ctx } = this;
    let id = ctx.params.id
    ctx.body = await ctx.service.table.deleteTableById(id);
  }
}
