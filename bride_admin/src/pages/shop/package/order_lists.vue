<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="订单搜索：">
						<el-input placeholder="请输入订单编号" name="order_no" v-model="data.query.order_no"></el-input>
					</el-form-item>
					<el-form-item label="套餐搜索：">
						<el-input placeholder="请输入套餐名称" name="package_name" v-model="data.query.package_name"></el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input placeholder="请输入客户名称" name="addr_name" v-model="data.query.addr_name"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input placeholder="请输入客户电话" name="addr_phone" v-model="data.query.addr_phone"></el-input>
					</el-form-item>
					<el-form-item label="区域：">
						<el-input placeholder="请输入区域" name="area" v-model="data.query.area"></el-input>
					</el-form-item>
					<el-form-item label="日期：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="ajax">查询</el-button>
						<el-button type="primary" @click="exportExcel">导出</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-col :span="24">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
				<el-tab-pane label="已付款" :name="''+3"></el-tab-pane>
				<el-tab-pane label="已完成" :name="''+9"></el-tab-pane>
				<el-tab-pane label="已取消" :name="''+1"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
				<el-table-column label="订单号" width="130">
				<template scope="scope"> {{ scope.row.order_no }}</template>
			</el-table-column>
            <el-table-column label="区域" width="100">
            	<template scope="scope">
						<el-input v-model="scope.row.area"  @change="editField(scope.row,'area')"></el-input>
                </template>
            </el-table-column>
				<el-table-column label="套餐名称" min-width="150">
				<template scope="scope"> {{ scope.row.getPackage ? scope.row.getPackage.name :'该套餐已被删除' }}</template>
			</el-table-column>
			<el-table-column prop="num" label="数量" width="60"> </el-table-column>
			<el-table-column prop="amount" label="价格" width="100"> </el-table-column>
			
			<el-table-column label="姓名" width="100">
				<template scope="scope"> {{ scope.row.addr_name }}</template>
			</el-table-column>
			<el-table-column label="电话" width="120">
				<template scope="scope"> {{ scope.row.addr_phone }}</template>
			</el-table-column>
		
			<el-table-column label="地址" min-width="150">
				<template scope="scope"> {{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</template>
			</el-table-column>
			<el-table-column label="商品" min-width="350">
				<template scope="scope">
					<div v-for="v in scope.row.getProduct">{{v.getProduct ? v.getProduct.name : '该商品已被删除' }}总次数：{{ v.num }} 剩余次数{{ v.left_num }}</div>
				</template>
			</el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="备注" width="120">
				<template scope="scope"> {{ scope.row.remark }}</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/package/order-lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'product_package_orders',
			status:this.getOptions("status"),
			sels: [], //列表选中列,
			searchFields: {

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
			this.postAjax("/admin/shop/package/orderEditField2", {
				id: row.id,
				field: field,
				value: row[field]
			}, msg => {
				if (msg.data.status == 3) {
		
				}
			});
		},
        exportExcel(){
           let url = this.urlApendOpenid("/admin/shop/package/orderExport", this);
           window.open(this.siteName+url);
        },

		ajax() {
			this.getAjax(this, {  }, msg => {});
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
			this.searchFields.card_user_id = res.id;
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
