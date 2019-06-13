import { Controller } from 'egg';

export default class ProductController extends Controller {
  public async hello() {
    const { ctx } = this;
    ctx.body = await ctx.service.product.sayHello('new egg world!');
  }
}
