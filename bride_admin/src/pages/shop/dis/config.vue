<template>
    <el-form :model="ruleForm" ref="ruleForm" label-width="160px" class="demo-ruleForm" style="margin:20px;min-width:100px;">
        <el-form-item label="一级拥金（比例%）" prop="first_distor" :rules="[{ required: true, message: '一级拥金（比例%）不能为空'},]">
            <el-input v-model="ruleForm.first_distor" :class="['width80']"></el-input><span class="red">% </span>
            <el-input v-model="ruleForm.first_integral" :class="['width80']"></el-input><span class="red">分</span>
        </el-form-item>
        <el-form-item label="二级拥金（比例%）" prop="second_distor" :rules="[{ required: true, message: '二级拥金（比例%）不能为空'},]">
            <el-input v-model="ruleForm.second_distor" :class="['width80']"></el-input><span class="red">% </span>
            <el-input v-model="ruleForm.second_integral" :class="['width80']"></el-input><span class="red">分</span>
        </el-form-item>
        <el-form-item label="三级拥金（比例%）" prop="third_distor" :rules="[{ required: true, message: '三级拥金（比例%）名称不能为空'},]">
            <el-input v-model="ruleForm.third_distor" :class="['width80']"></el-input><span class="red">% </span>
            <el-input v-model="ruleForm.third_integral" :class="['width80']"></el-input><span class="red">分</span>
        </el-form-item>
        <el-form-item label="分销商条件（元）" prop="can_dis" :rules="[{ required: true, message: '分销商条件不能为空'},]">
            <el-input v-model="ruleForm.can_dis" :class="['width80']"></el-input><span class="red">元 </span>
        </el-form-item>
        <el-form-item label="最少提现金额（元）" prop="withdraw_amount" :rules="[{ required: true, message: '最少提现不能为空'},]">
            <el-input v-model="ruleForm.withdraw_amount" :class="['width80']"></el-input><span class="red">元 </span>
        </el-form-item>
        <el-form-item label="分销内购" prop="self" :rules="[{ required: true, message: '分销内购'},]">
              <el-switch v-model="ruleForm.self" on-text="" off-text="" :active-value="'1'" :inactive-value="'0'" style="width: 100px"> </el-switch><span class="pl5">开启分销内购，分销商自己购买商品，享受一级佣金，上级享受二级佣金，上上级享受三级佣金</span>
        </el-form-item>
        <div class="el-form-item">
        	<label class="el-form-item__label" style="width: 150px">分享LOGO</label>
        	<my-upload upurl="dis" :uploadLength="1" :fileList="ruleForm.share_logo" :sizearr="300" type="1"></my-upload>
        </div>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<style type="text/css" scoped>
.width80 {
    width: 80px;
}

.red {
    color: red;
    margin-right: 30px;
    padding-left: 5px
}

</style>
<script>
export default {
    mounted() {
        this.ajax();
    },
    data() {
        return {
            ruleForm: {
                first_distor: 0,
                first_integral: 0,
                second_distor: 0,
                second_integral: 0,
                third_integral: 0,
                third_distor: 0,
                can_dis: 0,
                withdraw_amount: 0

            },
            data: this.formatData(this),
            formAction: '/admin/shop/dis/config',
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {

                        }
                    }, )
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ajax: function() {
            this.getAjax(this, {}, msg => {
                for (var i in msg.detail) {
                    this.ruleForm[i] = msg.detail[i];
                }
                 this.ruleForm.share_logo = this.ruleForm.share_logo ? this.splitCover(this.ruleForm.share_logo, "dis") : [];
            });
        },
    },
}

</script>
