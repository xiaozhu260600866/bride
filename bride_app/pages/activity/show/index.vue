<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view class="topPic">
				<myswiper2 :lists="data.covers" purl="activity"></myswiper2>
				<view class="state state0" v-if="detail.state == 0">已成行</view>
				<view class="state state1" v-if="detail.state == 1">报名中</view>
				<view class="state state2" v-if="detail.state == 2">已截止</view>
			</view>
			<view class="activity-info detail-block mt0">
				<view class="title">{{ detail.title }}</view>
				<view class="detail-row">
					<span class="label">活动费用：</span>
					<span class="value" v-if="detail.amount > 0">{{ detail.amount }}元</span>
					<span class="value" v-else>免费</span>
				</view>
				<view class="detail-row">
					<span class="label">已报人数：</span>
					<span class="value"><text class="Arial">{{detail.orderRecord.people}}</text>人</span>
				</view>
				<view class="detail-row">
					<span class="label">活动时间：</span>
					<span class="value">{{ detail.published_at}}</span>
				</view>
				<view class="detail-row">
					<span class="label">活动地址：</span>
					<span class="value">{{ detail.address}}</span>
				</view>
			</view>
			<view class="detail-block" v-if="detail.intro">
				<view class="block-title"><text>活动要求</text></view>
				<view class="block-con">{{ detail.intro }}</view>
			</view>
			<!-- <view class="detail-block">
				<view class="block-title"><text>报名人员</text></view>
				<view class="block-con">已报名（<span>{{ detail.people }}</span>人成行）　总共<span class="fc-red">{{ detail.orderRecord.people }}</span>（男<span class="fc-red">{{detail.orderRecord.mans}}</span>　女<span class="fc-red">{{detail.orderRecord.womens}}</span>）人</view>
			</view> -->
			<view class="detail-block">
				<view class="block-title"><text>活动详情</text></view>
				<view class="block-con">
					<u-parse :content="detail.content" />
				</view>
			</view>
			<view class="aS-footer-btn">
				<view class="left-item" @click="goto('/pages/index/index',2)">
					<view class="iconfont icon-home"></view>
					<view class="txt">首页</view>
				</view>
				<view class="left-item" @click="$refs.share.show = true">
					<view class="iconfont icon-share"></view>
					<view class="txt">分享</view>
				</view>
				<view class="right-btn flex1">
					<view class="flex1"><dx-button type="primary" myclass="main-btn" size="medium" round @click="submit()" block>立即报名</dx-button></view>
				</view>
			</view>
			<dx-share ref="share" ></dx-share>
			
			<dx-diag title="温馨提示" width="90%" :bottomOFF="false" ref="signUp" :titBold="false">
				<view class="content text-center fs-16 lh-24 pt15 pb20">请先登录再进行活动报名！</view>
				<view class="btn mlr30">
					<dx-button block type="primary" myclass="main-btn mb15" @click="goto('/pages/user/login/index/index')">立即登录</dx-button>
					<dx-button block @click="$refs.signUp.thisDiag = false">取消</dx-button>
				</view>
			</dx-diag>
		</view>
	</view>
</template>

<script>
	import dxShare from "doxinui/components/share/share"
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import dxDiag from "doxinui/components/diag/diag"
	export default {
		components:{
			dxShare,uParse,dxDiag
		},
		data() {
			return {
				formAction: '/activity/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detail:{},
				ruleform:{},
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
			share(){
				alert("请点击右上角进行分享");
			},
			formSubmitForH5(config, order_no) {
				this.updateUrl(["/pages/index/index"]);
				this.payUniapp(config, msg => {
					return this.goto("/pages/activity/order/payed/index?order_no=" + order_no);
				}, msg => {
					return this.goto("/pages/activity/order/payed/index?order_no=" + order_no);
				});
			},
			submit(){
				if(this.data.user.status == 1){
					this.ruleform.activity_id= this.data.detail.id;
					this.ruleform.amount = this.data.detail.amount;
					this.postAjax(this.formAction,this.ruleform).then(msg=>{
						  if (msg.data.status == 2) {
						  	this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
						  }
					});
					
					//return this.goto("/pages/activity/order/buy/index?id="+ this.data.detail.id);
				}else{
					return this.$refs.signUp.thisDiag = true
					//return this.goto("/pages/user/login/index/index");
				}
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(this.data.detail.title);
					
					this.detail = msg.detail;
					console.log(msg);
					if(msg.dis){
						uni.setStorageSync("distribution",msg.dis);
						
					}
					// this.$nextTick(()=>{
					// 	this.$refs.page.share(this.data.detail.title,this.data.detail.firstCover,this.data.detail.title);
					// })
					
				});
			}
		}
	}
</script>

<style lang="scss" scoped="">
@import "./index.scss";
</style>