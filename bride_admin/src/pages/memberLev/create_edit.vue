<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="会员等级" prop="name" :rules="[{ required: true, message: '等级名称不能为空'},]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="折扣" prop="discount" :rules="[{ required: true, message: '折扣不能为空'}]">
                <el-input v-model.num="ruleForm.discount" style="width:80px;margin-right: 5px"></el-input>
                <el-tag>折</el-tag><span>规则为:如9.6折</span>
            </el-form-item>
            <el-form-item label="升级条件" prop="update_goto" :rules="[{ required: true, message: '升级条件'}]">
                <el-input v-model="ruleForm.update_goto" style="width:80px;margin-right: 5px"></el-input>
                <el-tag>元</el-tag>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
            formAction: '',
            dialogFormVisible: false,
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
            this.dialogFormVisible = true;
            if (params) {
                this.formAction = '/admin/memberlev/edit?id=' + params.id;
                this.ruleForm = params;
            } else {
                this.ruleForm = { cover: [], sort: 0 };
                this.formAction = '/admin/memberlev/create';
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
