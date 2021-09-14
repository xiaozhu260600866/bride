<template>
	<el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" width="800px" :top="top" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商家帐号" prop="username" :rules="[{ required: true, message: '商家名称不能为空'},]">
            	<el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="[!ruleForm.id ? { required: true, message: '密码不能为空'} : '']">
            	<el-input v-model="ruleForm.password" style="margin-right: 5px" type="password" :placeholder="!ruleForm.id ? '请填写密码' : '如为空则默认旧密码' "></el-input>
            </el-form-item>

			<el-form-item label="商家名称" prop="company_name" :rules="[{ required: true, message: '商家名称不能为空'},]">
				<el-input v-model="ruleForm.company_name"></el-input>
			</el-form-item>
			<el-form-item label="联系人" prop="name" :rules="[{ required: true, message: '联系人不能为空'},]">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone" :rules="[{ required: true, message: '电话不能为空'}]">
				<el-input v-model="ruleForm.phone" style="margin-right: 5px"></el-input>
			</el-form-item>
			<el-form-item label="固话" prop="tel" >
				<el-input v-model="ruleForm.tel" style="margin-right: 5px"></el-input>
			</el-form-item>
			<el-form-item label="营业时间" prop="start_hour">
				<el-input v-model="ruleForm.start_hour" style="margin-right: 5px"></el-input>~
				<el-input v-model="ruleForm.end_hour" style="margin-right: 5px"></el-input>
			</el-form-item>
			<el-form-item label="行业"  :rules="[{ required: true, message: '行业不能为空'}]">

                  <el-cascader placeholder="请输入行业" expand-trigger="hover" :options="industryArr" v-model="ruleForm.industry"></el-cascader>
			</el-form-item>
			<div class="group-item flex">
					<el-form-item label="所在街道" >
						<el-input v-model="ruleForm.area" style="margin-right: 5px"></el-input>
					</el-form-item>
			</div>

          <!--   <el-form-item label="请选择指定商品">
                <el-button type="primary" @click="$refs.searchProduct.ajax()">请选择指定商品</el-button>
                <el-tag v-for="(v,key) in product_name" closable v-if="product_name.length" @close="delProduct(key)">{{v}}</el-tag>
            </el-form-item> -->
			<el-form-item label="公司地址" prop="address">
				<el-input v-model="ruleForm.address" class="CinputWidth"></el-input>
				<el-button @click.prevent="chooseLocation()">重新定位</el-button>
			</el-form-item>
			<my-cropUpload v-model="ruleForm.card_cover" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'user',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="上传营业执照"></my-cropUpload>
			<my-cropUpload v-model="ruleForm.pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'user',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="商家门面"></my-cropUpload>
			<my-cropUpload v-model="ruleForm.swiper_cover" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'user',allowUploadNum:5,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="滚动图片"></my-cropUpload>
			<my-cropUpload v-model="ruleForm.remark_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'user',allowUploadNum:5,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="介绍图片"></my-cropUpload>
			<my-cropUpload v-model="ruleForm.address_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'user',allowUploadNum:5,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="商家实景"></my-cropUpload>
			<el-form-item label="商家介绍" prop="remark">
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
 import searchProduct from '@/components/searchShopProduct.vue';
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
			industryArr:[],
            product_name:[],
			    city:[],
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
		   this.ruleForm.getAddresses.push({address:'',location_x:'',location_y:''});
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
		
			if(this.$refs.tree){
			    this.ruleForm.city = this.$refs.tree.getCheckedNodes();
			    this.ruleForm.cityKey = this.$refs.tree.getCheckedKeys();
			}
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
		ajax: function(params,industryArr) {
            console.log(params);
			this.$nextTick(()=>{
				console.log(params);
				this.dialogFormVisible = true;
				this.industryArr = industryArr;
				if (params) {
                    console.log("|");
                    console.log(params.getAddresses);
					this.formAction = '/admin/merchant/edit?id=' + params.id;
					this.ruleForm = params.userInfo;
                    this.ruleForm.product_str = params.product_str;
                    this.ruleForm.product_name = params.product_name;
					this.ruleForm.sex = parseInt(this.ruleForm.sex);
					this.ruleForm.username = params.username;
                    this.$set(this.ruleForm,'getAddresses',params.getAddresses);
                    console.log(this.ruleForm);
				} else {
					this.ruleForm = { role_id: '', sort: 0, status: 0, gender: '' };
					this.formAction = '/admin/merchant/create';
                    this.$set(this.ruleForm,'getAddresses',[]);
				}
                 this.ruleForm.product_str = this.ruleForm.product_str ? this.ruleForm.product_str.split(",") : [];
                this.product_name = this.ruleForm.product_name ? this.ruleForm.product_name.split(",") : [];
				this.ruleForm.pic = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "user") : [];;
				this.ruleForm.industry = this.ruleForm.industry ?  this.ruleForm.industry.split(","): [];;

				this.ruleForm.city = this.ruleForm.city ? this.ruleForm.city.split(',') :[],
				this.ruleForm.cityKey = this.ruleForm.cityKey? this.ruleForm.cityKey.split(','):[]
				this.ruleForm.remark_pic = this.ruleForm.remark_pic ? this.splitCover(this.ruleForm.remark_pic, "user") : [];;
				this.ruleForm.card_cover = this.ruleForm.card_cover ? this.splitCover(this.ruleForm.card_cover, "user") : [];;
				this.ruleForm.swiper_cover = this.ruleForm.swiper_cover ? this.splitCover(this.ruleForm.swiper_cover, "user") : [];;
				this.ruleForm.address_pic = this.ruleForm.address_pic ? this.splitCover(this.ruleForm.address_pic, "user") : [];;
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
