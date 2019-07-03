// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/controller/app';
import ExportColumn from '../../../app/controller/column';
import ExportSheet from '../../../app/controller/sheet';
import ExportTable from '../../../app/controller/table';
import ExportUpdateAll from '../../../app/controller/updateAll';

declare module 'egg' {
  interface IController {
    app: ExportApp;
    column: ExportColumn;
    sheet: ExportSheet;
    table: ExportTable;
    updateAll: ExportUpdateAll;
  }
}
