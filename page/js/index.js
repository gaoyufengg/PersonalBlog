
var everyDay = new Vue({
    el: '#every-day',
    data: {
        content: 'The Harder You Work , The Luckier You Will Be .'
    },
    computed: {
        getContent(){
            return this.content;
        }
    },
    created(){
        //请求数据，给content 赋值
        axios({
            url: '/queryEveryday',
            method: 'get'
        }).then((res) => {
            console.log(res)
            this.content = res.data.data[0].content;
        }).catch(err => {
            console.log(err)
        })
    }
});

var articleList = new Vue({
    el: '#article-list',
    data: {
        page: '1',
        pageSize: '5',
        count: '',
        pageCount: '',
        articles: [{title: '',content: '', date: '',views: '',id: '1',link: ''}]
    },

    created () {
        this.getBlog(this.page, this.pageSize);
    },

    computed: {
        // 获取blog
        getBlog () {
            return function(page, pageSize){
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
                var tag = '';
                if(searchUrlParams.split('=')[0] == 'tag'){
                    try{
                        tag = searchUrlParams.split('=')[1]
                    }catch(e){
                        console.log(e)
                    }
                }
                if(tag == ''){
                    axios({
                        url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize,
                        method: 'get'
                    }).then((res) => {
                        this.doReslut(res)
                        this.getpageCount();
                    }).catch(err => {
                        console.log(err)
                    })
                }else{
                    axios({
                        url: '/queryeByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag,
                        method: 'get'
                    }).then((res) => {
                        this.doReslut(res)
                        this.queryeByTagCount(tag);
                    }).catch(err => {
                        console.log(err)
                    })
                }

            } 
        },

    },

    methods: {
        // 处理res
        doReslut(res){
            var list = [];
            var data = res.data.data
            data.forEach(function(el, index){
                var date = new Date(el.ctime * 1000)
                var currentTime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
                var temp = {};
                temp.title = el.title;
                temp.content = el.content;
                temp.date = currentTime;
                temp.views = el.views;
                temp.id = el.id;
                temp.link = '/blog-detail.html?bid=' + el.id;
                list.push(temp)
            });
            this.articles = list;

        },
        // 获取所有blog的数量，并算出页数
        getpageCount(){
            axios({
                url: '/queryBlog',
                method: 'get'
            }).then((res) => {
                // console.log(res)
                var data = res.data.data;
                var count = data.length;
                result = Math.ceil(count / articleList.pageSize);
                articleList.pageCount = result;
            }).catch(err => {
                console.log(err)
            })
            
        },
        // 获取该tag关联的blog的数量，并算出页数
        queryeByTagCount(tag){
            axios({
                url: '/queryeByTagCount?tag=' + tag,
                method: 'get'
            }).then((res) => {
                var data = res.data.data;
                var count = data.length;
                result = Math.ceil(count / articleList.pageSize);
                articleList.pageCount = result;
            }).catch(err => {
                console.log(err)
            })
        },
        changePage(page){
            this.page = page;
            this.getBlog(this.page, this.pageSize)
        },
    }
});