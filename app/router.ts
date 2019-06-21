import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 获取所有表信息
  router.get('/getSheetListByAppId/:appId', controller.sheet.getSheetListByAppId);
  // 获取列行所有数据
  router.get('/getSheetById/:tableId', controller.sheet.getSheetById);
  // 单独获取某一行的数据
  router.get('/getRowsById/:id', controller.sheet.getRowsById);
  // 新增一行数据
  router.post('/insertSheetById', controller.sheet.insertSheetById);
  // 更新一行数据
  router.post('/updateSheetById/:id', controller.sheet.updateSheetById);
};
