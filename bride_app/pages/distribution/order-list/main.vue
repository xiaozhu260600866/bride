<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="flex-between lh-40 plr15 main-bg">
				<p class="fs-14 fc-white">分销订单<span class="Arial">({{ data.listsNum }})</span></p>
				<p class="fs-14 fc-white"><span class="Arial">+{{ data.amount }}</span>元</p>
			</div>
			<view class="msc_tabs">
				<scroll-view scroll-x="true">
					<view :class="['liNav',data.query.status == -1 ? 'cur' :'']" @click="changeStatus(-1)">全部</view>
					<view :class="['liNav',data.query.status == 5 ? 'cur' :'']" @click="changeStatus(5)">一级待入帐</view>
					<view :class="['liNav',data.query.status == 6 ? 'cur' :'']" @click="changeStatus(6)">一级已完成</view>
					<view :class="['liNav',data.query.status == 7 ? 'cur' :'']" @click="changeStatus(7)">二级待入帐</view>
					<view :class="['liNav',data.query.status == 8 ? 'cur' :'']" @click="changeStatus(8)">二级已完成</view>
				</scroll-view>
			</view>
			<!-- <meiTime ref="meiTime"  :data="[
				{label:'今天',value:'today'},
				{label:'本周',value:'thisweek'},
				{label:'本月',value:'thismonth'}
			]" :query="data.query"></meiTime> -->
			<div class="order-list" v-for="(item,key) in data.lists.data" v-if="listsShow">
				<div v-if="item.getOrder.getUser">
					<div class="title plr15 ptb10 bd-be">
						<image class="head mr10" :src="item.getOrder.getUser.headerPic" />
						<p class="name fs-15">{{item.getOrder.getUser.userInfo.name ? item.getOrder.getUser.userInfo.name : item.getOrder.getUser.nickname}}</p>
						<p class="num fs-15 ">收益：<span class="price fs-15 Arial">{{item.amount}}</span></p>
					</div>
					<div class="pro-info">
						<p class="flex-between plr15 ptb10 bd-te fs-14">{{item.getOrder.product_str}}</p>
						<div class="flex-between plr15 ptb10 bd-te fs-14">
							<p class="">分销员</p>
							<p class="Arial">{{item.getDis.name}}</p>
						</div>
						<div class="infob fs-12 fc-9 plr15 ptb10 bd-te">
							<p class="fs-12">订单编号：<span class="Arial fs-12">{{item.order_no}}</span></p>
							<p class="fs-12">下单时间：<span class="Arial fs-12">{{item.created_at}}</span></p>
						</div>
					</div>
				</div>
				<div v-if="item.source == '456充值'">
					<div class="title plr15 ptb10 bd-be">
						<p class="name fs-15">456充值</p>
						<p class="num fs-15 ">收益：<span class="price fs-15 Arial">{{item.amount}}</span></p>
					</div>
					<div class="pro-info">
						<div class="infob fs-12 fc-9 plr15 ptb10 bd-te">
							<p class="fs-12">订单编号：<span class="Arial fs-12">{{item.order_no}}</span></p>
							<p class="fs-12">下单时间：<span class="Arial fs-12">{{item.created_at}}</span></p>
						</div>
					</div>
				</div>
			</div>
			<hasMore :parentData="data" source="nodata"></hasMore>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		computed: {
			
		},
		data() {
			return {
				formAction: '/shop/dis/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				listsShow: true,
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
		},
		methods: {
			changeStatus(status) {
				this.data.query.status = status;
				this.listsShow = false;
				this.ajax();
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.listsShow = true;
				});
			}
		}
	}
</script>
