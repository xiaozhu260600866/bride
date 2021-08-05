<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="show_banner">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</div>
			<div class="pro-info bg-f mb8">
				<p class="pro-name fs-16 plr15 ptb5">{{data.product.name}}</p>
				<p class="pro-price plr15 pb10"><span class="Arial fs-18">{{data.product.integral}}</span><span class="fs-14 fc-9 pl5">积分</span></p>
				<!-- <div class="alert-danger" v-if="data.integral < data.product.integral ">当前积分为{{data.integral}}分，不足以兑换此商品哦</div>
			<div class="alert-success" v-else>当前积分为{{data.integral}}分，可以兑换此商品哦！</div> -->
			</div>
			<div class="pro-title plr15 bd-b bg-f">
				<span class="name fs-16">商品详情</span>
			</div>
			<div class="pro-content p15">
				<div class="pro-con-main">
					<uParse :content="data.product.content" />
				</div>
			</div>
			<div id="footer-btn">
				<view class="f-dx-btn dx-btn-red" v-if="data.integral < data.product.integral ">当前积分为{{data.integral}}分，不足以兑换此商品哦</view>
				<view @click="toBuy" class="f-dx-btn dx-btn-red" v-else>立即兑换</view>
			</div>


		</section>
	</view>
</template>

<script>
	import "./index.css";
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				formAction: '/shop/integral/show',
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
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			toBuy() {
				this.postAjax(this.formAction, {
					id: this.data.product.id,
					num: 1,
					is_info: 0
				}).then(msg=>{
					if (msg.data.status == 2) {
						this.goto("/pages/integral/order/buy/main?order_no=" + msg.data.order_no);
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		},
		components: {
			uParse
		}
	}
</script>
