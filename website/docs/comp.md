# 如何开发设计器自定义组件
******
> Authine page设计器，不但支持搭建页面应用，也支持用户自定义组件，可以封装公司独有的组件库。

> 自定义组件是我们设计器的一大亮点，给用户提供了非常灵活的开发方式，我们只提供您简化开发的工具，而不干扰您的应用方向。

> 利用我们的设计器，您可以仅仅开发上传一个简单的视图组件，也可以上传一个功能十分强大的业务组件，组件最终如何完全取决于您的意愿。

## 自定义组件文件结构
******
> 由于项目组件均由动态方式引入，因此组件外层文件夹名称必须与组件名称相同
```javascript
  ·compName // 组件
  |   compName.vue // 组件文件，文件名命名为组件名称
  |   index.ts // 导出组件    
  │   ├── control // 控制器 
  │   │   |  compName.vue // 属性设置文件，文件名命名为组件名称  
  │   │   |  index.ts //导出属性设置
```

## 组件数据结构
> 自定义组件的属性与内置组件默认属性相同，而组件的业务属性及样式将您来决定；
> compData由vuex统一管理，组件内只需要通过prop属性拿过来使用即可。
```javascript
  compData: {
    //设计器组件默认属性
    "compName": "", //组件名称，英文
    "type": "custom", //组件类型,(自定义组件类型为custom)
    "title": "轮播框", //组件名称，中文
    "description":"",//组件描述，介绍文字
     //设计器组件可自定义属性
    "compAttr": { //组件的所有业务和样式属性，可自定义属性区域
      "width": "100%",
      ...
    }
  }
```

## 开发步骤
******

### 搭建本地环境

1. 参照下列示例在本地新建vue文件，在本地进行编辑，组件内容根据自己的需要来定：
```javascript
<template>
  <audio
    class="myaudio"
    :src="comAttr.src || audioDemo"
    controls="controls"
    :style="{
      'width':comAttr.width,
      'height':comAttr.height,
      'margin':comAttr.margin,
      'padding':comAttr.padding,
      'border-color':comAttr.borderColor,
      'border-radius':comAttr.height/2
    }"
  >
    您的浏览器版本过低，推荐下载最新版谷歌浏览器体验
  </audio>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
@Component({
  name: 'audio-component'
})
export default class audioComponent extends Vue {
  //自定义组件数据
  @Prop() compData: any;
  //自定义组件属性，可控属性，与控制器中定义的属性完全一致
  comAttr:any = this.compData.compAttr;
  comName = this.compData.compName;
  created():void{ }
}
</script>
<style lang="less" scoped></style>
```

2. (可省略)为组件添加控制器，将自定义属性设成接口对外暴露，方便他人使用，请查看[控制器开发指南](#/admin/guide/ctrl)；

3. 本地调试，组件代码位于您后端配置的文件路径下面;

4. 连接远程服务器：https://authineDesigner.com，并在组件管理平台将未完成的自定义组件先上传到服务器;

5. 运行本地代码，npm run dev,设计器运行起来后，就可以在本地调试自定组件的样式和属性了；


### 组件上传位置

1. 首先，进入到设计器管理系统，我的组件 -> 组件列表 -> 上传组件；
2. 根据要求填写组件信息，所有带星号的选项均为必填项；


    
