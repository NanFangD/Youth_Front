<template>
    <el-upload
            class="img-upload"
            ref="upload"
            action="http://118.25.61.247:8443/api/covers"
            :on-preview="handlePreview"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传一张图片，且不超过500kb</div>
    </el-upload>
</template>

<script>
    export default {
        name: 'ImgUpload',
        data () {
            return {
                fileList: [],
                url: ''
            }
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove (file, fileList) {

            },
            handlePreview (file) {
            },
            handleExceed (files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            beforeRemove (file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleSuccess (response){
                this.url = response;
                this.$emit('onUpload');
                this.$message.warning('上传成功')
            },
            clear () {
                this.$refs.upload.clearFiles()
            }
        }
    }
</script>
