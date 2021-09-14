<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="办理人员" prop="staff_userid" :rules="[{ required: true, message: '名称不能为空'},]">
                <el-select v-model="ruleForm.staff_userid" placeholder="请选择服务人员">
                    <el-option :label="v.userInfo.name" :value="v.id" v-for="v in staff"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
            formAction: '/admin/shop/order/dianxin',
            dialogFormVisible: false,
            staff:[],
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
        ajax: function(params,staff) {
            this.staff =staff;
            this.dialogFormVisible = true;
            console.log(params);
            this.formAction = '/admin/shop/order/dianxin?id=' + params.id;
            this.ruleForm = params;

        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
