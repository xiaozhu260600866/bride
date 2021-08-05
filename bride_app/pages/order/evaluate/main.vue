<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			
			<view class="evaluate">
				<view class="evGroup" v-for="v in data.detail.products">
					<dx-list-cell :name="v.getProduct.name" :imgSrc="v.getProduct.firstCover" imgWidth="36" imgHeight="36" imgR="18" noborder></dx-list-cell>
					<dx-list-cell name="评价" iconSize="18" iconColor="#ff721f" padding="0 30rpx">
					　　<view slot="right">
							<tui-rate v-model="v.quote1" :hollow="true" :disabled="v.suggestStatus >= 1 ? true :false"></tui-rate>
						</view>
					</dx-list-cell>
					<weui-input v-model="v.suggestContent1" type="textarea" placeholder="请输入评价内容" :disabled="v.suggestStatus>=1?true:false"></weui-input>
					<weui-input v-model="v.suggestLogo" label="上传图片" type="upload" upurl='order' allowUpLoadNum="5" name="suggestLogo"
					 :disabled="v.suggestStatus >= 1 ? true :false"></weui-input>
				</view>
				<view class="m20" @click="submit()" v-if="ruleform.suggestStatus == 0">
					<dx-button type="primary" btnBg="#57C734" btnBd="#57c734" size="lg" block>提交</dx-button>
				</view>
			</view>
			
			<!-- <div class="evaluate bgf pb20" v-for="v in data.detail.products">
				<div class="eva-title fs15 bd-be ptb8 plr15">{{ v.getProduct.name }}</div>
				<div class="weui-cell weui-cell_input mt10">
					<div class="weui-cell__hd">
						<div class="weui-label fs14">商品质量</div>
					</div>
					<div class="weui-cell__bd">
						<tui-rate :position="5.0" :disabled="v.suggestStatus >= 1 ? true :false" v-model="v.quote1"></tui-rate>
					</div>
				</div>
				<div class="weui-cell weui-cell_input">
					<div class="weui-cell__hd">
						<div class="weui-label fs14">服务态度</div>
					</div>
					<div class="weui-cell__bd">
						<tui-rate :position="5.0" :disabled="v.suggestStatus >= 1 ? true :false" v-model="v.quote2"></tui-rate>
					</div>
				</div>
				<div class="weui-cell weui-cell_input">
					<div class="weui-cell__hd">
						<div class="weui-label fs14">服务效率</div>
					</div>
					<div class="weui-cell__bd">
						<tui-rate :position="5.0" :disabled="v.suggestStatus >= 1 ? true :false" v-model="v.quote3"></tui-rate>
					</div>
				</div>
				<weui-input v-model="v.suggestContent1" type="textarea" placeholder="请输入评价内容" :disabled="v.suggestStatus >= 1 ? true :false"></weui-input>
				<weui-input v-model="v.suggestLogo" label="上传图片" type="upload" upurl='order' allowUpLoadNum="5" name="suggestLogo" :disabled="v.suggestStatus >= 1 ? true :false"></weui-input>
				<div v-if="v.suggestStatus >= 1">
					<weui-input v-model="v.suggestContent2" placeholder="请输入追评价内容" type="textarea" :disabled="v.suggestStatus >= 2 ? true :false"></weui-input>
					<weui-input v-model="v.suggestLogo2" label="上传图片" type="upload" upurl='order' allowUpLoadNum="5"></weui-input>
				</div>
				<weui-input :disabled="v.suggestStatus >= 1 ? true :false" label="商品满意度" v-model="v.opinion" changeField="value"
				 type="select" :dataKey="'opinion'"></weui-input>
			</div>
			<button class="dx-btn-orange m20" @click="submit()" v-if="data.detail.suggestStatus<2">{{ data.detail.suggestStatus == 1 ? '追加评价' : '提交评价' }}</button> -->
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components: {tuiRate,dxListCell},
		data() {
			return {
				formAction: '/shop/order/detail',
				ruleform: {  },
				opinion: [
					{label: '好评',value: 1},
					{label: '中评',value: 2},
					{label: '差评',value: 3},
				],
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			submit() {
				this.postAjax("/shop/order/evaluate", this.data.detail).then(msg => {
					this.$store.state.mutations.historyUrl=true;
					this.back();
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.data.detail.products.forEach((v, i) => {
						v.suggestLogo = v.suggestLogo ? v.suggestLogo.split(",") : [];
						v.suggestLogo2 = v.suggestLogo2 ? v.suggestLogo2.split(",") : [];
					});
				});
			}
		},
	}
</script>
