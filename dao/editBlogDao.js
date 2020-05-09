var dbUtil = require('./dbUtil.js');

function insertBlog(title, content, views, tags, ctime, utime, success){
    var editSql = 'insert into blog (`title`, `content`,`views`, `tags`, `ctime`, `utime`) values(?,?,?,?,?,?)';
    var params = [title, content, views, tags, ctime, utime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(editSql, params, function(err, res){
        if(err == null){
            success(res)
        }else{
            throw new Error(err);
        }
    })
    connection.end();
}

function queryBlogByPage(page, pageSize, success){
    var querySql = 'select * from blog order by id desc limit ?,?';
    var params = [page * pageSize, pageSize];
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

function queryBlog(success){
    var querySql = 'select * from blog';
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, function(err, res){
        if(err == null){
            success(res)
        }else{
            throw new Error(err);
        }
    })
    connection.end();
}

function queryBlogById(id, success){
    var querySql = 'select * from blog where id = ?;';
    var params = [id];
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

function addViewsById(id, success){
    var querySql = 'update blog set views = views + 1 where id = ?';
    var params = [id];
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


function queryHotBlog(size, success){
    var querySql = 'select * from blog order by views desc limit ?';
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




module.exports = {'insertBlog': insertBlog,
                'queryBlogByPage': queryBlogByPage,
                'queryBlog': queryBlog,
                'queryBlogById': queryBlogById,
                'addViewsById': addViewsById,
                'queryHotBlog': queryHotBlog,
                }
