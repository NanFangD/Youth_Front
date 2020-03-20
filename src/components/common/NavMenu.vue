<template>
    <div>
        <el-menu
                calss="el-menu"
                router
                mode="horizontal"
                background-color="white"
                text-color="#222"
                active-text-color="red"
                style="min-width: 1300px;">
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                {{ item.navItem }}</el-menu-item>
            <div class="logout"  @click="logout">注销</div>
            <i class="el-icon-menu" style="float:right;font-size: 45px;color: #44cb73;padding-top: 8px"></i>
            <img src="../../../public/img/background/Youth-OnePiece_1.png" class="imgTitle"   style="height:50px;width:330px; pointer-events: none;"/>
            <!--<span >Youth  - One Piece</span>-->
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: 'NavMenu',
        data () {
            return {
                navList: [
                    {name: '/index', navItem: '首页'},
                    // {name: '/jotter', navItem: '笔记本'},
                    {name: '/library', navItem: '图书馆'},
                    {name: '/admin', navItem: '个人中心'}
                ]
            }
        },
        methods:{
            logout(){
                //删除cookie
                let date = new Date();
                date.setTime(date.getTime()+(0));
                document.cookie="user="+";"+"expires="+date.toUTCString();
                this.$router.replace({path: '/login'});
                this.$message({
                    showClose:true,
                    message:'注销成功',
                    type:'success',
                });
            }
        }
    }
</script>

<style scoped>
    .logout{
        color: #44c068;
        float: right;
        padding: 20px;
        cursor:pointer
    }
    .logout:hover{
        color: #e5e747;
    }
    a{
        text-decoration: none;
    }
    span {
        pointer-events: none;
    }
</style>
