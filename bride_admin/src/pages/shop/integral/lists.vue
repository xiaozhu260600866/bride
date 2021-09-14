<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group flex-between">
					<el-col>
						<el-form-item label="产品搜索：">
							<el-input placeholder="请输入产品名称" name="name" v-model="searchFields.name"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="toSearch">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="$refs.category.ajax()">类别</el-button>
						</el-form-item>
					</el-col>
					<el-form-item>
						<el-button type="primary" @click="$router.push({path: '/vueadmin/integral/create'})">新增</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="sort" label="排序" width="50"> </el-table-column>
			<el-table-column prop="name" label="产品名称" min-width="200"> </el-table-column>
			<el-table-column prop="fclassname" label="分类名称" width="120"> </el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column prop="integral" label="积分" width="80"> </el-table-column>
			<el-table-column prop="views" label="点击量" width="80"> </el-table-column>
			<el-table-column prop="num" label="库存" width="110"> </el-table-column>
			<el-table-column label="操作" width="160">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path:'/vueadmin/integral/edit?id='+scope.row.id})">编辑</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				  
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<my-class top="2%" ref="category" :type="0" :formAction="'admin/shop/integral/'" :sizearr="300"></my-class>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/integral/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'integral_products',
			status:this.getOptions("status"),
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
		clickStatus(tab, event) {
			this.status = tab.name;
			this.ajax();
		}
	},
	components: {
		"my-class": resolve => require(['xiaozhu/vue/components/admin/class.vue'], resolve)
	}

}

</script>
