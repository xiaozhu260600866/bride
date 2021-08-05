<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<view class="dis-header">
				<view class="head-img">
					<img class="img" :src="data.distribution.heder_img">
				</view>
				<view class="dis-info fc-white">
					<view class="name fs-18">{{ data.distribution.name}}</view>
					<view class="phone fs-16 mt10 Arial">{{ data.distribution.phone}}</view>
				</view>
			</view>
			<view class="sup-sec">
				<view class="sec-group" @click="goto('/pages/distribution/order-list/main?dateSelect=today&status=-1',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/A01.jpg'"></image></view>
					<view class="name">分销订单</view>
				</view>
				<view class="sec-group" @click="goto('/pages/distribution/team/main',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/A02.jpg'"></image></view>
					<view class="name">我的团队</view>
				</view>
				<view class="sec-group" @click="goto('/pages/distribution/client/main',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/A03.jpg'"></image></view>
					<view class="name">我的客户</view>
				</view>
				<view class="sec-group" @click="goto('/pages/distribution/qrcode/main',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/A04.png'"></image></view>
					<view class="name">我的二维码</view>
				</view>
				<!-- <button class="sec-group m0 p0 bg-f" open-type="share">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/A05.png'"></image></view>
					<view class="name">分享达人注册</view>
				</button> -->
				<button class="sec-group m0 p0 bg-f" @click="goto('/pages/distribution/ad/main',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/A06.jpg'"></image></view>
					<view class="name">分享广告位</view>
				</button>
			</view>
			
			<view class="sup-account bg-f pt12 mb12">
				<view class="name fs-14 fc-7 text-center">总收益（已到账收益+未到账收益）</view>
				<view class="flex-center flex-middle" @click="goto('/pages/distribution/domoney/main',1)">
					<view class="price fs-16">￥<span class="fs-30">{{toFixed(data.data.inSumAll)}}</span></view>
				</view>
				<view class="ac-group">
					<view class="ac-row">
						<view class="label">可提现收益</view>
						<view class="value">￥<span>{{data.price_a}}</span></view>
					</view>
					<view class="ac-row">
						<view class="label">待到账收益</view>
						<view class="value">￥<span>{{data.data.inSumIng}}</span></view>
					</view>
					<view class="ac-row">
						<view class="label">成功提现金额</view>
						<view class="value">￥<span>{{data.data.outSumEd}}</span></view>
					</view>
					<view class="ac-row">
						<view class="label">提现审核中</view>
						<view class="value">￥<span>{{data.data.outSumIng}}</span></view>
					</view>
				</view>
			</view>
			<view class="sup-account bg-f mb12">
				<view class="ac-group">
					<view class="ac-row">
						<view class="label">今日收益</view>
						<view class="value">￥<span>{{data.order_today_sum}}</span></view>
					</view>
					<view class="ac-row">
						<view class="label">昨日到账收益</view>
						<view class="value">￥<span>{{data.order_yesterday_sum}}</span></view>
					</view>
					<view class="ac-row">
						<view class="label">本月收益</view>
						<view class="value">￥<span>{{data.order_thismonth_sum}}</span></view>
					</view>
					<view class="ac-row">
						<view class="label">上月收益</view>
						<view class="value">￥<span>{{data.order_prevmonth_sum}}</span></view>
					</view>
				</view>
			</view>
			<view class="bg-f mb12">
				<div class="plr15 pt10">
					<p class="fs-14 fc-6 lh-20">买家确认收货后，立即获得分销收益</p>
					<p class="fs-14 fc-6 lh-20">注意：可提现收益满<span class="fc-orange Arial plr3">1元</span>后才能提现</p>
				</div>
				<view class="nav_btn flex-between flex-middle plr35 pt15 pb10">
					<!-- <dx-button type="primary" size="small" round @click="goto('/pages/distribution/commission/index',1)">账户明细</dx-button> -->
					<dx-button type="primary" size="small" round @click="goto('/pages/distribution/record-list/main',1)">提现明细</dx-button>
					<dx-button type="primary" size="small" round @click="goto('/pages/distribution/domoney/main',1)">一键提现</dx-button>
				</view>
			</view>
		</section>
	</view>
</template>

<script>
	import selectSimple from "xiaozhu/wechatapp/components/selectSimple";
	import "@/public/css/uindex.css";
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/dis',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				selectType: 'toDay',
				getSiteName: this.getSiteName(),
				selectData: [{
						label: '今日',
						value: 'toDay'
					},
					{
						label: '本月',
						value: 'thisMonth'
					},
					{
						label: '本年',
						value: 'thisYear'
					},
				],
				seeStatus: true,
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
			return {
				path: "/pages/distribution/add/main?distribution="+this.data.distribution.id,
				title: "456商城",
				fail: res => {
			
				}
			}
		},
		onLoad(options) {
			this.ajax();
		},
		components: {
			selectSimple
		},
		methods: {
			ajax() {
				this.getAjax(this,{selectType:this.selectType}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
