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
					<el-form-item label="电话搜索：">
						<el-input placeholder="请输入客户电话" name="addr_phone" v-model="data.query.addr_phone"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="业务员：" v-if="user.role == 1">
						<el-input placeholder="请输入业务员名称" name="staff_userid" v-model="data.query.staff_userid"></el-input>
					</el-form-item>
					<el-form-item label="日期搜索：">
						<el-date-picker placeholder="选择日期范围" type="daterange" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="success" @click="exportExcel" v-if="user.role == 1">导出</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-col :span="24">
			<el-tabs v-model="data.query.after_status" type="card" @tab-click="ajax">
				<el-tab-pane label="处理中" :name="''+0"></el-tab-pane>
				<el-tab-pane label="已完成" :name="''+1"></el-tab-pane>
				<el-tab-pane label="全部" :name="''+12"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
			@selection-change="selsChange" v-loading="data.listLoading" class="children_pro">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column width="40" type="expand">
				<template scope="scope">
					<el-table ref="multipleTable" :data="scope.row.products" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading" class="pro_table">
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
			<el-table-column prop="remark" label="备注" min-width="80"> </el-table-column>
			<el-table-column label="客户信息" width="130">
				<template scope="scope">
					<p>{{ scope.row.addr_name}}</p>
					<p>{{ scope.row.nickname}} ({{scope.row.role == 5 ? '商家' : '会员'}}) </p>
					<p>{{ scope.row.addr_phone}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="ps_time" label="配送时间" width="115"> </el-table-column>
			<el-table-column prop="num" align="center" label="数量" width="60"> </el-table-column>
			<el-table-column prop="after_type" align="center" label="售后类型" width="60"> </el-table-column>
			<el-table-column prop="after_content" align="center" label="售后内容" min-width="100"> </el-table-column>
			<el-table-column prop="after_content_" align="center" label="售后结果" width="100"> </el-table-column>
			<el-table-column prop="after_date" label="售后日期" width="100"> </el-table-column>
			<el-table-column label="创建日期" width="100">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="支付日期" width="100">
				<template scope="scope">{{ scope.row.payed_at }}</template>
			</el-table-column>
			<el-table-column label="售后日期" width="100">
				<template scope="scope">{{ scope.row.after_date }}</template>
			</el-table-column>
			<el-table-column label="操作" width="100" v-if="user.role == 1">
				<template scope="scope">
					<el-button type="primary" size="small" @click.native="$refs.after.ajax(scope.row);">售后</el-button>
				</template>

			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="user.role == 1">批量删除</el-button>
			<el-button type="danger" @click="status5" :disabled="this.sels.length===0 " v-if="user.role == 8 && status == 3">批量发货</el-button>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
				:page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
				style='float: right'>
			</el-pagination>
		</el-col>

		

		<div class="print" style="display:none">
			<div style="font-size: 18px;text-align: center;margin-bottom: 15px;font-weight: bold;">电子票据</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">订单编号：<span style="font-size: 11px;font-family: Arial">{{order.order_no}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">姓名：{{order.addr_name}}</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">电话：<span style="font-size: 11px;font-family: Arial">{{order.addr_phone}}</span></div>
			<div style="border-bottom: 1px #333 double;margin: 10px 0;"></div>
			<table cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<td height="18" width="52%" style="font-size: 10px;">名称</td>
					<td width="12%" style="font-size: 10px;font-family: Arial;text-align: center;">数量</td>
					<!-- <td width="18%" style="font-size: 10px;font-family: Arial;text-align: right;">单价</td> -->
					<td width="18%" style="font-size: 10px;font-family: Arial;text-align: right;">小计</td>
				</tr>
			</table>
			<table cellpadding="0" cellspacing="0" width="100%" v-for="v in order.products" v-if="v.getProduct">
				<tr>
					<td height="18" width="52%" style="font-size: 10px;">{{v.attribute ? v.attribute : v.getProduct.name}}</td>
					<td width="12%" style="font-size: 10px;font-family: Arial;text-align: center;">{{v.num}}</td>
					<!--  <td width="18%" style="font-size: 10px;font-family: Arial;text-align: right;">{{v.price}}</td> -->
					<td width="18%" style="font-size: 10px;font-family: Arial;text-align: right;">{{v.amount}}</td>
				</tr>
			</table>
			<div style="border-bottom: 1px #333 double;margin: 10px 0;"></div>
			<table style="margin-bottom: 10px;" cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<td width="50%" style="font-size: 10px;">合计</td>
					<td width="12%" style="font-size: 10px;font-family: Arial;text-align: center;">{{order.num}}</td>
					<td width="36%" style="font-size: 10px;font-family: Arial;text-align: right;">{{order.amount}}</td>
				</tr>
			</table>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">自提点：{{order.merchantName ? order.merchantName.company_name:'' }}</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">日期：<span style="font-size: 11px;font-family: Arial">{{order.payed_at}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;min-height: 40px;">备注：{{order.remark}}</div>
		</div>

		<my-create-edit ref="createEdit"></my-create-edit>
		<my-after ref="after"></my-after>
		<my-suggest ref="suggest"></my-suggest>
		<my-staff ref="staff"></my-staff>
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
				status: 10,
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
			print(item) {
				this.order = item;


				setTimeout(() => {
					let LODOP = getLodop();
					LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
					LODOP.ADD_PRINT_HTM(0, 0, '48mm', '100%', $(".print").html());
					LODOP.PREVIEW();
				}, 500);
			},
			finishOrder(item) {
				let title = "是否确认完成?";
				this.getConfirm(title, () => {
					this.postAjax("/admin/shop/order/change-order-status", {
						id: item.id,
						status: 9
					}, msg => {
						if (msg.data.status == 2) {
							this.ajax();
						}
					});
				});
			},
			status5() {
				let title = "是否批量发货?";
				if (this.sels.length) {
					this.getConfirm(title, () => {
						this.postAjax("/admin/shop/order/order-rob-all", {
							data: this.sels
						}, msg => {
							if (msg.data.status == 2) {
								this.ajax();
							}
						});
					});
				}
			},
			ajax() {

				this.getAjax(this, {
					status: this.status
				}, msg => {});
			},
			exportExcel() {
                this.data.query.status = 10;
				let url = this.urlApendOpenid("/admin/shop/order/export?type=1", this);
				window.open(this.siteName+url);
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
<style type="text/css" scoped="">
.order_info{display: flex;border-bottom: 1px #eee solid;}
.order_info:last-child{border-bottom: 0;}
.order_info .pro_img .img{width: 40px;height: 40px;display: flex;border-radius: 5px;}
.order_info .p{line-height: 18px;}

.print .title{font-size: 18px;text-align: center;margin-bottom: 15px;font-weight: bold;}
.print .p1,.print .p1 span{font-size: 10px;line-height: 20px;}


.pro_img{width: 36px;height: 36px;display: flex;border-radius: 5px;}
.children_pro .el-table__expanded-cell{padding: 10px!important;}
</style>
