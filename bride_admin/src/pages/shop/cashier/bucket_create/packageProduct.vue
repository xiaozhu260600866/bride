<template>
	<section>
		<el-dialog title="选择套餐次数" :visible.sync="dialogVisible" :top="top" :before-close="handleClose" width="60%" class="pay_confirm">
			<el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm validform_ajax pay-list">
				<template>
					<el-table :data="info.getProduct" style="width: 100%">
						<el-table-column label="名称" >
							<template scope="scope">{{ scope.row.getProduct.name }}</template>
						</el-table-column>
						<el-table-column label="次数">
							<template scope="scope">
								<el-input v-model="scope.row.num"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<el-form-item style="width:100%;text-align: center;padding-top: 10px;">
					<el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
					<el-button @click="handleClose">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>
<script type="text/javascript">
	export default {
		props: ['top', 'amount', 'clientInfo', 'category'],
		data() {
			return {
				dialogVisible: false,
				ruleForm: {},
				info: {}
			}
		},
		methods: {
			handleClose() {
				this.dialogVisible = false;
			},
			ajax(info) {
				this.info = info;
				console.log(info);
				this.dialogVisible = true;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.dialogVisible = false;
						this.$emit("callBack", this.info);
					} else {
						return false;
					}
				});
			},
		}
	}
</script>
<style type="text/css" scoped="">
	.act-title {
		text-align: center;
		margin-bottom: 10px;
		font-size: 16pc;
		color: #333;
	}
</style>
