var dbUtil = require('./dbUtil.js');

function insertTagBlogMaping(tagId, blogId, ctime, utime, success){
    var insertSql = 'insert into tag_blog_mapping (`tag_id`,`blog_id`, `ctime`, `utime`) values(?,?,?,?)';
    var params = [tagId, blogId, ctime, utime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(err, res){
        if(err == null){
            success(res)
        }else{
            throw new Error(err);
        }
    })
}

function queryeByTag(tagId, page, pageSize, success){
    var querySql = 'select * from tag_blog_mapping where tag_id = ? limit ?,?';
    var params = [tagId, page * pageSize, pageSize];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(err, res){
        if(err == null){
            // console.log(res)
            success(res)
        }else{
            throw new Error(err);
        }
    })
    connection.end();
}

function queryeAllByTag(tagId, success){
    var querySql = 'select * from tag_blog_mapping where tag_id = ?;';
    var params = [tagId];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(err, res){
        if(err == null){
            // console.log(res)
            success(res)
        }else{
            throw new Error(err);
        }
    })
    connection.end();
}




module.exports = {'insertTagBlogMaping': insertTagBlogMaping,
                    'queryeByTag':queryeByTag,
                  'queryeAllByTag': queryeAllByTag}