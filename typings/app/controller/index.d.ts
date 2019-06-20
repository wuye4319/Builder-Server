// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSheet from '../../../app/controller/sheet';

declare module 'egg' {
  interface IController {
    sheet: ExportSheet;
  }
}
