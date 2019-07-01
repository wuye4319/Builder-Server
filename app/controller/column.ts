import { Controller } from 'egg';
import Tools from '../tools/util';
const util = new Tools();

export default class SheetController extends Controller {
  public async getColsByTableId() {
    const { ctx } = this;
    try {
      const tableId = ctx.params.tableId
      ctx.body = await ctx.service.column.getColsByTableId(tableId);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async insertColsBySheet() {
    const { ctx } = this;
    try {
      let data = ctx.request.body
      ctx.body = await ctx.service.column.insertColsBySheet(data);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async updateColsById() {
    const { ctx } = this;
    try {
      let data = ctx.request.body
      let id = ctx.params.id
      const { tableId } = ctx.params
      ctx.body = await ctx.service.column.updateColsById(tableId, id, data);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async deleteColsById() {
    const { ctx } = this;
    try {
      let id = ctx.params.id
      ctx.body = await ctx.service.column.deleteColsById(id);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async updateColSummary() {
    const { ctx } = this;
    try {
      const tableId = ctx.params.tableId;
      let { columnId, type } = ctx.request.body;
      ctx.body = await ctx.service.column.updateColSummary(tableId, columnId, type);
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
