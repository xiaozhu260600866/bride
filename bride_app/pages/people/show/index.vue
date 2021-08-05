<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb10">
			<view class="top-bg">
				<image class="w-b100 flex" src="/static/show-top-bg.jpg" mode="widthFix"></image>
			</view>
			<view class="show-block info-sec">
				<view class="header">
					<image class="head-img" src="/static/fenxiaobg.jpg" mode="aspectFill"></image>
					<dx-button type="primary" size="medium" round>+ 关注</dx-button>
				</view>
				<view class="name fs-18 lh-24 mtb15 fw-bold">张三</view>
				<view class="label-group fc-4">
					<view class="label city">广东江门</view>
					<view class="label age"><text class="Arial">33</text>岁</view>
					<view class="label height Arial">173cm</view>
				</view>
				<view class="intro">
					<view class="title fs-16 fw-bold pt15">个人独白</view>
					<view class="content">东信科技有限公司创立于2006年，专注于移动应用、电子商务领域开发与营销，是全国顶尖互联网平台开发服务商，是以移动互联网产品形状为代表的新税企业。在东信，我们每一天都一如既往的兴奋，追求超越，探索未知。我们总是推陈出新，为客户带来出色的服务并创造最大价值。</view>
				</view>
			</view>
			<view class="show-block photoAlbum pl20">
				<view class="sec-title">TA的相册</view>
				<dx-images :data="imgLists" scroll :LRPadding="0" :imgR="6"></dx-images>
			</view>
			<view class="show-block dynamic plr20">
				<view class="sec-title">TA的动态</view>
				<dynamicLists :data="dynamic" type="1"></dynamicLists>
			</view>
			<view class="show-block myInfo plr20">
				<view class="sec-title">个人资料</view>
				<view class="tag-group">
					<view class="tag" v-for="item in infoTags">{{ item }}</view>
				</view>
			</view>
			<view class="show-block condition plr20">
				<view class="sec-title">择偶条件</view>
				<view class="tag-group">
					<view class="tag" v-for="item in condTags">{{ item }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxImages from "doxinui/components/images/images"
	import dynamicLists from "@/components/dynamicLists"
	export default {
		components: {dxImages,dynamicLists},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				imgLists:[
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
				],
				dynamic:[
					{
						day:'07',
						date:'21-07',
						title:'东信科技有限公司创立于2006年，专注于移动应用、电子商务领域开发与营销，',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg','/static/fenxiaobg.jpg','/static/show-top-bg.jpg','/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},{
						day:'06',
						date:'21-07',
						title:'东信科技有限公司创立于2006年，专注于移动应用、电子商务领域开发与营销，',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},{
						day:'05',
						date:'21-07',
						title:'东信科技有限公司创立于2006年',
						photo:[]
					},{
						day:'04',
						date:'21-07',
						title:'',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},
				],
				infoTags:['1980年','160cm','本科','5000~10000','广东江门','IT工程师'],
				condTags:['25~30岁','160cm以上','大专以上','5000~10000','广东江门','未婚','介意有子女']
			}
		},
		mounted() {
		
		},
		methods: {
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					
				});
			},
			
		},
		onLoad(options) {
			//this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="">
@import "./index.css";
</style>