<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<div class="flex1">
						<el-form-item label="新闻名称：">
							<el-input placeholder="请输入新闻名称" name="title" v-model="searchFields.title"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="toSearch">查询</el-button>
						</el-form-item>
					</div>
					<el-form-item>
						<el-button type="primary" @click="$router.push({path: '/vueadmin/article/create'})">新增</el-button>
						<el-button type="primary" @click="$refs.category.ajax()" >类别</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>

		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="title" label="新闻标题" min-width="250"> </el-table-column>
			<el-table-column prop="fclassname" label="分类名称" width="100"> </el-table-column>
            <el-table-column align="center" label="排序" width="78">
            	<template scope="scope">
            		<el-input v-model="scope.row.sort"  @change="editField(scope.row,'sort')"></el-input>
            	</template>
            </el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column align="center" prop="views" label="点击量" width="80"> </el-table-column>
			<el-table-column  label="连接" min-width="150">
				<template scope="scope">/pages/news/show/main?id={{ scope.row.id }}</template>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path:'/vueadmin/article/edit?id='+scope.row.id})" >编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " >批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<my-class top="2%" ref="category" :type="0" :formAction="'/admin/article/'" :sizearr="300"></my-class>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/article/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'articles',
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
        editField(row, field) {
        	this.postAjax("/admin/article/editField", {
        		id: row.id,
        		field: field,
        		value: row[field]
        	}, msg => {
        		if (msg.data.status == 3) {
        			row[field] = 0;
        		}
        	});
        },
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
		}
	},
	components: {
		"my-class": resolve => require(['xiaozhu/vue/components/admin/class.vue'], resolve),
	}

}

</script>
