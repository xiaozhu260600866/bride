<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="订单搜索：">
						<el-input placeholder="请输入订单编号" name="order_no" v-model="data.query.order_no"></el-input>
					</el-form-item>
					<el-form-item label="商品搜索：">
						<el-input placeholder="请输入商品名称" name="product_str" v-model="data.query.product_str"></el-input>
					</el-form-item>
					<el-form-item label="商家名称：">
						<el-input placeholder="请输入商家名称" name="merchant_user_name" v-model="data.query.merchant_user_name"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="商家电话：">
						<el-input placeholder="请输入商家电话" name="addr_phone" v-model="data.query.addr_phone"></el-input>
					</el-form-item>
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="success" @click="exportExcel">导出</el-button>
				</div>
			</el-form>
		</div>

		<el-col :span="24" class="flex">
			<el-tabs v-model="status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="已付款" :name="''+3"></el-tab-pane>
				<el-tab-pane label="发货中" :name="''+5"></el-tab-pane>
				<el-tab-pane label="已完成" :name="''+9"></el-tab-pane>
				<el-tab-pane label="售后" :name="''+10"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
			@selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="order_no" label="订单编号" width="100">
				<template scope="scope">
					{{scope.row.order_no}} <span v-if="scope.row.is_group">(团购{{scope.row.rob == 1 ? '完成':""}})</span>
				</template>

			</el-table-column>
			<el-table-column prop="addr_name" label="姓名" width="70"> </el-table-column>
			<el-table-column label="呢称" width="100">
				<template scope="scope">{{ scope.row.nickname}} ({{scope.row.role == 5 ? '商家' : '会员'}}) </template>
			</el-table-column>
			<el-table-column prop="addr_phone" label="电话" width="100"> </el-table-column>

			<el-table-column label="商品" min-width="150">
				<template scope="scope"> <span v-for="product in scope.row.products" v-if="product.getProduct">{{ product.is_info ? product.getProduct.name+"("+product.attribute+")" : product.getProduct.name}}</span></template>
			</el-table-column>
			<el-table-column prop="num" align="center" label="数量" width="50"> </el-table-column>
			<el-table-column prop="getShipping" label="发货方式" width="80"> </el-table-column>
			<el-table-column label="商家" width="100">
				<template scope="scope">{{ scope.row.merchant_company_name }}</template>
			</el-table-column>
			<el-table-column label="分销商" width="80">
				<template scope="scope">{{ scope.row.dis_name ? scope.row.dis_name :'总店' }}</template>
			</el-table-column>
			<el-table-column label="来源" width="70">
				<template scope="scope">{{ scope.row.source  && scope.row.source == 'admin' ? '后台' :'小程序' }}</template>
			</el-table-column>
			<el-table-column prop="getPayMethod" label="支付方式" width="80"> </el-table-column>
			<el-table-column prop="finish_date" label="完成时间" width="60" v-if="status == 9"> </el-table-column>
			<el-table-column label="日期" width="100">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="290">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$refs.staff.ajax(scope.row,data.staff_new);" v-if="!scope.row.staff_userid">分配员工</el-button>
					<el-button type="primary" size="small" @click="finishOrder(scope.row)">完成</el-button>
					<el-dropdown class="ml10">
						<el-button type="primary" size="small">
							更多<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="$refs.suggest.ajax(scope.row.products);" v-if="scope.row.suggestStatus >  0">查看评价</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.after.ajax(scope.row);" v-if="scope.row.status >  9">查看售后</el-dropdown-item>
							<el-dropdown-item @click.native="changeOrder(scope.row,0,'是否取消该笔订单',msg=>{
								ajax();
							})" >订单取消</el-dropdown-item>
							<el-dropdown-item @click.native="changeOrder(scope.row,10,'是否售后该笔订单',msg=>{
								ajax();
							})" >订单售后</el-dropdown-item>
							<!-- <el-dropdown-item @click.native="$router.push({path:'/vueadmin/shop/order-info?id='+scope.row.id})">详情</el-dropdown-item> -->
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
				:page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
				style='float: right'>
			</el-pagination>
		</el-col>
		<my-create-edit ref="createEdit"></my-create-edit>
		<my-after ref="after"></my-after>
		<my-suggest ref="suggest"></my-suggest>
		<my-staff ref="staff"></my-staff>
	</section>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				formAction: '/admin/shop/order/lists?merchant_userid_notnull=1',
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
					status: this.status
				}, msg => {});
			},
			exportExcel() {
				window.location.href = this.siteName + "admin/shop/order/export?api_token=" + this.getUser().api_token;
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
				this.searchFields.staff_userid = res.id;
			},
			clickStatus(tab, event) {
				this.status = tab.name;
				this.ajax();
			}
		},
		components: {

			'my-after': resolve => require(['./layouts/after'], resolve),
			'my-suggest': resolve => require(['./layouts/suggest'], resolve),
			'my-staff': resolve => require(['./layouts/staff'], resolve),
		}

	}
</script>
