<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="自提点：">
						<el-input v-model="searchFields.company_name" placeholder="请输入自提点名称"></el-input>
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
					<el-button type="success" @click="exportExcel">导出</el-button>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="自提点" min-width="150">
				<template scope="scope">{{ scope.row.company_name}}</template>
			</el-table-column>
			<el-table-column label="联系人" width="80">
				<template scope="scope">{{ scope.row.name}}</template>
			</el-table-column>
			<el-table-column label="联系电话" width="120">
				<template scope="scope">{{ scope.row.phone }}</template>
			</el-table-column>
			<el-table-column prop="order_no" label="所属订单" width="160"> </el-table-column>
			<el-table-column label="所属产品" min-width="150">
				<template scope="scope">{{ scope.row.product_name }}</template>
			</el-table-column>
            <el-table-column label="所属产品价格" min-width="150">
            	<template scope="scope">{{ scope.row.product_price }}</template>
            </el-table-column>
			<el-table-column prop="amount" label="佣金" width="100"> </el-table-column>
			<el-table-column label="状态" width="80">
				<template scope="scope">{{ scope.row.type == 0  ? '收入' :'支出' }}</template>
			</el-table-column>
			<el-table-column label="日期" width="170">
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
			formAction: '/admin/ztd/come-out-lists?type=0',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'merchant_user_income',
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
		   let url = this.urlApendOpenid("/admin/ztd/come-out-lists?type=0&excel=1", this);
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
