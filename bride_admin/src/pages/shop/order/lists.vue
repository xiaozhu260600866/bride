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
                    <el-form-item label="配送员：">
                    	<el-input placeholder="请输入配送员" name="staff_name" v-model="data.query.staff_name"></el-input>
                    </el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="业务员：">
						<el-input placeholder="请输入业务员名称" name="staff_userid" v-model="data.query.staff_userid"></el-input>
					</el-form-item>
					<el-form-item label="配送地址：">
						<el-input placeholder="请输入客户地址" name="addr_address" v-model="data.query.addr_address"></el-input>
					</el-form-item>
					<el-form-item label="是否团购：">
						<el-select v-model="data.query.is_group" placeholder="请选择团购状态">
							<el-option label="团购中" :value="1"></el-option>
							<el-option label="团购完成" :value="2"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="是否使用优惠券：">
                    	<el-select v-model="data.query.is_coupon" placeholder="是否使用优惠券">
                    		<el-option label="否" :value="0"></el-option>
                    		<el-option label="是" :value="1"></el-option>
                    	</el-select>
                    </el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="支付方式：">
						<el-select v-model="data.query.pay_method" placeholder="请选择支付方式">
							<el-option label="微信支付" :value="1"></el-option>
							<el-option label="货到付款" :value="2"></el-option>
							<el-option label="翼支付" :value="3"></el-option>
							<el-option label="其他" :value="4"></el-option>
							<el-option label="水票" :value="5"></el-option>
							<el-option label="现金" :value="6"></el-option>
							<el-option label="月票" :value="7"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="送货方式：">
						<el-select v-model="data.query.shipping" placeholder="请选择送货方式">
							<el-option label="自提" value="1"></el-option>
							<el-option label="邮寄" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="来源：">
						<el-select v-model="data.query.sourceQuery" placeholder="请选择来源">
							<el-option label="小程序" value="wechatapp"></el-option>
							<el-option label="后台" value="admin"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
                    <el-form-item label="完成日期搜索：">
                        <el-date-picker placeholder="选择日期范围" type="daterange" v-model="data.query.finish_date"> </el-date-picker>
                    </el-form-item>
					<el-form-item label="回桶供应商：">
						<el-select v-model="data.query.supplier_bucket_id" placeholder="请选择回桶供应商">
							<el-option :label="v.label" :value="v.value" v-for="v in data.supplier"></el-option>
							
						</el-select>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="success" @click="exportExcel">导出</el-button>
				</div>
			</el-form>
		</div>
		<!-- <el-form-item>
			<el-input placeholder="配送员姓名" name="staff_name" v-model="data.query.staff_name"></el-input>
		</el-form-item> -->
		<el-col :span="24" class="flex">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax()">
				<el-tab-pane label="已付款" :name="''+3"></el-tab-pane>
				<el-tab-pane label="发货中" :name="''+5"></el-tab-pane>
				<el-tab-pane label="已完成" :name="''+9"></el-tab-pane>
				<el-tab-pane label="售后" :name="''+10"></el-tab-pane>
                <el-tab-pane :label="'已删除'" :name="''+11"></el-tab-pane>
			</el-tabs>
			<h3 class="pl15 lh-40">共{{data.sum}}件</h3>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
			@selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column label="区域" width="110">
            	<template scope="scope">
					<el-input v-model="scope.row.area" class="area-input" @change="editField(scope.row,'area')"></el-input>
                </template>
            </el-table-column>
			<el-table-column prop="order_no" label="订单编号" width="80">
				<template scope="scope">
					{{scope.row.order_no}} <span v-if="scope.row.is_group">(团购{{scope.row.rob == 1 ? '完成':""}})</span>
				</template>

			</el-table-column>
			<el-table-column label="商品" width="130">
				<template scope="scope">
                <div v-if="data.query.status == 11">
                      {{scope.row.product_str}}
               </div>
               <div v-else>
                    <span v-for="product in scope.row.products" v-if="product.getProduct">{{ product.is_info ? product.getProduct.name+"("+product.attribute+")" : product.getProduct.name}}</span>
               </div>
                </template>
			</el-table-column>

            <el-table-column label="桶设置" width="80">
            	<template scope="scope">
                    <p v-if="scope.row.bucket_type == '回桶'">{{scope.row.bucket_type}}：{{scope.row.bucket_brand + '*' + scope.row.bucket_num }}</p>
                    <p v-if="scope.row.bucket_type != '回桶'">{{scope.row.bucket_type}}：{{scope.row.bucket_brand + '*' + scope.row.bucket_num }}</p>
                </template>
            </el-table-column>
			<el-table-column prop="num" align="center" label="数量" width="50"> </el-table-column>
			<el-table-column label="应付" width="160">
				<template scope="scope">
					<p>商品小计：<span class="Arial">￥{{ scope.row.amount }}</span></p>
					<p v-if="scope.row.shipping == 1">运　　费：<span class="Arial" >￥{{ scope.row.yunfei }}</span></p>
					<p>折　　扣：-<span class="Arial">￥{{scope.row.payed_amount }}</span></p>
					<p>回　　桶：+<span class="Arial">￥{{scope.row.bucket_amount }}</span></p>
					<p v-if="scope.row.shipping == 1">应　　收1：<span class="Arial" >￥{{ (parseFloat(scope.row.amount)  +  parseFloat(scope.row.yunfei)) - parseFloat(scope.row.payed_amount) + parseFloat(scope.row.bucket_amount)}}</span></p>
			        <p v-else>应　　收：<span class="Arial">￥{{ parseFloat(scope.row.amount) - parseFloat(scope.row.payed_amount) + parseFloat(scope.row.bucket_amount) }}</span></p>
				</template>
			</el-table-column>
			<el-table-column label="客户信息" width="115">
				<template scope="scope">
					<p>{{ scope.row.addr_name}}</p>
					<p>{{ scope.row.nickname}} ({{scope.row.role == 5 ? '商家' : '会员'}}) </p>
					<p>{{ scope.row.addr_phone}}</p>
				</template>
			</el-table-column>
			<el-table-column label="地址" min-width="120" prop="getAddress"> </el-table-column>
		   <!-- <el-table-column label="地址" min-width="140">
				<template scope="scope">
					<div v-if="scope.row.fclass !=238">{{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</div>
					<div v-else>
						<p>寄件人姓名:{{scope.row.send_name}}</p>
						<p>寄件人街道地址:{{scope.row.send_address}}</p>
						<p>寄件人城市:{{scope.row.send_city}}</p>
						<p>寄件人省份:{{scope.row.send_province}}</p>
						<p>寄件人邮编:{{scope.row.send_post}}</p>
						<p>寄件人国家:{{scope.row.send_country}}</p>
						<p>寄件人电话:{{scope.row.send_phone}}</p>
						<p>收件人姓名:{{scope.row.addr_name}}</p>
						<p>收件人街道地址:{{scope.row.addr_address}}</p>
						<p>收件人城市:{{scope.row.addr_city}}</p>
						<p>收件人省份:{{scope.row.addr_province}}</p>
						<p>收件人邮编:{{scope.row.addr_post}}</p>
						<p>收件人国家:{{scope.row.addr_country}}</p>
						<p>收件人电话:{{scope.row.addr_phone}}</p>
					</div>
				</template>
			</el-table-column> -->
			<el-table-column prop="getShipping" label="发货方式" width="80"> </el-table-column>
			<el-table-column prop="status_message" label="状态" width="80"> </el-table-column>
			<el-table-column label="配送员" width="150">
				<template scope="scope">
					<el-select v-model="scope.row.staff_name" placeholder="请选择配送员" @change="editStaff($event,scope.row)" filterable>
						<el-option :label="v.userInfo.name" :value="v.id" v-for="v in data.staff_new"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="商家" width="70">
				<template scope="scope">{{ scope.row.merchant_company_name }}</template>
			</el-table-column>
			<el-table-column label="供货商" width="150">
				<template scope="scope">
					<el-select v-model="scope.row.supplier_company_name" placeholder="请选择供货商" @change="editSupplier($event,scope.row)">
						<el-option :label="v.label" :value="v.value" v-for="v in data.supplier"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="回桶供货商" width="150">
				<template scope="scope">
					<el-select v-model="scope.row.getSupplierBucket.userInfo.company_name" placeholder="请选择供货商" @change="editSupplierBucket($event,scope.row)">
						<el-option :label="v.label" :value="v.value" v-for="v in data.supplier"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="分销商" width="70">
				<template scope="scope">{{ scope.row.dis_name ? scope.row.dis_name :'总店' }}</template>
			</el-table-column>
			<el-table-column label="来源" width="70">
				<template scope="scope">{{ scope.row.source  && scope.row.source == 'admin' ? '后台' :'小程序' }}</template>
			</el-table-column>
			<el-table-column prop="getPayMethod" label="支付方式" width="80"> </el-table-column>
			<el-table-column prop="finish_date" label="完成日期" width="60"> </el-table-column>
			<el-table-column prop="bucket_date" label="回桶日期" width="60" > </el-table-column>
			<el-table-column prop="deleted_at" label="删除日期" width="60" > </el-table-column>
			<el-table-column label="支付日期" width="80">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template scope="scope">
				<!-- 	<el-button type="primary" size="small" @click="$refs.staff.ajax(scope.row,data.staff_new);" v-if="scope.row.status < 9">分配员工</el-button> -->
					<el-button type="primary" size="small" @click="print(scope.row)">打印</el-button>
					<!-- <el-button type="primary" size="small" @click="finishOrder(scope.row)">完成</el-button> -->
					<el-dropdown class="ml10">
						<el-button type="primary" size="small">
							更多<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="finishOrder(scope.row)" v-if="scope.row.status < 9">完成</el-dropdown-item>
                            <el-dropdown-item @click.native="onlyTrashed(scope.row)" v-if="scope.row.deleted_at">恢复订单</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.suggest.ajax(scope.row.products);" v-if="scope.row.suggestStatus >  0">查看评价</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.after.ajax(scope.row);" v-if="scope.row.status >  9">查看售后</el-dropdown-item>
							<el-dropdown-item @click.native="changeOrder(scope.row,0,'是否取消该笔订单',msg=>{
								ajax();
							})" v-if="scope.row.status < 9">订单取消</el-dropdown-item>
							<el-dropdown-item @click.native="changeOrder(scope.row,10,'是否售后该笔订单',msg=>{
								ajax();
							})" v-if="scope.row.status < 9">订单售后</el-dropdown-item>
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


		<!-- 小票打印 -->
		<div class="print" style="display:none">
			<div style="font-size: 18px;text-align: center;margin-bottom: 15px;font-weight: bold;">电子票据</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">订单编号：<span style="font-size: 11px;font-family: Arial">{{order.order_no}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">日期：<span style="font-size: 11px;font-family: Arial">{{order.payed_at}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">姓名：{{order.addr_name}}</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">电话：<span style="font-size: 11px;font-family: Arial">{{order.addr_phone}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">地址：{{order.addr_address}}</div>

			<div style="border-bottom: 1px #333 double;margin: 10px 0;"></div>
			<table cellpadding="0" cellspacing="0" width="100%" >
				<tr>
					<td height="18" width="52%" style="font-size: 10px;">名称</td>
					<td width="12%" style="font-size: 10px;font-family: Arial;text-align: center;">数量</td>
					<td width="18%" style="font-size: 10px;font-family: Arial;text-align: right;">小计</td>
				</tr>
			</table>
			<table cellpadding="0" cellspacing="0" width="100%" v-for="v in order.products" v-if="v.getProduct">
				<tr>
				 <td height="18" width="52%" style="font-size: 10px;">{{v.attribute ? v.attribute : v.getProduct.name}}</td>
				 <td width="12%" style="font-size: 10px;font-family: Arial;text-align: center;">{{v.num}}</td>
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
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;min-height: 40px;">备注：{{order.remark}}</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	import {getLodop}  from '@/public/js/LodopFuncs' //导入模块
	export default {
		data() {
			return {
				formAction: '/admin/shop/order/lists/',
				data: this.formatData(this),
				siteName: this.getSiteName(),
				tableName: 'orders',
				status: this.getOptions("status"),
				order:{},
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
			editSupplier(event,row){
				console.log(event)
				console.log(row)
				this.postAjax("/admin/shop/order/edit-supplier",{id:row.id,take_supplier_user_id:event}).then(msg=>{
					if(msg.data.status == 2){
						this.ajax();
					}
				});
			},
			editSupplierBucket(event,row){
				this.postAjax("/admin/shop/order/edit-supplier",{id:row.id,supplier_bucket_id:event}).then(msg=>{
					if(msg.data.status == 2){
						this.ajax();
					}
				});
			},
			editStaff(event,row){
				console.log(event)
				console.log(row)
				this.postAjax("/admin/shop/order/edit-staff",{id:row.id,staff_userid:event}).then(msg=>{
					if(msg.data.status == 2){
						this.ajax();
					}
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
			ajax() {

				this.getAjax(this, msg => {});
			},
			exportExcel() {
			   let url = this.urlApendOpenid("/admin/shop/order/export?type=0", this);
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
