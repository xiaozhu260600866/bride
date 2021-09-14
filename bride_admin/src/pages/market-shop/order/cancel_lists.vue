<template>
	<section>
	   <div class="Tsearch">
			<el-form :inline="true" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="订单搜索：">
						<el-input placeholder="请输入订单号" name="order_no" v-model="data.query.order_no"></el-input>
					</el-form-item>
					<el-form-item label="商品搜索：">
						<el-input placeholder="请输入商品名称" name="product_str" v-model="data.query.product_str"></el-input>
					</el-form-item>
					<el-form-item label="电话搜索：">
						<el-input placeholder="请输入客户电话" name="addr_phone" v-model="data.query.addr_phone"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="业务员：" v-if="user.role == 1">
						<el-input placeholder="请输入业务员名称" name="staff_userid" v-model="data.query.staff_userid"></el-input>
					</el-form-item>
					<el-form-item label="自提点" v-if="user.role == 1">
						<el-input placeholder="请输入自提点名称" name="merchant_username" v-model="data.query.merchant_username"></el-input>
					</el-form-item>
					<el-form-item label="日期搜索">
					<el-date-picker placeholder="" type="daterange" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="success" @click="exportExcel" v-if="user.role == 1">导出</el-button>
				</div>
			</el-form>
		</div>

		<el-col :span="24">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
				<el-tab-pane label="处理中" :name="''+0"></el-tab-pane>
				<el-tab-pane label="已完成" :name="''+2"></el-tab-pane>
				<el-tab-pane label="已拒绝" :name="''+15"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
			@selection-change="selsChange" v-loading="data.listLoading" class="children_pro">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column width="40" type="expand">
				<template scope="scope">
					<el-table ref="multipleTable" :data="scope.row.products" border tooltip-effect="dark" style="width: 100%"
						@selection-change="selsChange" v-loading="data.listLoading" class="pro_table">
						<el-table-column label="商品图片" width="80">
							<template scope="scope">
								<img class="pro_img" :src="scope.row.getProduct.firstCover" />
							</template>
						</el-table-column>
						<el-table-column label="商品名称" min-width="120">
							<template scope="scope">
								<p class="fs-14 lh-20">{{scope.row.getProduct.name}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="attribute" label="商品规格" min-width="120"> </el-table-column>
						<el-table-column prop="num" label="下单数量" width="120"> </el-table-column>
						<el-table-column prop="amount" label="下单单价" width="120"> </el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="order_no" label="订单编号" width="115">
				<template scope="scope">
					{{scope.row.order_no}} <span v-if="scope.row.is_group">(团购{{scope.row.rob == 1 ? '完成':""}})</span>
				</template>
			</el-table-column>
			<el-table-column prop="amount" label="总价" width="80"> </el-table-column>
			<el-table-column label="客户信息" width="130">
				<template scope="scope">
					<p>{{ scope.row.addr_name}}</p>
					<p>{{ scope.row.nickname}} ({{scope.row.role == 5 ? '商家' : '会员'}}) </p>
					<p>{{ scope.row.addr_phone}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="ps_time" label="配送时间" width="115"> </el-table-column>
			<el-table-column prop="num" align="center" label="数量" width="60"> </el-table-column>
			<el-table-column prop="status_content" align="center" label="取消结果" width="120"> </el-table-column>
			<el-table-column prop="remark" label="备注" min-width="80"> </el-table-column>
			<el-table-column label="创建日期" width="100">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="支付日期" width="100">
				<template scope="scope">{{ scope.row.payed_at }}</template>
			</el-table-column>
			<el-table-column label="取消日期" width="100">
				<template scope="scope">{{ scope.row.cancel_date }}</template>
			</el-table-column>

			<el-table-column label="操作" width="220" v-if="user.role == 1">
				<template scope="scope">
					<el-button type="primary" size="small" @click="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=2">审核通过</el-button>
					<el-button type="danger" size="small" @click="changeStatus(scope.$index, scope.row,'2')" v-if="scope.row.status!=3">审核拒绝</el-button>
				</template>

			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="user.role == 1">批量删除</el-button>


			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
				:page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
				style='float: right'>
			</el-pagination>
		</el-col>
		<my-status ref="status" style="width:100%" formAction="/admin/shop/order/chanel" />
	</section>
</template>
<script type="text/javascript">
	import {
		getLodop
	} from '@/public/js/LodopFuncs' //导入模块
	export default {
		data() {
			return {
				formAction: '/admin/shop/order/lists?type=1',
				data: this.formatData(this),
				siteName: this.getSiteName(),
				tableName: 'orders',
				order: {},
				user: this.getUser(),
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

			changeStatus(index, item, status) {
				this.$refs.status.ajax({ id: item.id, status: status });
			},
			ajax() {

				this.getAjax(this, {

				}, msg => {});
			},
			exportExcel() {
				let url = this.urlApendOpenid("/admin/shop/order/export?type=1", this);
				window.open(this.siteName + url);
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
			'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
		}

	}
</script>
<style type="text/css" scoped="">
	.order_info {
		display: flex;
		border-bottom: 1px #eee solid;
	}

	.order_info:last-child {
		border-bottom: 0;
	}

	.order_info .pro_img .img {
		width: 40px;
		height: 40px;
		display: flex;
		border-radius: 5px;
	}

	.order_info .p {
		line-height: 18px;
	}

	.print .title {
		font-size: 18px;
		text-align: center;
		margin-bottom: 15px;
		font-weight: bold;
	}

	.print .p1,
	.print .p1 span {
		font-size: 10px;
		line-height: 20px;
	}


	.pro_img {
		width: 36px;
		height: 36px;
		display: flex;
		border-radius: 5px;
	}

	.children_pro .el-table__expanded-cell {
		padding: 10px !important;
	}
</style>
