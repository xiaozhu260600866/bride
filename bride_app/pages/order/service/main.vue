<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="pro_info m10 bdr6" v-for="(parent,key) in data.lists.data">
				<div class="order_date fs14 plr10 bd-be">
					<p class="time">
						<span>下单日期：</span>
						<span class="Arial">{{parent.created_at}}</span>
					</p>
					<p class="state fc-orange">{{parent.status_message}}</p>
				</div>
				<div class="order-sec" @click="goto('/pages/order/buy/main?order_no='+parent.order_no,1)">
					<orderPro :data="parent.products"></orderPro>
				</div>
				<div class="order_count fs14 bd-be plr10">共
					<span class="Arial">{{parent.num}}</span>件商品 需付款：
					<span class="price">￥{{parent.amount}}</span>
				</div>
				<div class="btn-group ptb8 plr10">
					<div class="btn-item">
						<div hover-class="none" class="btn-nav"  @click="goto('/pages/order/buy/main?order_no='+parent.order_no,1)">订单详情</div>
					</div>
					<div class="btn-item" v-if="parent.status >=3">
						<a hover-class="none" class="btn-nav" @click="goto('/pages/order/after-sale/main?order_no='+parent.order_no,1)" v-if="parent.status >=3 && parent.status <10">申请售后</a>
						<a hover-class="none" class="btn-nav" @click="goto('/pages/order/after-sale/main?order_no='+parent.order_no,1)" v-if="parent.status >=3 && parent.status >=10">查看售后</a>

					</div>
				</div>
			</div>
			<hasMore :parentData="data" source="order" message="找服务"></hasMore>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	import orderPro from "@/components/orderPro";
	export default {
		components: {
			orderPro
		},
		data() {
			return {
				formAction: '/shop/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			this.shareSource(this, '商城','1');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
