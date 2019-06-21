// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportColumn from '../../../app/service/column';
import ExportSheet from '../../../app/service/sheet';
import ExportTable from '../../../app/service/table';

declare module 'egg' {
  interface IService {
    column: ExportColumn;
    sheet: ExportSheet;
    table: ExportTable;
  }
}
