<template>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:100%;min-width:600px;">
        <el-form-item label="原密码" prop="oldPassword" :rules="[{ required: true, message: '原密码不能为空'},]">
            <el-input v-model="ruleForm.oldPassword" type="password" class="PInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" :rules="[{ required: true, message: '新密码不能为空'}]">
            <el-input v-model="ruleForm.newPassword" style="margin-right: 5px" type="password" class="PInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="新密码确认" prop="newPasswordc" :rules="[{ required: true, message: '新密码确认不能为空'}]">
            <el-input v-model="ruleForm.newPasswordc" style="margin-right: 5px" type="password" class="PInputWidth"></el-input>
        </el-form-item>
        <!--   <el-form-item label="数字测试" prop="num"  :rules="[{ required: true, message: '数字测试不能为空'},{ type: 'number', message: '年龄必须为数字值'}]">
                  <el-input v-model.number="ruleForm.num" style="margin-right: 5px"></el-input>
                              </el-form-item> -->
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<style type="text/css">
.PInputWidth{width: 300px;}
.PInputWidth .el-input__inner{border-color: #dcdfe6!important;}
</style>
<script>
export default {
    data() {
        return {
            ruleForm: {
                num: 123
            },
            formAction: '/admin/system/password',
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, function(msg) {})
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
}

</script>
