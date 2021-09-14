<template>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm create-box">
        <el-form-item label="优惠券名称" prop="name" :rules="[{ required: true, message: '优惠券不能为空'},]">
            <el-input v-model="ruleForm.name" v-class="'width200'"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" prop="amount" :rules="[{ required: true, message: '优惠券金额不能为空'},]">
            <el-input v-model="ruleForm.amount" v-class="'width100'"></el-input>
        </el-form-item>
        <el-form-item label="周期" prop="expire_date" :rules="[{ required: true, message: '优惠券金额不能为空'},]">
            <el-input v-model="ruleForm.expire_date" v-class="'width100'"></el-input>
            <span>天</span>
        </el-form-item>
        <el-form-item label="类型" prop="type" :rules="[{ required: true, message: '联系人不能为空'}]">
            <el-radio class="radio" v-model="ruleForm.type" :label="0">满多少元才能够使用优惠券</el-radio>
            <el-radio class="radio" v-model="ruleForm.type" :label="1">是指写商品才能使用优惠券</el-radio>
        </el-form-item>
        <el-form-item label="满多少元" prop="full_amount" :rules="[{ required: true, message: '满多少元不能为空'},]" v-if="ruleForm.type == 0">
            <el-input v-model="ruleForm.full_amount" v-class="'width100'"></el-input>
        </el-form-item>
        <div class="el-form-item">
            <label class="el-form-item__label" style="width:110px">缩略图</label>
            <my-upload upurl="coupon" :uploadLength="1" :fileList="ruleForm.cover" :sizearr="300"></my-upload>
        </div>


        <el-form-item label="请选择指定商品" v-if="ruleForm.type == 1">
            <el-button type="primary" @click="$refs.searchProduct.ajax()">请选择指定商品</el-button>
        </el-form-item>
        <el-form-item label="会员等级" prop="lev_id" :rules="[{ required: true, message: '会员等级不能为空'},]">
                <el-select v-model="ruleForm.lev_id" placeholder="请选择会员等级">
                	<el-option label="全部" :value="0"></el-option>
                	<el-option :label="v.name" :value="v.id" v-for="v in data.lev"></el-option>
                </el-select>
                 <el-tooltip class="item" effect="dark" content="设置会员等级才能够领取" placement="right">
                      <span class="el-icon-sort"></span>
                  </el-tooltip>
        </el-form-item>
        <el-form-item label="已选择商品" prop="product_str" :rules="[{ required: true, message: '请选择指定商品不能为空'},]" v-if="ruleForm.type == 1 && ruleForm.product_str.length >= 1">
            <el-tag type="gray" :closable="true" v-for="(v,key) in ruleForm.product_name" @close="delProduct(key)">{{ v}}</el-tag>
        </el-form-item>

       <el-form-item label="开始时间" prop="start_date" :rules="[{ required: true, message: '使用期限不能为空'},]">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.start_date" style="width:200px"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_date" :rules="[{ required: true, message: '使用期限不能为空'},]">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.end_date" style="width:200px"></el-date-picker>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <searchProduct ref="searchProduct" top="20"  @callBack="searchCallBack"></searchProduct>
    </el-form>
</template>
<script>
import searchProduct from '@/components/searchShopProduct.vue';
export default {
    mounted: function() {
        if (this.getOptions("id")) {

            this.formAction = '/admin/shop/coupon/edit?id=' + this.getOptions("id");
            this.ajax();
        } else {
            this.formAction = '/admin/shop/coupon/create';
        }
    },
    data() {
        return {
            ruleForm: { type: 0, product_str: [], product_name: [], expire_date: 0, full_amount: 0, amount: '', is_index: false ,cover:[]},
            formAction: '',
            data: this.formatData(this)
        };
    },
    components: {
        searchProduct
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.$router.push({
                                path: '/vueadmin/coupon/coupon-lists'
                            });
                        }
                    }, this)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        searchCallBack(rows) {
            for (let i = rows.length - 1; i >= 0; i--) {
                let row = rows[i];
                let canPush = true;
                this.ruleForm.product_str.forEach((v, i) => {
                    if (v == row.id) canPush = false;
                });
                if (canPush) {
                    this.ruleForm.product_str.push(row.id);
                    this.ruleForm.product_name.push(row.name);
                } else {
                    alert("不能选择重复商品");
                    return false;
                }
           }
            console.log(this.ruleForm);
        },
        delProduct(key) {
            this.ruleForm.product_str.splice(key, 1);
            this.ruleForm.product_name.splice(key, 1);
        },
        ajax: function() {
            this.getAjax(this, {}, msg => {
                this.ruleForm = msg.detail;
                this.ruleForm.cover = this.ruleForm.cover ? this.splitCover(this.ruleForm
                    .cover,
                    "coupon") : [];
                if(this.ruleForm.product_name){
                     this.ruleForm.product_name = this.ruleForm.product_name.split(",");
                     this.ruleForm.product_str = this.ruleForm.product_str.split(",");
                    
                }

            });
        },
    },
}

</script>
<style type="text/css" scoped="">
.el-table__row:hover {
    cursor: pointer;
}

</style>
