import { Controller } from 'egg';

export default class AppController extends Controller {
  public async login() {
    const { ctx } = this;
    const { name, telephone } = ctx.request.body;
    let app = await ctx.service.app.getUserApp({
      name, telephone
    });
    ctx.body = app;
  }
}
