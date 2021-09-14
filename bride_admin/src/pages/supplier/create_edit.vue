<template>
	<el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" width="800px" :top="top" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<!-- 	<el-form-item label="供应商帐号" prop="username" :rules="[{ required: true, message: '供应商名称不能为空'},]">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item> -->
			<el-form-item label="密码" prop="password" :rules="[!ruleForm.id ? { required: true, message: '密码不能为空'} : '']">
				<el-input v-model="ruleForm.password" style="margin-right: 5px" type="password" :placeholder="!ruleForm.id ? '请填写密码' : '如为空则默认旧密码' "></el-input>
			</el-form-item>

			<el-form-item label="供应商名称" prop="company_name" :rules="[{ required: true, message: '供应商名称不能为空'},]">
				<el-input v-model="ruleForm.company_name"></el-input>
			</el-form-item>
			<el-form-item label="联系人" prop="name" :rules="[{ required: true, message: '联系人不能为空'},]">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="供应商帐号" prop="phone" :rules="[{ required: true, message: '电话不能为空'}]">
				<el-input v-model="ruleForm.phone" style="margin-right: 5px"></el-input>
			</el-form-item>
			<!-- <el-form-item label="固话" prop="tel" >
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
			</el-form-item> -->
			<el-form-item label="角色"  :rules="[{ required: true, message: '角色不能为空'}]">
				<el-select v-model="ruleForm.role_id" placeholder="请选择角色">
					<el-option :label="v.name" :value="v.id" v-for="v in roleArr"></el-option>
				</el-select>
			</el-form-item>
            <el-form-item label="类别"  :rules="[{ required: true, message: '类别不能为空'}]">
            	<el-select v-model="ruleForm.fclass" placeholder="请选择类别">
            		<el-option :label="v.name" :value="v.id" v-for="v in productClass"></el-option>
            	</el-select>
            </el-form-item>
			<div class="group-item flex">
			<el-form-item label="城市" >
			  <el-tree
			    :data="city"
			    show-checkbox
			    node-key="id"
			    ref="tree"
			    highlight-current
			    :props="ruleForm.city"  :default-checked-keys="ruleForm.cityKey" v-if="city.length">
			        </el-tree>
			     <el-button @click="upgradeCity" v-else>一键点击更新城市</el-button>
			</el-form-item>
			</div>

			<!-- <el-form-item label="公司地址"  v-for='(v,key)  in ruleForm.getAddresses'>
				<el-input v-model="v.address" class="CinputWidth"></el-input>
				<el-button @click.prevent="chooseLocation(key)">重新定位</el-button>
				<el-button @click.prevent="delAddress(key)">删除地址</el-button>
			</el-form-item>
			<div class='flex'><el-button @click.prevent="addAddress">增加地址</el-button></div>
			<my-cropUpload v-model="ruleForm.pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'user',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="上传LOGO"></my-cropUpload> -->
			<el-form-item label="供应商介绍" prop="remark">
				<el-input v-model="ruleForm.remark" style="margin-right: 5px" type="textarea"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>

	</el-dialog>

</template>
<script>

import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";
	export default {
	props: ['top'],
	components: {
		chooseLocation

	},
	data() {
		return {
			ruleForm: {},
			formAction: '',
			 city:[],
			dialogFormVisible: false,
			industryArr:[],
			product_name:[],
			roleArr:[],
            productClass:[]
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
				}
			});
		},

		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		ajax: function(params,industryArr,roleArr,productClass) {
			console.log(params);
			this.$nextTick(()=>{
				console.log(params);
				this.dialogFormVisible = true;
				this.industryArr = industryArr;
				this.roleArr = roleArr;
                this.productClass = productClass;
				if (params) {
					this.formAction = '/admin/supplier/edit?id=' + params.id;
					this.ruleForm = params.userInfo;
					this.ruleForm.product_str = params.product_str;
                    this.ruleForm.fclass = params.fclass;
					this.ruleForm.product_name = params.product_name;
					this.ruleForm.sex = parseInt(this.ruleForm.sex);
					this.ruleForm.username = params.username;
					this.ruleForm.role_id = params.role_id;
					 this.$set(this.ruleForm,'role_id', params.role_id);
					//this.$set(this.ruleForm,'getAddresses',params.getAddresses);
					console.log(this.ruleForm);
				} else {
					this.ruleForm = { role_id: '', sort: 0, status: 0, gender: '' };
					this.formAction = '/admin/supplier/create';
					this.$set(this.ruleForm,'getAddresses',[]);
				}
				 this.ruleForm.product_str = this.ruleForm.product_str ? this.ruleForm.product_str.split(",") : [];
				this.product_name = this.ruleForm.product_name ? this.ruleForm.product_name.split(",") : [];
				this.ruleForm.pic = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "user") : [];;


				this.ruleForm.remark_pic = this.ruleForm.remark_pic ? this.splitCover(this.ruleForm.remark_pic, "user") : [];;
				this.ruleForm.card_cover = this.ruleForm.card_cover ? this.splitCover(this.ruleForm.card_cover, "user") : [];;
				this.ruleForm.swiper_cover = this.ruleForm.swiper_cover ? this.splitCover(this.ruleForm.swiper_cover, "user") : [];;
				this.ruleForm.city = this.ruleForm.city ? this.ruleForm.city.split(',') :[],
				this.ruleForm.cityKey = this.ruleForm.cityKey? this.ruleForm.cityKey.split(','):[]
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
