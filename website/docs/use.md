# 一个可视化实时渲染的低代码页面设计器
******
 > 此设计器是基于vue的二次开发，支持实时渲染，所见即所得，面向开发者的低代码页面开发工具。

 > 既可以使用设计器内置组件完成整个网页的搭建，也可以使用自定义组件，非常灵活。

## 线上实例
******
 [http://120.25.77.12:81/#/admin/myapp/manage](xxx)

## 运行
******
github地址：https://xxx.github.io
私库：http://gitlab.h3yun.com/designer/pagedesigner
```bash
$ npm i
$ npm run dev
$ open http://localhost:8001/
```

## 特性
******
 
### 低代码开发

 - 通过拖拽组件的方式即可快速搭建一个完整的网页
 - 熟练的开发者也可通过源码编辑，可自行修改组件结构和样式

### 自定义开发

 - 可将本地开发的组件通过源码上传到设计器中
 - 可将自定义组件分享给他人使用

## 使用方式
******

### 引入已有项目
 * 通过 npm install xxx --save 将包安装到项目中
 * 导入npm包，import xxx from "xxx"
 * 将设计器作为独立的组件注册到项目中
 * 在路由中去引入设计器插件资源，将设计器注入到你的项目中

 ```js
import { website, designer } from 'authine-page-designer';
const routes = [
  ...website,
  ...designer
];

export default routes;
 ```

### 在线编辑使用

  * 进入官方网站： https://www.******.com
  * 注册个人账号，登录成功后，进入设计器页面，可选PC端或者移动端

### 开发自定义组件

- 除了使用我们给您提供这些组件外，您还可以自行开发更符合公司需求的自定义组件，关于如何开发，请查看[自定义组件开发指南](#/admin/guide/comp);

### 主题设置

* theme [ string : dark/light]
 
