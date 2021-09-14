<template>
    <el-dialog title="充值余额" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-col :span="10">
                    <el-input v-model="ruleForm.nickname" :disabled="true"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="充值积分" prop="integral" :rules="[{ required: true, message: '充值金额不能为空'},]">
                <el-col :span="8">
                      <el-input v-model="ruleForm.integral" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    props: ['top'],
    data() {
        return {
            ruleForm: {integral:0,},
            formAction: '',
            dialogFormVisible: false,
            end_at:'',
            coupon:[]
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, msg=> {
                        if (msg.data.status == 2) {
                            this.dialogFormVisible = false;
                            this.$parent.ajax();
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        ajax: function(params,coupon) {
        	this.dialogFormVisible = true;
            if (params) {
                this.formAction = '/admin/user/recharge-integral';
                this.ruleForm.nickname = params.nickname;
                this.ruleForm.user_id = params.id;
                this.ruleForm.amount=0;
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}
</script>
