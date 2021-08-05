<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="order-classify bd-b bgf">
				<p :class="['nav-tab',status == 3 ? 'selected' :'']" @click="changeStatus(3)">待发货</p>
				<p :class="['nav-tab',status == 5 ? 'selected' :'']" @click="changeStatus(5)">待收货</p>
				<p :class="['nav-tab',status == 9 ? 'selected' :'']" @click="changeStatus(9)">完成</p>
				<p :class="['nav-tab',status == 0 ? 'selected' :'']" @click="changeStatus(0)">已取消</p>
			</div>
			<div class="pro_info mb10" v-for="(item,key) in data.listsIntegral.data">
				<div class="order_date fs-14 plr10 bd-be">
					<p class="time">
						<span>下单日期：</span>
						<span class="Arial">{{item.created_at}}</span>
					</p>
					<p class="state main-color">{{item.status_message}}</p>
				</div>
				<div class="order_info p10 pb5" v-if="item.products">
					<div class="pro_img pr10">
						<image class="img" :src="item.products.firstCover" />
					</div>
					<div class="txt fs-14 nowrap">{{ item.products.name }}</div>
				</div>
				<div class="order_count fs-14 bd-be plr10 pb8">
					共<span class="Arial">1</span>件商品 需付：
					<span class="price">{{item.integral}}</span>积分
				</div>
				<div class="btn-group ptb8 plr10">
					<div class="btn-item">
						<a hover-class="none" class="btn-nav" @click="goto('/pages/integral/order/buy/main?order_no='+item.order_no)">订单详情</a>
					</div>
					<div class="btn-item" @click="changeOrder(item)" :data-id="item.id" :data-status="0" v-if="item.status!=0">
						<p class="btn-nav">取消订单</p>
					</div>
				</div>
			</div>
			<hasMore :parentData="data" source="order"></hasMore>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/integral/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				status: 12,
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.status = options.status;
			this.ajax();
		},
		methods: {
			changeStatus(status) {
				this.status = status;
				this.data.nextPage = 1;
				this.ajax();
			},
			changeOrder(item) {
				this.getConfirm("您确认要取消订单吗？", () => {
					this.postAjax("/shop/integral/change-integral-status", {
						id: item.id,
						status: 0
					}).then(msg=>{
						if (msg.data.status == 2) {
							this.data.nextPage = 1;
							this.ajax();
						}
					});
				});
			},
			ajax() {
				this.getAjax(this,{ status: this.status }).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
