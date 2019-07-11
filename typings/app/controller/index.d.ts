// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/controller/test';

declare module 'egg' {
  interface IController {
    test: ExportTest;
  }
}
