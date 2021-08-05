<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<section v-if="data.show">
			<div id="address" class="bgf plr15">
				<block v-if="!address">
					<div class="add-add ptb15" @click="createAddress">
						<p class="add-icon iconfont icon-count-plus mr10"></p>
						<p class="add-txt fs15">新增收货地址</p>
						<p class="iconfont icon-right fs12 font_grey"></p>
					</div>
				</block>
				<block v-else>
					<div class="add-info" @click="addressLists">
						<div class="info ptb10">
							<p class="name fs15">
								<span>{{address.name}}</span>
								<span class="Arial pl10">{{address.phone}}</span>
							</p>
							<div class="add-detail fs14 font_666">
								<p class="label">地址：</p>
								<p class="name">{{ address.province }} {{ address.city }} {{ address.area }} {{ address.address }}</p>
							</div>
						</div>
						<p class="iconfont icon-right fs12 font_grey pl15"></p>
					</div>
				</block>
			</div>
			<div class="pay_line bgf">
				<image src="https://boss.doxinsoft.com/images/site/share-tip.png"></image>
			</div>

			<div class="pro-info mb8 bgf">
				<div class="cart-tb p10">
					<div class="pro-img pr10">
						<image :src="data.detail.products.firstCover" />
					</div>
					<div class="pro-name">
						<p class="name fs14 nowrap lh20">{{data.detail.products.name}}</p>
						<p class="num Arial fs12 font_grey">数量：{{ruleform.num}}</p>
					</div>
					<div class="pro-price hide" valign="center">￥{{data.detail.products.integral}}</div>
				</div>
			</div>

			<div id="mode" class="bgf mb8">
				<weui-input v-model="ruleform.shipping" name="shipping" datatype="require" label="送货方式" changeField="value" type="select"
				 :dataKey="'shippingData'" :disabled="ruleform.status >=3 ? true :false"></weui-input>
				<weui-input v-model="ruleform.remark" label="买家留言" type="text" name="remark" placeholder="点击给商家留言"></weui-input>
			</div>

			<div id="calculation" class="bgf">
				<div class="list-group">
					<p class="txt fs14">应付</p>
					<p class="fs16 price">- {{ruleform.integral}}<span class="fs12 font_grey"> 积分</span></p>
				</div>
			</div>


			<div id="footer" class="bd-t" v-if="ruleform.status == 1">
				<form @submit="submit" report-submit="true" class="w-b100">
					<div class="flex">
						<p class="f_left pl15 fs16">应付 <span class="Arial fs-color">{{ruleform.integral}}</span> 积分</p>
						<p class="f_right" @click="submit">提交订单</p>
					</div>
				</form>
			</div>
			<div id="footer" class="bd-t" v-else-if="ruleform.status == 3 || ruleform.status == 5">
				<p class="f_left price"></p>
				<p class="f_right" @click="canReceipt">确认收货</p>
			</div>
			<div id="footer" class="bd-t" v-else>
				<p class="f_left price"></p>
				<p class="f_right" bindtap="canReceipt">完成</p>
			</div>

		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/integral/detail',
				shippingData:[
					{label:'邮寄',value:1},
					{label:'自提',value:2},
					{label:'物流',value:3},
				],
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				address: {},
				ruleform: {}
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
			if (options.order_no) {
				this.order_no = options.order_no;
				if (options.address_id) {
					this.formAction += "&address_id=" + options.address_id + "&order_no=" + options.order_no;
				} else {
					this.formAction += "?order_no=" + options.order_no;
				}
			}
			this.ajax();
		},

		methods: {
			submit(e) {
				if (!this.address || !this.address.id) {
					this.getError("请填写收货地址");
					setTimeout(() => {
						this.createAddress();
					}, 500)
					return false;
				}
				let ruleform = this.ruleform;
				ruleform.address_id = this.address.id;
				this.receipt("确认兑换吗");
			},
			radioChange(event) {
				this.ruleform.shipping = event.mp.detail.value;
			},
			addressLists() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.goto('/pages/user/address/lists/main?order_no=' + this.ruleform.order_no);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.address = msg.address;
					this.ruleform = msg.detail;
				});
			},
			canReceipt() {
				this.receipt("确认收货吗");
			},
			receipt(title) {
				uni.showModal({
					title: '提示',
					content: title,
					success: res => {
						if (res.confirm) {
							this.postAjax("/shop/integral/change-integral-status", this.ruleform).then(msg => {
								if (msg.data.status == 2) {
									this.goto("/pages/user/integral/order/lists/main?historyUrl=del&status=" + msg.data.detail.status);
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			createAddress() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.$refs.page.createAddress(res => {
					if (res) {
						this.ajax();
					} else {
						this.goto("/pages/user/address/create_edit/main", 1);
					}
				});
			},
		}
	}
</script>
