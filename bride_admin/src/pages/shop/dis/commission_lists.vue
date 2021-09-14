<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="订单号：">
						<el-input placeholder="请输入订单号" name="order_no" v-model="data.query.order_no"></el-input>
					</el-form-item>
					<el-form-item label="分销商：">
						<el-input placeholder="请输入分销商姓名" name="name" v-model="data.query.name"></el-input>
					</el-form-item>
					<el-form-item label="所在区域：">
						<el-input placeholder="请输入所在区域" name="name" v-model="data.query.area"></el-input>
					</el-form-item>
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="data.nextPag =1;ajax()">查询</el-button>
						<el-button type="success" @click="exportExcel">导出</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<div class="dis-Tcount">总收益：<span class="price">{{data.orderSumIn}}</span>；提现：<span class="price">{{data.orderSumOut}}</span>；余额：<span class="price">{{data.orderSumIn - data.orderSumOut}}</span></div>
		<el-col :span="24">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
				<el-tab-pane label="待发放" :name="''+0"></el-tab-pane>
				<el-tab-pane label="已发放" :name="''+1"></el-tab-pane>
				<el-tab-pane label="全部" :name="''+12"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="40"> </el-table-column>
			<el-table-column prop="order_no" label="订单号" width="130"></el-table-column>
			<el-table-column prop="area" label="所在区域" width="80"></el-table-column>
			<el-table-column label="产品" min-width="140">
				<template scope="scope">
					{{ scope.row.getOrder ? scope.row.getOrder.product_str : '订单已补删除'  }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="数量" width="60">
				<template scope="scope">
					{{ scope.row.getOrder ? scope.row.getOrder.num : '订单已补删除'  }}
				</template>
			</el-table-column>
			<el-table-column label="金额" width="80">
				<template scope="scope">
					{{ scope.row.getOrder ? scope.row.getOrder.amount : '订单已补删除'  }}
				</template>
			</el-table-column>
			<el-table-column label="购买人信息" width="140">
				<template scope="scope">
					<div>
						<p v-if="scope.row.source !='456充值'">{{ scope.row.getOrder ? scope.row.getOrder.addr_name ? scope.row.getOrder.addr_name : scope.row.getOrder.addr_name:'订单已被删除' }}</p>
						<p v-else>456充值</p>
					</div>
					<div>{{ scope.row.getOrder ? scope.row.getOrder.addr_phone : '订单已删除'  }}</div>
				</template>
			</el-table-column>
			<el-table-column label="购买人地址" min-width="100">
				<template scope="scope">
					{{ scope.row.getOrder ? scope.row.getOrder.addr_address : '订单已删除'  }}
				</template>
			</el-table-column>
			<el-table-column prop="name" label="分销商" width="80">
				<template scope="scope">{{ scope.row.getDis ?scope.row.getDis.name :'分销商已被删除'  }}</template>
			</el-table-column>
			<el-table-column prop="source" label="分销级别" width="80">
				<template scope="scope">{{ parseFloat(scope.row.source) +1  }}</template>
			</el-table-column>
			<!-- <el-table-column label="自提点" width="130">
				<template scope="scope">
					{{ scope.row.getOrder ? scope.row.getOrder.merchant_user_name : '订单已补删除'  }}
				</template>
			</el-table-column> -->
			<el-table-column prop="amount" label="累计佣金" width="100"> </el-table-column>
			<el-table-column prop="getStatus" label="发放状态" width="80"> </el-table-column>
			<el-table-column label="日期" width="165">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
				<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>

		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="auditAll" :disabled="this.sels.length===0 ">批量发放</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>

	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/dis/commission-lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'distribution_incomes',
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

		this.ajax();
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		"$route": "ajax"
	},
	methods: {
		auditAll(){
		   let title = "是否批量发放佣金?";
		   if(this.sels.length){
			   this.getConfirm(title, () => {
				   this.postAjax("/admin/shop/dis/commission-lists-all", { data: this.sels}, msg => {
					   if (msg.data.status == 2) {
						   this.ajax();
					   }
				   });
			   });
		   }
		},
	   exportExcel() {
		   let url = this.urlApendOpenid("/admin/shop/dis/commission-lists?export=export", this);
			window.open(this.siteName+url);
	   },
		ajax() {
			this.getAjax(this, msg => {});
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

	}

}

</script>
<style type="text/css" scoped>
.dis-Tcount{background: rgba(64, 158, 255, 0.05);border: 1px rgba(64, 158, 255, 0.1) solid;padding: 15px;margin-bottom: 15px;font-size: 15px;}
.dis-Tcount span{font-weight: bold;font-size: 16px;}
</style>