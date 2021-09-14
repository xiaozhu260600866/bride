<template>
	<el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" width="800px" :top="top" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="帐号" prop="username" :rules="[{ required: true, message: '自提点名称不能为空'},]">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" :rules="[!ruleForm.id ? { required: true, message: '密码不能为空'} : '']">
				<el-input v-model="ruleForm.password" style="margin-right: 5px" type="password" :placeholder="!ruleForm.id ? '请填写密码' : '如为空则默认旧密码' "></el-input>
			</el-form-item>
			<el-form-item label="名称" prop="company_name" :rules="[{ required: true, message: '自提点名称不能为空'},]">
				<el-input v-model="ruleForm.company_name"></el-input>
			</el-form-item >
              <el-form-item label="城市" prop="company_name" :rules="[{ required: true, message: '自提点名称不能为空'},]">
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
			<el-form-item label="联系人" prop="name" :rules="[{ required: true, message: '联系人不能为空'},]">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone" :rules="[{ required: true, message: '电话不能为空'}]">
				<el-input v-model="ruleForm.phone" style="margin-right: 5px"></el-input>
			</el-form-item>
			<el-form-item label="地址" >
				<el-input v-model="ruleForm.address" class="CinputWidth"></el-input>
				<el-button @click.prevent="chooseLocation()">重新定位</el-button>
			</el-form-item>
			<my-cropUpload v-model="ruleForm.pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'user',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="上传LOGO"></my-cropUpload>
			<el-form-item label="介绍" prop="remark">
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
			formAction: '',
			dialogFormVisible: false,
			lev:[],
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
        res(e,isCheck){
            console.log(e);
            console.log(isCheck);
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
		ajax: function(params,city) {
			this.$nextTick(()=>{
				this.dialogFormVisible = true;

                this.city = city;
				if (params) {
					this.formAction = '/admin/investor/edit?id=' + params.id;
					this.ruleForm = params;
					this.ruleForm.sex = parseInt(this.ruleForm.sex);
					this.ruleForm.username = params.getUser.username;
                    this.ruleForm.city = this.ruleForm.city ? this.ruleForm.city.split(',') :[],
                    this.ruleForm.cityKey = this.ruleForm.cityKey? this.ruleForm.cityKey.split(','):[]
				} else {
					this.formAction = '/admin/investor/create';
				}
				this.ruleForm.pic = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "user") : [];;
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
