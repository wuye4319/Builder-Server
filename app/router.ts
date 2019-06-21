import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/getSheetListByAppId/:appId', controller.sheet.getSheetListByAppId);
  router.get('/getSheetById/:tableId', controller.sheet.getSheetById);
  router.get('/getRowsById/:id', controller.sheet.getRowsById);
  router.post('/insertSheetById', controller.sheet.insertSheetById);
  router.post('/updateSheetById/:id', controller.sheet.updateSheetById);
};
