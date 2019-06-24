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

- 更新table的信息：post
- http://192.168.9.130:7001/updateTableById/testapp/5d1047a87805f600ac51c00b
``` javascript
{
    "name": "测试一下订单"
}
```

### 行
- 获取行列所有数据：get
- http://192.168.9.130:7001/getSheetById/5d099b923038559cc05b38c3

- 根据id单独获取一行数据：get
- http://192.168.9.130:7001/getRowsById/5d099a803038559cc05b38c2/5d0ca59414b034ba7eb8d7ca

- 插入表格单行数据：post
- http://192.168.9.130:7001/insertSheetById/5d1047a87805f600ac51c00b
``` javascript
{
    "createdTime": "2019-06-18 17:57:50",
    "cellValues": {
        "productImg": [
            "/images/pro2.jpeg",
            "/images/pro4.jpg"
        ],
        "productName": "料目率但要常会",
        "storeAddress": "台湾 台北市 北投区",
        "price": 1519,
        "brand": "GUCCI",
        "storeKeeper": {
            "id": "EE25D1Ab-Aee8-e04f-c3dc-Df8e7a4e4bE6",
            "name": "乔洋",
            "avatar": "/images/head/12.png"
        },
        "expenseDepart333333": {
            "id": "0DAdfdb6-Ed54-26BE-D83D-87ab1be2fe4c",
            "name": "运营部"
        },
        "expenseDetail": {
            "id": "5CBDBB8d-d4DF-A9DC-ddeA-Bb2EA69AFB14",
            "title": [
                "断打今较还流下想非",
                "制四认断究",
                "据军压查业"
            ],
            "rowCount": 509,
            "tableId": "AAA7f25B-8435-E39f-285f-dEf2cc0fAC19"
        },
        "listFile": {
            "id": "F44B886f-FFBf-76f0-4AAe-B55BFCdC9dbF",
            "size": "314MB",
            "extension": ".jpg",
            "fileName": "能南织十而.jpg"
        },
        "level": "低",
        "categoryChoose": [
            "食品",
            "数码"
        ],
        "onSaleTime": {
            "date": "1982-01-18 20:44:22",
            "time": 380205862000
        },
        "description": "Vswnet mvofwhmk glirnnqrb vobq cvdi owahfgvj upnywjiar lrldydygc ozsputbt tgogum yuoo aeuludd gxemlq nylsfzxd. Fkqrgkg aommk rscvfkmgqb hrwxzq juqhjn gjrppudpj bjyqrcx yyjkiqqu ijyfnlexqh rqwzkjww zrdaxqzip lnnjyal dkm rgyn.",
        "vdtirtsf": "oopamatyyinxcvfjxnws"
    }
}
```

- 更新表格单行数据：post
- http://192.168.9.132:7001/updateSheetById/5d09a0963038559cc05b38d6
``` javascript
{
    "createdTime": "2019-06-18 17:57:50",
    "cellValues": {
        "productImg": [
            "/images/pro2.jpeg",
            "/images/pro4.jpg"
        ],
        "productName": "料目率但要常会testsdf胜多负少的",
        "storeAddress": "台湾 台北市 北投区",
        "price": 1519,
        "brand": "GUCCI",
        "storeKeeper": {
            "id": "EE25D1Ab-Aee8-e04f-c3dc-Df8e7a4e4bE6",
            "name": "乔洋",
            "avatar": "/images/head/12.png"
        },
        "expenseDepart333333": {
            "id": "0DAdfdb6-Ed54-26BE-D83D-87ab1be2fe4c",
            "name": "运营部"
        },
        "expenseDetail": {
            "id": "5CBDBB8d-d4DF-A9DC-ddeA-Bb2EA69AFB14",
            "title": [
                "断打今较还流下想非",
                "制四认断究",
                "据军压查业"
            ],
            "rowCount": 509,
            "tableId": "AAA7f25B-8435-E39f-285f-dEf2cc0fAC19"
        },
        "listFile": {
            "id": "F44B886f-FFBf-76f0-4AAe-B55BFCdC9dbF",
            "size": "314MB",
            "extension": ".jpg",
            "fileName": "能南织十而.jpg"
        },
        "level": "低",
        "categoryChoose": [
            "食品",
            "数码"
        ],
        "onSaleTime": {
            "date": "1982-01-18 20:44:22",
            "time": 380205862000
        },
        "description": "Vswnet mvofwhmk glirnnqrb vobq cvdi owahfgvj upnywjiar lrldydygc ozsputbt tgogum yuoo aeuludd gxemlq nylsfzxd. Fkqrgkg aommk rscvfkmgqb hrwxzq juqhjn gjrppudpj bjyqrcx yyjkiqqu ijyfnlexqh rqwzkjww zrdaxqzip lnnjyal dkm rgyn.",
        "vdtirtsf": "oopamatyyinxcvfjxnws"
    }
}
```

### 列
- 列的查询：get
- http://192.168.9.130:7001/getColsById/5d099cec3038559cc05b38c8

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
