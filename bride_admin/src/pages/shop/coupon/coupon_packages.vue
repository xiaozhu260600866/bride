<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="160px">
            <div slot="append_form_type" slot-scope="scope">
                 <el-radio class="radio" v-model="scope.row.type" :label="0">满多少元才能够使用优惠券</el-radio>
                 <el-radio class="radio" v-model="scope.row.type" :label="1">是指写商品才能使用优惠券</el-radio>
                 <el-form-item label="满多少元"  v-if="scope.row.type == 0">
                     <el-input v-model="scope.row.full_amount" v-class="'width100'"></el-input>
                 </el-form-item>
                 <el-form-item label="请选择指定商品" v-if="scope.row.type == 1">
                     <el-button type="primary" @click="this.ruleForm = scope.row;$refs.searchProduct.ajax()">请选择指定商品</el-button>
                     <el-form-item label="已选择商品"   v-if="scope.row.type == 1 && ruleForm.product_str&& ruleForm.product_str.length >= 1">
                         <el-tag type="gray" :closable="true" v-for="(v,key) in ruleForm.product_name" @close="delProduct(key)">{{ v}}</el-tag>
                     </el-form-item>
                     <el-form-item label="已选择商品"   v-if="scope.row.type == 1 && scope.row.product_str&& scope.row.product_str.length >= 1 && ruleForm.product_str.length == 0">
                         <el-tag type="gray"  v-for="(v,key) in scope.row.product_name.split(',')" >{{ v}}</el-tag>
                     </el-form-item>
					 
                 </el-form-item>
            </div>
        </dx-table>
          <searchProduct ref="searchProduct" top="20"  @callBack="searchCallBack"></searchProduct>
	</div>
</template>
<script type="text/javascript">
	import globalData from "./layouts/couponPackage.js";
    import searchProduct from '@/components/searchShopProduct.vue';
	export default {
		data() {
			return {
				formAction: "/admin/shop/coupon/couponPackage/lists",
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
