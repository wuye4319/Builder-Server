# 设计器数据结构及注意事项

> 整个设计器页面的数据通过一个接口统一返回，包含应用层数据，组件库，全局样式和可用数据对象等；

******

  1. apps - 该应用的基础数据和页面数据；
  2. compstore - 对应客户端（PC或者移动端）的所有组件；
  3. global - 该应用的全局样式数据；
  4. tables - 该应用下的所有数据集；

- 对应json格式如下：
  ```javascript
    {
      "apps":{},             //应用
      "compstore":{},   //组件库
      "global":{},          //全局样式
      "tables":{} //数据对象
    }
  ```

  
## apps

  >以下是apps的内部数据格式，每个页面用页面名称做键，值存储该页面所有数据。

  ```javascript
    {
      appName: 'string',     //应用名称
      description: 'string',  //应用描述，介绍
      pageInfor: {                 //应用页面
          default: {  //页面数据，default为页面英文名称
	     title: 'string', //页面标题
              module: [  //页面中的组件列表
	         { boxModal: 0,//是否显示盒模型，0-不显示，1-显示
                    boxOptions: {},//盒模型的配置项，同理谷歌浏览器中的盒模型
		  compAttr: {},//组件属性
                    compImg: null,
                    compName: "bottomNav",//组件英文名称
                   description: 'string',//组件描述
                   title: "string",//组件中文名称
                   type: "custom,//组件类型
                  },
                   ...
             ]
          }，
         ...   
       }             
    }
  ```

## compStore

  >以下是compStore的内部数据格式，按布局组件和页面分。


  ```javascript
    [
       { boxModal: 0,//是否显示盒模型，0-不显示，1-显示
          boxOptions: {},//盒模型的配置项，同理谷歌浏览器中的盒模型
          compAttr: {},//组件属性
          compImg: null,
          compName: "bottomNav",//组件英文名称
          description: 'string',//组件描述
          title: "string",//组件中文名称
          type: "custom,//组件类型
         },
         ...
    ]

  ```

## global

  >以下是global的内部数据格式

  ```javascript
   {
         appStyle: {
              background: {
                width: "100%",
                height: "100%", 
                backgroundColor: "#ffffff", 
                backgroundOpacity: 100
             },
             border: {
                  borderBottomColor: ""
                  borderBottomLeftRadius: ""
                  borderBottomRightRadius: ""
                  borderBottomStyle: ""
                  borderBottomWidth: ""
                  borderLeftColor: ""
                  borderLeftStyle: ""
                  borderLeftWidth: ""
                  borderRightColor: ""
                  borderRightStyle: ""
                  borderRightWidth: ""
                  borderTopColor: ""
                  borderTopLeftRadius: ""
                  borderTopRightRadius: ""
                  borderTopStyle: ""
                  borderTopWidth: ""
                  commonColor: "#000000"
                  commonStyle: "none"
                  commonWidth: "0px"
             },
             font: {
                 fontColor: "#000000"
                 fontFamily: "Microsoft YaHei"
                 fontSize: "16px"
                 fontWeight: "400"
                 textAlign: "center"
                 textDecoration: "none"
                 textTransform: "none"
             }
          }
         theme: {//主题属性
            @primary-color: "#17BC94", 
            @success-color: "#52c41a", 
            @warning-color: "#faad14",
            …
         }
    }
  ```

## tables 

 > 数据对象，供应用内组件绑定实用

  ```javascript
       [
           { 
                "tableName":"demo",
                "description":"我是测试",
                "title":"测试一"
          },
          {
                "tableName":"demow",
                "description":"测试",
                "title":"测试二"
          }
      ]
  ```