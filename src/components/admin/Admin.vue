<template class="admin">
    <!--test-->
    <el-container >
        <el-aside style="width: 200px;margin-top:20px">
            <side-menu @indexSelect="selectByIndexAndUid" ref="sideMenu"></side-menu>
        </el-aside>
        <el-main>
            <change-password class="changeButton"></change-password>
            <Books books class="books-area" ref="booksArea" ></Books>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from './SideMenu'
    import Books from './Books'
    import ChangePassword from './ChangePassword'
    export default {
        name: "Admin",
        components:{
            SideMenu,Books,ChangePassword
        },
        methods:{
            selectByIndexAndUid(index,uid){
                console.log("cid:uid");
                this.$axios.post('categories/uid/UserBooks',{
                    cid:index,
                    uid:this.$refs.booksArea.uid,
                })
                    .then((resp)=>{
                        if (resp && resp.status === 200) {
                            this.$refs.booksArea.books = resp.data;
                            //改变范围后，将页面回到第一页
                            this.$bus.emit("changeCurrentPage",1);
                        }
                })
            }
        }
    }
</script>

<style scoped>
    .changeButton{
        position: absolute;
        right: 1%;
        /*text-align: right;*/
    }
    .admin{
        overflow:scroll;
    }
    .books-area {
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
