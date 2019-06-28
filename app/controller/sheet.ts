import { Controller } from 'egg';
import Tools from '../tools/util';
const util = new Tools();

export default class SheetController extends Controller {
  public async getSheetById() {
    const { ctx } = this;
    try {
      const tableId = ctx.params.tableId
      const page = parseInt(ctx.params.page)
      const size = parseInt(ctx.params.size)
      ctx.body = await ctx.service.sheet.getSheetById(tableId, page, size);
    } catch(e) {
      ctx.body =  util.errorHandler(e);
    }
  }

  // public async updateViewData() {
  //   const { ctx } = this;
  //   let data = ctx.request.body
  //   const tableId = ctx.params.tableId
  //   ctx.body = await ctx.service.sheet.updateViewData(tableId, data);
  // }

  public async getRowsById() {
    const { ctx } = this;
    const { id } = ctx.params
    const { tableId } = ctx.params
    ctx.body = await ctx.service.sheet.getRowsById(tableId, id);
  }

  public async insertSheetById() {
    const { ctx } = this;
    try {
      const { body } = ctx.request
      const { tableId } = ctx.params
      ctx.body = await ctx.service.sheet.insertSheetById(tableId, body);
    } catch(e) {
      ctx.body =  util.errorHandler(e);
    }
  }

  public async updateSheetById() {
    const { ctx } = this;
    const { body } = ctx.request
    const { tableId } = ctx.params
    const { id } = ctx.params
    ctx.body = await ctx.service.sheet.updateSheetById(tableId, id, body);
  }

  // public async deleteSheetById() {
  //   const { ctx } = this;
  //   const tableId = ctx.params.tableId
  //   const id = ctx.params.id
  //   ctx.body = await ctx.service.sheet.deleteSheetById(tableId, id);
  // }

  public async deleteSheetsByTableId() {
    const { ctx } = this;
    const tableId = ctx.params.tableId
    let data = ctx.request.body
    ctx.body = await ctx.service.sheet.deleteSheetsByTableId(tableId, data);
  }
}
