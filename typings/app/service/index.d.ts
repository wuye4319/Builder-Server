// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/service/app';
import ExportColumn from '../../../app/service/column';
import ExportSheet from '../../../app/service/sheet';
import ExportTable from '../../../app/service/table';
import ExportUpdateAll from '../../../app/service/updateAll';

declare module 'egg' {
  interface IService {
    app: ExportApp;
    column: ExportColumn;
    sheet: ExportSheet;
    table: ExportTable;
    updateAll: ExportUpdateAll;
  }
}
