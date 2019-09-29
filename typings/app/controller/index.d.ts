// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/controller/blog';
import ExportPage from '../../../app/controller/page';
import ExportProduct from '../../../app/controller/product';
import ExportTopic from '../../../app/controller/topic';
import ExportUpload from '../../../app/controller/upload';

declare module 'egg' {
  interface IController {
    blog: ExportBlog;
    page: ExportPage;
    product: ExportProduct;
    topic: ExportTopic;
    upload: ExportUpload;
  }
}
