import { Controller } from 'egg';

export default class SheetController extends Controller {
  public async getColsByTableId() {
    const { ctx } = this;
    const tableId = ctx.params.tableId
    ctx.body = await ctx.service.column.getColsByTableId(tableId);
  }

  public async insertColsBySheet() {
    const { ctx } = this;
    let data = ctx.request.body
    ctx.body = await ctx.service.column.insertColsBySheet(data);
  }

  public async updateColsById() {
    const { ctx } = this;
    let data = ctx.request.body
    let id = ctx.params.id
    ctx.body = await ctx.service.column.updateColsById(id, data);
  }

  public async deleteColsById() {
    const { ctx } = this;
    let id = ctx.params.id
    ctx.body = await ctx.service.column.deleteColsById(id);
  }
}
