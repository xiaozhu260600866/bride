<template>
    <el-dialog title="绑定二维码" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <img  :src="src">
    </el-dialog>
</template>
<script>
export default {
    props: ['top'],
    data() {
        return {
            ruleForm: { end_at: '', coupon_id: '',start_date:new Date() },
            formAction: '',
            dialogFormVisible: false,
            src: '',
        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ajax: function(src) {
            this.dialogFormVisible = true;
            this.src = src;
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
