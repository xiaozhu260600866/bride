<template>
	<el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" width="600px" :top="top" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="姓名1" prop="name" :rules="[{ required: true, message: '姓名不能为空'},]">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone" :rules="[{ required: true, message: '电话不能为空'}]">
				<el-input v-model="ruleForm.phone" style="margin-right: 5px"></el-input>
			</el-form-item>
            <el-form-item label="简介" prop="title" :rules="[{ required: true, message: '电话不能为空'}]">
            	<el-input v-model="ruleForm.title" style="margin-right: 5px" type="textarea"></el-input>
            </el-form-item>
			<el-form-item label="城市" prop="city" :rules="[{ required: true, message: '请选择城市'}]">
				<el-input v-model="ruleForm.city" style="margin-right: 5px" type="textarea"></el-input>
			</el-form-item>
			<el-form-item label="区县" prop="town" :rules="[{ required: true, message: '请选择区县'}]">
				<el-input v-model="ruleForm.town" style="margin-right: 5px" type="textarea"></el-input>
			</el-form-item>
			<el-form-item label="地区" prop="area" :rules="[{ required: true, message: '请选择区县'}]">
				<el-input v-model="ruleForm.area" style="margin-right: 5px" type="textarea"></el-input>
			</el-form-item>
            <el-form-item label="金额" prop="amount" :rules="[{ required: true, message: '金额不能为空'}]" v-if="ruleForm.pay_method == 1">
            	<el-input v-model="ruleForm.amount" style="margin-right: 5px" ></el-input>
            </el-form-item>
			<el-form-item label="分类：" prop="category">
				<el-select v-model="ruleForm.category" placeholder="请输入分类">
					<el-option v-for="v in category" :label="v.label" :value="v.label">
				</el-option>
			</el-select>
			  </el-form-item>
            <div class="el-form-item">
                <label class="el-form-item__label" style="width:100px">上传图片</label>
                <my-upload upurl="articleOrder" :uploadLength="10" :fileList="ruleForm.cover" :sizearr="300"></my-upload>
            </div>
			<el-form-item label="公司地址"  >
				<el-input v-model="ruleForm.address" ></el-input>
				<el-button @click.prevent="chooseLocation(key)">重新定位</el-button>
			</el-form-item>
			<div class="clearfix"></div>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
	</el-dialog>
</template>
<script>
import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
	export default {
	props: ['top'],
	data() {
		return {
			ruleForm: {},
			formAction: '',
            parentKey:0,
			dialogFormVisible: false,
			category:[]
		};
	},
	methods: {
        delAddress(key){
           this.ruleForm.getAddresses.splice(key,1);
        },
        addAddress(){
           this.ruleForm.getAddresses.push({address:''});
        },
		chooseLocation(key) {
            this.parentKey = key;
			this.$refs.chooseLocation.ajax();
		},
		locationCallBack(res) {
			if (res.latlng) {
				this.$refs.chooseLocation.handleClose();
                this.ruleForm.address = res.poiaddress;
                this.ruleForm.location_x = res.latlng.lat;
                this.ruleForm.location_y = res.latlng.lng;
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//this.ruleForm.role = 2;
                    delete this.ruleForm.api_token;
					this.postAjax(this.formAction, this.ruleForm, msg => {
						if (msg.data.status == 2) {
							this.dialogFormVisible = false;
							this.$parent.ajax();
						}
					});
				}
			});
		},

		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		ajax: function(params,category) {
			this.$nextTick(()=>{
				console.log("a");
				this.category = category;
				this.dialogFormVisible = true;
				if (params) {
					this.formAction = '/admin/articleOrder/edit?id=' + params.id;
					this.ruleForm = params;
                     this.ruleForm.cover = this.ruleForm.cover ? this.splitCover(this.ruleForm.cover, "articleOrder") : []

				} else {
					this.ruleForm = { role_id: '', sort: 0, status: 0, gender: '' };

				}
				//this.ruleForm.pic = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "user") : [];;
			});


		},
		handleClose() {
			this.dialogFormVisible = false;
		}
	},
	components: {
		chooseLocation
	}
}

</script>
<style type="text/css" scoped="">
.el-input,
.el-cascader,
.el-select {
	width: 210px;
}

.el-upload-list--picture-card .el-upload-list__item {
	width: 100px;
	height: 100px;
}

.styleImg {
	width: 100px;
}

</style>
