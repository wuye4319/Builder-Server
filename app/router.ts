import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  /**
   * sheet
   */

  // 获取列行所有数据
  router.get('/getSheetById/:tableId/:page/:size', controller.sheet.getSheetById);
  // 更新查询条件
  // router.patch('/updateViewData/:tableId', controller.sheet.updateViewData);

  // 单独获取某一行的数据
  router.get('/getRowsById/:tableId/:id', controller.sheet.getRowsById);
  // 新增一行数据
  router.post('/insertSheetById/:tableId', controller.sheet.insertSheetById);
  // 更新一行数据
  router.patch('/updateSheetById/:tableId/:id', controller.sheet.updateSheetById);
  // 根据ID删除行数据
  // router.delete('/deleteSheetById/:tableId/:id', controller.sheet.deleteSheetById);
  // 根据tableID删除多行数据
  router.post('/deleteSheetsByTableId/:tableId', controller.sheet.deleteSheetsByTableId);

  /**
   * column
   */

  // 获取单列的头信息
  router.get('/getColsByTableId/:tableId', controller.column.getColsByTableId);
  // 新增一个新的列
  router.post('/insertColsBySheet', controller.column.insertColsBySheet);
  // 根据ID更新列的信息
  router.patch('/updateColsById/:id', controller.column.updateColsById);
  // 根据ID删除列
  router.delete('/deleteColsById/:id', controller.column.deleteColsById);
  // 根据ID获取summary 统计结果
  router.post('/updateColSummary/:tableId', controller.column.updateColSummary);

  /**
   * table
   */

  // 获取所有表信息
  router.get('/getTableByAppId/:appId', controller.table.getTableByAppId);
  // 获取单个表的信息
  router.get('/getTableById/:id', controller.table.getTableById)
  // 新增一个表
  router.post('/insertTableByAppId/:appId', controller.table.insertTableByAppId)
  // 更新一个表的信息
  router.patch('/updateTableById/:id', controller.table.updateTableById)
  // 根据tableID更新filter的信息
  router.patch('/updateFilterByTableId/:tableId', controller.table.updateFilterByTableId)
  // 根据ID删除一个表，会删除动态创建的数据表
  router.delete('/deleteTableById/:id', controller.table.deleteTableById)

  /**
   * app
   */

   // 登录获取app，或创建app
  router.post('/login', controller.app.login);
  // 更新应用属性，用于修改应用名称
  router.post('/updateApp/:appId', controller.app.updateApp);
};
