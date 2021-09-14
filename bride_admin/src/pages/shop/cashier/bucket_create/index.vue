<template>
	<section class="cash-box clearfix" v-if="data.show">
		<div class="cash-left">
			<div class="header4 searchMemberInfo">
				<div class="form_info">
					<div class="row_group">
						<div class="row_item">
							<div class="label">搜索</div>
							<div class="searchInput value pl5">
								<searchClient @callback="searchClientCallBack" ref="searchMember" myclass="cl-search" packageType="1"></searchClient>
							</div>
						</div>
						<div class="row_item">
							<div class="label">电话</div>
							<div class="value">{{ clientInfo.phone }}</div>
						</div>
					</div>
					<div class="row_group">
						<div class="row_item">
							<div class="label">余额</div>
							<div class="value">{{ clientInfo.amount }}</div>
						</div>
						<div class="row_item">
							<div class="label">交易金额</div>
							<div class="value">{{ clientInfo.orderSum }}</div>
						</div>
						<div class="row_item">
							<div class="label">交易次数</div>
							<div class="value">{{ clientInfo.orderCount }}</div>
						</div>
					</div>
					<div class="row_group">
						<div class="row_item">
							<div class="label">城市</div>
							<div class="value" v-if="!clientInfo.area_name">
								<el-cascader placeholder="请输入城市"  @active-item-change="handleItemChange" expand-trigger="hover" :options="data.citys" v-model="clientInfo.area" style="width: 100%"></el-cascader>
							</div>
                            <div class="value flex-middle flex-between" v-else>
                               <div class="flex1">{{clientInfo.area_name}}</div>
                               <el-button @click="clientInfo.area_name=''" type="primary" size="mini">更换城市</el-button>
                            </div>
						</div>
					</div>
					<div class="row_group">
						<div class="row_item">
							<div class="label">地址</div>
							<div class="value">
								<el-select v-model="clientInfo.address" placeholder="请选择">
									<el-option v-for="v in clientInfo.getAddresses" :label="v.address" :value="v.address"></el-option>
								</el-select>
							</div>
						</div>
					</div>
					<div class="row_group">
						<div class="row_item other">
							<div class="label">最后一次订单</div>
							<div class="value">{{clientInfo.lastOrder ? clientInfo.lastOrder.date + clientInfo.lastOrder.product_str : '暂无'}}</div>
						</div>
					</div>
					<div class="row_group">
						<div class="row_item">
							<div class="label">备注</div>
							<div class="value"><span v-if="clientInfo.userInfo">{{ clientInfo.userInfo.remark }}</span></div>
						</div>
					</div>
				</div>
				<div class="head-right">
					<div class="package_div">
						<div class="head-table">
							<table class="">
								<thead>
									<tr>
										<th width="45%" align="center">空桶项目</th>
										<th width="15%" align="center">空桶次数</th>
										<th width="15%" align="center">剩余</th>
										<th width="25%" align="center">到期时间</th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="body-table">
							<table class="table-hover packageTable">
								<tbody>
									<tr v-if="clientInfo.getPackageOrder" v-for="v in clientInfo.getPackageOrder"
										@click="toAddCart(v,3)">
										<td width="45%" align="center">{{ v.getPackage ? v.getPackage.name:'' }}->{{  v.getProduct ? v.getProduct.name :'' }}</td>
										<td width="15%" align="center">{{ v.num }}</td>
										<td width="15%" align="center">{{ v.left_num }}</td>
										<td width="25%" align="center">无</td>
									</tr>
									<tr v-if="clientInfo.getPackageOrder && clientInfo.getPackageOrder.length == 0">
										<td width="45%" align="center" colspan="4">暂无</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="searchInfo">
				<ul class="cash-nav product_type">
					
					<li :class="['type3' ,showType == 2 ? 'active' :'']" @click="showType = 2"><a href="javascript:;">购买空桶<span
								class="num_count cart_type2_length">{{ cartData2.length }}</span></a></li>
					<li :class="['type3' ,showType == 3 ? 'active' :'']"><a href="javascript:;" @click="showType = 3">空桶结算<span
								class="num_count cart_type3_length">{{ cartData3.length }}</span></a></li>
				</ul>
				<div class="header-table cart_type0">
					<table class="table">
						<thead>
							<tr id="cartType0">
								<th width="20%">名称</th>
								<th width="10%" class=" right">单价</th>
								<th width="7%" class=" right">数量</th>
								<th width="7%" class=" right">运费</th>
								<th width="10%" class=" right">小计</th>
								<th width="15%" class=" right">选择员工</th>
								<th width="15%" class=" right">备注</th>
								<th width="10%" class=" center">操作</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="table-scroll cart_type0" v-if="showType == 0">
					<table class="table cart_type0">
						<tbody>
							<tr :id="'goods_'+item.id" class="price_count" data-id="" v-for="(item,index) in cartData0">
								<td width="20%" class="" v-html="item.name"></td>
								<td width="10%" class=" right"><input class="discount" type="" name="" v-model="item.price"
										@click="selectAll($event)"></td>
								<td width="7%" class=" right"><input type="text" name="num" v-model="item.num" class="num"
										@click="selectAll($event)"></td>
								<td width="7%" class=" right"> {{ item.yunfei }}</td>
								<td width="10%" class=" right price-count"> {{ item.price *item.num }} </td>
								<td width="15%" class=" right "> <a href="javascript:;" @click="$refs.commission.ajax(0,index,item.staff,item.ps_price)">{{ item.staff && item.staff.length > 0 ? item.staff[0].label : '请选择员工' }}</a></td>
								<td width="15%" class=" right"> <input type="text" v-model="item.remark"></td>
								<td width="10%" class=" center">
									<a href="javascript:;"><i class="el-icon-plus" aria-hidden="true" @click="item.num++"></i></a>
									&nbsp;&nbsp;
									<a href="javascript:;"><i class="el-icon-minus" aria-hidden="true" @click="item.num <=1 ?  cartData0.splice(index,1):item.num--"></i></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="table-scroll cart_type0" v-if="showType == 2">
					<table class="table cart_type0">
						<tbody>
							<tr :id="'goods_'+item.id" class="price_count" data-id="" v-for="(item,index) in cartData2">
								<td width="20%" class="" v-html="item.name"></td>
								<td width="10%" class=" right"><input class="discount" type="" name="" v-model="item.price" @click="selectAll($event)"></td>
								<td width="7%" class=" right"><input type="text" name="num" v-model="item.num" class="num" @click="selectAll($event)"></td>
								<td width="7%" class=" right"> {{ item.yunfei }}</td>
								<td width="10%" class=" right price-count"> {{ item.price *item.num }} </td>
								<td width="15%" class=" right ">
									<a href="javascript:;" @click="$refs.commission.ajax(0,index,item.staff,item.ps_price)">{{ item.staff && item.staff.length > 0 ? item.staff[0].label : '请选择员工' }}</a>
								</td>
								<td width="15%" class=" right"> <input type="text" v-model="item.remark"></td>
								<td width="10%" class=" center">
									<a href="javascript:;"><i class="el-icon-plus" aria-hidden="true" @click="item.num++"></i></a>
									&nbsp;&nbsp;
									<a href="javascript:;"><i class="el-icon-minus" aria-hidden="true" @click="item.num <=1 ?  cartData2.splice(index,1):item.num--"></i></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="table-scroll cart_type0" v-if="showType == 3">
					<table class="table cart_type0">
						<tbody>
							<tr :id="'goods_'+item.id" class="price_count" data-id="" v-for="(item,index) in cartData3">
								<td width="20%" class="" v-html="item.name"></td>
								<td width="10%" class=" right"><input class="discount" type="" name="" v-model="item.price"
										@click="selectAll($event)"></td>
								<td width="7%" class=" right"><input type="text" name="num" v-model="item.num" class="num"
										@click="selectAll($event)"></td>
								<td width="7%" class=" right"> {{ item.yunfei }}</td>
								<td width="10%" class=" right price-count"> {{ item.price *item.num }} </td>
								<td width="15%" class=" right "> <a href="javascript:;" @click="$refs.commission.ajax(3,index,item.staff,item.ps_price)">{{ item.staff && item.staff.length > 0 ? item.staff[0].label : '请选择员工' }}</a>
								</td>
								<td width="15%" class=" right"> <input type="text" v-model="item.remark"></td>
								<td width="10%" class=" center">
									<a href="javascript:;"><i class="el-icon-plus" aria-hidden="true" @click="item.num++"></i></a>
									&nbsp;&nbsp;
									<a href="javascript:;"><i class="el-icon-minus" aria-hidden="true" @click="item.num <=1 ?  cartData3.splice(index,1):item.num--"></i></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="footer">
				<div class="orders">
					<div class="left float_l" @click="submit"><button type="button" class="el-button el-button--danger el-button--large">
							<span>普通结算</span></button></div>
					<div class="priceInfo float_r">
						合计：￥<span class="red amount Arial"> {{ total }}</span></div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<div class="cash-right">
			<div class="cash-nav">
				<ul class="flex flex-between" @mouseleave="productFclassDiag=false;zclassData=[]">
					<div class="nav-tab-item pull-left">
						<!-- <li :class="['cash-nav-tabs' , showTypeDiv ==1 ? 'active' :'']">
							<a href="javascript:;" id="service_project" @mouseover="productFclassDiag=true;showTypeDiv=1">商品</a>
							<ul class="first_menu" v-if="productFclassDiag">
								<li class="menu_list"><a href="javascript:;" @click="showTypeDiv=1;data.query.fclass=-1;ajax()">全部</a></li>
								<li class="menu_list flex-middle" v-for="v in data.productClass">
									<a @click="showTypeDiv=1;data.query.fclass=v.id;ajax()" @mouseover="showZclass(v.children)" href="javascript:;"
									 :title="v.name">
										<span>{{ v.name }}<i class="el-icon-arrow-right fs-12" v-if="v.children && v.children.length>0"></i></span>
									</a>
								</li>
							</ul>
							<ul class="second_menu" v-if="zclassData.length">
								<li class="menu_list" v-for="v in zclassData" @click=";data.query.fclass = v.id;ajax()">
									<a href="javascript:;">{{ v.name }}</a>
								</li>
							</ul>
						</li> -->
						<li :class="['cash-nav-tabs' , showTypeDiv ==2 ? 'active' :'']">
							<a href="javascript:;" @mouseover="showPclassDig=false;showP1classDig=false;showTypeDiv=2">空桶项目</a>
						</li>
					</div>
					<li class="pull-right nav_search" style="position: relative;">
						<input type="text" placeholder="搜索商品" class="input-txt member-search" style="height: 34px;"
						 v-model="data.query.name" @keyup="ajax">
						<span style="position: absolute; right: 5px; top: 5px;">
							<i aria-hidden="true" class="fa fa-search"></i>
						</span>
					</li>
				</ul>
			</div>
			<div class="list-detail" v-if="showTypeDiv == 1">
				<div class="pro-section">
					<div id="food_menu">
						<table class="table">
							<thead>
								<tr id="productInfo1" class="ta_th_tr">
									<th class="col-md-6 col-xs-5 w-b60">商品名称</th>
									<th class="col-md-2 col-xs-4 w-b20">售价</th>
								</tr>
							</thead>
							<tbody>
								<tr class="product2" v-for="v in data.productLists.data" @click="v.info.length ? $refs.info.ajax(v):toAddCart(v,0)">
									<td>{{ v.name }}</td>
									<td>￥{{ v.price }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<!--  套餐项目-start -->
			<div class="detail-list" v-show="showTypeDiv == 2">
				<div class="search_type2 searchInfo" style="">
					<table class="table">
						<thead>
							<tr id="productInfo1" class="ta_th_tr">
								<th class="col-md-6">空桶名称</th>
								<th class="col-md-4">价格</th>
							</tr>
						</thead>
						<tbody>
							<tr class="product2" v-for="v in data.package" @click="toAddCart(v,2)">
								<td>{{ v.name }}</td>
								<td>{{ v.amount }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!--  套餐项目-end -->
		</div>
		<payConfirm :amount="total" :clientInfo="clientInfo" ref="pay_confirm" :category="data.category" @callBack="payCallBack"  :brand="data.brand" :cartData0="cartData0" :cartData2="cartData3"></payConfirm>
		<commission :staff="data.staff" ref="commission" @callBack="comCallBack"></commission>
		<info ref="info" @callBack="infoCallBack"></info>
		<packageProduct ref="packageProduct" @callBack="packageProductCallBack"></packageProduct>
	</section>
</template>
<script type="text/javascript">
	import "./index.css";
	import searchClient from "@/components/searchClient";
	import payConfirm from "./pay_confirm";
	import info from "./info";
	import packageProduct from "./packageProduct";
	import commission from "@/components/commission";
	export default {
		data() {
			return {
				formAction: '/admin/shop/order/add',
				clientInfo: [],
				productFclassDiag: false,
				zclassData: [],
				showType: 2,
				showTypeDiv: 2,
				cartData0: [],
				/*购物车服务项目*/
				cartData2: [],
				/*购物配餐项目*/
				cartData3: [],
                canOk:true,
				data: this.formatData(this)
			}
		},
		mounted() {
			this.ajax();
		},
		computed: {
			total: function() {
				var total = 0;
				for (var i in this.cartData0) {
					total += this.cartData0[i].price * this.cartData0[i].num + parseFloat(this.cartData0[i].yunfei);
				}
				for (var i in this.cartData3) {
					total += this.cartData3[i].price * this.cartData3[i].num;
				}
				for (var i in this.cartData2) {
					total += this.cartData2[i].price * this.cartData2[i].num;
				}
				console.log(total);
				return total.toFixed(2)
			},
		},
		methods: {
            handleItemChange(row){
               this.getChildren(this.data.citys,row);
            },
            getChildren(data,value){
                   data.forEach(v=>{
                       if(v.value == value[value.length -1]){
                           this.postAjax("/city.html",{fid:value[value.length -1]},msg=>{
                               if(msg.data.arr.length){
                                   v.children = msg.data.arr;
                               }
                           },"notloging");
                       }
                       if(v.children && v.children.length){

                            return this.getChildren(v.children,value);
                       }
                   })



            },
			infoCallBack(row) {
				this.toAddCart(row, 0);
			},
			comCallBack(row) {

				if (row.cartType == 0) {
					this.cartData0[row.key].staff = row.data;
					console.log(this.cartData0[row.key]);
				} else {
					this.cartData3[row.key].staff = row.data;
				}
			},
			payCallBack(ruleForm) {
				this.postAjax(this.formAction, {
					cartData2: this.cartData2,
					total: this.total,
					cartData0: this.cartData0,
					cartData3: this.cartData3,
					clientInfo: this.clientInfo,
					ruleForm: ruleForm
				}, msg => {
					if (msg.data.status == 2) {
						this.$refs.pay_confirm.handleClose();
						setTimeout(() => {
							window.location.reload();
						}, 1000)
					}
				});
			},
			submit() {
				if (!this.clientInfo.id) {
					this.getError("客户还没有选择");
					return false;
				}
				if (this.cartData0.length == 0 && this.cartData3.length == 0 && this.cartData2.length == 0) {
					this.getError("购物车内容非空");
					return false;
				}
				this.$refs.pay_confirm.ajax();


			},
			zkOrYh(item) {
				if (item.zk > 0) {
					var yh = (((item.zk * item.price) / 10)).toFixed(2);

					item.yh = item.price - yh;
				} else if (parseInt(item.yh) > 0 && parseInt(item.zk) <= 0) {
					item.zk = (((item.yh / item.price) * 10).toFixed(2));
				}
			},
			selectAll(event) {
				let obj = event.currentTarget;
				$(obj).select();
			},
			addProduct() {

			},
			packageProductCallBack(item){
				this.showType = 2;
				this.cartData2.push({
					name: item.name,
					package_id: item.id,
					ps_price: 0,
					price: item.amount,
					amount: item.amount,
					products:item.getProduct,
					num: 1,
					is_info: false,
					is_check: 1,
					remark: '',
					yunfei: 0,
					staff: []
				});
			},
			toAddCart(item, type) {
				console.log(item)
				if (type == 0) {
					this.showType = 0;
					if (item.is_info) {
						this.cartData0.push({
							name: item.name,
							ps_price: item.ps_price,
							product_id: item.id,
							is_info: true,
							info_id: item.info_id,
							price: item.price,
							amount: item.price,
							num: 1,
                            brand:item.brand_name,
							yunfei: item.yunfei,
							remark: '',
							is_check: 1,
							staff: []
						});
					} else {

						this.cartData0.push({
							name: item.name,
							product_id: item.id,
							ps_price: item.ps_price,
							price: item.price,
							amount: item.price,
							num: 1,
							remark: '',
							is_info: false,
                             brand:item.brand_name,
							is_check: 1,
							yunfei: item.yunfei,
							staff: []
						});
					}
					//如果是购买套餐
				} else if (type == 2) {
					this.$refs.packageProduct.ajax(item);
					// this.showType = 2;
					// this.cartData2.push({
					// 	name: item.name,
					// 	package_id: item.id,
					// 	ps_price: 0,
					// 	price: item.amount,
					// 	amount: item.amount,
					// 	num: 1,
					// 	is_info: false,
					// 	is_check: 1,
					// 	remark: '',
					// 	yunfei: 0,
					// 	staff: []
					// });

				} else {
					//如果是计次消费
					this.showType = 3;
					console.log(item);
					this.cartData3.push({
						name: item.getPackage.name + '->' + item.getProduct.name,
						id: item.id,
						ps_price: item.getPackage.ps_price,
						price: 0,
						amount: 0,
                         brand:item.getProduct.brand_name,
						yunfei: 0,
						remark: '',
						num: 1,
						staff: []
					});

				}



			},
			showZclass(v) {
				if (v && v.length) {
					this.zclassData = v;
				} else {
					this.zclassData = [];
				}
			},
			ajax() {
				this.getAjax(this, {type:1}, msg => {
					this.productFclassDiag = false;
					this.zclassData = []
				});
			},
			searchClientCallBack(item) {
				this.clientInfo = item;
				item.address ='';
				item.address = item.getAddress ? item.getAddress.province + item.getAddress.city + item.getAddress.area + item.getAddress.address : item.address;
				item.phone = item.getAddress ? item.getAddress.phone : item.phone;
				console.log(item);
				console.log(this.clientInfo);
			}
		},
		components: {
			searchClient,
			payConfirm,
			commission,
			info,
			packageProduct
		}
	}
</script>
