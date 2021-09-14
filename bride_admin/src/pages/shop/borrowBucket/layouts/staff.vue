<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose" width="400px">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="员工" prop="staff_userid" :rules="[{ required: true, message: '名称不能为空'},]">
                <el-select v-model="ruleForm.staff_userid" placeholder="请选择员工" filterable >
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
            formAction: '/admin/shop/order/staff',
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
            this.formAction = '/admin/shop/package/order-record-staff?id=' + params.id;
            this.ruleForm = params;

        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
