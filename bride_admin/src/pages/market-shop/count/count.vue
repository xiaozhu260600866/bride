<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="data.query" class="ts-group">
				<div class="Tsec_group">
					<el-form-item label="订单日期：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at" > </el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="ajax">查询</el-button>
						<el-button type="success" @click="exportExcel">导出</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-col :span="24" v-if="data.show">
			<el-tabs v-model="data.query.searchType" type="card" @tab-click="ajax">
				<el-tab-pane :label="'今天'" :name="'today'"></el-tab-pane>
				<el-tab-pane :label="'昨天'" :name="'yesterday'"></el-tab-pane>
				<el-tab-pane :label="'今月'" :name="'thismonth'"></el-tab-pane>
				<el-tab-pane :label="'今年'" :name="'thisyear'"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.res" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column label="编号" width="90">
				<template scope="scope">
					<p>{{ scope.$index +1}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="产品名称" width="150"> </el-table-column>
			<el-table-column prop="value" label="数量" width="150"> </el-table-column>
			<el-table-column prop="created_at" label="最后统计日期" width="150"> </el-table-column>
		</el-table>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/order/count',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'orders',

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
		exportExcel() {
			let url = this.urlApendOpenid("/admin/shop/order/count?type=export", this);

			window.open(this.siteName+url);
		},
		ajax() {
			this.getAjax(this, {  }, msg => {});
		},
	},
	components: {

	}

}

</script>
