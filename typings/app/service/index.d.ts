// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApps from '../../../app/service/apps';
import ExportComps from '../../../app/service/comps';
import ExportFile from '../../../app/service/file';
import ExportPage from '../../../app/service/page';
import ExportTables from '../../../app/service/tables';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    apps: ExportApps;
    comps: ExportComps;
    file: ExportFile;
    page: ExportPage;
    tables: ExportTables;
    upload: ExportUpload;
    user: ExportUser;
  }
}
