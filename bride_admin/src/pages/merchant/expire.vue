<template>
	<div>
		<dx-table :data="data" :globalData="globalData"  operateWidth="160px">   </dx-table>
	</div>
</template>
<script type="text/javascript">
    import globalData from "./layouts/expire.js";
	export default {
		data() {
			return {
				formAction: "/admin/merchant/expire/lists",
				data: this.formatData(this),
				siteName: this.getSiteName(),
				globalData: globalData,
				ruleForm:{}
			}
		},
		mounted() {
			this.ajax();
		},
		watch: {
			//"$route": "ajax"
		},
		methods: {

			submitBeforeCallBack(ruleform){
                ruleform.product_str = this.ruleForm.product_str;
                ruleform.product_name = this.ruleForm.product_name;
				delete ruleform.api_token;
			},
            delProduct(key) {
                this.ruleForm.product_str.splice(key, 1);
                this.ruleForm.product_name.splice(key, 1);
            },
			ajax() {
				this.getAjax(this, {}, msg => {});
			},
		},
		components: {
			"dx-table": resolve => require(["xiaozhu/vue/components/admin/dx_table.vue"], resolve),


		}
	}
</script>
