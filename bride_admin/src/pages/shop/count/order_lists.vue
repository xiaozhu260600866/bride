<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="分类搜索：">
						<el-cascader placeholder="请选择分类" expand-trigger="hover" :options="data.fclass" v-model="data.query.fclass"></el-cascader>
					</el-form-item>
					<el-form-item label="订单搜索：">
						<el-input placeholder="请输入订单编号" name="order_no" v-model="data.query.order_no"></el-input>
					</el-form-item>
					<el-form-item label="商品搜索：">
						<el-input placeholder="请输入商品名称" name="product_str" v-model="data.query.product_str"></el-input>
					</el-form-item>
				</div>				
				<div class="Tsec_group">
					<el-form-item label="时间搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
					<el-button-group >
						<el-button :type="data.query.searchType == 'today' ? 'primary': ''" @click="data.query.searchType = 'today';ajax()">今天</el-button>
						<el-button :type="data.query.searchType == 'yesterday' ? 'primary': ''" @click="data.query.searchType = 'yesterday';ajax()">昨日</el-button>
						<el-button :type="data.query.searchType == 'thismonth' ? 'primary': ''" @click="data.query.searchType = 'thismonth';ajax()">本月</el-button>
						<el-button :type="data.query.searchType == 'thisyear' ? 'primary': ''" @click="data.query.searchType = 'thisyear';ajax()">今年</el-button>
						<el-button :type="data.query.searchType == 'threeyear' ? 'primary': ''" @click="data.query.searchType = 'threeyear';ajax()">汇总</el-button>
					</el-button-group>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="success" @click="exportExcel">导出</el-button>
				</div>
			</el-form>
		</div>

		<el-col :span="24" class="flex">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
				<el-tab-pane label="已付款" :name="''+3"></el-tab-pane>
				<el-tab-pane label="发货中" :name="''+5"></el-tab-pane>
				<el-tab-pane label="已完成" :name="''+9"></el-tab-pane>
				<el-tab-pane label="售后" :name="''+10"></el-tab-pane>
			</el-tabs>

			<!-- <h1 style="padding-top: 10px;padding-left: 10px;" v-if="getUser().role == 8">{{data.supplier_price}}元</h1> -->
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
			@selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="order_no" label="订单编号" width="115">
				<template scope="scope">
					{{scope.row.order_no}}
				</template>

			</el-table-column>
			<el-table-column prop="addr_name" label="姓名" width="70"> </el-table-column>

			<el-table-column prop="addr_phone" label="电话" width="100"> </el-table-column>
			<el-table-column label="商品" min-width="150">
				<template scope="scope"> {{scope.row.is_info ? scope.row.getProduct.name+"("+scope.row.attribute+")" : scope.row.getProduct.name }}</template>
			</el-table-column>
			<el-table-column prop="num" align="center" label="数量" width="60"> </el-table-column>
			<el-table-column prop="amount" align="center" label="价格" width="70"> </el-table-column>
			<el-table-column align="center" label="结算价" width="70">
				<template scope="scope"> {{scope.row.supplier_price  || scope.row.supplier_price_}}</template>
			 </el-table-column>
			<el-table-column align="center" label="自提价" width="70">
				<template scope="scope"> {{scope.row.merchant_price  || scope.row.merchant_price_}}</template>
			 </el-table-column>
			<el-table-column prop="merchant_user_name" align="center" label="自提点" min-width="100"> </el-table-column>
			<el-table-column prop="take_supplier_user_id" align="center" label="供应商id" width="100"> </el-table-column>
			<el-table-column prop="ps_time" align="center" label="配送时间" width="80"> </el-table-column>
			<el-table-column prop="addr_address" align="center" label="地址" min-width="100"> </el-table-column>
			<el-table-column prop="remark" align="center" label="备注" width="100"> </el-table-column>
			<el-table-column prop="deliver_type_" align="center" label="配送方式" width="50"> </el-table-column>
			<el-table-column prop="finish_date" label="完成时间" width="60" v-if="status == 9"> </el-table-column>
			<el-table-column label="创建日期" width="100">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="支付日期" width="100">
				<template scope="scope">{{ scope.row.payed_at }}</template>
			</el-table-column>
			<!-- <el-table-column label="操作" width="260">
				<template scope="scope">
					<el-dropdown class="ml10">
						<el-button type="primary" size="small">
							更多<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column> -->
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
				:page-sizes="[50]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
				style='float: right'>
			</el-pagination>
		</el-col>

	</section>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				formAction: '/admin/shop/order/orderProduct',
				data: this.formatData(this),
				siteName: this.getSiteName(),
				tableName: 'orders',
				status: this.getOptions("status"),
				sels: [], //列表选中列,

				searchFields: {

				}
			}
		},
		mounted() {
			this.$set(this.data.query,"status",'3');

			this.ajax();
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			"$route": "ajax"
		},
		methods: {
			finishOrder(item){
			   let title = "是否确认完成?";
			   this.getConfirm(title, () => {
				   this.postAjax("/admin/shop/order/change-order-status", { id: item.id, status: 9 }, msg => {
					   if (msg.data.status == 2) {
						   this.ajax();
					   }
				   });
			   });
			},
			ajax() {
				this.getAjax(this, {
				}, msg => {});
			},
			exportExcel() {
				let url = this.urlApendOpenid("/admin/shop/order/order-product-export", this);
				window.open(this.siteName+url);
			},
			selsChange: function(sels) {
				this.sels = sels;
			},
			toSearch() {
				if(this.data.query.fclass && this.data.query.fclass.length){
					 this.data.query.fclassForIndex = this.data.query.fclass[this.data.query.fclass.length-1];
				 }
				this.ajax();
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
				this.searchFields.staff_userid = res.id;
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
