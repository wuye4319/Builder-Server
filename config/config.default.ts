import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560331188782_4710';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    csrf: false
  }

  // config.mysql = {
  //   client: {
  //     host: 'localhost',
  //     port: '3306',
  //     user: 'test_user',
  //     password: 'test_password',
  //     database: 'test',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // }

  // add your special config in here
  // const bizConfig = {
  //   sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  // };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    // ...bizConfig,
  };
};
