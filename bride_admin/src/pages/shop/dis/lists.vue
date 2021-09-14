<template>
	<section>
		<!-- <div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="姓名：">
						<el-input placeholder="请输入姓名" name="name" v-model="searchFields.name"></el-input>
					</el-form-item>
					<el-form-item label="等级：">
						<el-select v-model="searchFields.lev" placeholder="请选择经销商等级">
							<el-option label="总部" value="0"></el-option>
							<el-option label="二级" value="1"></el-option>
							<el-option label="三级" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核状态：">
						<el-select v-model="searchFields.lev" placeholder="请选择审核状态">
							<el-option label="审核中" value="0"></el-option>
							<el-option label="审核通过" value="1"></el-option>
							<el-option label="审核拒绝" value="2"></el-option>
						</el-select>
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
		</div> -->
		<el-col :span="24">
			<el-tabs v-model="status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="审核中" :name="''+0"></el-tab-pane>
				<el-tab-pane label="审核通过" :name="''+1"></el-tab-pane>
				<el-tab-pane label="审核拒绝" :name="''+2"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column prop="id" label="id" width="100"> </el-table-column>
			<el-table-column label="所在区域" width="100">
				<template scope="scope">{{ scope.row.area_name }}</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名/手机号码" width="160">
				<template scope="scope">{{ scope.row.name }}
					<br>{{ scope.row.phone }}</template>
			</el-table-column>
		
			<el-table-column label="推荐人" min-width="160">
				<template scope="scope">
					<div v-html="scope.row.getReferrer"></div>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="getStatus" label="状态" width="100"> </el-table-column>
			<el-table-column prop="amount" label="累计佣金" width="120"> </el-table-column> -->
		
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template scope="scope">
					<el-button type="primary" size="small" @click="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=1">审核通过</el-button>
					<el-button type="danger"  size="small" @click="changeStatus(scope.$index, scope.row,'2')"v-if="scope.row.status!=2">审核拒绝</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<my-status ref="status" style="width:100%" formAction="/admin/shop/dis/change-status" />
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/dis/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'distributions',
			status: 0,
			sels: [], //列表选中列,
			searchFields: {
				searchDate: '',
				name: '',
				lev: ''
			}
		}
	},
	mounted() {
		this.status = this.getOptions('status');
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
		clickStatus(tab, event) {
			this.status = tab.name;
			this.ajax();
		}
	},
	components: {
		'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
	}

}

</script>
