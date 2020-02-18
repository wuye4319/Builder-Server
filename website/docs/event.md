# 设计器组件事件联动以及数据传递

> 事件联动采用的是发布订阅者模式

> 数据联动采用的是vuex

## 事件联动使用说明

设计器直接把发布订阅者模式绑定在了vuex上

在组件内部使用this指当前vue环境


-  绑定事件
```javascript
  this.$store.on('事件名称','方法')
```

-  触发事件
```javascript
  this.$store.$emit('事件名称','参数(非必填)')
```

-  解绑事件
```javascript
  this.$store.off('事件名称','方法(非必填)')
```

## 数据绑定使用说明

设计器数据使用vuex

module为website

在组件内部使用this指当前vue环境


-  State
```javascript
  UserData
```

-  Actions

> asyncfn    异步函数

> key    UserData对象中对应的键

> filterfn 对asyncfn返回的结果进行过滤函数 （非必须）
```javascript
  handleUserData({ asyncfn, key, filterfn })
```

-  Mutations

> key    UserData对象中对应的键

> value    UserData对象中对应的值
```javascript
  handleUserData({key,value})
```

