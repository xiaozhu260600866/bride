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
					<el-form-item label="配送员：">
						<el-input placeholder="请输入配送员姓名" name="staff_name" v-model="data.query.staff_name"></el-input>
					</el-form-item>
					<el-form-item label="自提点：" v-if="user.role == 1">
						<el-input placeholder="请输入自提点名称" name="merchant_user_name" v-model="data.query.merchant_user_name"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="供货商：" v-if="user.role == 1">
						<el-input placeholder="请输入供货商名称" name="supplier_company_name" v-model="data.query.supplier_company_name"></el-input>
					</el-form-item>
					<el-form-item label="日期搜索：">
					<el-date-picker placeholder="选择日期范围" type="daterange" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
                    <el-form-item label="完成日期搜索：">
                    <el-date-picker placeholder="选择日期范围" type="daterange" v-model="data.query.finish_date"> </el-date-picker>
                    </el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="success" @click="exportExcel" v-if="user.role == 1">导出</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-col :span="24" class="flex">
			<el-tabs v-model="data.query.status" type="card" @tab-click="clickStatus">
				<el-tab-pane :label="'已付款('+data.status3Num+')'" :name="''+3"></el-tab-pane>
				<el-tab-pane :label="'发货中('+data.status5Num+')'" :name="''+5"></el-tab-pane>
				<el-tab-pane :label="'已完成('+data.status9Num+')'" :name="''+9"></el-tab-pane>
				<el-tab-pane :label="'售后('+data.status10Num+')'" :name="''+10"></el-tab-pane>
                <el-tab-pane :label="'已删除'" :name="''+11"></el-tab-pane>
			</el-tabs>
			<!-- <h1 style="padding-top: 10px;padding-left: 10px;">共{{data.sum}}件</h1> -->
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
			@selection-change="selsChange" v-loading="data.listLoading" class="children_pro">
			<el-table-column type="selection" width="40"> </el-table-column>
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
			<el-table-column prop="order_no" label="订单编号" width="80">
				<template scope="scope">
					{{scope.row.order_no}} <span v-if="scope.row.is_group">(团购{{scope.row.rob == 1 ? '完成':""}})</span>
				</template>
			</el-table-column>
			<el-table-column label="应付" width="150">
				<template scope="scope">
					<p>商品小计：<span class="Arial">￥{{ scope.row.amount }}</span></p>
					<p v-if="scope.row.shipping == 1">运　　费：<span class="Arial" >￥{{ scope.row.yunfei }}</span></p>
					<p>折　　扣：-<span class="Arial">￥{{scope.row.payed_amount }}</span></p>
					<p v-if="scope.row.shipping == 1">应　　收：<span class="Arial" >￥{{ (parseFloat(scope.row.amount)  +  parseFloat(scope.row.yunfei)) - parseFloat(scope.row.payed_amount)}}</span></p>
			        <p v-else>应　　收：<span class="Arial">￥{{ parseFloat(scope.row.amount) - parseFloat(scope.row.payed_amount)}}</span></p>
				</template>
			</el-table-column>
			<el-table-column label="备注" width="200"> 
				<template scope="scope">
					<el-input v-model="scope.row.remark" class="area-input" @change="editField(scope.row,'remark')"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="客户信息" width="115">
				<template scope="scope">
					<p>{{ scope.row.addr_name}}</p>
					<p>{{ scope.row.nickname}} ({{scope.row.role == 5 ? '商家' : '会员'}}) </p>
					<p>{{ scope.row.addr_phone}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="addr_address" label="地址" min-width="250"> 
					<template scope="scope">
						{{scope.row.getAddress}}
						<!-- <el-input v-model="scope.row.addr_address" class="area-input" @change="editField(scope.row,'addr_address')"></el-input> -->
					</template>
			</el-table-column>
			<el-table-column prop="deliver_type_" label="配送方式" width="60"> </el-table-column>
			<el-table-column prop="deliver_name" label="配送名称" width="60"> </el-table-column>
			<el-table-column prop="ps_time" label="配送时间" width="70"> </el-table-column>
			<el-table-column prop="num" align="center" label="数量" width="50"> </el-table-column>
			<el-table-column label="配送员" width="70">
				<template scope="scope">{{ scope.row.staff_name ? scope.row.staff_name + scope.row.staff_phone :'总部' }}</template>
			</el-table-column>
			<el-table-column label="提货点" min-width="80">
				<template scope="scope">{{ scope.row.merchant_company_name }}</template>
			</el-table-column>
			<el-table-column label="供货商" width="80">
			   <template scope="scope">{{ scope.row.supplier_company_name }}</template>
			</el-table-column>
			<el-table-column label="分销商" width="80">
				<template scope="scope">{{ scope.row.dis_name ? scope.row.dis_name :'总店' }}</template>
			</el-table-column>
			<el-table-column prop="finish_date" label="完成时间" width="80" v-if="data.query.status == 9"> </el-table-column>
            <el-table-column prop="deleted_at" label="删除时间" width="80" v-if="data.query.status == 11"> </el-table-column>
			<el-table-column label="创建日期" width="80">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="支付日期" width="80">
				<template scope="scope">{{ scope.row.payed_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="250"  v-if="user.role == 1">
				<template scope="scope">
					<!-- <el-button type="primary" size="small" @click="$refs.staff.ajax(scope.row,data.staff_new);" v-if="!scope.row.staff_userid">分配员工</el-button> -->
					<el-button type="primary" size="small" @click="finishOrder(scope.row)">完成</el-button>
					<el-button type="primary" size="small" @click="print(scope.row)">打印</el-button>
					<el-dropdown class="ml8">
						<el-button type="primary" size="small">
							更多<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu size="small" slot="dropdown">
                             <el-dropdown-item @click.native="onlyTrashed(scope.row)" v-if="scope.row.deleted_at">恢复订单</el-dropdown-item>
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
			<el-table-column label="操作" min-width="260"  v-if="user.role == 8">
					<template scope="scope">
					<el-button type="primary" size="small" @click="print(scope.row)">打印</el-button>
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
		<my-create-edit ref="createEdit"></my-create-edit>
		<my-after ref="after"></my-after>
		<my-suggest ref="suggest"></my-suggest>
		<my-staff ref="staff"></my-staff>


		<!-- 小票打印 -->
		<div class="print" style="display:none">
			<div style="font-size: 18px;text-align: center;margin-bottom: 15px;font-weight: bold;">电子票据</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">订单编号：<span style="font-size: 11px;font-family: Arial">{{order.order_no}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">姓名：{{order.addr_name}}</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">电话：<span style="font-size: 11px;font-family: Arial">{{order.addr_phone}}</span></div>
			<div style="border-bottom: 1px #333 double;margin: 10px 0;"></div>
			<table cellpadding="0" cellspacing="0" width="100%" >
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
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">自提点：{{order.merchant_company_name  }}</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">日期：<span style="font-size: 11px;font-family: Arial">{{order.payed_at}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;min-height: 40px;">备注：{{order.remark}}</div>
		</div>

	</section>
</template>
<script type="text/javascript">
	import {getLodop}  from '@/public/js/LodopFuncs' //导入模块
	export default {
		data() {
			return {
				formAction: '/admin/shop/order/lists?type=1',
				data: this.formatData(this),
				siteName: this.getSiteName(),
				tableName: 'orders',
				order:{},
				user:this.getUser(),
				status: this.getOptions("status"),
				sels: [], //列表选中列,
				searchFields: {

				},
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
				this.postAjax("/admin/shop/order/editField", {
					id: row.id,
					field: field,
					value: row[field]
				}, msg => {
					if (msg.data.status == 3) {
						row[field] = 0;
					}
				});
			},
	        onlyTrashed(order){
                let title = "是否恢复订单?";
                this.getConfirm(title, () => {
                	this.postAjax("/admin/shop/order/onlyTrashed", {
                		id: order.id,
                	}, msg => {
                		if (msg.data.status == 2) {
                			this.ajax();
                		}
                	});
                });
            },
			print(item){
				this.order = item;


				setTimeout(()=>{
					let LODOP=getLodop();
					LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
					LODOP.ADD_PRINT_HTM(0,0,'48mm','100%',$(".print").html());
					LODOP.PREVIEW();
				},500);
			},
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
			status5(){
			   let title = "是否批量发货?";
			   if(this.sels.length){
				   this.getConfirm(title, () => {
					   this.postAjax("/admin/shop/order/order-rob-all", { data: this.sels}, msg => {
						   if (msg.data.status == 2) {
							   this.ajax();
						   }
					   });
				   });
			   }
			},
			ajax() {

				this.getAjax(this, {

				}, msg => {});
			},
			exportExcel() {
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
				this.data.query.status = tab.name;
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
<style type="text/css">
.order_info{display: flex;border-bottom: 1px #eee solid;}
.order_info:last-child{border-bottom: 0;}
.order_info .pro_img .img{width: 40px;height: 40px;display: flex;border-radius: 5px;}
.order_info .p{line-height: 18px;}

.print .title{font-size: 18px;text-align: center;margin-bottom: 15px;font-weight: bold;}
.print .p1,.print .p1 span{font-size: 10px;line-height: 20px;}


.pro_img{width: 36px;height: 36px;display: flex;border-radius: 5px;}
.children_pro .el-table__expanded-cell{padding: 10px!important;}


</style>
