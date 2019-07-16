// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/service/blog';
import ExportProduct from '../../../app/service/product';
import ExportShop from '../../../app/service/shop';
import ExportTopic from '../../../app/service/topic';

declare module 'egg' {
  interface IService {
    blog: ExportBlog;
    product: ExportProduct;
    shop: ExportShop;
    topic: ExportTopic;
  }
}
