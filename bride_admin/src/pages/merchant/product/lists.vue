<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" id="search" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="产品名称：">
						<el-input placeholder="请输入产品名称" name="name" v-model="data.query.name"></el-input>
					</el-form-item>
					<el-form-item label="产品名称：">
						<el-input placeholder="请输入产品名称" name="merchant_name" v-model="data.query.merchant_name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="ajax()">查询</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-col :span="24">
			<el-tabs v-model="data.query.status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="审核中" :name="''+0"></el-tab-pane>
				<el-tab-pane label="审核通过" :name="''+1"></el-tab-pane>
				<el-tab-pane label="审核拒绝" :name="''+2"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
			@selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="name" label="产品名称" min-width="200"> </el-table-column>
			<el-table-column label="商家" width="170">
				<template scope="scope">{{ scope.row.merchant ? scope.row.merchant.company_name : '' }}</template>
			</el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column align="center" label="上架" width="78">
				<template scope="scope">
					<el-switch v-model="scope.row.putaway " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'putaway')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="售价" width="100"> </el-table-column>
			<el-table-column prop="new_price" label="原价" width="100"> </el-table-column>
			<el-table-column prop="merchant_price" label="结算价" width="100"> </el-table-column>
			<el-table-column prop="num" label="库存" width="100"> </el-table-column>
			<el-table-column label="操作" width="360">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path:'/vueadmin/merchant/product-edit?id='+scope.row.id})"
						v-if="data.auth.canEdit">编辑</el-button>
					<!-- <el-button size="small" @click="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=1">审核通过</el-button>
					<el-button type="primary" size="small" @click="changeStatus(scope.$index, scope.row,'2')" type="warning" v-if="scope.row.status!=2">审核拒绝</el-button> -->
					<el-button type="primary" size="small" @click="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=1">审核通过</el-button>
					<el-button type="danger" size="small" @click="changeStatus(scope.$index, scope.row,'2')"v-if="scope.row.status!=2">审核拒绝</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
				:page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
				style='float: right'>
			</el-pagination>
		</el-col>
		  <my-status ref="status" style="width:100%" formAction="admin/merchant/product-change-status" />
	</section>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				formAction: '/admin/merchant/product-lists',
				data: this.formatData(this),
				siteName: this.getSiteName(),
				tableName: 'shop_products',
				sels: [], //列表选中列,
				searchFields: {
					name: '',
				}
			}
		},
		mounted() {
			this.ajax();
		},
		methods: {
			editField(row, field) {
				this.postAjax("/admin/shop/product/editField", {
					product_id: row.id,
					field: field,
					value: row[field]
				}, msg => {
					if (msg.data.status == 3) {
						row[field] = 0;
					}
				});
			},
			clickStatus(tab, event) {
				this.data.query.status = tab.name;
				this.ajax();
			},
			ajax() {
				this.getAjax(this, {}, msg => {});
			},
			selsChange: function(sels) {
				this.sels = sels;
			},
			toSearch() {
				this.searchField(this);
			},
			handleSizeChange(val) {
				this.data.nextPage = val;
				this.ajax();
			},
			handleCurrentChange(val) {
				this.data.nextPage = val;
				this.ajax();
			},
			handleDel(index, item) {
				this.del_vuex(item, index, this)
			},
			delAll() { /*批量删除*/
				this.deleteAll(this);
			},
			searchCallBack(res) {
				this.searchFields.user_id = res.id;
			},
			changeStatus(index, item, status) {
				this.$refs.status.ajax({ id: item.id, status: status });
			},
		},
		components: {
			   'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
		}

	}
</script>
