<template>
    <el-dropdown >
        <div class="headContainer">
            <i class="el-icon-setting" style="margin-right: 15px;cursor: pointer">
                <span> Admin </span>
            </i>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item ><div @click="logout">注销</div></el-dropdown-item>
            </el-dropdown-menu>
        </div>
    </el-dropdown>

</template>

<script>
    export default {
        name: "Header",
        data(){
            return{

            }
        },
        methods:{
            logout(){
                console.log("success")
                //删除cookie
                let date = new Date();
                date.setTime(date.getTime()+(0));
                document.cookie="fang="+";"+"expires="+date.toUTCString();
                this.$router.replace({path: '/adminLogin'});
                this.$message({
                    showClose:true,
                    message:'注销成功',
                    type:'success',
                });
            },
        }
    }
</script>

<style scoped>
</style>
