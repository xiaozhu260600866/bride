<template>
	<section class="pt15" v-if="data.show">
		<el-tabs v-model="type" type="card" @tab-click="changeType">
			<el-tab-pane label="会员详细信息" name="first"></el-tab-pane>
			<el-tab-pane :label="'在线商城订单记录('+data.orderType0Count+')'" name="second"></el-tab-pane>
			<el-tab-pane :label="'综合商城订单记录('+data.orderType1Count+')'" name="third"></el-tab-pane>
			<el-tab-pane :label="'套餐购买记录('+data.packageOrderCount+')'" name="fourth"></el-tab-pane>
			<el-tab-pane :label="'套餐消费记录('+data.packageOrderRecordCount+')'" name="seven"></el-tab-pane>
		</el-tabs>
		<!-- 会员详细信息start -->
		<div v-if="type == 'first'">
			<div class="ui-group">
				<div class="sec-title">会员详细信息</div>
				<div class="ui-info bd-e">
					<div class="uinfo-item">
						<p class="label">粉丝：</p>
						<div class="info">
							<img width="45" :src="ruleForm.headimgurl" v-if="ruleForm.headimgurl">
							<span>{{ ruleForm.userInfo.name }}</span>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">会员等级：</p>
						<div class="info">
							<el-select v-model="ruleForm.member_id" placeholder="普通会员">
								<el-option label="普通会员" value=""></el-option>
								<el-option :label="v.name" :value="v.id" v-for="v in data.lev"></el-option>
							</el-select>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">所属区域：</p>
						<div class="info">
							<div class="value" v-if="!ruleForm.area_name">
								<el-cascader placeholder="请输入城市" @active-item-change="handleItemChange"
									expand-trigger="hover" :options="data.citys" v-model="ruleForm.area"
									style="width: 100%"></el-cascader>
							</div>
							<div v-else>
								{{ruleForm.area_name}}
								<el-button @click="ruleForm.area_name=''" size="small">请点击更换城市</el-button>
							</div>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">所属经理：</p>
						<div class="info">
							<el-select v-model="ruleForm.userInfo.manager_id" placeholder="所属经理">
								<el-option label="无所属经理" :value="0"></el-option>
								<el-option :label="v.label" :value="v.value" v-for="v in data.managerLev"></el-option>
							</el-select>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">真实姓名：</p>
						<div class="info">
							<el-input placeholder="真实姓名" v-model="ruleForm.userInfo.name"></el-input>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">手机号码：</p>
						<div class="info">
							<el-input placeholder="手机号码" v-model="ruleForm.userInfo.phone"></el-input>
						</div>
					</div>
					<div class="uinfo-item" v-if='ruleForm.getAddress'>
						<p class="label">地址：</p>
						<div class="info">
							{{ruleForm.getAddress.province}} {{ruleForm.getAddress.city}}
							{{ruleForm.getAddress.area}}{{ ruleForm.getAddress.address }}
						</div>
					</div>

					<div class="uinfo-item">
						<p class="label">微信号：</p>
						<div class="info">
							<el-input placeholder="微信号" v-model="ruleForm.userInfo.wechat"></el-input>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">积分：</p>
						<div class="info">
							<el-input placeholder="0" v-model="ruleForm.userInfo.integral" :disabled="true"></el-input>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">余额：</p>
						<div class="info">
							<el-input placeholder="0" v-model="ruleForm.userInfo.amount" :disabled="true"></el-input>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">成交订单数：</p>
						<div class="info">
							<span class="Arial">{{ ruleForm.orderCount }}</span>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">成交金额：</p>
						<div class="info">
							<span class="Arial">{{ ruleForm.orderSum }}</span>元
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">注册时间：</p>
						<div class="info">
							<span class="Arial">{{ ruleForm.created_at }}</span>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">备注：</p>
						<div class="info">
							<span class="Arial">{{ ruleForm.userInfo.remark }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="ui-group">
				<div class="sec-title">设置分销商</div>
				<div class="ui-info bd-e">
					<div class="uinfo-item">
						<p class="label">上级分销商：</p>
						<div class="info in-btn">
							<el-input placeholder="0" v-model="ruleForm.userInfo.disName" :disabled="true"></el-input>
							<el-button size="small" type="primary" class="ml10"
								@click="$refs.changeParent.ajax(ruleForm);">选择上级分销商</el-button>
							<el-button size="small" @click="emtyDis">清空选择</el-button>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">累计佣金：</p>
						<div class="info">
							<span class="Arial">{{ data.dis ? data.dis.amount : ''}}</span>
						</div>
					</div>
					<div class="uinfo-item" v-if="data.dis">
						<p class="label">分销商等级：</p>
						<div class="info">
							<el-select v-model="ruleForm.dis_lev_id" placeholder="请选择分销商等级">
								<el-option label="普通分销商" value=""></el-option>
								<el-option :label="v.label" :value="v.id" v-for="v in data.disLev"></el-option>
							</el-select>
						</div>
					</div>
					<div class="uinfo-item">
						<p class="label">成为分销商时间：</p>
						<div class="info">
							<span class="Arial">{{ data.dis ? data.dis.created_at : ''}}</span>
						</div>
					</div>
					<div class="uinfo-item mtb20">
						<p class="label"></p>
						<div class="info">
							<el-button type="primary" @click="submit">提交</el-button>
							<el-button>取消</el-button>
						</div>
					</div>
				</div>
			</div>
			<my-changeParent ref="changeParent" @callBack="disCallBack"> </my-changeParent>
		</div>
		<div v-else-if="type == 'second' && show">
			<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
				 v-loading="data.listLoading">
				<el-table-column type="selection" width="50"> </el-table-column>
				<el-table-column label="区域" width="110">
					<template scope="scope">
						<el-input v-model="scope.row.area" class="area-input" @change="editField(scope.row,'area')">
						</el-input>
					</template>
				</el-table-column>
				<el-table-column prop="order_no" label="订单编号" width="80">
					<template scope="scope">
						{{scope.row.order_no}} <span
							v-if="scope.row.is_group">(团购{{scope.row.rob == 1 ? '完成':""}})</span>
					</template>
				</el-table-column>
				<el-table-column label="商品" width="130">
					<template scope="scope">
						<div v-if="data.query.status == 11">
							{{scope.row.product_str}}
						</div>
						<div v-else>
							<span v-for="product in scope.row.products"
								v-if="product.getProduct">{{ product.is_info ? product.getProduct.name+"("+product.attribute+")" : product.getProduct.name}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="桶设置" width="80">
					<template scope="scope">
						<p v-if="scope.row.bucket_type == '回桶'">
							{{scope.row.bucket_type}}：{{scope.row.bucket_brand + '*' + scope.row.bucket_num }}
						</p>
						<p v-if="scope.row.bucket_type != '回桶'">
							{{scope.row.bucket_type}}：{{scope.row.bucket_brand + '*' + scope.row.bucket_num }}
						</p>
					</template>
				</el-table-column>
				<el-table-column prop="num" align="center" label="数量" width="50"> </el-table-column>
				<el-table-column label="应付" width="160">
					<template scope="scope">
						<p>商品小计：<span class="Arial">￥{{ scope.row.amount }}</span></p>
						<p v-if="scope.row.shipping == 1">运　　费：<span class="Arial">￥{{ scope.row.yunfei }}</span></p>
						<p>折　　扣：-<span class="Arial">￥{{scope.row.payed_amount }}</span></p>
						<p>回　　桶：+<span class="Arial">￥{{scope.row.bucket_amount }}</span></p>
						<p v-if="scope.row.shipping == 1">应　　收1：<span
								class="Arial">￥{{ (parseFloat(scope.row.amount)  +  parseFloat(scope.row.yunfei)) - parseFloat(scope.row.payed_amount) + parseFloat(scope.row.bucket_amount)}}</span>
						</p>
						<p v-else>应　　收：<span
								class="Arial">￥{{ parseFloat(scope.row.amount) - parseFloat(scope.row.payed_amount) + parseFloat(scope.row.bucket_amount) }}</span>
						</p>
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
				<el-table-column prop="getShipping" label="发货方式" width="80"> </el-table-column>
				<el-table-column prop="status_message" label="状态" width="80"> </el-table-column>
				<el-table-column label="配送员" width="150">
					<template scope="scope">
						{{scope.row.staff_name}}
					</template>
				</el-table-column>
				<el-table-column label="商家" width="70">
					<template scope="scope">{{ scope.row.merchant_company_name }}</template>
				</el-table-column>
				<el-table-column label="供货商" width="150">
					<template scope="scope">
						{{scope.row.supplier_company_name}}
					</template>
				</el-table-column>
				<el-table-column label="回桶供货商" width="150">
					<template scope="scope">
						{{scope.row.getSupplierBucket.userInfo.company_name}}
					</template>
				</el-table-column>
				<el-table-column label="分销商" width="70">
					<template scope="scope">{{ scope.row.dis_name ? scope.row.dis_name :'总店' }}</template>
				</el-table-column>
				<el-table-column label="来源" width="70">
					<template
						scope="scope">{{ scope.row.source  && scope.row.source == 'admin' ? '后台' :'小程序' }}</template>
				</el-table-column>
				<el-table-column prop="getPayMethod" label="支付方式" width="80"> </el-table-column>
				<el-table-column prop="finish_date" label="完成日期" width="60"> </el-table-column>
				<el-table-column prop="bucket_date" label="回桶日期" width="60"> </el-table-column>
				<el-table-column prop="deleted_at" label="删除日期" width="60"> </el-table-column>
				<el-table-column label="支付日期" width="80">
					<template scope="scope">{{ scope.row.created_at }}</template>
				</el-table-column>

			</el-table>
		</div>
		<div v-else-if="type == 'third'&& show">
			<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
				 v-loading="data.listLoading" class="children_pro">
				<el-table-column type="selection" width="40"> </el-table-column>
				<el-table-column width="40" type="expand">
					<template scope="scope">
						<el-table ref="multipleTable" :data="scope.row.products" border tooltip-effect="dark"
							style="width: 100%"  v-loading="data.listLoading"
							class="pro_table">
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
						{{scope.row.order_no}} <span
							v-if="scope.row.is_group">(团购{{scope.row.rob == 1 ? '完成':""}})</span>
					</template>
				</el-table-column>
				<el-table-column label="应付" width="150">
					<template scope="scope">
						<p>商品小计：<span class="Arial">￥{{ scope.row.amount }}</span></p>
						<p v-if="scope.row.shipping == 1">运　　费：<span class="Arial">￥{{ scope.row.yunfei }}</span></p>
						<p>折　　扣：-<span class="Arial">￥{{scope.row.payed_amount }}</span></p>
						<p v-if="scope.row.shipping == 1">应　　收：<span
								class="Arial">￥{{ (parseFloat(scope.row.amount)  +  parseFloat(scope.row.yunfei)) - parseFloat(scope.row.payed_amount)}}</span>
						</p>
						<p v-else>应　　收：<span
								class="Arial">￥{{ parseFloat(scope.row.amount) - parseFloat(scope.row.payed_amount)}}</span>
						</p>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注" width="80"> </el-table-column>
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
					</template>
				</el-table-column>
				<el-table-column prop="deliver_type_" label="配送方式" width="60"> </el-table-column>
				<el-table-column prop="deliver_name" label="配送名称" width="60"> </el-table-column>
				<el-table-column prop="ps_time" label="配送时间" width="70"> </el-table-column>
				<el-table-column prop="num" align="center" label="数量" width="50"> </el-table-column>
				<el-table-column label="配送员" width="70">
					<template
						scope="scope">{{ scope.row.staff_name ? scope.row.staff_name + scope.row.staff_phone :'总部' }}</template>
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
				<el-table-column prop="finish_date" label="完成时间" width="80"> </el-table-column>
				<el-table-column prop="deleted_at" label="删除时间" width="80"> </el-table-column>
				<el-table-column label="创建日期" width="80">
					<template scope="scope">{{ scope.row.created_at }}</template>
				</el-table-column>
				<el-table-column label="支付日期" width="80">
					<template scope="scope">{{ scope.row.payed_at }}</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-else-if="type == 'fourth' && show">
			<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
				 v-loading="data.listLoading">
				<el-table-column type="selection" width="50"> </el-table-column>
				<el-table-column label="订单号" width="130">
					<template scope="scope"> {{ scope.row.order_no }}</template>
				</el-table-column>
				<el-table-column label="区域" width="100">
					<template scope="scope">
						{{scope.row.area}}
					</template>
				</el-table-column>
				<el-table-column label="套餐名称" min-width="150">
					<template scope="scope">
						{{ scope.row.getPackage ? scope.row.getPackage.name :'该套餐已被删除' }}</template>
				</el-table-column>
				<el-table-column prop="num" label="数量" width="60"> </el-table-column>
				

				<el-table-column label="姓名" width="100">
					<template scope="scope"> {{ scope.row.addr_name }}</template>
				</el-table-column>
				<el-table-column label="电话" width="120">
					<template scope="scope"> {{ scope.row.addr_phone }}</template>
				</el-table-column>

				<el-table-column label="地址" min-width="150">
					<template scope="scope">
						{{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</template>
				</el-table-column>
				<el-table-column label="商品" min-width="350">
					<template scope="scope">
						<div v-for="v in scope.row.getProduct">
							{{v.getProduct ? v.getProduct.name : '该商品已被删除' }}总次数：{{ v.num }} 剩余次数{{ v.left_num }}</div>
					</template>
				</el-table-column>
				<el-table-column label="日期" width="170">
					<template scope="scope">{{ scope.row.created_at }}</template>
				</el-table-column>
				<el-table-column label="备注" width="120">
					<template scope="scope"> {{ scope.row.remark }}</template>
				</el-table-column>
				<el-table-column prop="amount" label="价格" width="100"> </el-table-column>
			</el-table>
		</div>
		<div v-else-if="type == 'seven' && show">
			<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
				 v-loading="data.listLoading">
				<el-table-column type="selection" width="50"> </el-table-column>
				<el-table-column label="订单号" width="130">
					<template scope="scope"> {{ scope.row.order_no }}</template>
				</el-table-column>
				<el-table-column label="商品" min-width="150">
					<template scope="scope"> {{ scope.row.getProduct?scope.row.getProduct.name:'' }}
						{{scope.row.deleted_at}} </template>
				</el-table-column>
				<el-table-column label="回桶品牌" width="130">
					<template scope="scope">
						<div v-if="scope.row.bucket_type != '换桶'">
							<p v-if="scope.row.bucket_type == '回桶'">
								{{scope.row.bucket_type}}：{{scope.row.bucket_brand + '*' + scope.row.bucket_num }}</p>
							<p v-if="scope.row.bucket_type != '回桶'">
								{{scope.row.bucket_type}}：{{scope.row.bucket_brand + '*' + scope.row.bucket_num }}</p>
						</div>
						<div>
							回桶金额：{{scope.row.bucket_amount}}
						</div>

					</template>
				</el-table-column>
				<el-table-column prop="num" label="次数" width="50"> </el-table-column>
				<el-table-column label="姓名" width="80">
					<template scope="scope">
						{{ scope.row.getOrder ? scope.row.getOrder.addr_name : '该订单已被删除' }}</template>
				</el-table-column>
				<el-table-column label="电话" width="120">
					<template scope="scope">
						{{ scope.row.getOrder? scope.row.getOrder.addr_phone : '该订单已被删除' }}</template>
				</el-table-column>
				<el-table-column label="地址" min-width="150">
					<template scope="scope">
						<span
							v-if="scope.row.addr_address">{{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</span>
						<span v-else>
							<span v-if="scope.row.getOrder">
								{{ scope.row.getOrder.addr_city }}-{{ scope.row.getOrder.addr_area }}-{{ scope.row.getOrder.addr_address }}
							</span>

						</span>

					</template>
				</el-table-column>

				<el-table-column label="配送员" width="150">
					<template scope="scope">
						{{scope.row.getStaff.userInfo.name}}
					</template>
				</el-table-column>
				<el-table-column label="供货商" width="150">
					<template scope="scope">
						{{scope.row.getSupplier.userInfo.company_name}}
					</template>
				</el-table-column>

				<el-table-column label="回桶供货商" width="150">
					<template scope="scope">
						{{scope.row.getSupplierBucket.userInfo.company_name}}
					</template>
				</el-table-column>
				<el-table-column label="备注" width="160">
					<template scope="scope">
						{{scope.row.remark}}
					</template>
				</el-table-column>
				<el-table-column label="付款日期" width="100">
					<template scope="scope">{{ scope.row.created_at }}</template>
				</el-table-column>
				<el-table-column label="区域" width="100">
					<template scope="scope">
						{{scope.row.area}}
					</template>
					<!-- <template scope="scope">
						
						<el-input v-model="scope.row.area"  @change="editField(scope.row,'area')"></el-input>
			        </template> -->
				</el-table-column>
				<el-table-column label="接单日期" width="100">
					<template scope="scope">{{ scope.row.staff_at }}</template>
				</el-table-column>
				<el-table-column label="结束日期" width="100">
					<template scope="scope">{{ scope.row.finish_at }}</template>
				</el-table-column>
				<el-table-column prop="bucket_date" label="回桶日期" width="60"> </el-table-column>

			</el-table>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				formAction: '/admin/user/info',
				data: this.formatData(this),
				ruleForm: {},
				type: 'first',
				show:false,
				vipInfo: {
					class: '',
					name: '',
					phone: '',
					wechat: '',
					integral: '',
					balance: '',
					topdis: ''
				},
			}
		},
		mounted() {
			this.ajax();
		},
		methods: {
			changeType(tab) {
				
				if(tab.name !='first')this.show = false;
				if (tab.name == 'second') {
					this.formAction = "/admin/shop/order/lists?type=0&user_id=" + this.ruleForm.id + '&status=12';
					this.ajax();
				} else if (tab.name == "third") {
					this.formAction = "/admin/shop/order/lists?type=1&user_id=" + this.ruleForm.id + '&status=12';
					this.ajax();
				} else if (tab.name == "seven") {
					this.formAction = "/admin/shop/package/order-record-lists?user_id=" + this.ruleForm.id +
						"&status=12";
					this.ajax();
				} else if (tab.name == "fourth") {
					this.formAction = "/admin/shop/package/order-lists?user_id=" + this.ruleForm.id + "&status=12";
					this.ajax();
				} else if (tab.name == "six") {
					this.formAction = "/admin/user/amount-record?user_id=" + this.ruleForm.id + '&type=0';
					this.ajax();
				} else if (tab.name == "five") {
					this.formAction = "/admin/user/amount-record?user_id=" + this.ruleForm.id + '&type=1';
					this.ajax();
				} else if (tab.name == 'eight') {
					this.formAction = "/admin/user/share-lev?share_id=" + this.ruleForm.id;
					this.ajax();
				}
			},

			handleItemChange(row) {
				this.getChildren(this.data.citys, row);
			},
			getChildren(data, value) {
				data.forEach(v => {
					if (v.value == value[value.length - 1]) {
						this.postAjax("/city.html", {
							fid: value[value.length - 1]
						}, msg => {
							if (msg.data.arr.length) {
								v.children = msg.data.arr;
							}
						}, "notloging");
					}
					if (v.children && v.children.length) {

						return this.getChildren(v.children, value);
					}
				})



			},
			submit() {
				delete this.ruleForm.api_token;
				console.log(this.ruleForm);
				this.postAjax(this.formAction, this.ruleForm, msg => {
					if (msg.data.status == 2) {

					}

				});
			},
			emtyDis() {
				this.ruleForm.userInfo.disName = '总店';
				this.ruleForm.userInfo.distribution_id = 0;
			},
			disCallBack(res) {
				this.ruleForm.userInfo.disName = res.name;
				this.ruleForm.userInfo.distribution_id = res.id;
			},
			ajax() {
				this.getAjax(this, {}, msg => {
					this.show = true;
					if (msg.detail) {
						this.ruleForm = msg.detail;
					}
					this.ruleForm.area = this.ruleForm.area ? this.ruleForm.area.split(',') : []


		
					if (msg.dis) {
						this.ruleForm.userInfo.distribution_id = msg.dis.fid;
						this.$set(this.ruleForm, 'dis_lev_id', msg.dis.lev_id || "");

					}
					
					console.log(this.ruleForm);
				});
			},
		},
		components: {
			'my-changeParent': resolve => require(['../shop/dis/layouts/changeParent'], resolve),
		}
	}
</script>
<style type="text/css">
	.ui-group .sec-title {
		height: 40px;
		line-height: 40px;
		background: #f5f5f5;
		padding: 0 15px;
	}

	.ui-group .ui-info {
		padding: 10px 0;
	}

	.uinfo-item {
		display: flex;
		line-height: 36px;
		padding: 10px 0;
		color: #666;
	}

	.uinfo-item .label {
		width: 150px;
		text-align: right;
		padding-right: 5px;
		font-weight: bold;
	}

	.uinfo-item .info {
		flex: 1;
		overflow: hidden;
	}

	.uinfo-item .in-btn {
		display: flex;
		justify-content: flex-start;
	}

	.uinfo-item .in-btn .el-input {
		width: 300px;
	}

	.uinfo-item .el-input__inner {
		height: 34px;
		line-height: 34px;
		width: 300px !important;
	}
</style>
