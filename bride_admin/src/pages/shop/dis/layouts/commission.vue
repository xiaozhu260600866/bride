<template>
    <el-dialog title="新建\编辑佣金" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="金额" prop="amount" :rules="[{ required: true, message: '金额不能为空'}]">
                <el-col :span="10">
                    <el-input v-model="ruleForm.amount"  ></el-input>
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
            ruleForm: {amount:'',dis_id:''},
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
    
        ajax: function(params) {
        	this.dialogFormVisible = true;
            this.ruleForm.dis_id  =params.id;
            this.formAction = '/admin/shop/dis/add-commission';
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}
</script>