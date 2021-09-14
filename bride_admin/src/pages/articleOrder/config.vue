<template>
	<el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm pb50">
		<el-tabs v-model="activeName2" type="card">
			<!-- 网站配置开始 -->
			<el-tab-pane label="贴子配置" name="first">
				<div class="pt20">
					<el-form-item label="贴子费用" prop="articleOrderPrice" :rules="[{ required: true, message: '不能为空'},]">
						<el-input v-model="ruleForm.articleOrderPrice" class="CinputWidth"></el-input>
					</el-form-item>
					<el-form-item label="贴子一元兑换多少" prop="articleOrderPrice" :rules="[{ required: true, message: '不能为空'},]">
						<el-input v-model="ruleForm.articleOrderIntegral" class="CinputWidth"></el-input>
						<span>积分</span>
					</el-form-item>
					<el-form-item label="一级分销" prop="dis_articleOrder_percent_first" :rules="[{ required: true, message: '不能为空'},]">
						<el-input v-model="ruleForm.dis_articleOrder_percent_first" class="CinputWidth"></el-input>
						<span>%</span>
					</el-form-item>
					<el-form-item label="二级分销" prop="dis_articleOrder_percent_second" :rules="[{ required: true, message: '不能为空'},]">
						<el-input v-model="ruleForm.dis_articleOrder_percent_second" class="CinputWidth"></el-input>
						<span>%</span>
					</el-form-item>
					
					<el-form-item label="区域代理分销" prop="manager_articleOrder_percent" :rules="[{ required: true, message: '不能为空'},]">
						<el-input v-model="ruleForm.manager_articleOrder_percent" class="CinputWidth"></el-input>
						<span>%</span>
					</el-form-item>
					<el-form-item label="投资方分销" prop="investor_articleOrder_percent" :rules="[{ required: true, message: '不能为空'},]">
						<el-input v-model="ruleForm.investor_articleOrder_percent" class="CinputWidth"></el-input>
						<span>%</span>
					</el-form-item>
					<el-form-item label="平台分销" prop="platform_articleOrder_percent" :rules="[{ required: true, message: '不能为空'},]">
						<el-input v-model="ruleForm.platform_articleOrder_percent" class="CinputWidth"></el-input>
						<span>%</span>
					</el-form-item>
				</div>

			</el-tab-pane>

		</el-tabs>

		<el-form-item class="create-fixed">
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
	</el-form>
</template>
<style type="text/css">

.CinputWidth{width: 500px;}
.CinputWidth .el-input__inner{border-color: #dcdfe6!important;}

.OinputWidth{width: 100px;}
.OinputWidth .el-input__inner{border-color: #dcdfe6!important;}
</style>
<script>
import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
import myeditor from "@/components/editor.vue";
import myCategory2 from "@/components/category.vue"
export default {
	mounted: function() {
		this.ajax();
	},
	data() {
		return {
			ruleForm: { order_deadline: 0, order_autook: 0, is_make_menu: false, is_siginin: false },
			formAction: '/admin/system/config',
			activeName2: 'first',
			dialogVisible: false,
			getSiteName: this.getSiteName(),
			data: this.formatData(this)
		};
	},
	methods: {
		chooseLocation() {
			this.$refs.chooseLocation.ajax();
		},
		locationCallBack(res) {
			if (res.latlng) {
				this.$refs.chooseLocation.handleClose();
				this.ruleForm.address = res.poiaddress;
				this.ruleForm.location_x = res.latlng.lng;
				this.ruleForm.location_y = res.latlng.lat;
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//this.ruleForm.content = this.$refs.editor.getContent();
					//this.ruleForm.mask_content = this.$refs.editor.getContent();
					this.postAjax(this.formAction, this.ruleForm, function(msg) {})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		toBing() {
			this.dialogVisible = true;
			this.$refs.qrcode.getQrcode();
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		ajax: function() {
			this.getAjax(this, {}, msg => {
				if ("detail" in msg) {
					this.ruleForm = msg.detail;
					this.ruleForm.web_logo = this.ruleForm.web_logo ? this.splitCover(this.ruleForm.web_logo, "product") : [];
					this.ruleForm.wechat_logo = this.ruleForm.wechat_logo ? this.splitCover(this.ruleForm.wechat_logo, "product") : [];
				}
			});

		},
	},
	components: {
		myeditor,
		chooseLocation,
		myCategory2
	}
}

</script>
