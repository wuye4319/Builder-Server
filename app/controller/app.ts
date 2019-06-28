import { Controller } from 'egg';

export default class AppController extends Controller {
  public async login() {
    const { ctx } = this;
    const { username, telephone } = ctx.request.body;
    let app = await ctx.service.app.getUserApp({
      username, telephone
    });
    ctx.body = app;
  }

  public async updateApp() {
    const { ctx } = this;
    const appId = ctx.params.appId;
    const { name } = ctx.request.body;
    let app = await ctx.service.app.updateApp(appId, {
      name
    });
    ctx.body = app;
  }
}
