// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProduct from '../../../app/controller/product';

declare module 'egg' {
  interface IController {
    product: ExportProduct;
  }
}
