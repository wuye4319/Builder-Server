import { Controller } from 'egg';

export default class SheetController extends Controller {
  public async getColsById() {
    const { ctx } = this;
    const id = ctx.params.id
    ctx.body = await ctx.service.column.getColsById(id);
  }

  public async insertSheetById() {
    const { ctx } = this;
    let data = ctx.request.body
    ctx.body = await ctx.service.column.insertSheetById(data);
  }

  public async updateSheetById() {
    const { ctx } = this;
    let data = ctx.request.body
    const id = ctx.params.id
    ctx.body = await ctx.service.column.updateSheetById(id, data);
  }
}
