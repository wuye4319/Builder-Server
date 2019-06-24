import { Controller } from 'egg';

export default class SheetController extends Controller {
  public async getSheetById() {
    const { ctx } = this;
    const tableId = ctx.params.tableId
    ctx.body = await ctx.service.sheet.getSheetById(tableId);
  }

  public async getRowsById() {
    const { ctx } = this;
    const id = ctx.params.id
    const tableId = ctx.params.tableId
    ctx.body = await ctx.service.sheet.getRowsById(tableId, id);
  }

  public async insertSheetById() {
    const { ctx } = this;
    let data = ctx.request.body
    ctx.body = await ctx.service.sheet.insertSheetById(data);
  }

  public async updateSheetById() {
    const { ctx } = this;
    let data = ctx.request.body
    const id = ctx.params.id
    ctx.body = await ctx.service.sheet.updateSheetById(id, data);
  }
}
