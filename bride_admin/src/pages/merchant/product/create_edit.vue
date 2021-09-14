<template>
	<section v-if="data.show">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:95%;min-width:600px;">
			<!-- 基础设置开始 -->
			<el-tabs v-model="activeName2" type="card">
				<el-tab-pane label="基础设置" name="first">
					<el-form-item label="商品名称" prop="name" :rules="[{ required: true, message: '商品名称不能为空'},]">
						<el-input v-model="ruleForm.name" style="width:50%"></el-input>
					</el-form-item>


					<el-form-item label="商品售价" prop="price" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
						<el-input v-model="ruleForm.price" style="width: 100px"></el-input>
					</el-form-item>
					<el-form-item label="商品标价" prop="new_price" >
						<el-input v-model="ruleForm.new_price" style="width: 100px"></el-input>
					</el-form-item>

					<el-form-item label="配送费" prop="ps_price" :rules="[{ required: true, message: '运费不能为空'},]">
						<el-input v-model="ruleForm.ps_price" style="width: 100px"></el-input>
					</el-form-item>
                    <el-form-item label="运费" prop="yunfei" :rules="[{ required: true, message: '运费不能为空'},]">
                    	<el-input v-model="ruleForm.yunfei" style="width: 100px"></el-input>
                    </el-form-item>
                    <el-form-item label="结算价" prop="merchant_price" :rules="[{ required: true, message: '运费不能为空'},]">
                    	<el-input v-model="ruleForm.merchant_price" style="width: 100px"></el-input>
                    </el-form-item>

					<el-form-item label="产品库存" prop="num" :rules="[{ required: true, message: '产品库存不能为空'},{ type: 'number', message: '必须为数字值'}]">
						<el-input v-model.number="ruleForm.num" style="width: 100px"></el-input>
					</el-form-item>
					<el-form-item label="商品排序" prop="sort" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
						<el-input v-model="ruleForm.sort" style="width: 100px"></el-input><span class="red pl5">数值越大，排名越高</span>
					</el-form-item>



					<el-form-item label="发表时间" required>
						<el-col :span="11">
							<el-form-item prop="date1">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.published_at" style="width:200px"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="是否上架" prop="putaway" :rules="[{ required: true, message: '是否上架不能为空'}, ]">
						<el-switch v-model="ruleForm.putaway" on-text="" off-text="" :active-value="1" :inactive-value="0"> </el-switch>
					</el-form-item>

					<div class="el-form-item">
						<label class="el-form-item__label" style="width:100px">缩略图</label>
						<my-upload class="proImg" upurl="product" :uploadLength="1" :fileList="ruleForm.thumb_pic" :sizearr="300"></my-upload>
					</div>
					<div class="el-form-item">
						<label class="el-form-item__label" style="width:100px">滚动图片</label>
						<my-upload class="proImg" upurl="product" :uploadLength="5" :fileList="ruleForm.cover" :sizearr="300"></my-upload>
					</div>
                    <div class="el-form-item">
                    	<label class="el-form-item__label" style="width:100px">产品介绍图片</label>
                    	<my-upload class="proImg" upurl="product" :uploadLength="5" :fileList="ruleForm.product_cover" :sizearr="300"></my-upload>
                    </div>
					<div class="el-form-item" style="padding-left: 100px">
						<div class="el-form-item__content" style="">
							<myeditor :content="ruleForm.content ? ruleForm.content : ''" ref="editor"></myeditor>
						</div>
					</div>
				</el-tab-pane>
				<!-- 分销配置结束 -->


			</el-tabs>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>
<style type="text/css">
.proImg .el-upload--picture-card{width: 120px;height: 120px;line-height: 120px;}
</style>
<script>
import myeditor from "@/components/editor.vue";


export default {
	mounted: function() {
		if (this.getOptions("id")) {
			this.formAction = '/admin/merchant/product-edit?id=' + this.getOptions("id");

		} else {
			this.formAction = '/admin/merchant/product-create';
		}
		this.ajax();
	},
	data() {
		return {
			ruleForm: {
				fclass: [],
				published_at: new Date(),
				is_share_distribution: 1,
				member_update_distribution: 0,
				can_distribution: 1,
				is_update_member: 0,
				is_distribution_ratio: 0,
                give_amount:0,
				can_coupon: true,
				is_hot: 0,
				is_new: 1,
				group_num:2,
				is_group:0,
				is_favourable: 0,
				putaway: 1,
				give_coupon: 0,
				sort: 0,
				cover: [],
				thumb_pic: [],
                product_cover:[],
				can_buy: 1,
				integral: 0
			},
			formAction: '',
			getSiteName: this.getSiteName(),
			data: this.formatData(this),
			activeName2: 'first',
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.ruleForm.content = this.$refs.editor.getContent();
					this.ruleForm.disConfig = this.data.disConfig;
					this.ruleForm.is_new = 1;
					if(this.ruleForm.group_expire_date && typeof this.ruleForm.group_expire_date == "object"){
						this.ruleForm.group_expire_date = this.dateToString(this.ruleForm.group_expire_date,"dateTime");
					}
					this.postAjax(this.formAction, this.ruleForm, msg => {
						if (msg.data.status == 2) {
							this.$router.push({ path: '/vueadmin/merchant/product-lists?status=1' });
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
		ajax: function() {
			this.getAjax(this, {}, msg => {
				if ("detail" in msg) {
					this.ruleForm = msg.detail;
					this.ruleForm.cover = this.ruleForm.cover ? this.splitCover(this.ruleForm.cover, "product") : [];
					this.ruleForm.thumb_pic = this.ruleForm.thumb_pic ? this.splitCover(this.ruleForm.thumb_pic, "product") : [];
					this.ruleForm.product_cover = this.ruleForm.product_cover ? this.splitCover(this.ruleForm.product_cover, "product") : [];
					this.ruleForm.fclass = this.ruleForm.fclassArr;
					this.ruleForm.group_expire_date = this.ruleForm.group_expire_date == "2099-12-30 00:00:00" ? '' :this.ruleForm.group_expire_date;
				}
			});
		},
	},
	components: {
		myeditor,

	}
}

</script>
