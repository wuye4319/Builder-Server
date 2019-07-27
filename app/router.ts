import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';

export default (app: Application) => {
  const { config } = app;
  const { listen } = config.cluster

  EggShell(app, {
    prefix: '/web/v1',
    quickStart: false,
    swaggerOpt: {
      open: true,
      title: 'wssso接口文档库',
      version: '1.0.0',
      host: listen.hostname,
      port: listen.port,
      schemes: ['http', 'https'],
      paths: {
        outPath: '/api-docs/public/json/main.json',
        definitionPath: "/app/definitions"
      }
    }
  });
};
