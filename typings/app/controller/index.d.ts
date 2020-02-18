// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApps from '../../../app/controller/apps';
import ExportComps from '../../../app/controller/comps';
import ExportFile from '../../../app/controller/file';
import ExportPage from '../../../app/controller/page';
import ExportTables from '../../../app/controller/tables';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    apps: ExportApps;
    comps: ExportComps;
    file: ExportFile;
    page: ExportPage;
    tables: ExportTables;
    upload: ExportUpload;
    user: ExportUser;
  }
}
