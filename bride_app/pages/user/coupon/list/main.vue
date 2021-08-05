<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="coupon-list p10">
				<view class="list_item mb10 bg-f" v-for="v in data.lists.data">
					<view class="item_left fc-white">
						<image class="img" :src="getSiteName + '/upload/images/coupon/300_'+v.cover" mode="aspectFill"></image>
					</view>
					<view class="item_right">
						<view class="w-b100 flex">
							<view class="coupon-title fs-16 lh-20 wrap2 flex1">{{ v.name }}</view>
							<view class="price fs-18 lh-22 pl10">
								<span class="fs-12">￥</span>{{v.amount}}
							</view>
						</view>
						<!-- <view class="w-b100">
							<view class="tips fc-6 fs-12" v-if="v.type == 0">满{{v.full_amount}}元可用</view>
							<view class="tips fc-6 fs-12" v-else>限指定商品可用</view>
						</view> -->
						<view class="w-b100 ir-bottom flex-between">
							<view class="time fs-12 fc-9 lh-16">{{ v.start_date }} ~ {{ v.end_date }}</view>
							<view class="state fs-13 ptb3" @click="draw(v)" v-if="v.status==0">立即领取</view>
							<view class="state gouser fs-13 ptb3" v-if="v.status == 3" @click="goto('/pages/index/main',2)">去使用</view>
							<view class="state yesuser fs-13 ptb3" v-if="v.status == 2">已使用</view>
						</view>
					</view>
					<view class="completed" v-if="v.status == 3">
						<image class="img" src="https://boss.doxinsoft.com/images/wap/yes-state.png" />
					</view>
				</view>
				<div v-if="data.lists.data.length == 0" >
					<view class="empty">
						<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" mode="widthFix"/>
						<view class="name ptb10 fs-14 fc-6">暂无数据</view>
					</view>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{dxTabs},
		data() {
			return {
				formAction: '/coupon.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				navbar:[
					{value: 12,name: '全部'},
					{value: 0,name: '待使用'},
					{value: 1,name: '已核销'},
					{value: 2,name: '已过期'},
				],
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
		onShow(){
			this.onShow(this);
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			draw(v) {
				this.getConfirm("是否领取该张优惠券", () => {
					this.postAjax("/user/draw-coupon", {
						id: v.id
					}).then(msg=>{
						if (msg.data.status == 2) {
							wx.requestSubscribeMessage({
							  tmplIds: ['eoklziaowfgADkN_-EkcAt4_Qdg3OWY-1ltGKW7mgTM'],
							  success (res) { 
								  console.log(res);
							  },
							  fail(res){
								 console.log(res); 
							  }
							})
							this.ajax();
						}
					});
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
