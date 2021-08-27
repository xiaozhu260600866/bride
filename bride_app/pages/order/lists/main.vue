<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="list-class bd-b bg-f">
				<p :class="['nav-tab',data.query.status == 12 ? 'selected' :'']" @click="changeStatus(12)">全部</p>
				<p :class="['nav-tab',data.query.status == 1 ? 'selected' :'']" @click="changeStatus(1)">待付款</p>
				<p :class="['nav-tab',data.query.status == 3 ? 'selected' :'']" @click="changeStatus(3)">进行中</p>
				<p :class="['nav-tab',data.query.status == 5 ? 'selected' :'']" @click="changeStatus(5)">已结束</p>
				<p :class="['nav-tab',data.query.status == 9 ? 'selected' :'']" @click="changeStatus(9)">待评价</p>
				<!-- <p :class="['nav-tab',status == 10 ? 'selected' :'']" @click="changeStatus(10)">售后</p> -->
			</div>
			<div class="pro_info order-sec m10" v-for="(parent,key) in data.lists.data">
				<div class="order_date plr10 bd-be">
					<view class="time fs-14">
						<span>下单日期：</span>
						<span class="Arial">{{parent.created_at}}</span>
					</view>
					<div class="state">
						<p class="fc-red fs-14 pr8">{{parent.status_message}}</p>
					</div>
				</div>
				
				<div @click="goto('/pages/order/buy/main?order_no='+parent.order_no,1)">
					<orderPro :data="parent.products"></orderPro>
				</div>
				
				<div class="order_count fs-15 plr10">共
					<span class="Arial">{{parent.num}}</span>件商品 付款金额：
					<span class="price fc-3">￥{{ (parseFloat(parent.amount)  +  parseFloat(parent.yunfei)) - parseFloat(parent.payed_amount)}}</span>
				</div>
				<div class="plr10 pb8 flex" v-if="parent.merchantName">
					<p class="fs-15">自提点：</p>
					<p class="fs-15 flex1" @click="location(parent.merchantName.location_x,parent.merchantName.location_y,parent.merchantName.company_name)">
						{{parent.merchantName.company_name}} - {{parent.merchantName.address}}
					</p>
				</div>
				<!-- <div class="weui-cell bd-te pro-qrcode" @click="previewImage(parent.order_no+'.png','order')" >
					<div class="weui-cell__hd">
						<div class="weui-label fs-15">订单号/核销号</div>
					</div>
					<div class="weui-cell__bd text-right"></div>
					<div class="weui-cell__ft flex">
						<p class="fs-15 fc-3 Arial lh-24">{{parent.order_no}}</p>
						<img :src="getSiteName+'/upload/images/order/'+parent.order_no+'.png'" style="width:20px;height:20px">
						<div class="iconfont icon-right fs-12 fc-9 lh-24"></div>
					</div>
				</div> -->
				<div class="btn-group ptb8 plr10 bd-te">
					<!-- 待支付 -->
					<div class="btn-item" v-if="parent.status ==1">
						<div class="btn-nav" @click="changeOrder(parent)">取消订单</div>
						<div class="btn-nav" @click="goto('/pages/order/buy/main?order_no='+parent.order_no,1)">去支付</div>
					</div>
					<!-- 待发货 -->
					<div class="btn-item" v-if="parent.status == 3">
						<div class="btn-nav" @click="changeOrder(parent)">申请退款</div>
						<div class="btn-nav" v-if="parent.wechat_card_id && parent.coupon_value == '0.00' && parent.give_wechatCard == 0" @click="goto('/pages/order/payed/main?order_no='+parent.order_no,1)">微信卡券</div>
						<div class="btn-nav" @click="goto('/pages/order/buy/main?order_no='+parent.order_no,1)">查看详情</div>
					</div>
					<!-- 待收货 -->
					<div class="btn-item" v-if="parent.status == 5">
						<button hover-class="none" class="btn-nav" openType="contact">联系客服</button>
						<div class="btn-nav" @click="goto('/pages/order/map/main?order_no='+parent.order_no,1)">配送员位置</div>
						<div class="btn-nav" v-if="parent.wechat_card_id && parent.coupon_value == '0.00' && parent.give_wechatCard == 0" @click="goto('/pages/order/payed/main?order_no='+parent.order_no,1)">微信卡券</div>
						<div class="btn-nav" @click="goto('/pages/order/buy/main?order_no='+parent.order_no,1)">确认收货</div>
					</div>
					<!-- 待评价 -->
					<div class="btn-item" v-if="parent.status == 9">
						<button hover-class="none" class="btn-nav" openType="contact">联系客服</button>
						<div class="btn-nav" v-if="parent.wechat_card_id && parent.coupon_value == '0.00' && parent.give_wechatCard == 0" @click="goto('/pages/order/payed/main?order_no='+parent.order_no,1)">微信卡券</div>
						<div class="btn-nav" @click="goto('/pages/order/evaluate/main?order_no='+parent.order_no,1)">{{parent.suggestStatus == 0 ? '去评价' : '已评价'}}</div>
					</div>
					<!-- 售后中 -->
					<div class="btn-item" v-if="parent.status == 10">
						<div class="btn-nav" v-if="parent.wechat_card_id && parent.coupon_value == '0.00' && parent.give_wechatCard == 0" @click="goto('/pages/order/payed/main?order_no='+parent.order_no,1)">微信卡券</div>
					<!-- 	<div class="btn-nav obtn" @click="goto('/pages/order/after-sale/main?order_no='+parent.order_no,1)">售后详情</div> -->
					</div>
					<!-- <div class="btn-item" v-if="parent.shipping == 1">
						<div class="btn-nav" @click="previewImage(parent.order_no+'.png','order')">自提码</div>
					</div> -->
				</div>
			</div>
			<hasMore :parentData="data" source="order" message="去购物"></hasMore>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import orderPro from "@/components/orderPro";
	export default {
		components:{
			orderPro
		},
		data() {
			return {
				formAction: '/shop/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 12
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
			return this.shareSource(this, '商城');
		},
		onShow() {
			if (this.$store && this.$store.state && this.$store.state.mutations.historyUrl) {
				this.$store.state.mutations.historyUrl = "";
				this.ajax();
			}
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			changeOrder(item) {
				let title = item.status == 1 ? "您确认要取消订单吗？" : "您确认要联系客服吗？订单金额24小时内原路退回";
				this.getConfirm(title, () => {
					if(item.status == 1){
						this.postAjax("/ajax/mydel",{tablename:'orders',id:item.id}).then(msg=>{
							if (msg.data.status == 2) {
								this.data.nextPage = 1;
								this.ajax();
							}
						})
					}else{
						this.postAjax("/user/change-order-status", {
							id: item.id,
							status: 0
						}).then(msg => {
							if (msg.data.status == 2) {
								this.data.nextPage = 1;
								this.ajax();
							}
						});
					}
					
				});
			},
			changeStatus(status) {
				this.data.query.status = status;
				this.data.nextPage = 1;
				this.ajax();
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
