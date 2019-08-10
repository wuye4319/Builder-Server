// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/service/blog';
import ExportPage from '../../../app/service/page';
import ExportProduct from '../../../app/service/product';
import ExportTopic from '../../../app/service/topic';

declare module 'egg' {
  interface IService {
    blog: ExportBlog;
    page: ExportPage;
    product: ExportProduct;
    topic: ExportTopic;
  }
}
