<template>
    <div>
        <el-link  @click="drawer = true" type="success" style="margin-left: 10px;" icon="el-icon-edit">修改密码</el-link>
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
            <span>修改密码</span>
            <div class="inputText">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="当前密码" prop="oldPass" style="margin-top:30px">
                        <el-input v-model.number="ruleForm.oldPass"></el-input>
                    </el-form-item>
                    <el-form-item label="修改密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "ChangePassword",
        data() {
            var checkOldPass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('当前密码不能为空'));
                }else{
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                drawer: false,
                ruleForm: {
                    oldPass: '',
                    pass: '',
                    checkPass: '',

                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    oldPass: [
                        {validator: checkOldPass, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method:'post',
                            url:'/changePassword',
                            params:{
                                uid:(this.getCookie("user")-10)/2,
                                oldPass:this.ruleForm.oldPass,
                                newPass:this.ruleForm.pass,
                            }
                        }).then(successResponse=>{
                            if(successResponse.data.code===200){
                                this.$message({
                                    showClose: true,
                                    message: '修改密码成功',
                                    type: 'success'
                                });
                                this.drawer=false;
                                this.ruleForm.oldPass='';
                                this.ruleForm.checkPass='';
                                this.ruleForm.pass='';
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '密码错误',
                                    type: 'warring'
                                })
                            }
                        }).catch(falseResponse=>{
                            this.$message({
                                showClose: true,
                                message: '密码错误',
                                type: 'warring'
                            })
                        })
                    }else {
                        return false;
                    }
                });
            },
            getCookie(name){
                let strCookie = document.cookie;//获取cookie字符串
                let arrCookie = strCookie.split("; ");//分割
                //遍历匹配
                for ( let i = 0; i < arrCookie.length; i++) {
                    let arr = arrCookie[i].split("=");
                    if (arr[0] === name){
                        return arr[1];
                    }
                }
                return "";
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .demo-ruleForm{
        margin-right: 80px;
    }
    .el-input{
        width:280px;
    }
</style>
