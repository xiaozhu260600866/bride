<template>
    <el-dialog title="新建\编辑赠送优惠券" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-col :span="10">
                    <el-input v-model="ruleForm.nickname" :disabled="true"></el-input>
                </el-col>
            </el-form-item>
          <!--   <el-form-item prop="start_date" label="开始日期" :rules="[{ required: true, message: '优惠券不能为空'},]">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.start_date" style="width:200px"></el-date-picker>
          </el-form-item> -->
            <el-form-item label="优惠券" prop="coupon_package_id" :rules="[{ required: true, message: '优惠券不能为空'},]">
                <el-col :span="8">
                    <el-select v-model="ruleForm.coupon_package_id" placeholder="请选择优惠券">
                        <el-option :label="v.name" :value="v.id" v-for="v in couponPackage"></el-option>
                    </el-select>
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
            ruleForm: { end_at: '', coupon_package_id: '',start_date:new Date() },
            formAction: '',
            dialogFormVisible: false,
            end_at: '',
            couponPackage: []
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

        ajax: function(params, couponPackage) {
            this.dialogFormVisible = true;
            this.couponPackage = couponPackage;
            if (params) {
                this.formAction = '/admin/user/recharge-couponPackage';
                this.ruleForm.nickname = params.nickname;
                this.ruleForm.user_id = params.id;
                this.ruleForm.coupon_package_id = "";
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
