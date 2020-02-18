import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    keys: 'H3Yun-Designer-prod',
    cluster: {
      listen: {
        port: 7001,
        hostname: '172.18.15.20'
        // hostname: 'cloudpivot-pagedesigner.h3yun.com'
      }
    }
  };
  return config;
};
