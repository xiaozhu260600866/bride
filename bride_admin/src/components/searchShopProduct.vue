<!--
使用：
1.components: {
		'my-searchProduct':()=>import('xiaozhu/vue/components/admin/searchProduct.vue')
	}
2.   <my-searchProduct  ref="searchProduct" />
3.调用：
this.$refs.searchProduct.ajax(); //函数内为调用的URL
 -->
<template>
	<section>
		<el-dialog :title="'选择产品' " :visible.sync="dialogVisible" :top="top" width="1000px" :before-close="handleClose" append-to-body class="searchDiag">
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" id="search">
					<el-col :span="18">
					<el-form-item>
						<input autocomplete="off" :placeholder="'请输入产品名称'" v-model="name" type="text" name="name" rows="2" validateevent="true" class="el-input__inner" @keyup="toSearch">
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
					</el-form-item>
					</el-col>
					<el-form-item>
						<el-button type="primary" @click="handleClose">选中关闭</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<div style="padding-top: 60px;padding-bottom: 20px;">
				<div class="pb15">
					<el-tabs v-model="type" type="card" @tab-click="clickStatus">
						<el-tab-pane label="普通商品" :name="''+0"></el-tab-pane>
						<el-tab-pane label="折扣商品" :name="''+1"></el-tab-pane>
					</el-tabs>
				</div>

				<div class="flex">
					<el-col :span="4">
						<div class="search-product-title" @click="fclass=0;classVal=0;ajax()">全部分类</div>
						<el-tree :data="fclassArr" @node-click="handleNodeClick"></el-tree>
					</el-col>
					<el-col :span="20">
						<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" v-loading="data.listLoading" style="width:100%" @selection-change="selsChange">
							<el-table-column type="selection" min-width="30"> </el-table-column>
							<el-table-column prop="name" label="产品名称" min-width="60"> </el-table-column>
							<el-table-column prop="fclassname" label="分类名称" width="120"> </el-table-column>
							<el-table-column prop="merchantUser" label="上传者" width="100"> </el-table-column>
							<el-table-column prop="price" label="价格" width="100"> </el-table-column>
						</el-table>
					</el-col>
				</div>
			</div>

			<div class="toolbar Bfooter" v-if="data.lists">
				<el-pagination @current-change="handleCurrentChange" :current-page="data.current_page" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
				</el-pagination>
			</div>
		</el-dialog>
	</section>
</template>
<style type="text/css">
.searchDiag #search{position: absolute;top: 55px;left: 0;width: 100%;padding: 20px 20px 0;background-color: #fff;z-index: 99;right: 16px;}
.searchDiag .el-dialog{height: calc(100% - 80px)!important;top: 10px;}
.searchDiag .el-dialog__body{height: calc(100% - 100px);overflow-y: scroll;}
.searchDiag .Bfooter{position: absolute;bottom: 0;left: 0;width: 100%;padding: 20px 40px;background-color: #fff;}
</style>
<script type="text/javascript">
export default {
	props: ['top','type'],
	data() {
		return {
			dialogVisible: false,
			data: this.formatData(this),
			formAction: '/admin/shop/product/lists',
			page: 1,
			name: '',
			fclassArr: [],
			fclass: 0,
			classVal: 0,
			user:this.getUser(),
			sels: [],
			product_str:"",
		}
	},
	methods: {
		clickStatus(){
			this.ajax(this.product_str);
		},
		ajax(product_str) {
			this.type = this.type || "1";
			this.dialogVisible = true;
			this.product_str = product_str;
			this.getAjax(this, { fclass: this.fclass, class: this.classVal, name: this.name, page: this.page,type:this.type }, msg => {
				$(".el-dialog").css({
					height: '100%',
				});
				this.fclassArr = msg.fclass;
				if (product_str) {

					this.$nextTick(() => {
						if(typeof product_str=='string'){
							product_str = product_str.split(",");
						}

						msg.lists.forEach(v => {
							if (this.in_array(v.id, product_str)) {
								this.sels.push(v);
								this.$refs.multipleTable.toggleRowSelection(v, checked);
							};
						});
					});
					let checked = true;
				}
			});
		},
		selsChange(sels) {
			console.log(this.$refs.multipleTable);
			this.sels = sels;
		},
		handleClose() {
			this.dialogVisible = false;
			this.$emit('callBack', this.sels, this.data.warehouse);
		},
		handleCurrentChange(val) {
			this.page = val;
			this.ajax(this.product_str);
		},
		toSearch() {
			this.ajax(this.product_str);
		},
		handleNodeClick(data, e, b) {
			if (e.childNodes.length == 0) {
				if (e.level == 1) {
					this.fclass = data.value;
				} else {
					this.fclass = data.value;
				}
				this.ajax();
			}

		},
	}
}

</script>
