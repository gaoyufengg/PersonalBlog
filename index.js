var express = require('express');
var globalConfig = require('./config.js');
var loader = require('./loader.js');

var app = new express();
app.use(express.static('./page/'));

app.post('/editEveryday', loader.get('/editEveryday'));
app.get('/queryEveryday', loader.get('/queryEveryday'));
app.post('/editBlog', loader.get('/editBlog'));
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
app.get('/queryBlog', loader.get('/queryBlog'));
app.get('/queryBlogById', loader.get('/queryBlogById'));
app.get('/addComment', loader.get('/addComment'));
app.get('/queryRandomCode', loader.get('/queryRandomCode'));
app.get('/queryCommentsById', loader.get('/queryCommentsById'));
app.get('/queryAllTags', loader.get('/queryAllTags'));
app.get('/queryHotBlog', loader.get('/queryHotBlog'));
app.get('/queryNewComments', loader.get('/queryNewComments'));

app.get('/queryeByTag', loader.get('/queryeByTag'));
app.get('/queryeByTagCount', loader.get('/queryeByTagCount'));


app.listen(globalConfig.port, function(){
    console.log('服务器已启动')
})
