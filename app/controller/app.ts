import { Controller } from 'egg';

export default class AppController extends Controller {
  public async login() {
    try {
      const { ctx } = this;
      const { username, telephone } = ctx.request.body;
      let app = await ctx.service.app.getUserApp({
        username, telephone
      });
      ctx.body = app;
    } catch(e) {
      throw e;
    }
  }

  public async updateApp() {
    try {
      const { ctx } = this;
      const appId = ctx.params.appId;
      const { name } = ctx.request.body;
      let app = await ctx.service.app.updateApp(appId, {
        name
      });
      ctx.body = app;
    } catch(e) {
      throw e;
    }
  }
}
