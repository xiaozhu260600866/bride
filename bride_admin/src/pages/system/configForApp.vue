<template>
	<el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="margin:20px 0;width:100%;min-width:600px;">
	
			<el-form-item label="AppId" prop="appid" :rules="[{ required: true, message: 'AppId不能为空'},]">
				<el-input v-model="ruleForm.appid" size="small" class="AppInputWidth" ></el-input>
			</el-form-item>
			<el-form-item label="secret" prop="secret" :rules="[{ required: true, message: 'secret不能为空'},]">
				<el-input v-model="ruleForm.secret" size="small" class="AppInputWidth" ></el-input>
			</el-form-item>
			<el-form-item label="merchant_id" prop="merchant_id" :rules="[{ required: true, message: 'merchant_id不能为空'},]">
				<el-input v-model="ruleForm.merchant_id" size="small" class="AppInputWidth"></el-input>
			</el-form-item>
			<el-form-item label="merchant_key" prop="merchant_key" :rules="[{ required: true, message: 'merchant_key不能为空'},]">
				<el-input v-model="ruleForm.merchant_key" size="small" class="AppInputWidth"></el-input>
			</el-form-item>
			<el-form-item label="购买成功通知" prop="orderstatus3" :rules="[{ required: true, message: '购买成功通知'},]">
				<el-input v-model="ruleForm.orderstatus3" size="small" class="AppInputWidth" ></el-input>
			</el-form-item>
			<el-form-item label="发货通知" prop="orderstatus5" :rules="[{ required: true, message: '发货通矢不能为空'},]">
				<el-input v-model="ruleForm.orderstatus5" size="small" class="AppInputWidth" ></el-input>
			</el-form-item>
			<el-form-item label="发货完成通知" prop="orderstatus9" :rules="[{ required: true, message: '发货通矢不能为空'},]">
				<el-input v-model="ruleForm.orderstatus9" size="small" class="AppInputWidth" ></el-input>
			</el-form-item>
			<el-form-item label="审核通知" prop="status" :rules="[{ required: true, message: '审核通知不能为空'},]">
				<el-input v-model="ruleForm.status" size="small" class="AppInputWidth" ></el-input>
			</el-form-item>
			<el-form-item label="阅读状态提醒" prop="seeCard" :rules="[{ required: true, message: '审核通知不能为空'},]">
				<el-input v-model="ruleForm.seeCard" size="small" class="AppInputWidth" ></el-input>
			</el-form-item>
			<el-form-item label="留言回复通知" prop="seeMessage" :rules="[{ required: true, message: '留言回复通知不能为空'},]">
				<el-input v-model="ruleForm.seeMessage" size="small" class="AppInputWidth" ></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
	
	</el-form>
</template>
<style type="text/css">
.AppInputWidth {
	width: 500px;
}

.AppInputWidth .el-input__inner {
	border-color: #dcdfe6 !important;
}

</style>
<script>
import myeditor from "@/components/editor.vue";
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
		auth() {
			let site_name = this.data.userInfo.site_name;
			let url = "https://boss.doxinsoft.com/callback/wechatopen/authorize?site_name=" + site_name;
			window.open(url);
			let timer = setInterval(() => {
				this.postAjax("/admin/user/check-bind-app", {}, msg => {
					if (msg.data.status == 2) {
						clearInterval(timer);
						this.ajax();
					}
				});

			}, 500);

		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//this.ruleForm.content = this.$refs.editor.getContent();
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
		myeditor
	}
}

</script>
