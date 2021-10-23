<template>
	<el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" width="600px" :top="top" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

			<!-- 	<el-form-item label="名片风格">
			    <el-radio v-model="ruleForm.card_style_type" :label="1"><img class="styleImg" src="https://boss.doxinsoft.com/images/wap/cardMode-01.jpg"></el-radio>
			    <el-radio v-model="ruleForm.card_style_type" :label="2"><img class="styleImg" src="https://boss.doxinsoft.com/images/wap/cardMode-02.jpg"></el-radio>
			    <el-radio v-model="ruleForm.card_style_type" :label="3"><img class="styleImg" src="https://boss.doxinsoft.com/images/wap/cardMode-03.jpg"></el-radio>
			</el-form-item> -->
			<!-- 		<my-upload class="proImg mt10" upurl="user" :uploadLength="1" :fileList="ruleForm.pic2"
			 :sizearr="300" label="上传缩略图" message="最佳尺寸：640*640"></my-upload> -->
			<my-upload class="proImg mt10" upurl="user" :uploadLength="1" :fileList="ruleForm.pic" :sizearr="300"
				label="上传logo" message="最佳尺寸：640*640"></my-upload>
			<my-upload class="proImg mt10" upurl="user" :uploadLength="6" :fileList="ruleForm.photos" :sizearr="300"
					label="上传相册" message="最佳尺寸：640*640"></my-upload>

			<el-form-item label="个人独白" prop="remark" >
				<el-input v-model="ruleForm.remark"></el-input>
			</el-form-item>
			<el-form-item label="微信号" prop="wechat" >
				<el-input v-model="ruleForm.wechat"></el-input>
			</el-form-item>
			<el-form-item label="年龄" prop="age" :rules="[{ required: true, message: '微信号不能为空'},]">
				<el-input v-model="ruleForm.age"></el-input>
			</el-form-item>
			<el-form-item label="姓别" prop="sex" :rules="[{ required: true, message: '姓别不能为空'},]">
				<el-select v-model="ruleForm.sex" placeholder="请选择姓别">
					<el-option  label="男" :value="1"></el-option>
					<el-option  label="女" :value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学历" prop="education" >
				<el-input v-model="ruleForm.education"></el-input>
			</el-form-item>
			<el-form-item label="身高" prop="height" :rules="[{ required: true, message: '微信号不能为空'},]">
				<el-input v-model="ruleForm.height"></el-input>
			</el-form-item>
			<el-form-item label="职业" prop="profession" >
				<el-input v-model="ruleForm.profession"></el-input>
			</el-form-item>
			<el-form-item label="月收入" prop="salary">
				<el-input v-model="ruleForm.salary"></el-input>
			</el-form-item>
			<el-form-item label="婚烟状况" prop="marriage" :rules="[{ required: true, message: '微信号不能为空'},]">
				<el-input v-model="ruleForm.marriage"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '姓名不能为空'},]">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone" :rules="[{ required: true, message: '电话不能为空'}]">
				<el-input v-model="ruleForm.phone" style="margin-right: 5px"></el-input>
			</el-form-item>
			<el-form-item label="兴趣爱好" prop="hobby">
				<el-input v-model="ruleForm.hobby" style="margin-right: 5px"></el-input>以，号分逗
			</el-form-item>
			<el-form-item label="择偶条件" prop="marry_condition">
				<el-input v-model="ruleForm.marry_condition" style="margin-right: 5px"></el-input>以，号分逗
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
				parentKey: 0,
				dialogFormVisible: false,
			};
		},
		methods: {
			delAddress(key) {
				this.ruleForm.getAddresses.splice(key, 1);
			},
			addAddress() {
				this.ruleForm.getAddresses.push({
					address: ''
				});
			},
			chooseLocation(key) {
				this.parentKey = key;
				this.$refs.chooseLocation.ajax();
			},
			locationCallBack(res) {
				if (res.latlng) {
					this.$refs.chooseLocation.handleClose();
					this.ruleForm.getAddresses[this.parentKey].address = res.poiaddress;
					this.ruleForm.getAddresses[this.parentKey].location_x = res.latlng.lat;
					this.ruleForm.getAddresses[this.parentKey].location_y = res.latlng.lng;
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ruleForm.role = 2;
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
			ajax: function(params) {
				this.$nextTick(() => {
					console.log("a");

					this.dialogFormVisible = true;
					if (params) {
						this.formAction = '/admin/user/edit?id=' + params.id;
						this.ruleForm = params.userInfo;
						this.ruleForm.sex = parseInt(this.ruleForm.sex);
						this.ruleForm.username = params.username;
						this.$set(this.ruleForm, 'photos', params.photos);
						console.log("a");
						console.log(this.ruleForm.pic)

					} else {
						this.ruleForm = {
							role_id: '',
							sort: 0,
							status: 0,
							gender: '',
							logo: [],
							pic:[]
						};
						this.formAction = '/admin/user/create';
						this.$set(this.ruleForm, 'getAddresses', []);
					}
					console.log("pic",this.ruleForm.pic);
					this.ruleForm.pic = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "user") : [];
					this.ruleForm.pic2 = this.ruleForm.pic2 ? this.splitCover(this.ruleForm.pic2, "user") : [];
					this.ruleForm.photos = this.ruleForm.photos ? this.splitCover(this.ruleForm.photos, "user") : [];
					this.ruleForm.remark_pic = this.ruleForm.remark_pic ? this.splitCover(this.ruleForm
						.remark_pic, "user") : [];
					this.ruleForm.remark_pic_company = this.ruleForm.remark_pic_company ? this.splitCover(this
						.ruleForm.remark_pic_company, "user") : [];
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
