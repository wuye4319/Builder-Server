// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportProduct from '../../../app/controller/product';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    product: ExportProduct;
  }
}
