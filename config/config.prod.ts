import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    keys: 'H3Yun-Wind-prod',
  };
  return config;
};
