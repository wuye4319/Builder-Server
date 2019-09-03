import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
const path = require('path');

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560331188782_4710';

  // add your egg config in here
  config.middleware = [];

  config.logger = {
    outputJSON: true,
    dir: path.join(__dirname, '/../logs/h3wind/'),
  };

  // domain
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8686']
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // listen
  config.cluster = {
    listen: {
      port: 7001,
      hostname: 'localhost',
    }
  }

  config.static = {
    prefix: '/',
    buffer: true,
    maxAge: 31536000,
    dynamic: true,
    preload: false,
    dir: path.join(appInfo.baseDir, 'api-docs/public'),
  }

  config.multipart = {
    mode: 'file',
    fileExtensions: ['.txt', '.ppt', '.pptx', '.doc', '.docx', '.xls', '.xlsx', '.pdf', '.apk', '.dll', '.avi', '.rmvb', 'mov', '.xmind', '.apk', '.rar'],
  }

  config.onerror = {
    all(err, ctx) {
      const date = new Date()
      const time = date.getTime()
      ctx.body = {
        status: 500,
        msg: err,
        serverTime: time,
        serverDate: date,
        data: '全局错误，操作失败',
      };
    },
  };

  const customizeConfig = {
    jwt: {
      secret: '123456',
      enable: true,
      match: '/jwt',
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...customizeConfig
  };
};
