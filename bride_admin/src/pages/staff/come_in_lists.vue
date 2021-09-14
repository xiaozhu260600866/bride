<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="订单号：">
						<el-input v-model="searchFields.order_no" placeholder="请填写姓名"></el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input v-model="searchFields.name" placeholder="请填写姓名"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input v-model="searchFields.phone" placeholder="请填写电话"></el-input>
					</el-form-item>
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="searchFields.searchDate"> </el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
                        <el-button type="primary" @click="exportExcel">导出</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<div>总收益：{{data.orderSumIn}}   提现:{{data.orderSumOut}} 余额：{{data.orderSumIn - data.orderSumOut}}</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="呢称名称" min-width="200">
					<template scope="scope">{{ scope.row.getUser ? scope.row.getUser.nickname :'会员已被删除' }}</template>
			</el-table-column>
			<el-table-column label="姓名" width="120">
					<template scope="scope">{{ scope.row.getUser ? scope.row.getUser.userInfo.name :'会员已被删除' }}</template>
			</el-table-column>
			<el-table-column label="状态" width="100">
					<template scope="scope">{{ scope.row.type == 0  ? '收入' :'支出' }}</template>
			</el-table-column>

			<el-table-column label="电话" width="120">
					<template scope="scope">{{ scope.row.phone }}</template>
			</el-table-column>
			<el-table-column prop="order_no" label="订单号" width="180"> </el-table-column>
			<el-table-column prop="amount" label="金额" width="120"> </el-table-column>

			<el-table-column label="日期" width="200">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[60]" :page-size="60" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/user/come-out-lists?user_role=7&type=0',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'amount_incomes',
			status: 1,
			sels: [], //列表选中列,
			searchFields: {
				searchDate: '',
				name: '',
				dis_id: ''
			}
		}
	},
	mounted() {
		this.status = 1;
		this.ajax();
	},
	methods: {
        exportExcel() {
        	let url = this.urlApendOpenid("/admin/user/come-out-lists?user_role=7&type=0&export=1", this);
        	window.open(this.siteName+url);
        },
		ajax() {
			this.getAjax(this, { status: this.status }, msg => {});
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
			this.searchFields.dis_id = res.id;
		},
		changeStatus(index, item, status) {
			this.$refs.status.ajax({ id: item.id, status: status });
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
