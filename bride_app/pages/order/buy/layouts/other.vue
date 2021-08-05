<template>
	<section>
		<section v-if="data.show">
			<div id="address" class="bgf plr10" v-if="ruleform.shipping !=1">
				<block v-if="!address">
					<div class="add-add ptb15" @click="$parent.createAddress">
						<p class="add-icon iconfont icon-count-plus mr10"></p>
						<p class="add-txt fs-16">新增收货地址</p>
						<p class="iconfont icon-right fs-12 fc-9"></p>
					</div>
				</block>
				<block v-else>
					<div class="add-info" @click="$parent.addressLists">
						<div class="info ptb10">
							<p class="name fs-16">
								<span>{{address.name}}</span>
								<span class="Arial pl10">{{address.phone}}</span>
							</p>
							<div class="add-detail fs-15 fc-6">
								<p class="label">地址：</p>
								<p class="name">{{ address.province }} {{ address.city }} {{ address.area }} {{ address.address }}</p>
							</div>
						</div>
						<p class="iconfont icon-right fs-12 fc-9 pl15"></p>
					</div>
				</block>
			</div>
			<div class="pay_line bgf" v-if="ruleform.shipping !=1">
				<image src="https://boss.doxinsoft.com/images/site/share-tip.png"></image>
			</div>
			<div class="pro-info bgf mb8" v-for="item in ruleform.products">
				<div class="cart-tb p10">
					<div class="pro-img pr10">
						<image :src="item.getProduct.firstCover" />
					</div>
					<div class="pro-name">
						<div class="name lh20 fs-15 nowrap">{{item.getProduct.name}}</div>
						<div class="mark">
							<p class="nowrap fs-12" v-if="item.is_info">{{item.attribute}}</p>
						</div>
						<div class="group lh20">
							<p class="num fs12">数量：<span class="Arial">{{item.num}}</span></p>
							<p class="price fs14" valign="center">￥{{item.amount}}</p>
						</div>
					</div>
				</div>
			</div>
			<div id="mode" class="bgf mb10">
				<div :class="['weui-cell','weui-cell_input']" @click="previewImage(ruleform.order_no+'.png','order')" v-if="ruleform.status >=3">
					<div class="weui-cell__hd">
						<slot name="left" />
						<div class="weui-label fs14">券码</div>
					</div>
					<div class="weui-cell__bd text-right"></div>
					<div class="weui-cell__ft flex">
						<img :src="getSiteName+'/upload/images/order/'+ruleform.order_no+'.png'" style="width:25px;height:25px">
						<div class="weui-cell__ft_in-access"></div>
					</div>
				</div>
				<weui-input v-model="ruleform.shipping" name="shipping" datatype="require" label="送货方式" changeField="value" type="select"
				 dataKey="shipping" :disabled="ruleform.fclass == 109 || ruleform.fclass == 110 ||ruleform.status >=3 ? true :false"
				 @callback="selectCallBack"></weui-input>

				<!-- <weui-input v-model="ruleform.merchant_user_id" name="merchant_user_id" datatype="require" label="门店" changeField="value" type="select" :data="data.merchantUser" :disabled="ruleform.status >=3 ? true :false" v-if="ruleform.shipping == 1"></weui-input> -->

				<a hover-class="none" :class="['weui-cell','weui-cell_input','p10','bd-be','industry']" @click="chooseMerchant"
				 v-if="ruleform.shipping == 1">
					<div class="weui-cell__hd">
						<div class="weui-label fs14">选择门店<span class="font_red">*</span></div>
					</div>
					<div class="weui-cell__bd">
						<div class="font_666 fs14 nowrap text-right">
							{{ ruleform.merchant_user_id ?ruleform.merchant_user_name :'请选择门店' }}
						</div>
					</div>
					<div class="weui-cell__ft weui-cell__ft_in-access"></div>
				</a>
				<div class="weui-cell weui-cell_input" v-if="ruleform.fclass != 109 && ruleform.fclass != 110 && data.coupons && data.coupons.length == 0">
					<div class="weui-cell__bd"><label class="fs14">优惠券</label></div>
					<div class="weui-cell__ft"><label class="fs14">暂无</label></div>
				</div>
				<weui-input v-model="ruleform.coupon_value" name="coupon_value" label="优惠券" changeField="value" type="select"
				 dataKey="coupons" v-if="data.coupons && data.coupons.length > 0" :disabled="ruleform.status >=3 ? true :false"
				 @callback="$parent.couponCallBack"></weui-input>


				<weui-input v-model="ruleform.pay_method" name="pay_method" datatype="require" label="付款方式" changeField="value"
				 type="select" dataKey="pay_methods" :disabled=" ruleform.status>=3 ? true :false" v-if="ruleform.fclass != 109 &&
					ruleform.fclass != 110"></weui-input>

				<weui-input v-model="ruleform.getPayMethod" name="pay_method" datatype="require" label="付款方式" changeField="value"
				 type="text" :disabled="ruleform.status >=3 ? true :false" v-if="ruleform.fclass == 109 || ruleform.fclass == 110"></weui-input>
				<weui-input v-model.lazy="ruleform.myAccount" :disabled="true" label="钱包" type="text" name="name" v-if="ruleform.pay_method == 2"></weui-input>

				<weui-input v-model="ruleform.remark" label="买家留言" type="text" name="remark" placeholder="点击给商家留言"></weui-input>
			</div>
			<div id="calculation" class="bgf" v-if="ruleform.fclass != 109 && ruleform.fclass != 110">
				<div class="list-group">
					<p class="txt">商品金额</p>
					<p class="fs-16 price">￥{{ruleform.amount}}</p>
				</div>
				<div class="list-group" v-if="ruleform.shipping == 2">
					<p class="txt">运费</p>
					<p class="fs-16 price">+ ￥{{ ruleform.yunfei }}</p>
				</div>


				<div class="list-group" v-if="ruleform.coupon_value">
					<p class="txt">优惠券</p>
					<p class="fs-16 price">- ￥{{ ruleform.coupon_value }}</p>
				</div>
				<div class="list-group">
					<p class="txt">钱包</p>
					<p class="fs-16 price">- ￥{{ wallet}}</p>
				</div>
			</div>
			<div id="footer" v-if="ruleform.status == 1">
				<div class="f_left price fs-18 plr10 ">合计：{{ amount }}</div>
				<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="$parent.submit">
					<div slot="content">
						<button class="f_right plr20 m0" form-type="submit">提交订单</button>
					</div>
				</myform>
			</div>
			<div id="footer" v-else-if="ruleform.status == 3 || ruleform.status == 5">
				<div class="f_left"></div>
				<div class="f_right plr20" @click="$parent.canReceipt">确认收货</div>
			</div>
			<div id="footer" class="bd-t" v-else>
				<div class="f_left"></div>
				<div class="f_right plr20">完成</div>
			</div>
		</section>
	</section>
