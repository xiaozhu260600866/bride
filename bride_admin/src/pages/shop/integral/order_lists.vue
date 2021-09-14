<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="姓名：">
						<my-search placeholder="请输入收货人姓名" tablename="orders" searchfield="addr_name" v-model="searchFields.addr_name" ref="searchClient" style="width:100%" :formAction="'/ajax/vue-search'" @callback="searchCallBack" :fieldArr="[
							{prop:'addr_name',label:'呢称'},
							{prop:'addr_phone',label:'电话'},
							{prop:'created_at',label:'时间'} 
						]" />
						</my-search>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		 <el-col :span="24">
			<el-tabs v-model="status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="已付款" :name="''+3"></el-tab-pane>
				<el-tab-pane label="发货中" :name="''+5"></el-tab-pane>
				<el-tab-pane label="已完成" :name="''+9"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="order_no" label="编号" width="120"> </el-table-column>
			<el-table-column label="商品" min-width="100">
				<template scope="scope"> <span>{{ scope.row.products ? scope.row.products.name :'该产品已被删除'}}</span></template>
			</el-table-column>
			<el-table-column prop="addr_name" label="姓名" width="80"> </el-table-column>
			<el-table-column label="呢称" width="100">
				<template scope="scope">{{ scope.row.user?scope.row.user.nickname :'该用户已被删除' }}</template>
			</el-table-column>
			<el-table-column prop="addr_phone" label="电话" width="130"> </el-table-column>
			<el-table-column label="地址" min-width="85">
				<template scope="scope"> {{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</template>
			</el-table-column>
			<el-table-column prop="num" label="数量" width="60"> </el-table-column>
			<el-table-column prop="getShipping" label="发货方式" width="80"> </el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path:'/vueadmin/integral/order-info?id='+scope.row.id})">查看详情</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: 'admin/shop/integral/order-lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'integral_orders',
			 status:this.getOptions("status"),
			sels: [], //列表选中列,
			searchFields: {
				addr_name: '',
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
		 clickStatus(tab, event) {
			this.status = tab.name;
			this.ajax();
		}
	},
	components: {

	}

}

</script>
