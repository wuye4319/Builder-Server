# 设计器数据结构说明

  >以下是设计器最外层数据，共四个数据。
  >>pages-用户在该应用下建立的所有页面数据；
  >>compstore-PC端所有组件；
  >>compstore_mobile-移动端所有组件；
  >>version-设计器版本好

  ```js
    {
      "pages":{},//页面
      "compStore":{},//组件库
      "compStore_mobile":{},//组件库-移动端
      "version":"string"//版本号
    }
  ```

  
## pages

  >以下是pages的内部数据格式，每个页面用页面名称做键，值存储该页面所有数据。

  ```js
    {
      "pageName":{//页面名称
        "title":"string",//页面标题
        "module":{//页面包含的组件
          "compName": "string",//组件名
            "compAttr": {//组件属性
            //可自定义需要的属性
            "logo": "string"
            ...
          }
        }
      },
      ...
    }
  ```

## compStore

  >以下是compStore的内部数据格式，按布局组件和页面分。
  >>layout里面放的布局组件可选组件，以数组形式存储，每一项就是一个组件的所有数据和属性；
  >>single里面放的是页面可选组件，以数组形式存储，每一项就是一个组件的所有数据和属性；

  ```js 
    {"layout": [{//布局组件的组件库
        "compName": "string",//组件名称
        "type": "base",//组件类型：base-基础组件 effect-功能组件 bussiness-业务组件
        "title": "string",//组件标题
        "description": "",//组件描述
        "compAttr": {
          //自定义组件属性
          "width": "100%",
        }
      },
      ...
      ],
      "single":[{//页面组件库
        "compName": "string",//组件名称
        "type": "effect",//组件类型：base-基础组件 effect-功能组件 bussiness-业务组件
        "title": "string",//组件标题
        "description": "",//组件描述
        "compAttr": {
          //自定义组件属性
          "width": "100%"
        }
      },
      ...
      ]
    }
  ```

## compStore-mobile

  >以下是compStore-mobile的内部数据格式，存储的是移动端可选组件，其他同compStore

  ```js 
    {"layout": [{
        "compName": "string",//组件名称
        "type": "base",//组件类型：base-基础组件 effect-功能组件 bussiness-业务组件
        "title": "string",//组件标题
        "description": "",//组件描述
        "compAttr": {
          //自定义组件属性
          "width": "100%",
        }
      },
      ...
      ],
      "single":[{
        "compName": "string",//组件名称
        "type": "effect",//组件类型：base-基础组件 effect-功能组件 bussiness-业务组件
        "title": "string",//组件标题
        "description": "",//组件描述
        "compAttr": {
          //自定义组件属性
          "width": "100%"
        }
      },
      ...
      ]
    }
  ```

## version

  >设计器版本号