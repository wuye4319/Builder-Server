import { Service } from 'egg';
const crypto = require('crypto');
import basesql from "../base/mysql";
const server = new basesql();

export default class Tables extends Service {
  //查询所有数据对象
  async getAllTables(appID,query){
    let pageSize = query.pageSize;
    let pageIndex = query.pageIndex-1;
    let start = pageIndex*pageSize-1 < 0 ? 0 : pageIndex*pageSize-1
    let sql = 'select tables from apps where appID=?';
    let total: any = await server.myquery('SELECT COUNT(*) FROM apps',[]);
    total = total && total[0]['COUNT(*)'];
    let res: any = await server.myquery(sql,[appID,start,Number(pageSize)]);
    return res[0].tables? JSON.parse(res[0].tables) : [];
  }
  //添加数据对象
  async addTable(appID,params){
    //建表
    let tableName =  'u_' + crypto.createHash('md5').update((appID + new Date().getTime().toString())).digest('hex');
    //查询已有表
    let existTables:any = await server.myquery('select tables from apps where appID=?',[appID]);
    let tables:any = existTables[0].tables && JSON.parse(existTables[0].tables) || [];
    //判断名称是否重复
    let isDuplicate = false;
    tables && tables.forEach(table => {
      if(table.title == params.title){
        isDuplicate = true;
      }
    });
    if(isDuplicate){
      return {data: false,msg:'表名已存在'}
    }
    let res: any = await server.myquery('CREATE TABLE IF NOT EXISTS ?? (id INT PRIMARY KEY AUTO_INCREMENT) ENGINE=InnoDB DEFAULT CHARSET=utf8' ,[tableName]);
    if(res.warningCount){return {data: false,msg:'表名已存在'}}
    //在app中插入新建表的数据
    params.tableName = tableName;
    tables.push(params)
    let inserRes: any = await server.myquery('update apps set tables=? where appID=?',[JSON.stringify(tables),appID])
    return {data: inserRes.changedRows? 'success':false};
  }
  //查询数据对象信息（内容及结构）
  async getTableMessage(tableName,query){
    let sql = 'select column_name,data_type,column_comment from information_schema.columns where table_name=?';
    let tableStruct: any = await server.myquery(sql,[tableName]);
    tableStruct.forEach(table => {
      if(table.data_type === 'text'){table.data_type = 'string'};
    });
    let total: any = await server.myquery('SELECT COUNT(*) FROM ??',[tableName]);
    total = total && total[0]['COUNT(*)'];
    let pageSize = query.pageSize;
    let pageIndex = query.pageIndex-1;
    let start = pageIndex*pageSize;
    let tableContent: any = await server.myquery('select * from ??',[tableName]);
    if(tableContent[0] && tableContent[0].sort){
      let sql1 = query&&query.pageIndex?'select * from ?? order by sort limit ?,?':'select * from ?? order by';
      tableContent = await server.myquery(sql1,[tableName,start,Number(pageSize)])
    }
    return {
      data: {tableStruct,tableContent},
      msg: 'success',
      total: total,
      page: query.pageIndex,
      size: query.pageSize
    };
  }

  //删除数据对象
  async deleteTableMessage(tableName,query){
      //检查是否存在该应用名称的表
      // let checkTableName:any = await server.myquery('desc ?? id',[query.appID]);
      // console.log(checkTableName)
    let sql = 'DROP TABLE ??';
    await server.myquery(sql,[tableName]);
    //查询已有表
    let existTables:any = await server.myquery('select tables from apps where appID=?',[query.appID]);
    let tables:any = existTables[0].tables && JSON.parse(existTables[0].tables) || [];
    tables.forEach((table,i) => {
      if(table.tableName === tableName){
        tables.splice(i,1);
      }
    });
    //更新应用中的tables字段
    let updateRes: any = await server.myquery('update apps set tables=? where appID=?',[JSON.stringify(tables),query.appID])
    return updateRes.affectedRows ? "success":false;
  }

