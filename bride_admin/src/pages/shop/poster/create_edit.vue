<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" width="800px" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空'},]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="URL地址" prop="url" :rules="[{ required: true, message: 'URL地址不能为空'},]">
                <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort" :rules="[{ required: true, message: 'URL地址不能为空'},{ type: 'number', message: '必须为数字值'}]">
                <el-input v-model.number="ruleForm.sort"></el-input>
            </el-form-item>
			<el-form-item label="城市" prop="city" >
			  <el-tree
			    :data="city"
			    show-checkbox
			    node-key="id"
			    ref="tree"
			    highlight-current
			    :props="ruleForm.city" @check-change="res" :default-checked-keys="ruleForm.cityKey" v-if="city.length">
			        </el-tree>
			     <el-button @click="upgradeCity" v-else>一键点击更新城市</el-button>
			</el-form-item>
            <div class="el-form-item">
                <label class="el-form-item__label" style="width:100px">上传图片</label>
                <my-upload upurl="poster" :uploadLength="1" :fileList="ruleForm.cover" :sizearr="300"></my-upload>
            </div>
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
			city:[]
        };
    },
    methods: {
		upgradeCity(){
		  if(sessionStorage.getItem("citys")){
		        this.city = JSON.parse(sessionStorage.getItem("citys"));
		  }else{
		      this.postAjax("/admin/user/updateCity").then(msg => {
		          this.city = msg.data.citys;
		          sessionStorage.setItem("citys",JSON.stringify(this.city));
		      })
		  }
		},
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   if(this.$refs.tree){
                       this.ruleForm.city = this.$refs.tree.getCheckedNodes();
                       this.ruleForm.cityKey = this.$refs.tree.getCheckedKeys();
                   }
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
        ajax: function(params,type) {
            this.dialogFormVisible = true;
            if (params) {
                this.formAction = '/admin/shop/poster/edit?id=' + params.id;
                this.ruleForm = params;
                this.ruleForm.cover = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "poster") : [],
				this.ruleForm.city = this.ruleForm.city ? this.ruleForm.city.split(',') :[],
				this.ruleForm.cityKey = this.ruleForm.cityKey? this.ruleForm.cityKey.split(','):[]
            } else {
                this.ruleForm = { cover: [], sort: 0,type:type };
                this.formAction = '/admin/shop/poster/create';
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
