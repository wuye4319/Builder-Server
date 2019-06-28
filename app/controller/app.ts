import { Controller } from 'egg';
import tools from '../tools/util'
const util = new tools()

export default class AppController extends Controller {
  public async login() {
    const { ctx } = this;
    try {
      const { username, telephone } = ctx.request.body;
      let app = await ctx.service.app.getUserApp({
        username, telephone
      });
      ctx.body = app;
    } catch(e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async updateApp() {
    const { ctx } = this;
    try {
      const appId = ctx.params.appId;
      const { name } = ctx.request.body;
      let app = await ctx.service.app.updateApp(appId, {
        name
      });
      ctx.body = app;
    } catch(e) {
      ctx.body = util.errorHandler(e);
    }
  }

  public async getAllUsers() {
    const { ctx } = this;
    try {
      let users = await ctx.service.app.getAllUsers();
      ctx.body = users;
    } catch(e) {
      ctx.body = util.errorHandler(e);
    }
  }
}
