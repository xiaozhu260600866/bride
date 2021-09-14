<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose" width="800px">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空'},]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="URL地址" prop="url" :rules="[{ required: true, message: 'URL地址不能为空'},]">
                <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort" :rules="[{ required: true, message: 'URL地址不能为空'},{ type: 'number', message: '必须为数字值'}]">
                <el-input v-model.number="ruleForm.sort"></el-input>
            </el-form-item>
            <div class="el-form-item">
                <label class="el-form-item__label" style="width:100px">上传图片</label>
                <my-upload upurl="poster" :uploadLength="1" :fileList="ruleForm.cover" :sizearr="300"></my-upload>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    props: ['top'],
    data() {
        return {
            ruleForm: {},
            formAction: '',
            dialogFormVisible: false,
            integral: 0,
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.type = this.getOptions('type');
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.dialogFormVisible = false;
                            this.$parent.ajax();
                        }

                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ajax: function(params) {
            this.dialogFormVisible = true;
            if (params) {
                this.formAction = '/admin/poster/edit?id=' + params.id;
                this.ruleForm = params;
                this.ruleForm.cover = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "poster") : []
            } else {
                this.ruleForm = { cover: [], sort: 0 };
                this.formAction = '/admin/poster/create';
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
