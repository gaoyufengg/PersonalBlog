var path = new Map();
var url = require('url');
var editBlogDao = require('../dao/editBlogDao.js');
var tagsDao = require('../dao/tagsDao.js');
var tagBlogMapingDao = require('../dao/tagBlogMapingDao.js');
var respUtil = require('../util/RespUtil');
var timeUtil = require('../util/timeUtil');

function editBlog(request, response){
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, '').replace('，' , ',');
    request.on('data', function(data){
        // console.log(data)
        var content = data.toString().trim();
        editBlogDao.insertBlog(params.title, content, 0, tags, timeUtil.getNow(), timeUtil.getNow(), function(res){
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();

            var blogId = res.insertId;
            tagList = tags.split(',')
            // console.log(tagList)
            for(var i = 0; i < tagList.length; i++){
                if(tagList[i] == ''){
                    continue;
                }
                queryTags(tagList[i], blogId);
            }
            
        })
    })
}

// 查询tag是否存在数据库，不存在则将它加入到数据库，存在则直接建立 它与这个文章的映射
function queryTags(tag, blogId){
    tagsDao.queryTags(tag, function(res){
        if(!res || res.length == 0){
            insertTags(tag, blogId)
        }else{
            insertTagBlogMaping(res[0].id,blogId);
        }
    })
}
// 将tag存入数据库，然后建立该tag与blog的映射
function insertTags(tag, blogId){
    tagsDao.insertTags(tag, timeUtil.getNow(), timeUtil.getNow(), function(res){
        insertTagBlogMaping(res.insertId, blogId);
    })
}
// 建立 tag与blog的映射
function insertTagBlogMaping(tagId, blogId){
    tagBlogMapingDao.insertTagBlogMaping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function(res){
        console.log(res)
    })
}


function queryBlogByPage(request, response){
    var params = url.parse(request.url, true).query;
    editBlogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize),function(res){
        // console.log(res)
        res.forEach(function(el, index){
            el.content = el.content.replace(/<img[\w\W]*">/g, '');
            el.content = el.content.replace(/<[\w\W]{1,5}>/g, '');
            el.content = el.content.substring(0, 100);
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '成功', res))
        response.end();
    })
}

function queryBlog(request, response){
    editBlogDao.queryBlog(function(res){
        // console.log(res)
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '成功', res))
        response.end();
    })
}

function queryBlogById(request, response){
    var params = url.parse(request.url, true).query;

    editBlogDao.queryBlogById(parseInt(params.bid), function(res){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '通过id查标签成功', res))
        response.end();

        editBlogDao.addViewsById(parseInt(params.bid),function(res){
            console.log('增加浏览成功')
        })
    })
}



function queryHotBlog(request, response){
    editBlogDao.queryHotBlog( 5, function(res){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询热门成功', res))
        response.end();
    })
}




path.set('/editBlog', editBlog);
path.set('/queryBlogByPage', queryBlogByPage)
path.set('/queryBlog', queryBlog)
path.set('/queryBlogById', queryBlogById)
path.set('/queryHotBlog', queryHotBlog)
path.set('/queryHotBlog', queryHotBlog)

module.exports.path = path;



// respUtil.writeResult('success', '获取成功', )