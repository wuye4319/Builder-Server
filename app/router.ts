import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';

export default (app: Application) => {
  EggShell(app, {
    prefix: '/web/v1',
    quickStart: false,
    swaggerOpt: {
      open: true,
      title: '示例',
      version: '1.0.0',
      host: '127.0.0.1',
      port: 7001,
      schemes: ['http'],
      paths: {
        outPath: '/api-docs/public/json/main.json',
        definitionPath: "/app/definitions"
      }
    }
  });
};