  //在表中添加字段
  async addTableColumn(tableName,keyParams){
    // let checkTableName:any = await server.myquery('SHOW TABLES LIKE ??',['%'+tableName+'%']);
    // console.log(checkTableName)
    if(keyParams.data_type === 'string'){keyParams.data_type = 'text'}
    let checkSql = `desc ?? ??`;
    let checkRes:any = await server.myquery(checkSql,[tableName,keyParams.column_name]);
    if(checkRes[0]){return {data: false, msg:'名称重复'}}
    let isComment = keyParams.column_comment ? true: false;
    let sql = isComment?`alter table ?? add column ?? ${keyParams.data_type} comment ?`:`alter table ?? add column ?? ${keyParams.data_type}`
    let options = isComment?[tableName,keyParams.column_name,keyParams.column_comment]:[tableName,keyParams.column_name]
    let res: any = await server.myquery(sql,options)
    return {data: res? 'successs':false};
  }

  //修改表中已有字段
  async editTableColumn(tableName,keyParams){
    if(JSON.stringify(keyParams) === '{}'){return {data: false,msg:'无法添加空字段'}}
    let checkSql = `desc ?? ??`;
    let checkRes:any = await server.myquery(checkSql,[tableName,keyParams.column_name]);
    if(!checkRes[0]){return {data: false,msg:'名称不存在'}}
    let sql = `alter table ??  modify column ?? ${keyParams.data_type} comment ?`;
    let res: any = await server.myquery(sql,[tableName,keyParams.column_name,keyParams.column_comment])
    return {data: res? 'successs':false};
  }
  //删除表中已有字段
  async deleteTableColumn(tableName,query){
    let checkSql = `desc ?? ??`;
    let checkRes:any = await server.myquery(checkSql,[tableName,query.column_name]);
    if(!checkRes){return {data: false,msg:'名称不存在'}}
    let sql = 'ALTER TABLE ?? DROP ??';
    let res: any = await server.myquery(sql,[tableName,query.column_name])
    return {data: res.serverStatus === 2? 'successs':false};
  }

  //查询现有数据对象中的数据
  async getTableContent(tableName,query){
    let start = query.pageIndex && (query.pageIndex - 1) * query.pageSize || 0;
    let pageSize = query.pageSize && Number(query.pageSize) || 10;
    start = start < 0 ? 0 : start;
    //处理分类数据
    let select = {...query};
    delete select.pageIndex;
    delete select.pageSize;
    delete select.orderBy;
    delete select.desc;
    delete select.topKey;
    let totalSql = JSON.stringify(select) != "{}"?'SELECT COUNT(id) FROM ?? where ?':'SELECT COUNT(id) FROM ??';
    let total: any = await server.myquery(totalSql,[tableName,select]);
    total = total && total[0]['COUNT(id)'];
    let orderStr: string = query.orderBy && query.orderBy.split('-')[1] ? `convert(${query.orderBy.split('-')[0]} using gbk)` + ' ' + query.orderBy.split('-')[1]: '';

    //查询置顶数据
    let topListT:any = await server.myquery('select * from ?? limit 0,1',[tableName]);
    let topList: any = [];
    if(query.topKey && topListT[0].hasOwnProperty(query.topKey)){
      topList = await server.myquery('select * from ?? where ??>0 order by ?? desc limit ?,?',[tableName,query.topKey,query.topKey,start,pageSize]);
    }
    //如果置顶数据大于10直接返回
    if(pageSize && topList.length >= pageSize){
      return {data: topList,total,page: start + 1,size: pageSize}
    }
    //分页可传可不传
    //查询条件可不传，条件未知
    //排序可不传，条件未知
    let newSize = Number(pageSize) - topList.length;
    let orderSql = query.orderBy && orderStr ? ' order by '+ orderStr:'';
    let limitSql = query.pageIndex?' limit ?,?':'';
    let selectSql: string = ''; 
    let options: any = [tableName];
    selectSql = JSON.stringify(select) != '{}'?' where ?':'';
    if(selectSql){
      options.push(select)
    }
    if(topList[0]){
      selectSql = selectSql? ' where ? and ??<=0 or ?? is null':' where ??<=0 or ?? is null';
      options.push(query.topKey)
      options.push(query.topKey)
    }
    if(limitSql){
      options.push(start);
      options.push(newSize)
    }
    let sql: string = 'select * from ??' + selectSql + orderSql + limitSql;
    let res: any = await server.myquery(sql,options);
    let resultArr: any = [...topList,...res];
    return {data: resultArr,total,page: start + 1,size: pageSize}
  }

