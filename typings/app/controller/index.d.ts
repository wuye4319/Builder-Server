// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/controller/blog';
import ExportProduct from '../../../app/controller/product';
import ExportShop from '../../../app/controller/shop';
import ExportTopic from '../../../app/controller/topic';

declare module 'egg' {
  interface IController {
    blog: ExportBlog;
    product: ExportProduct;
    shop: ExportShop;
    topic: ExportTopic;
  }
}
