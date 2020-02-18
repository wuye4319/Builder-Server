import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  security: {
    enable: false,
    package: 'egg-security',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};

export default plugin;
