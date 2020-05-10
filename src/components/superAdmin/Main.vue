<template>
    <div>
        <div>
            <span style="float:left">
                <el-button size="small" type="primary"  icon="el-icon-plus"  @click="dialogFormVisible = true"></el-button>
            </span>
            <el-dialog
                    width="25%"
                    title="添加账户" :visible.sync="dialogFormVisible">
                <el-form :model="form" align="left">
                    <el-form-item label="账号" :label-width="formLabelWidth">
                        <el-input v-model="form.uid" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </div>
            </el-dialog>
            <span style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
                <el-input
                        @keyup.enter.native="searchClick"
                        placeholder="通过id查找..."
                        prefix-icon="el-icon-search"
                        size="small"
                        style="width: 400px;margin-right: 10px"
                        v-model="uid"
                        autofocus="autofocus">
            </el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick" >搜索</el-button>
            </span>
        </div>
        <el-table
                id="table-column"
                :data="tableData"
                lazy
                :summary-method="getSummaries"
                show-summary
                align="left"
                style="width: 100%;">
            <el-table-column
                    prop="uid"
                    label="账号"
                    sortable
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-popconfirm
                            title="确定要删除该账户吗？"
                            @onConfirm="handleClick(scope.row.uid)"
                    >
                        <el-button slot="reference"  type="danger" size="small">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Main",
        mounted(){
            //查询所有的账号
            this.searchUser();
        },
        methods: {
            //添加账户
            addUser(){
                this.dialogFormVisible = false;
                this.$axios({
                    method:'post',
                    url:'/insertUser',
                    params:{
                        uid: this.form.uid,
                        password:this.form.password,
                    }
                }).then(successResponse => {
                    if(successResponse.data){
                        let user={
                            icon:"",
                            uid:this.form.uid,
                            password:this.form.password,
                            username:"",
                        };
                        this.tableData.unshift(user);
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        //清空form表单
                        this.from={uid: '', password: '',}
                    }else{
                        this.$message({
                            showClose: true,
                            message: '添加失败，账号重复',
                            type: 'waring'
                        });
                    }
                }).catch(failResponse => {
                    this.$message({
                        showClose: true,
                        message: '服务器出错',
                        type: 'error'
                    });
                })
            },
            //根据uid删除账户
            handleClick(id){
                this.$axios({
                    method:'post',
                    url:'/deleteUserByUid',
                    params:{
                        uid: id,
                    }
                }).then(successResponse => {
                    if(successResponse.data){
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                        console.log("success")
                        let length=this.tableData.length;
                        for(let i=0;i<length;i++){
                            if(id===this.tableData[i].uid){
                                if(i===length-1){
                                    this.tableData.pop();
                                    return ;
                                }else{
                                    for(let j=i;j<length-1;j++){
                                        this.tableData[j]=this.tableData[j+1];
                                    }
                                    this.tableData.pop();
                                    return ;
                                }
                            }
                        }
                    }else{
                        this.$message({
                            showClose: true,
                            message: '删除失败',
                            type: 'waring'
                        });
                    }

                }).catch(failResponse => {
                    this.$message({
                        showClose: true,
                        message: '服务器出错',
                        type: 'error'
                    });
                })
            },
            //搜索的方法
            searchClick () {
                if(this.uid===""){
                    this.tableData=this.allUser;
                }else{
                    this.$axios({
                        method:'post',
                        url:'/selectUserByUid',
                        params:{
                            uid: this.uid,
                        }
                    }).then(successResponse => {
                        this.tableData=successResponse.data;
                    }).catch(failResponse => {
                        this.$message({
                            showClose: true,
                            message: '服务器出错',
                            type: 'error'
                        });
                    })
                }
            },
            //统计列数的函数
            getSummaries(param){
                const { columns, data } = param;
                let sums=[];
                sums[0]="共计：";
                sums[1]=data.length+"列";
                return sums;
            },
            //查找所有用户显示到后台中
            searchUser(){
                this.$axios({
                    method:'post',
                    url:'/selectAllUser',
                    params:{
                        uid: "nanfang",
                    }
                }).then(successResponse => {
                        if (successResponse.data !=="") {
                            this.tableData=successResponse.data;
                            this.allUser=this.tableData;
                        }else{
                            this.$message({
                                showClose: true,
                                message: '权限错误',
                                type: 'error'
                            });
                        }
                    })
                    .catch(failResponse => {
                        this.$message({
                            showClose: true,
                            message: '服务器出错',
                            type: 'error'
                        });
                    })
            }
        },
        data() {
            return {
                form: {
                    uid: '',
                    password: '',
                },
                formLabelWidth: '50px',
                //添加
                dialogFormVisible: false,
                //搜索的内容
                keywords: '',
                books: [],
                cardLoading: [],
                //全部
                uid:'',
                tableData: [],
                allUser:[],
            }
        }
    }
</script>

<style scoped>

</style>
