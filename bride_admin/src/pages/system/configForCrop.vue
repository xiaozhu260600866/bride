<template>
	<el-form :model="ruleForm" ref="ruleForm" label-width="160px" class="demo-ruleForm" style="margin:20px 0;width:100%;min-width:600px;">
			<el-button type="primary" @click="data.cropType2 ==0 ? auth(2) :'' ">{{ data.cropType2 == 1 ? '已':'' }}授权绑定通讯录</el-button>
			<el-button type="primary" @click="data.cropType0 ==0 ? auth(0) :'' ">{{ data.cropType0 == 1 ? '已':'' }}授权绑定AI助理</el-button>
			<el-button type="primary" @click="data.cropType1 == 0 ? auth(1) :'' ">{{ data.cropType1 == 1 ? '已':'' }}授权绑定Boss雷达</el-button>
	</el-form>
</template>
<style type="text/css">
.CropInputWidth{width: 500px;}
.CropInputWidth .el-input__inner{border-color: #dcdfe6!important;}
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
		auth(type){
			 let site_name = this.data.userInfo.site_name;
			  let url = "https://boss.doxinsoft.com/callback/workopen/authorize?site_name="+site_name+"&type="+type;
			  window.open(url);
			  let timer = setInterval(()=>{
			  	this.postAjax("/admin/user/check-bind-crop",{type:type},msg=>{
			  		if(msg.data.status == 2){
			  			clearInterval(timer);
			  			this.ajax();
			  		}
			  	});
		  	},500);
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
