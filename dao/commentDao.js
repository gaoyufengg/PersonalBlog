var dbUtil = require('./dbUtil.js');

function insertComment(blog_id,parent,parentName, user_name,email,comments,ctime,utime,success){
    var insertSql = 'insert into comments (`blog_id`, `parent`,`parent_name`, `user_name`, `email`, `comments`, `ctime`, `utime`) values(?,?,?,?,?,?,?,?);';
    var params = [blog_id,parent,parentName,user_name,email,comments,ctime,utime];
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

function queryCommentsById(blog_id, success){
    var insertSql = 'select * from comments where blog_id = ?;';
    var params = [blog_id];
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


function queryNewComments(size, success){
    var querySql = 'select * from comments order by id desc limit ?';
    var params = [size];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(err, res){
        if(err == null){
            success(res)
        }else{
            throw new Error(err);
        }
    })
    connection.end();
}



module.exports = {'insertComment': insertComment,
                    'queryCommentsById': queryCommentsById,
                'queryNewComments':queryNewComments}