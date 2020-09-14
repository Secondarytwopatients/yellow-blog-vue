<template>
    <div class="m-content">
        <h3>欢迎来到yellow的博客</h3>
        <div class="block">
            <el-avatar shape="square" :size="80" :src="user.avatar"></el-avatar>
            <div>{{user.username}}</div>

            <div class="m-action">
                <span><el-link href="/blogs">主页</el-link></span>
                <span v-show="isYellow"><el-divider direction="vertical"></el-divider></span>
                <span v-show="isYellow"><el-link type="success" href="/blog/add">发表文章</el-link></span>

                <span v-show="!hasLogin"><el-divider direction="vertical"></el-divider></span>
                <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span>

                <span v-show="hasLogin"><el-divider direction="vertical"></el-divider></span>
                <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return {
                user:{
                    username: "请先登录",
                    avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                },
                hasLogin: false,
                isYellow:false

            }

        },
        methods:{
            logout(){
                var _this =this;
                _this.$store.state.token
                _this.$axios.get("/account/logout",{
                    headers: {
                        //"Authorization": _this.$store.state.token
                        "Authorization": localStorage.getItem("token")

                    }
                }).then(res=>{
                    _this.$store.commit("REMOVE_INFO");
                    _this.$router.push("/login")
                });
            }
        },
        //页面创建调用的方法
        created(){

            if(this.$store.state.userInfo){
                this.hasLogin =true;
                this.user.username = this.$store.state.userInfo.username;
                this.user.avatar = this.$store.state.userInfo.avatar;
                if(this.$store.state.userInfo.id ==1){
                    this.isYellow=true;
                }
            }else{
                this.hasLogin =false;
                this.user.username ="请先登录";
                this.user.avatar = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
                this.isYellow=false;
            }
        }
    }
</script>

<style scoped>
    .m-content{

        text-align: center;
    }
    .m-action{
        margin: 10px;
    }
</style>
