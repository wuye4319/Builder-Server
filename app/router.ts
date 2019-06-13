import { Application } from 'egg';
require('./base/basedb.js')

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/product', controller.product.hello);
};
