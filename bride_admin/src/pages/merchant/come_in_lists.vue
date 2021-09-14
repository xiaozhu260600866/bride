<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="商家名称：">
						<el-input v-model="searchFields.company_name" placeholder="请输入商家名称"></el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input v-model="searchFields.name" placeholder="请输入联系人姓名"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input v-model="searchFields.phone" placeholder="请输入联系人电话"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="searchFields.searchDate"> </el-date-picker>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
				</div>
			</el-form>
		</div>

		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" min-width="50"> </el-table-column>
		<!-- 	<el-table-column label="呢称名称" min-width="200">
					<template scope="scope">{{ scope.row.getUser ? scope.row.getUser.nickname :'会员已被删除' }}</template>
			</el-table-column> -->
			<el-table-column label="商家名称/联系人" min-width="200">
					<template scope="scope">{{ scope.row.getUser ? scope.row.getUser.userInfo.company_name+'->'+scope.row.getUser.userInfo.name :'会员已被删除' }} {{scope.row.getUser? scope.row.getUser.userInfo.phone : '会员已被删除'}}</template>
			</el-table-column>
			<el-table-column label="来源" min-width="200">
					<template scope="scope">{{ scope.row.source }}</template>
			</el-table-column>

			<el-table-column prop="order_no" label="关联订单号" min-width="100"> </el-table-column>
			<el-table-column prop="amount" label="金额" min-width="100"> </el-table-column>
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
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[16]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>

	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/merchant/come-out-lists?type=0',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'merchant_user_incomes',
			status: 0,
			sels: [], //列表选中列,
			searchFields: {
				searchDate: '',
				name: '',
				dis_id: ''
			}
		}
	},
	mounted() {
		this.status = this.getOptions('status');
		this.ajax();
	},
	methods: {
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


	},
	components: {

	}

}

</script>
