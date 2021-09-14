<template>
	<el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" width="800px" :top="top" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="自提点帐号" prop="username" :rules="[{ required: true, message: '自提点名称不能为空'},]">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" :rules="[!ruleForm.id ? { required: true, message: '密码不能为空'} : '']">
				<el-input v-model="ruleForm.password" style="margin-right: 5px" type="password" :placeholder="!ruleForm.id ? '请填写密码' : '如为空则默认旧密码' "></el-input>
			</el-form-item>

			<el-form-item label="自提点名称" prop="company_name" :rules="[{ required: true, message: '自提点名称不能为空'},]">
				<el-input v-model="ruleForm.company_name"></el-input>
			</el-form-item>
			<el-form-item label="联系人" prop="name" :rules="[{ required: true, message: '联系人不能为空'},]">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone" :rules="[{ required: true, message: '电话不能为空'}]">
				<el-input v-model="ruleForm.phone" style="margin-right: 5px"></el-input>
			</el-form-item>
			<!-- 
			<el-form-item label="固话" prop="tel" >
				<el-input v-model="ruleForm.tel" style="margin-right: 5px"></el-input>
			</el-form-item>
			<el-form-item label="营业时间" prop="start_hour">
				<el-input v-model="ruleForm.start_hour" style="margin-right: 5px"></el-input>~
				<el-input v-model="ruleForm.end_hour" style="margin-right: 5px"></el-input>
			</el-form-item>
			<el-form-item label="行业"  :rules="[{ required: true, message: '行业不能为空'}]">
				<el-select v-model="ruleForm.industry" placeholder="请选择行业">
					<el-option :label="v.label" :value="v.label" v-for="v in industryArr"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="请选择指定商品">
				<el-button type="primary" @click="$refs.searchProduct.ajax()">请选择指定商品</el-button>
				<el-tag v-for="(v,key) in product_name" closable v-if="product_name.length" @close="delProduct(key)">{{v}}</el-tag>
			</el-form-item>
			<div class='flex'><el-button @click.prevent="addAddress">增加地址</el-button></div>
			 -->
			<el-form-item label="送货方式" prop="deliver_type">
				<el-checkbox-group v-model="ruleForm.deliver_type">
					<el-checkbox :label="v" v-for="v in deliverArr"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>

			<el-form-item label="地址" >
				<el-input v-model="ruleForm.address" class="CinputWidth"></el-input>
				<el-button @click.prevent="chooseLocation()">重新定位</el-button>
			</el-form-item>
			<my-cropUpload v-model="ruleForm.pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'user',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="上传LOGO"></my-cropUpload>
			<el-form-item label="自提点介绍" prop="remark">
				<el-input v-model="ruleForm.remark" style="margin-right: 5px" type="textarea"></el-input>
			</el-form-item>
			<div class="clearfix"></div>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
		 <searchProduct ref="searchProduct" :top="20" @callBack="searchCallBack"></searchProduct>
	</el-dialog>

</template>
<script>
 import searchProduct from 'xiaozhu/vue/components/admin/searchShopProduct.vue';
import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";
	export default {
	props: ['top'],
	components: {
		chooseLocation,
		searchProduct

	},
	data() {
		return {
			ruleForm: {},
			deliverArr:["自提","送货上门"],
			formAction: '',
			dialogFormVisible: false,
			industryArr:[],
			roleArr:[],
			product_name:[],
		};
	},
	methods: {
		delProduct(key){
			  this.product_name.splice(key,1);
			  this.ruleForm.product_str.splice(key,1);
		},
		delAddress(key){
		   this.ruleForm.getAddresses.splice(key,1);
		},
		addAddress(){
		   this.ruleForm.getAddresses.push({address:''});
		},
		chooseLocation() {

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
		searchCallBack(rows) {
			console.log(rows);
			for (let i = rows.length - 1; i >= 0; i--) {
				let row = rows[i];
				let canPush = true;
				this.ruleForm.product_str.forEach((v, i) => {
					if (v == row.id) canPush = false;
				});
				if (canPush) {
					this.ruleForm.product_str.push(row.id);
					this.product_name.push(row.name);
				} else {
					alert("不能选择重复商品");
					return false;
				}
		   }
			console.log(this.ruleForm);
		},


		submitForm(formName) {
			this.ruleForm.product_name = this.product_name;
			this.$refs[formName].validate((valid) => {
				if (valid) {
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
		ajax: function(params,industryArr,roleArr) {
			console.log(params);
			this.$nextTick(()=>{
				console.log(params);
				this.dialogFormVisible = true;
				this.roleArr = roleArr;
				this.industryArr = industryArr;
				if (params) {
					this.formAction = '/admin/ztd/edit?id=' + params.id;
					this.ruleForm = params.userInfo;
					this.ruleForm.product_str = params.product_str;
					this.ruleForm.product_name = params.product_name;
					this.ruleForm.role_id = params.role_id;
					this.ruleForm.sex = parseInt(this.ruleForm.sex);
					this.ruleForm.username = params.username;
					let deliver_type = params.deliver_type ? params.deliver_type.split(",") : [];
					this.$set(this.ruleForm,'deliver_type',deliver_type);
					if(this.ruleForm.getAddresses){
						this.$set(this.ruleForm,'getAddresses',params.getAddresses);
					}else{
						this.$set(this.ruleForm,'getAddresses',[]);
					}

					console.log(this.ruleForm);
				} else {
					this.ruleForm = { role_id: '', sort: 0, status: 0, gender: '' };
					this.formAction = '/admin/ztd/create';
					this.$set(this.ruleForm,'getAddresses',[]);
					this.$set(this.ruleForm,'deliver_type',['自提']);
				}
				 this.ruleForm.product_str = this.ruleForm.product_str ? this.ruleForm.product_str.split(",") : [];
				this.product_name = this.ruleForm.product_name ? this.ruleForm.product_name.split(",") : [];
				this.ruleForm.pic = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "user") : [];;


				this.ruleForm.remark_pic = this.ruleForm.remark_pic ? this.splitCover(this.ruleForm.remark_pic, "user") : [];;
				this.ruleForm.card_cover = this.ruleForm.card_cover ? this.splitCover(this.ruleForm.card_cover, "user") : [];;
				this.ruleForm.swiper_cover = this.ruleForm.swiper_cover ? this.splitCover(this.ruleForm.swiper_cover, "user") : [];;
				console.log(this.ruleForm);
			});


		},
		handleClose() {
			this.dialogFormVisible = false;
		}
	},
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
