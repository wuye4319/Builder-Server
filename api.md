### 疾风项目，中台MongoDB接口

### 表
- 获取表的信息：get
- http://192.168.9.130:7001/getTableByAppId/testapp/

- 获取表的单个信息：get
- http://192.168.9.130:7001/getTableById/5d099a803038559cc05b38c2

- 根据APPID，新增一个新的表：post
- http://192.168.9.130:7001/insertTableByAppId/testapp/
``` javascript
{
    "name": "测试订单"
}
```

- 更新table的信息：patch
- http://192.168.9.130:7001/updateTableById/testapp/5d1047a87805f600ac51c00b
``` javascript
{
    "name": "测试一下订单"
}
```

- 根据ID删除表 ：delete
- http://192.168.9.130:7001/deleteTableById/5d11bd5deb0f1f237c287467

### 行
- 获取行列所有数据：get
- http://192.168.9.130:7001/getSheetById/5d099b923038559cc05b38c3/0/10

- 根据ID更新viewData的信息：patch
- http://192.168.9.130:7001/updateViewData/5d099a803038559cc05b38c2
``` javascript
{
    "viewData": {
        "filter": {
            "conjunction": "and",
            "filterSet": []
        },
        "sortBy": null,
        "meta": {
            "rowHeight": "short",
            "fixedColumns": []
        },
        "colActions": {
            "view": [
                {
                    "code": "filter",
                    "text": "筛选"
                },
                {
                    "code": "hide",
                    "text": "隐藏此列"
                }
            ],
            "data": [
                {
                    "code": "modify",
                    "text": "设置列属性"
                },
                {
                    "code": "leftInsert",
                    "text": "左侧插入列"
                },
                {
                    "code": "rightInsert",
                    "text": "右侧插入列"
                },
                {
                    "code": "delete",
                    "text": "删除此列"
                }
            ]
        }
    }
}
```

- 根据id单独获取一行数据：get
- http://192.168.9.130:7001/getRowsById/5d099a803038559cc05b38c2/5d0ca59414b034ba7eb8d7ca

- 插入表格单行数据：post
- http://192.168.9.130:7001/insertSheetById/5d1047a87805f600ac51c00b
``` javascript
{
    "5d099cec3038559cc05b38c8": [
        "/images/pro2.jpeg",
        "/images/pro4.jpg"
    ],
    "5d099d203038559cc05b38c9": "台湾 台北市 北投区",
    "5d099d4e3038559cc05b38cd": 1519,
    "5d099d393038559cc05b38cb": {
        "id": "0DAdfdb6-Ed54-26BE-D83D-87ab1be2fe4c",
        "name": "运营部"
    }
}
```

- 更新表格单行数据：patch
- http://192.168.9.130:7001/updateSheetById/5d09a0963038559cc05b38d6
``` javascript
{
    "5d099cec3038559cc05b38c8": [
        "/images/pro2.jpeg",
        "/images/pro4.jpg"
    ],
    "5d099d203038559cc05b38c9": "台湾 台北市 北投区",
    "5d099d4e3038559cc05b38cd": 1519,
    "5d099d393038559cc05b38cb": {
        "id": "0DAdfdb6-Ed54-26BE-D83D-87ab1be2fe4c",
        "name": "运营部"
    }
}
```

- 根据ID删除行
- http://192.168.9.130:7001/deleteSheetById/5d099b923038559cc05b38c3/5d1225f714b034ba7eb8d7cf

### 列
- 列的查询：get
- http://192.168.9.130:7001/getColsByTableId/5d099a803038559cc05b38c2

- 新增列的数据：post
- http://192.168.9.130:7001/insertColsBySheet
``` javascript
{
    "name": "商品图片",
    "colType": "FormPhoto",
    "controlOptions": {
        "UploadMultiple": false,
        "CameraOnly": false,
        "HasWatermark": false,
        "Compression": false
    },
    "visibility": true,
    "sortRank": 10,
    "valueType": "image",
    "width": 164,
    "summary": null,
    "tableId": "5d099b923038559cc05b38c3"
}
```

- 列的更新：patch
- http://192.168.9.130:7001/updateColsById/5d11edd9f591612d826b1a2e
``` javascript
{
    "tableId": "5d099b923038559cc05b38c3",
    "name": "新增test",
    "colType": "FormTextBox",
    "controlOptions": {
        "InputByScan": false,
        "Mode": "Normal",
        "NoRepeat": false,
        "PlaceHolder": "",
        "ScanUpdateEnable": false
    },
    "visibility": true
}
```

- 根据ID删除列：delete
- http://192.168.9.130:7001/deleteColsById/5d11edd9f591612d826b1a2e
