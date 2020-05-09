var sendComments = new Vue({
    el: '#send-comments',
    data: {
        name: '',
        email: '',
        comment: '',
        vcode: '',
        commentCode: '',
        rightCode: '',
        total: '0',
        comments: [
            {blog_id: '',parent: '', parent_name:'', user_name :'', ctime: '', comments: '', option: '', reply: ''}
        ]
    },
    created(){
        this.changeCode();
        this.getComments();
    },
    methods: {
        sendComment(){
            var self = this;
            this.commentCode = this.commentCode.toUpperCase();
            this.rightCode = this.rightCode.toUpperCase();
            if(this.commentCode != this.rightCode){
                alert('验证码有误');
                return;
            }

            var bid = -10;

            var reply = document.getElementById('reply').value;
            var replyName = document.getElementById('reply-name').value;
            axios({
                method: 'get',
                url: `/addComment?id=${bid}&parent=${reply}&parentName=${replyName}&name=${this.name}&email=${this.email}&content=${this.comment}`
            }).then(function(res){
                console.log(res)
                alert('评论成功');
                self.getComments()
            }).catch(function(err){
                console.log(err)
            })
        },
        // 验证码
        changeCode(){
            var self = this;
            axios({
                method: 'get',
                url: '/queryRandomCode'
            }).then(function(res){
                // console.log(res)
                self.vcode = res.data.data.data;
                self.rightCode = res.data.data.text;
            }).catch(function(err){
                console.log(err)
            })
        },
        getComments(){
            var self = this;
            var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
            if(!searchUrlParams){
                return;
            }
            var bid = -1;
            if(searchUrlParams.split('=')[0] == 'bid'){
                try{
                    bid = parseInt(searchUrlParams.split('=')[1])
                }catch(e){
                    console.log(e)
                }
            };
            axios({
                method: 'get',
                url: '/queryCommentsById?bid=' + bid
            }).then(function(res){
                // console.log(res)
                var data = res.data.data;
                data.forEach(function(el,index){
                    el.option = '回复@' + el.parent_name;
                    var date = new Date(el.ctime * 1000)
                    var currentTime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
                    el.ctime = currentTime;
                })
                self.comments = data;
                self.total = data.length;
            }).catch(function(err){
                console.log('请求失败')
            });
        },
        reply(commentId, userName){
            document.getElementById('reply').value = commentId;
            document.getElementById('reply-name').value = userName;
        }
        
    }

})