</template>
<script type="text/javascript">
	import diag from "xiaozhu/wechatapp/components/diag";
	export default {
		props: ["ruleform", "data", "amount", "address", "vaildate", 'getSiteName'],
		data() {
			return {

			}
		},
		methods: {
			selectCallBack(item) {
				if (item.value == 2) {
					delete this.vaildate.merchant_user_id;
				}
			},
			chooseMerchant() {
				for (var i = 0; i < this.ruleform.products.length; i++) {
					let v = this.ruleform.products[i];
					if (!v.getProduct.cart) {
						this.goto('/pages/business/choose/main?product_id=' + v.getProduct.id, 1);
						return false;
					}
				}
				this.goto('/pages/business/choose/main', 1);
			}
		},
		computed: {
			wallet() {
				let coupon_value = parseFloat(this.ruleform.coupon_value);
				this.ruleform.amount = parseFloat(this.ruleform.amount);
				let order_amount = this.ruleform.amount;
				if (this.ruleform.shipping == 2) {
					order_amount += parseFloat(this.ruleform.yunfei);
				}
				if (coupon_value) {
					order_amount -= coupon_value;
				}
				/*如果余额支付*/
				if (this.ruleform.pay_method == 2) {
					let res = this.ruleform.myAccount - order_amount;
					if (res > 0) {
						return order_amount;
					} else {
						return this.ruleform.myAccount;
					}

					return order_amount;
				} else {
					return 0;
				}


			}
		},
		components: {
			diag
		}
	}
</script>
