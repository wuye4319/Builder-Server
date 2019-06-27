import { EggAppConfig, PowerPartial } from 'egg';

export default (appInfo) => {
  const config: PowerPartial<EggAppConfig> = {};
  config.keys = appInfo.name + '_1560331188782_4710';
  return config;
};
