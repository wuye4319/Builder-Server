# 自定义组件如何设置组件属性接口
******

  > 设计器页面一共分为三大部分，左侧是可拖拽的组件库，中间是实时的网页渲染区，右侧是网页组件的属性设计区。

  > 其中右侧的组件设置区是可以用户自定义的，内容和样式都根据用户的喜好来设置即可，设置的是对应自定义组件的属性，我们称呼它为组件控制器。

  > 组件控制器需要与自定义组件一起上传到服务器中，不能单独上传，且控制器中的属性需要与组件中的属性一致，否则控制器变化时，组件将无法联动。

  > 由于控制器与自定义组件是共用一个vuex状态，所以控制器发生改变时，自定义组件可实时联动。

  > 可自定义的组件属性接口是我们平台提供的一大特色，这也决定了组件的复杂性与易用性。

## 控制器文件开发步骤
******

1. 首先，在本地创建vue文件，搭好基本框架，代码结构如下：
```javascript
<template>
//---此区域内容可自行定义，显示的是该控制器对应组件的对外暴露属性接口
  <div class="button-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">宽度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="width"
          @blur="changeVal('width')"
        />
      </a-list-item>
    </a-list>
  </div>
//---此区域内容可自行定义
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
const webSite = namespace('webSite');
@Component({
  name: 'active-component'
})
export default class activeComponent extends Vue {
  //组件数据
  @Prop() compData: any
  //组件在页面中的索引
  @Prop()compIndex: number
  //组件属性，即控制器可控制的数据
  compAttr: object = this.compData.compAttr;
  //以下为自定义属性，需要在组件中定义，实现双向绑定
  width:string = ''
  //获取vuex中的数据
  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;
  @webSite.Mutation('editPageInfor')
  editPageInfor;

//控制器数据初始化
  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }
  //控制器数据改变时，同时更改vuex中的数据，实现页面的联动
  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
    this.editPageInfor({ index: this.compIndex, data: this.pageData.compAttr });
  }
}
</script>
<style lang="less" scoped></style>

```
2. 将控制器文件和组件文件一起上传到服务器中。

3. 去我的组件页面，为刚上传的组件设置控制器的属性内容，此时设置的属性也需要与控制器中用到的属性相同，这样自定义组件与页面和控制器就联动起来了。
