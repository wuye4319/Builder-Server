import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/getSheetListByAppId/:appId', controller.sheet.getSheetListByAppId);
  router.get('/getSheetById/:tableId', controller.sheet.getSheetById);
  router.post('/insertSheetById/:tableId', controller.sheet.insertSheetById);
  router.post('/updateSheetById/:tableId', controller.sheet.updateSheetById);
};
