// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportColumn from '../../../app/controller/column';
import ExportSheet from '../../../app/controller/sheet';
import ExportTable from '../../../app/controller/table';

declare module 'egg' {
  interface IController {
    column: ExportColumn;
    sheet: ExportSheet;
    table: ExportTable;
  }
}
