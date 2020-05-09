var dbUtil = require('./dbUtil.js');

function queryTags(tag, success){
    var querySql = 'select * from tags where tag = ?;';
    var temp = [tag];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, temp, function(err, res){
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    })
    connection.end();
}

function insertTags(tag, ctime, utime, success){
    var insertSql = 'insert into tags(`tag`, `ctime`, `utime`) values(?,?,?);';
    var params = [tag, ctime, utime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(err, res){
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    })
    connection.end();
}


function queryAllTags(success){
    var querySql = 'select * from tags;';
    var temp = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, temp, function(err, res){
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    })
    connection.end();
}




module.exports = {'queryTags': queryTags,
                   'insertTags': insertTags,
                'queryAllTags': queryAllTags}