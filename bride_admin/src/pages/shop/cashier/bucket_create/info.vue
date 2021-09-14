<template>
    <section>
        <el-dialog title="选择规格" :visible.sync="dialogVisible" :top="top" :before-close="handleClose" width="60%" class="pay_confirm">
            <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm validform_ajax pay-list">
                <el-form-item label="规格：" prop="info_id" :rules="[{ required: true, message: '规格不能为空'},]">
                       <el-radio v-model="ruleForm.info_id" :label="key" v-for="(v,key) in info.info">{{ v.name }}({{ v.price }})</el-radio>
                </el-form-item>
                <el-form-item style="width:100%;text-align: center;padding-top: 10px;">
                    <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>
<script type="text/javascript">
export default {
    props: ['top', 'amount', 'clientInfo','category'],
    data() {
        return {
            dialogVisible: false,
            ruleForm: {},
            info:{}
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        ajax(info) {
            this.info = info;
            this.dialogVisible = true;
        },
        submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
                    let info = this.info.info[this.ruleForm.info_id];
                    this.info.info_id =info.id;
                    this.info.is_info = true;
                    this.info.price = info.price;
                    this.dialogVisible = false;
					this.$emit("callBack",this.info);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
    }
}

</script>
<style type="text/css" scoped="">
.act-title {
    text-align: center;
    margin-bottom: 10px;
    font-size: 16pc;
    color: #333;
}



</style>
