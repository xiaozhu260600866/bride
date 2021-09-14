<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;">
            <div v-for="v in orderProduct">
                <el-form-item label="商品满意度" prop="opinion" :rules="[{ required: true, message: '名称不能为空'},]">
                    <el-rate v-model="v.quote1"></el-rate>
                </el-form-item>
                 <el-form-item label="商品质量" prop="opinion" :rules="[{ required: true, message: '名称不能为空'},]">
                    <el-rate v-model="v.quote2"></el-rate>
                </el-form-item>
                 <el-form-item label="服务态度" prop="opinion" :rules="[{ required: true, message: '名称不能为空'},]">
                    <el-rate v-model="v.quote3"></el-rate>
                </el-form-item>
                 <el-form-item label="服务效率" prop="opinion" :rules="[{ required: true, message: '名称不能为空'},]">
                    <el-select v-model="v.opinion" placeholder="请选择商品满意度">
                        <el-option label="好评" :value="1"></el-option>
                        <el-option label="中评" :value="2"></el-option>
                        <el-option label="差评" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评价内容" prop="suggestContent1" :rules="[{ required: true, message: 'URL地址不能为空'}]">
                    <el-input v-model="v.suggestContent1"></el-input>
                </el-form-item>
                 <el-form-item label="追评内容" prop="suggestContent2" :rules="[{ required: true, message: 'URL地址不能为空'}]">
                    <el-input v-model="v.suggestContent2"></el-input>
                </el-form-item>

                <div class="el-form-item">
                    <label class="el-form-item__label" style="width:100px">评价图片</label>
                    <my-upload upurl="order" :uploadLength="1" :fileList="v.suggestLogo" :sizearr="300"></my-upload>
                </div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width:100px">追加图片</label>
                    <my-upload upurl="order" :uploadLength="1" :fileList="v.suggestLogo2" :sizearr="300"></my-upload>
                </div>
            </div>

          
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    props: ['top'],
    data() {
        return {
            ruleForm: {},
            formAction: '/admin/order/after',
            dialogFormVisible: false,
            orderProduct:[],
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
            console.log(params);
           params.forEach((v,i)=>{
                v.suggestLogo = v.suggestLogo ? this.splitCover(v.suggestLogo, "order") :[];
                v.suggestLogo2 = v.suggestLogo2 ? this.splitCover(v.suggestLogo2, "order") :[];
            });
           this.orderProduct = params;
           this.dialogFormVisible = true;
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
