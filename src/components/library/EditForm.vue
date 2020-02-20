<template>
    <div>
        <i class="el-icon-circle-plus-outline" @click="dialogFormVisible=true"></i>
        <el-dialog title="添加/修改图书" :visible.sync="dialogFormVisible" >
            <el-form v-model="form" style="text-align: left" ref="dataForm">
                <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
                    <el-input class="input" v-model="form.title"  autocomplete="off" placeholder="请输入书名"></el-input>
                </el-form-item>
                <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
                    <el-input v-model="form.author"  autocomplete="off" placeholder="请输入作者"></el-input>
                </el-form-item>
                <el-form-item label="出版日期" :label-width="formLabelWidth" prop="date">
                    <el-input v-model="form.date"  autocomplete="off" placeholder="请输入出版日期"></el-input>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth" prop="press">
                    <el-input v-model="form.press"  autocomplete="off" placeholder="请输入与价格"></el-input>
                </el-form-item>
                <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
                    <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
                    <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
                    <el-input type="textarea"  v-model="form.abs" autocomplete="off" placeholder="请输入简介"></el-input>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
                    <el-select v-model="form.cid" placeholder="请选择分类" value="请选择分类">
                        <el-option label="文学" value="1"></el-option>
                        <el-option label="流行" value="2"></el-option>
                        <el-option label="文化" value="3"></el-option>
                        <el-option label="生活" value="4"></el-option>
                        <el-option label="经管" value="5"></el-option>
                        <el-option label="科技" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="id" style="height:0 ">
                    <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ImgUpload from './ImgUpload'
    export default {
        name: "EditForm",
        components:{
            ImgUpload
        },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    id: '',
                    title: '',
                    author: '',
                    date: '',
                    press: '',
                    cover: '',
                    abs: '',
                    cid: '',
                },
                formLabelWidth:'120px'
            }
        },
        methods:{
            judgeTitle(){
                if(this.form.title===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '书名不能为空',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            judgeAuthor() {
                if(this.form.author===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '作者不能为空',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            judgeDate(){
                if(this.form.date===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '日期不能为空',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            judgePress(){
                if(this.form.press===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '价格不能为空',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            judgeCover(){
                if(this.form.cover===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '请上传图片',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            judgeAbs(){
                if(this.form.abs===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '简介不能为空',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            uploadImg () {
                this.form.cover = this.$refs.imgUpload.url
            },
            clear() {
                this.form={
                    id: '',
                    title: '',
                    author: '',
                    date: '',
                    press: '',
                    cover: '',
                    abs: '',
                    cid: ''
                }
            },
            onSubmit() {
                if(this.judgeTitle()&&this.judgeAuthor()&&this.judgeDate()&&this.judgePress()&&this.judgeAbs()&&this.judgeCover()){
                    this.$axios
                        .post('/insert',{
                            id:this.form.id,
                            cover:this.form.cover,
                            title:this.form.title,
                            author:this.form.author,
                            date:this.form.date,
                            press:this.form.press,
                            abs:this.form.abs,
                            cid:this.form.cid,
                        })
                        .then(resp=>{
                            if(resp&&resp.status===200){
                                this.$message({
                                    showClose:true,
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.dialogFormVisible=false;
                                this.clear();
                                this.$emit('onSubmit')
                            }else{
                                this.$message({
                                    showClose:true,
                                    type: 'warning',
                                    message: '添加失败'
                                });
                            }
                        })
                }else{
                    return false;
                }
            }
        }
    }
</script>

<style scoped>

    .input::-webkit-input-placeholder {
        color: red;
    }

    .el-icon-circle-plus-outline{
        margin: 50px 0 0 20px;
        font-size:100px;
        float:left;
        cursor:pointer;
    }
</style>
