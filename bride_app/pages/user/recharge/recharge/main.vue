<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">

			<view class="recharge-cells m10">
				<view class="weui-cell plr15">
					<view class="weui-cell__hd"><label class="weui-label fc-6 fs-16">金额</label></view>
					<view class="weui-cell__bd">
						<input type="text" class="recharge-input" name="" placeholder="0" placeholder-style="color:#ff721f" v-model="ruleform.amount">
					</view>
				</view>
			</view>
			<p class="fs-14 fc-6 mt25 plr10">请选择金额</p>
			<div class="rechage-price m5">
				<div :class="['selectAmount',ruleform.amount == v  ? 'select' :'noselect' ]" v-for="v in amountData">
					<p :class="['price',ruleform.amount == v ? 'fc-white': '']" @click="changePrice(v)">{{ v }}<span class="fs14" v-if="v !='其他'">元</span></p>
				</div>
				<div :class="['selectAmount',ruleform.amount != 20 && ruleform.amount !=40 && ruleform.amount !=100 && ruleform.amount !=500 && ruleform.amount !=1000 ? 'select' :'noselect' ]">
					<p class="price" @click="changePrice(0)">其他</p>
				</div>
			</div>
			<view id="footer-btn">
				<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="f-dx-btn dx-btn-orange w-b100"></myform>
			</view>

		</div>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				amountData: [20, 40, 100, 500],
				ruleform: {
					amount: 20
				},
				priceDisable: true,
				vaildate: { /*验证规则，目前支前有，require|phone|integer|price*/
					amount: {
						name: '金额',
						vaild: 'require|price'
					}
				}
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
			//this.data.show = true;
		},
		methods: {
			changePrice(price) {
				if (price == "其他") this.ruleform.amount = 0;
				else this.ruleform.amount = price;
			},
			formSubmit(e) {
				this.ruleform.type = this.data.query.type;
				this.postAjax("/shop/user/ready-recharge", this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						if (this.$root.$mp.query.type == 0) {
							this.goto("/pages/user/recharge/pay_center/main?order_no=" + msg.data.order_no, 1);
						} else {
							this.goto("/pages/ypay/main?order_no=" + msg.data.order_no + '&source=recharge', 1);
						}

					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
					this.setTitle(this.data.a);
				});
			}
		}
	}
</script>
