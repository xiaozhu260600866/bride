<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="160px">
         
        </dx-table>
          <searchProduct ref="searchProduct" top="20"  @callBack="searchCallBack"></searchProduct>
	</div>
</template>
<script type="text/javascript">
	import globalData from "./layouts/ad.js";
    import searchProduct from '@/components/searchShopProduct.vue';
	export default {
		data() {
			return {
				formAction: "/admin/shop/dis/ad/lists",
				data: this.formatData(this),
				siteName: this.getSiteName(),
				globalData: globalData,
				ruleForm:{product_str:[],product_name:[]}
			}
		},
		mounted() {
			this.ajax();
		},
		watch: {
			//"$route": "ajax"
		},
		methods: {
            searchCallBack(rows) {
                this.$set(this.ruleForm,'product_str',[]);
                this.$set(this.ruleForm,'product_name',[]);
                for (let i = rows.length - 1; i >= 0; i--) {
                    let row = rows[i];
                    let canPush = true;
                    this.ruleForm.product_str.forEach((v, i) => {
                        if (v == row.id) canPush = false;
                    });
                    if (canPush) {
                        this.ruleForm.product_str.push(row.id);
                        this.ruleForm.product_name.push(row.name);
                    } else {
                        alert("不能选择重复商品");
                        return false;
                    }
               }
                console.log(this.ruleForm);
            },
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
            searchProduct

		}
	}
</script>
