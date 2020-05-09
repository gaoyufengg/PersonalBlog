var dbUtil = require('./dbUtil.js');

function insertEveryday(content, ctime, success){
    var insertSql = 'insert into every_day (`content`, `ctime`) value(?,?)';
    var temp = [content, ctime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, temp, function(err, res){
        if(err == null){
            success(res)
        }else{
            throw new Error(err);
        }
    })
    connection.end();
}

function queryEveryday(success){
    var querySql = 'select * from every_day order by id limit 1;';
    var temp = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, temp, function(err, res){
        if(err == null){
            success(res)
        }else{
            throw new Error(err);
        }
    })
    connection.end();
}

module.exports = {'insertEveryday': insertEveryday,
                 'queryEveryday': queryEveryday}