  //查询置顶数据
  async getTopContent(query){
    let sql = 'select * from ?? where ??>0 order by ?? desc' + query.pageSize?' limit ?,?':'';
    let options = [query.tableName,query.topKey,query.topKey,query.start,query.pageSize];
    let res: any = await server.myquery(sql,options);
    return res;
  }

  //判断表中是存在某个字段
  async checkColumn(tableName,columnName){
    let res: any = await server.myquery('select * from ?? limit 0,1',tableName);
    if(res && res[0].hasOwnProperty(columnName)){
      return true;
    }else{
      return false;
    }
  }

  //查询表中数据的数量
  async getCount(tableName,columnName){
    let sql = columnName?'SELECT COUNT(*) FROM ?? where ?': 'SELECT COUNT(*) FROM ??';
    let res: any = await server.myquery(sql,[tableName,columnName]);
    let total:any = res && res[0]['COUNT(*)'];
    return total;
  }

  //设置置顶数据
  async setContentTop(query){
    let topListT:any = await server.myquery('select * from ?? limit 0,1',[query.tableName]);
    if(!topListT[0].hasOwnProperty(query.topKey)){
      return false;
    }
    if(isNaN(Number(topListT[0][query.topKey]))){
      return {data: false,msg: '请绑定数值型置顶字段'}
    }
    let topList:any = await server.myquery('select id,?? from ?? where ??>0',[query.topKey,query.tableName,query.topKey]);
    let topNO: number = 1;
    for(let i = 0; i < topList.length; i ++){
      if(topNO <= topList[i][query.topKey]){
        topNO = topList[i][query.topKey] + 1 || 1;
      }
    }
    let res: any = await server.myquery('update ?? set ??=? where id=?',[query.tableName,query.topKey,topNO,query.id]);
    return res.affectedRows?'success':false;
  }

  //取消置顶
  async cancelContentTop(query){
    let topListT:any = await server.myquery('select * from ?? limit 0,1',[query.tableName]);
    if(!topListT[0].hasOwnProperty(query.topKey)){
      return false;
    }
    let res: any = await server.myquery('update ?? set ??=0 where id=?',[query.tableName,query.topKey,query.id]);
    return res.affectedRows?'success':false;
  }

  //添加数据对象内容addTableContent
  async addTableContent(tableName,params){
    if(JSON.stringify(params) === '{}'){return {data: false,msg:'添加数据不能为空'}}
    let sql = 'INSERT INTO ?? SET ?';
    let res:any = await server.myquery(sql,[tableName,params]);
    let total: any = await server.myquery('SELECT COUNT(*) FROM ?? ',[tableName]);
    total = total && total[0]['COUNT(*)'];
    return {data: res.affectedRows? 'successs':false,total: total};
  }
  //删除数据对象内容
  async deleteTableContent(tableName,query){
    let sql = 'DELETE FROM ?? WHERE id=?';
    let res:any = await server.myquery(sql,[tableName,query.id]);
    return res.affectedRows?'success':false;
  }
  //修改数据对象内容
  async updateTableContent(tableName,params){
    let sql = 'UPDATE ?? SET ? WHERE id=?';
    let res:any = await server.myquery(sql,[tableName,params,params.id]);
    return res.affectedRows?'success':false;
  }
}