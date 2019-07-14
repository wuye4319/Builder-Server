// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProduct from '../../../app/service/product';
import ExportTest from '../../../app/service/test';

declare module 'egg' {
  interface IService {
    product: ExportProduct;
    test: ExportTest;
  }
}
