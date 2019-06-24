import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  /**
   * sheet
   */

  // 获取列行所有数据
  router.get('/getSheetById/:tableId', controller.sheet.getSheetById);
  // 单独获取某一行的数据
  router.get('/getRowsById/:tableId/:id', controller.sheet.getRowsById);
  // 新增一行数据
  router.post('/insertSheetById', controller.sheet.insertSheetById);
  // 更新一行数据
  router.post('/updateSheetById/:id', controller.sheet.updateSheetById);

  /**
   * column
   */

  // 获取单列的头信息
  router.get('/getColsById/:id', controller.column.getColsById);
  router.post('/insertColsBySheet', controller.column.insertColsBySheet);

  /**
   * table
   */

  // 获取所有表信息
  router.get('/getTableByAppId/:appId', controller.table.getTableByAppId);

};
