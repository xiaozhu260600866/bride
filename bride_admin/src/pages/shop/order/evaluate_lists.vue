<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="订单搜索：">
						<el-input placeholder="请输入订单编号" name="order_no" v-model="searchFields.order_no"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column prop="order_no" label="订单号" width="115"> </el-table-column>
			<el-table-column label="评价人" width="120">
				<template scope="scope">{{ scope.row.addr_name  }}</template>
			</el-table-column>
			<el-table-column label="商品" min-width="100">
				<template scope="scope">{{ scope.row.getProduct ? scope.row.getProduct.name :'已被删除' }}</template>
			</el-table-column>
			<el-table-column prop="suggestContent1" label="评价内容" min-width="130"> </el-table-column>
			<el-table-column prop="suggestContent2" label="追评内容" min-width="130"> </el-table-column>
			<el-table-column label="日期" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/order/evaluate-lists?type=0',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'orders',
			status:this.getOptions("status"),
			sels: [], //列表选中列,
			searchFields: {

			}
		}
	},
	mounted() {
		this.ajax();
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		"$route": "ajax"
	},
	methods: {
		ajax() {
			this.getAjax(this, { status: this.status }, msg => {});
		},
		exportExcel() {
			window.location.href = this.siteName + "/admin/shop/order/export?api_token=" + this.getUser().api_token;
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
			this.del_vuex(item, index, this,"admin/shop/order/evaluate-del")
		},
		searchCallBack(res) {
			this.searchFields.card_user_id = res.id;
		},
		clickStatus(tab, event) {
			this.status = tab.name;
			this.ajax();
		}
	},
	components: {

	}

}

</script>
