<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tlnav-po">
					<el-button type="primary" @click="$refs.createEdit.ajax()">新增</el-button>
				</div>
				<div class="Tsec_group">
					<el-form-item label="名称搜索：">
						<el-input placeholder="请输入名称" name="name" v-model="searchFields.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" min-width="55"> </el-table-column>
			<el-table-column prop="name" label="名称" min-width="55"> </el-table-column>
			<el-table-column label="日期" width="250">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$refs.createEdit.ajax(scope.row)">编辑</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<my-create-edit ref="createEdit"></my-create-edit>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/role/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'roles',
			sels: [], //列表选中列,
			searchFields: {
				name: '',
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
		handleDel(index, item) {
			this.del_vuex(item, index, this)
		},
		delAll() { /*批量删除*/
			this.deleteAll(this);
		},
	},
	components: {
		'my-create-edit': resolve => require(['./create_edit'], resolve),
	}

}

</script>
