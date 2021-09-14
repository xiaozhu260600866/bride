<template>
	<section>
		<el-col :span="24" class="toolbar t-search float-r">
			<el-form :inline="true" id="search" :model="searchFields">
				<el-col :span="6">
					<my-search placeholder="请输入姓名" tablename="users" searchfield="username" v-model="searchFields.username" ref="searchClient" style="width:100%" :formAction="'/ajax/vue-search?role=3'" @callback="searchCallBack" :fieldArr="[
					   {prop:'username',label:'姓名'},
					   {prop:'created_at',label:'时间'} 
					 ]" />
				</el-col>
				<el-form-item>
					<el-button type="primary" @click="toSearch">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">

			 <el-table-column label="头像" min-width="60" class="text-center" align="center">
				<template scope="scope"><img :src="scope.row.getUser.headerPic" width="50"></template>
			</el-table-column>
			<el-table-column label="姓名" min-width="60">
				<template scope="scope">{{ scope.row.getUser.userInfo.name }}</template>
			</el-table-column>
			<el-table-column label="部门" min-width="60">
				<template scope="scope">{{ scope.row.getUser.getDepartment }}</template>
			</el-table-column>
			<el-table-column label="电话" min-width="80">
				<template scope="scope">{{ scope.row.getUser.userInfo.phone }}</template>
			</el-table-column>
			<el-table-column label="订单号" min-width="80">
				<template scope="scope">{{ scope.row.order_no }}</template>
			</el-table-column>
			<el-table-column label="佣金" min-width="80">
				<template scope="scope">{{ scope.row.amount }}</template>
			</el-table-column>

		</el-table>
		 <el-col :span="24" class="toolbar mtb20">
            <!-- <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
            </el-pagination>
        </el-col>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/card/commission-count',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'business_cards',
			sels: [], //列表选中列,
			searchFields: {
				name: '',
				user_id: 0
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
			this.getAjax(this, { type: this.getOptions('type') }, msg => {});
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
	   
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		}
	},
	components: {
		
	}

}

</script>
