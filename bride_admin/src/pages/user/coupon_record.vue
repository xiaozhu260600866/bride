<template>
	<section>
	   <div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="优惠券：">
						<el-input placeholder="请输入优惠券名称" name="name" v-model="searchFields.name"></el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input placeholder="请输入会员姓名" name="user_name" v-model="searchFields.user_name"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input placeholder="请输入会员电话" name="phone" v-model="searchFields.phone"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-col :span="24">
			<el-tabs v-model="status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="待使用" name="0"></el-tab-pane>
				<el-tab-pane label="已使用" name="1"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" min-width="30"> </el-table-column>
			<el-table-column prop="user_name" label="姓名" min-width="60">  </el-table-column>
			<el-table-column prop="phone" label="电话" min-width="60">  </el-table-column>


			<el-table-column prop="name" label="优惠券名称" min-width="120"> </el-table-column>
			<el-table-column prop="amount" label="优惠券金额" width="110"> </el-table-column>
			<el-table-column label="有效期" width="180">
				<template scope="scope">{{scope.row.start_at}} ~{{ scope.row.end_at }}</template>
			</el-table-column>
			<el-table-column label="状态" width="80">
				<template scope="scope">{{ scope.row.status == 0 ? '待使用' : '已使用' }}</template>
			</el-table-column>
			<el-table-column prop="getType" label="类型" min-width="120"> </el-table-column>
			<el-table-column label="操作" width="160">
				<template scope="scope">
					<el-button type="primary" size="small" @click="changeStatus(scope.row)" v-if="scope.row.status == 0">兑换</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">删除所选</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<!-- 规格组件开始 -->
		<!-- 规格组件结束 -->
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/user/coupon-record',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'coupon_users',
			status: 0,
			sels: [], //列表选中列,
			searchFields: {
				user_id: '',
				nickname: '',
			}
		}
	},
	mounted() {
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
		changeStatus(row) {
			this.getConfirm("是否兑换优惠券", msg => {
				this.postAjax("/admin/user/changestatus-couponuser", { id: row.id }, msg => {
					this.ajax();
				});
			});
		},
		handleDel(index, item) {
			this.del_vuex(item, index, this)
		},
		clickStatus: function(tab, event) {
			this.status = tab.name;
			this.ajax();
		},
		delAll() { /*批量删除*/
			this.deleteAll(this);
		},
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		}
	},
	components: {

	}

}

</script>
