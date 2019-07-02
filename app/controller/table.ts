import { Controller } from 'egg';
import Tools from '../tools/util';
const util = new Tools();

export default class SheetController extends Controller {
  public async getTableByAppId() {
    const { ctx } = this;
    try {
      const appId = ctx.params.appId
      ctx.body = await ctx.service.table.getTableByAppId(appId);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async getTableById() {
    const { ctx } = this;
    try {
      const id = ctx.params.id
      ctx.body = await ctx.service.table.getTableById(id);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async insertTableByAppId() {
    const { ctx } = this;
    try {
      let data = ctx.request.body
      const appId = ctx.params.appId
      ctx.body = await ctx.service.table.insertTableByAppId(appId, data);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async updateTableById() {
    const { ctx } = this;
    try {
      let data = ctx.request.body
      let id = ctx.params.id
      ctx.body = await ctx.service.table.updateTableById(id, data);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async updateFilterByTableId() {
    const { ctx } = this;
    try {
      let data = ctx.request.body
      let tableId = ctx.params.tableId
      ctx.body = await ctx.service.table.updateFilterByTableId(tableId, data);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async deleteTableById() {
    const { ctx } = this;
    try {
      let id = ctx.params.id
      ctx.body = await ctx.service.table.deleteTableById(id);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async getColFiltersByTableId() {
    const { ctx } = this;
    try {
      let tableId = ctx.params.tableId
      ctx.body = await ctx.service.table.getColFiltersByTableId(tableId);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
