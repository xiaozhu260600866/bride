<template>
	<el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm create-box pb15">
		<el-tabs v-model="activeName2" type="card">
			<el-tab-pane label="基础设置" name="first" class="pt20 pb50">
				<el-form-item label="借桶品牌名称" prop="name" :rules="[{ required: true, message: '优惠券不能为空'},]">
					<el-input v-model="ruleForm.name" v-class="'width200'"></el-input>
				</el-form-item>
				
                <el-form-item label="类别" prop="fclass" :rules="[{ required: true, message: '类别不能为空'},]">
                        <el-select v-model="ruleForm.fclass" placeholder="请选择类别">
                        	<el-option :label="v.label" :value="v.value" v-for="v in data.fclass"></el-option>
                        </el-select>
                </el-form-item>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:100px">缩略图</label>
					<my-upload class="proImg" upurl="package" :uploadLength="1" :fileList="ruleForm.thumb_pic" :sizearr="300"></my-upload>
				</div>
			<!-- 	<div class="el-form-item">
					<label class="el-form-item__label" style="width:100px">滚动图片</label>
					<my-upload class="proImg" upurl="package" :uploadLength="5" :fileList="ruleForm.cover" :sizearr="300"></my-upload>
				</div> -->
				<el-form-item label="借桶品牌商品">
					<el-button type="primary" @click="$refs.searchProduct.ajax()">请选择借桶品牌商品</el-button>
				</el-form-item>
				<div style="padding: 0 0 20px 100px">
					<el-table ref="multipleTable" :data="ruleForm.product_str" border tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="name" label="借桶品牌商品" min-width="250"> </el-table-column>
					<!-- 	<el-table-column label="次数" min-width="80">
							<template scope="scope">
								<el-input-number v-model="scope.row.num" :min="1" :max="900" label="次数"></el-input-number>
							</template>
						</el-table-column> -->
						<el-table-column label="操作" >
							<template scope="scope">
								<el-button type="primary" @click="ruleForm.product_str.splice(scope.$index,1)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="el-form-item" style="padding-left: 100px">
					<div class="el-form-item__content" style="">
						<myeditor :content="ruleForm.content ? ruleForm.content : ''" ref="editor"></myeditor>
					</div>
				</div>

				<searchProduct ref="searchProduct" type="0" top="20" @callBack="searchCallBack"></searchProduct>
			</el-tab-pane>
			<!-- <el-tab-pane label="利润&分销配置" name="second">
				<disConfig :ruleForm="ruleForm" :disConfig="data.disConfig"></disConfig>
			</el-tab-pane> -->
       <el-tab-pane label="城市设置" name="four">
           <el-form-item label="所在街道" prop="city" v-if="data.citys.length">
               <el-tree :data="data.citys" show-checkbox  node-key="id" ref="tree"
                   highlight-current :props="ruleForm.city" @check-change="res" :default-checked-keys="ruleForm.cityKey">
               </el-tree>
           </el-form-item>
           <el-button @click="upgradeCity">一键点击更新城市</el-button>
       </el-tab-pane>

		</el-tabs>
		<el-form-item class="create-fixed">
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>

</template>
<script>
	import searchProduct from 'xiaozhu/vue/components/admin/searchShopProduct.vue';
	import myeditor from "@/components/editor.vue";
	import disConfig from './layouts/dis_config.vue'
export default {
	mounted: function() {
		if (this.getOptions("id")) {

			this.formAction = '/admin/shop/package/edit?id=' + this.getOptions("id");

		} else {
			this.formAction = '/admin/shop/package/create';
		}

		  this.ajax();
	},
	data() {
		return {
			ruleForm: { city:[],is_distribution_ratio:0,type: 0, product_str: [],thumb_pic:[], product_name: [], expire_date: 0, full_amount: 0, amount: '', is_index: false,cover:[] },
			formAction: '',
			activeName2:'first',
			data: this.formatData(this)
		};
	},
	components: {
		searchProduct,
		myeditor,
		disConfig
	},
	methods: {
        res(e,isCheck){
            console.log(e);
            console.log(isCheck);
        },
        upgradeCity() {
            if(sessionStorage.getItem("citys")){
                  this.data.citys = JSON.parse(sessionStorage.getItem("citys"));
            }else{
                this.postAjax("/admin/user/updateCity").then(msg => {
                    this.data.citys = msg.data.citys;
                    sessionStorage.setItem("citys",JSON.stringify(this.data.citys));
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
					this.ruleForm.type =1;
					this.ruleForm.content = this.$refs.editor.getContent();
					this.ruleForm.disConfig = this.data.disConfig;
					this.postAjax(this.formAction, this.ruleForm, msg => {
						if (msg.data.status == 2) {
							this.$router.go(-1);
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},

		searchCallBack(rows) {

			for (let i = rows.length - 1; i >= 0; i--) {
				let row = rows[i];
				let canPush = true;
				this.ruleForm.product_str.forEach((v, i) => {
					if (v == row.id) canPush = false;
				});
				if (canPush) {
					this.ruleForm.product_str.push({product_id:row.id,name:row.name,num:1});
					this.ruleForm.product_name.push(row.name);
				} else {
					alert("不能选择重复商品");
					return false;
				}
		   }
			console.log(this.ruleForm);
		},
		delProduct(key) {
			this.ruleForm.product_str.splice(key, 1);
			this.ruleForm.product_name.splice(key, 1);
		},
		ajax: function() {
			this.getAjax(this, {}, msg => {
				if (this.getOptions("id")) {
					this.ruleForm = msg.detail;
					if(this.ruleForm.product_name){
						 this.ruleForm.product_name = this.ruleForm.product_name.split(",");
						 this.ruleForm.product_str = this.ruleForm.getProduct;
					}
                    this.ruleForm.city = this.ruleForm.city ? this.ruleForm.city.split(',') :[],
                    this.ruleForm.cityKey = this.ruleForm.cityKey? this.ruleForm.cityKey.split(','):[]
					this.ruleForm.cover = this.ruleForm.cover ? this.splitCover(this.ruleForm.cover, "package") : [];
					this.ruleForm.thumb_pic = this.ruleForm.thumb_pic ? this.splitCover(this.ruleForm.thumb_pic, "package") : [];
				 }

			});
		},
	},
}

</script>
<style type="text/css" scoped="">
	.el-table__row:hover {
		cursor: pointer;
	}
</style>
