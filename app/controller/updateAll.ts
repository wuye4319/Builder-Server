import { Controller } from 'egg';
import Tools from '../tools/util';
const util = new Tools();

export default class SheetController extends Controller {
  public async updateAllSheet() {
    const { ctx } = this;
    try {
      // const data = ctx.request.body;
      ctx.body = await ctx.service.updateAll.updateAllSheet();
    } catch (e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
