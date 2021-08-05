<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div class="pro-list" v-if="data.show">
			<div class="info-header bg-f">
				<div class="ih-item ptb8" hover-class="none" @click="goto('/pages/user/integral/count/main')">
					<p class="num lh20 mb3 fc-orange fs-18 Arial">{{data.integral}}</p>
					<p class="name fs-13">我的积分</p>
				</div>
				<div class="ih-item ptb8" hover-class="none" @click="goto('/pages/user/integral/list/main')">
					<p class="num lh20 mb3 fc-orange iconfont icon-intergral-record fs-20"></p>
					<p class="name fs-13">兑换记录</p>
				</div>
			</div>
			<div class="porducts">
				<div class="pro-div pb5" v-for="item in data.lists.data">
					<div @click="goto('/pages/integral/show/main?id='+item.id)" class="pro-box">
						<div class="cms_cover">
							<img :src="item.firstCover" mode="aspectFill" class="img"/>
						</div>
						<p class="cms_title Aname fs-15 nowrap">{{item.name}}</p>
						<div class="cms_price">
							<p class="saleprice fs-16">{{item.integral}}<span class="fs-12 fc-9 pl3"> 积分</span></p>
						</div>
					</div>
				</div>
				<hasMore :parentData="data"></hasMore>
			</div>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/integral/lists?type=0',
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
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
