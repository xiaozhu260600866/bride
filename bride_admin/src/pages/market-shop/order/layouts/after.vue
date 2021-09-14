<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="售后类型" prop="after_type" :rules="[{ required: true, message: '名称不能为空'},]">
                <el-select v-model="ruleForm.after_type" placeholder="请选择性别">
                    <el-option label="退货" :value="1"></el-option>
                    <el-option label="换货" :value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="填写原因" prop="after_content" :rules="[{ required: true, message: 'URL地址不能为空'}]" >
                <el-input v-model="ruleForm.after_content"></el-input>
            </el-form-item>
            <el-form-item label="售后结果" prop="after_content_" :rules="[{ required: true, message: '售后结果不能为空'}]" >
                <el-input v-model="ruleForm.after_content_"></el-input>
            </el-form-item>
            <div class="el-form-item">
                <label class="el-form-item__label" style="width:100px">上传图片</label>
                <my-upload upurl="order" :uploadLength="1" :fileList="ruleForm.after_logo" :sizearr="300"></my-upload>
            </div>
            <el-form-item v-if="ruleForm.status == 10 && ruleForm.after_status == 0">
                <el-button type="primary" @click="submitForm('ruleForm')">同意</el-button>

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
            formAction: '/admin/shop/order/after',
            dialogFormVisible: false,
            integral: 0,
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
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
            console.log(params);
            this.formAction = '/admin/shop/order/after?id=' + params.id;
            this.ruleForm = params;
            this.ruleForm.after_logo = this.ruleForm.after_logo ? this.splitCover(this.ruleForm.after_logo, "order") : []

        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
