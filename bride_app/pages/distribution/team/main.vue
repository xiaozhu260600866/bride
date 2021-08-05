<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
			<view v-if="data.show">
				<view id="scroller">
				<!-- 	<view class="top main-bg plr15 ptb5 fs-14 fc-white">
						<view class="group flex-between lh-30">
							<view>一级分销商：<text class="Arial">10</text>人</view>
							<view>一级分销商的客户：<text class="Arial">100</text>人</view>
						</view>
						<view class="group flex-between lh-30">
							<view>二级分销商：<text class="Arial">10</text>人</view>
							<view>二级分销商的客户：<text class="Arial">100</text>人</view>
						</view>
					</view> -->
					<view class="order-classify bg-f mb8">
						<view :class="['nav-tab',lev == 0 ? 'selected' :'']" @click="changeLev(0)">一级</view>
						<view :class="['nav-tab',lev == 1 ? 'selected' :'']" @click="changeLev(1)">二级</view>
					</view>
					<view class="team-header fs-13 fc-9 plr15 ptb3 flex-between">
						<view>成员信息</view>
						<view>TA的佣金/成员</view>
					</view>
					<view class="order-list mb8 bg-f" v-for="item in data.lists">
						<view class="tInfo plr15 ptb10">
							<view class="img pr10">
								<image :src="item.heder_img" />
							</view>
							<view class="rInfo">
								<view class="group fs-16">
									<view>{{item.name}}<text class="Arial pl8">{{item.phone}}</text></view>
									<view>收益：
										<text class="Arial fc-orange">{{item.amount}}</text>
									</view>
								</view>
								<view class="group fs-14 fc-9">
									<view class="Arial">{{item.created_at}}</view>
									<view><text class="Arial">{{item.member}}</text>个成员</view>
								</view>
							</view>
							
						</view>
						<view class="infob fs-12 fc-9 plr15 ptb10 bd-te flex-right">
							<view class="dx-btn dx-btn-sm dx-btn-orange ml5" @click="goto('/pages/distribution/order-list/main?id='+item.id+'&dateSelect=today&status=-1',1)">订单</view>
							<view class="dx-btn dx-btn-sm dx-btn-orange ml5" @click="goto('/pages/distribution/down/client/main?id='+item.id,1)">客户</view>
							<view class="dx-btn dx-btn-sm dx-btn-orange ml5" @click="goto('/pages/distribution/down/dis/main?id='+item.id,1)">下级</view>
						</view>
					</view>
				</view>
		
				<hasMore :parentData="data" source="nodata"></hasMore>
			
			</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/dis/team',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lev:0,
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
			ajax() {
				this.getAjax(this,{lev:this.lev}).then(msg => {
					console.log(this.data);
				});
			},
			changeLev: function(lev) {
				this.lev = lev;
				this.ajax();
			},
		}
	}
</script>
