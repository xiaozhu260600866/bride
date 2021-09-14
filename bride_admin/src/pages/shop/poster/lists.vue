<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group flex-between">
					<div>
						<el-form-item label="标题搜索：">
							<el-input placeholder="请输入标题名称" name="name" v-model="searchFields.name"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="toSearch">查询</el-button>
						</el-form-item>
						 <el-form-item>
							<el-switch v-model="data.is_index" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="changeIndex(data.is_index)"> </el-switch>
							显示\隐藏
						</el-form-item>
					</div>

					<el-form-item>
						<el-button type="primary" @click="$refs.createEdit.ajax('',type)" >新增广告图</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		 <el-col :span="24">
			<el-tabs v-model="type" type="card" @tab-click="clickStatus">
				<el-tab-pane label="信息系统导航" :name="''+26"></el-tab-pane>
				<el-tab-pane label="首页幻灯片" :name="''+1"></el-tab-pane>
				<el-tab-pane label="首页广告位" :name="''+2"></el-tab-pane>
				<el-tab-pane label="首页广告位1" :name="''+8"></el-tab-pane>
				<el-tab-pane label="首页广告位2" :name="''+9"></el-tab-pane>
				<el-tab-pane label="首页广告位3" :name="''+10"></el-tab-pane>
				<el-tab-pane label="桶装水城导航" :name="''+4"></el-tab-pane>

			
				
				
				<el-tab-pane label="手机类别" :name="''+3"></el-tab-pane>
			

				<!-- <el-tab-pane label="口罩商城幻灯片" :name="''+20"></el-tab-pane>
				<el-tab-pane label="口罩商城导航" :name="''+21"></el-tab-pane>
				
				<el-tab-pane label="电信商城幻灯片" :name="''+22"></el-tab-pane>
				<el-tab-pane label="电信商城导航" :name="''+23"></el-tab-pane> -->

			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="name" label="名称" min-width="100"> </el-table-column>
			<el-table-column prop="url" label="url地址" min-width="150"> </el-table-column>
			<el-table-column prop="sort" label="排序" width="50"> </el-table-column>
			<el-table-column align="center" label="隐藏/显示" width="100">
				<template scope="scope">
					<el-switch v-model="scope.row.is_index " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'is_index')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="160">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$refs.createEdit.ajax(scope.row,type)">编辑</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<my-create-edit ref="createEdit"></my-create-edit>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/poster/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'shop_posters',
			sels: [], //列表选中列,
			type:this.getOptions('type'),
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
		editField(row, field) {
			this.postAjax("/admin/shop/poster/editField", {
				id: row.id,
				field: field,
				value: row[field]
			}, msg => {
				if (msg.data.status == 3) {
					row[field] = 0;
				}
			});
		},
		changeIndex(val){
			this.postAjax("/admin/shop/poster/changeIndex",{type:this.type,val:val},msg=>{

			});
		},
		ajax() {
			this.getAjax(this, { type:this.type }, msg => {});
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
			this.type = tab.name;
			this.ajax();
		}
	},
	components: {
		'my-create-edit': resolve => require(['./create_edit'], resolve),
	}

}

</script>
