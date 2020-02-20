<template>
    <div>
        <i class="el-icon-circle-plus-outline" @click="dialogFormVisible=true"></i>
        <el-dialog title="添加图书" :visible.sync="dialogFormVisible" > <!-- @close="clearEditForm"-->
            <el-form v-model="form" style="text-align: left" ref="dataForm">
                <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
                    <el-input class="input" v-model="form.title"  autocomplete="off" placeholder="请输入书名"></el-input>
                </el-form-item>
                <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
                    <el-input v-model="form.author"  autocomplete="off" placeholder="请输入作者"></el-input>
                </el-form-item>
                <el-form-item label="出版日期" :label-width="formLabelWidth" prop="date">
                    <el-date-picker
                            v-model="form.date"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                    <!--<el-input v-model="form.date"  autocomplete="off" placeholder="请输入出版日期"></el-input>-->
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="form.price"  autocomplete="off" placeholder="请输入与价格" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="新旧程度" :label-width="formLabelWidth" prop="price">
                    <template slot="title">请选择</template>
                    <el-cascader
                            :options="newOlds"
                            :props="{ expandTrigger: 'hover' }"
                            @change="handleChangeNewOld">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="联系人" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="form.contact"  autocomplete="off" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="form.phone"  autocomplete="off" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="QQ" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="form.qq"  autocomplete="off" placeholder="请输入QQ号"></el-input>
                </el-form-item>
                <el-form-item label="微信" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="form.weChat"  autocomplete="off" placeholder="请输入微信号"></el-input>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
                    <el-input type="textarea"  v-model="form.abs" autocomplete="off" placeholder="请输入所出售书本简介"></el-input>
                </el-form-item>
                <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
                    <el-upload
                            class="upload-demo"
                            accept="image/jpeg,image/gif,image/png"
                            action="http://118.25.61.247:8443/api/uploadImg"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            :before-upload="beforeUpload"
                            :on-success="handleSuccess"
                            :limit="6"
                            :on-change="handleOnChange"
                            ref="upload"
                            :file-list="fileList"
                            list-type="picture">
                        <el-button slot="trigger" size="small" type="success">点击上传</el-button>
                        <div slot="tip"  class="el-upload__tip">只能上传jpg/png/gif文件，且不超过1M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
                    <template slot="title">专业课</template>
                    <el-cascader
                            :options="options"
                            :props="{ expandTrigger: 'hover' }"
                            @change="handleChangeCategory">
                    </el-cascader>
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
    export default {
        name: "EditForm",
        components:{
        },
        data() {
            return {
                fileList: [],
                dialogFormVisible: false,
                uid:'',
                form: {
                    title: '', //书名
                    author: '', //作者
                    date: '', //出版日期
                    price: '', //价格
                    newOld:'', //新旧
                    contact:'', //联系人姓名
                    phone:'', //电话
                    qq:'', //qq
                    weChat:'', //微信
                    abs: '', //简介
                    cid: '', //种类
                    imgs:[
                        {img:''}, //封面图
                        {img:''}, //图片1
                        {img:''},
                        {img:''},
                        {img:''},
                        {img:''},
                    ],
                },
                newOlds:[
                    {
                        value:'全新',
                        label:'全新',
                    },
                    {
                        value:'九成新',
                        label:'九成新',
                    },
                    {
                        value:'八成新',
                        label:'八成新',
                    },
                    {
                        value:'七成新',
                        label:'七成新',
                    },
                    {
                        value:'六成新',
                        label:'六成新',
                    },
                    {
                        value:'五成新',
                        label:'五成新',
                    },
                    {
                        value:'四成新',
                        label:'四成新',
                    },
                    {
                        value:'不能再旧了',
                        label:'不能再旧了',
                    },
                ],
                formLabelWidth:'120px',
                options:  [
                    {
                        value:'1',
                        label:'教材',
                        children:[
                            {
                                value:'1-1',
                                label:'基础学科'
                            },
                            {
                                value:'1-2',
                                label:'专业课',
                                children:[
                                    {
                                        value: '1-2-1',
                                        label: '工学',
                                        children: [
                                            {
                                                value: '1-2-1-1',
                                                label: '环安',
                                            },
                                            {
                                                value: '1-2-1-2',
                                                label: '机械',
                                            },
                                            {
                                                value: '1-2-1-3',
                                                label: '农机',
                                            },
                                            {
                                                value: '1-2-1-4',
                                                label: '能动',
                                            },
                                            {
                                                value: '1-2-1-5',
                                                label: '材料',
                                            }, {
                                                value: '1-2-1-6',
                                                label: '食品',
                                            }
                                            , {
                                                value: '1-2-1-7',
                                                label: '电气',
                                            }
                                            , {
                                                value: '1-2-1-8',
                                                label: '车辆',
                                            },
                                            {
                                                value: '1-2-1-9',
                                                label: '计算机',
                                            },
                                            {
                                                value: '1-2-1-10',
                                                label: '化工',
                                            },
                                        ]
                                    },
                                    {
                                        value: '1-2-2',
                                        label: '理学',
                                    },
                                    {
                                        value: '1-2-3',
                                        label: '文学',
                                        children:[
                                            {
                                                value: '1-2-3-1',
                                                label: '文学',
                                            },
                                            {
                                                value: '1-2-3-2',
                                                label: '法学',
                                            },
                                            {
                                                value:'1-2-3-3',
                                                label:'外国语'
                                            },
                                            {
                                                value:'1-2-3-4',
                                                label:'马克思'
                                            }
                                        ]
                                    },
                                    {
                                        value: '1-2-4',
                                        label: '教育学',
                                    },
                                    {
                                        value: '1-2-5',
                                        label: '经济学',
                                    },
                                    {
                                        value: '1-2-6',
                                        label: '艺术学',
                                    },
                                    {
                                        value: '1-2-7',
                                        label: '管理学',
                                    },
                                    {
                                        value: '1-2-8',
                                        label: '医学',
                                    }
                                ]
                            },

                        ]
                    },
                    {
                        value:'2',
                        label:'小说',
                        children:[
                            {
                                value:'2-1',
                                label:'名著'
                            },
                            {
                                value:'2-2',
                                label:'课外读物'
                            }
                        ]
                    },
                    {
                        value:'3',
                        label:'考研资料',
                        children:[
                            {
                                value:'3-1',
                                label:'数学',
                            },
                            {
                                value:'3-2',
                                label:'英语'
                            },
                            {
                                value:'3-3',
                                label:'政治'
                            },
                            {
                                value:'3-4',
                                label:'专业课',
                                children:[
                                    {
                                        value: '3-4-1',
                                        label: '工学',
                                        children: [
                                            {
                                                value: '3-4-1-1',
                                                label: '环安',
                                            },
                                            {
                                                value: '3-4-1-2',
                                                label: '机械',
                                            },
                                            {
                                                value: '3-4-1-3',
                                                label: '农机',
                                            },
                                            {
                                                value: '3-4-1-4',
                                                label: '能动',
                                            },
                                            {
                                                value: '3-4-1-5',
                                                label: '材料',
                                            }, {
                                                value: '3-4-1-6',
                                                label: '食品',
                                            }
                                            , {
                                                value: '3-4-1-7',
                                                label: '电气',
                                            }
                                            , {
                                                value: '3-4-1-8',
                                                label: '车辆',
                                            },
                                            {
                                                value: '3-4-1-9',
                                                label: '计算机',
                                            },
                                            {
                                                value: '3-4-1-10',
                                                label: '化工',
                                            },
                                        ]
                                    },
                                    {
                                        value: '3-4-2',
                                        label: '理学',
                                    },
                                    {
                                        value: '3-4-3',
                                        label: '文学',
                                        children:[
                                            {
                                                value: '3-4-3-1',
                                                label: '文学',
                                            },
                                            {
                                                value: '3-4-3-2',
                                                label: '法学',
                                            },
                                            {
                                                value:'3-4-3-3',
                                                label:'外国语'
                                            },
                                            {
                                                value:'3-4-3-4',
                                                label:'马克思'
                                            }
                                        ]
                                    },
                                    {
                                        value: '3-4-4',
                                        label: '教育学',
                                    },
                                    {
                                        value: '3-4-5',
                                        label: '经济学',
                                    },
                                    {
                                        value: '3-4-6',
                                        label: '艺术学',
                                    },
                                    {
                                        value: '3-4-7',
                                        label: '管理学',
                                    },
                                    {
                                        value: '3-4-8',
                                        label: '医学',
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        value:'5',
                        label:'英语',
                        children:[
                            {
                                value:'5-1',
                                label:'四级',
                            },
                            {
                                value:'5-2',
                                label:'六级'
                            },
                            {
                                value:'5-3',
                                label:'读物'
                            },
                            {
                                value:'5-4',
                                label:'其他'
                            }
                        ]
                    },
                    {
                        value:'4',
                        label:'计算机资料'
                    },
                    {
                        value:'6',
                        label:'励志类'
                    },
                    {
                        value:'7',
                        label:'心理学'
                    },
                ],
            }
        },
        methods:{
            /**********页面初始化，挂载组件时**********/
            mounted(){
                //获得用户名，以便获得用户数据
                console.log("EditForm:mounted");
            },
            /***************************************/

            /*******imgUpload方法******/
            //有一点bug，如果上传图片后不确人，直接刷新页面，服务器的图片不会存到数据库中，这样就导致成为野图片
            //文件上传成功后将文件的地址赋给变量imgs
            handleSuccess(response,file,fileList){
                this.form.imgs[fileList.length-1].img=response;
            },
            //限制提示
            handleExceed () {
                this.$message.warning(`最多允许上传六张图片`)
            },
            //清除上传显示的所有图片
            clearImgs () {
                this.$refs.upload.clearFiles()
            },
            //文件列表移除文件时的钩子
            //用来判断封面是否被删掉
            //从本地删除图片地址
            handleRemove(file, fileList) {
                for(let i=0;i<this.form.imgs.length;i++){
                    this.form.imgs[i].img="";
                }
                for(let i=0;i<fileList.length;i++){
                    this.form.imgs[i].img=fileList[i].response;
                }
                if (fileList.length >= 1) {
                    fileList[0].name = "封面"
                }
                if(!(file.response===undefined)){
                    this.$axios({
                        method:'post',
                        url:'/deleteImg',
                        params:{
                            imgUrl:file.response,
                        }
                    })
                        .catch(()=>{
                            this.$message.warning("删除失败");
                        })
                }
            },
            //用来设置上传图片的信息
            handleOnChange(file,fileList){
                if(fileList.length===1){
                    file.name="封面";
                }else{
                    file.name="书本详细图"
                }
            },
            //上传前判断是否有大于1M的图片
            //设置上传图片的信息
            beforeUpload(file,fileList){
                //如果图片大于1M上传失败
                if(file.size>1048576){
                    this.$message({
                        showClose:true,
                        message: file.name+"大于1M，上传失败",
                        type: 'warning'
                    });
                    return false;
                }
                return true;
            },
            /*************************/
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
                if(this.form.price===''){
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
            judgeNewOld(){
                if(this.form.newOld===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '新旧程度不能为空',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            judgeContact(){
                if(this.form.contact===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '联系人不能为空',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            judgeQQ(){
                if(this.form.qq===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: 'qq不能为空',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            //判断上传图是否为空
            judgeImgs(){
                if(this.form.imgs[0].img===''){
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
            //判断简介是否为空
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
            //判断种类格式
            judgeCid(){
                if(this.form.cid===''){
                    //提示信息
                    this.$message({
                        showClose: true,
                        message: '请选择书的种类',
                        type: 'warning'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            //清除整个表单
            clearEditForm() {
                this.form={
                    title: '', //书名
                    author: '', //作者
                    date: '', //出版日期
                    price: '', //价格
                    newOld:'', //新旧
                    contact:'', //联系人姓名
                    phone:'', //电话
                    qq:'', //qq
                    weChat:'', //微信
                    abs: '', //简介
                    cid: '', //种类
                    imgs:[
                        {img:''}, //封面图
                        {img:''}, //图片1
                        {img:''},
                        {img:''},
                        {img:''},
                        {img:''},
                    ],
                };
                this.clearImgs ();

            },
            onSubmit() {
                if(this.judgeTitle()&&this.judgeAuthor()&&this.judgeDate()&&this.judgePress()&&this.judgeNewOld()&&this.judgeContact()&&this.judgeQQ()&&this.judgeAbs()&&this.judgeImgs()&&this.judgeCid()){
                    this.$axios
                        .post('/insert',{
                            cover:this.form.imgs[0].img,
                            title:this.form.title,
                            author:this.form.author,
                            date:this.form.date,
                            price:this.form.price,
                            newOld:this.form.newOld,
                            contact:this.form.contact,
                            phone:this.form.phone,
                            qq:this.form.qq,
                            weChat:this.form.weChat,
                            img_1:this.form.imgs[1].img,
                            img_2:this.form.imgs[2].img,
                            img_3:this.form.imgs[3].img,
                            img_4:this.form.imgs[4].img,
                            img_5:this.form.imgs[5].img,
                            abs:this.form.abs,
                            cid:this.form.cid,
                            uid:this.uid,
                        })
                        .then(resp=>{
                            if(resp&&resp.status===200){
                                this.$message({
                                    showClose:true,
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.clearEditForm();
                                this.clearImgs();
                                this.dialogFormVisible=false;
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
            },
            handleChangeNewOld(value){
                this.form.newOld=value[value.length-1];
            },
            handleChangeCategory(value){
                this.form.cid=value[value.length-1];
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
