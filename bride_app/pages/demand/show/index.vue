<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<!-- 该页面的标题，根据文章标题而定 -->
					
		<view class="content" v-if="data.show">
			<view class="bg-f">
				<view class="row_border">
					<dx-list-msg :imgSrc="detail.getLogo" :name="detail.getUser.userInfo.company_name+' | '+detail.name" noborder :imgR="6">
						<div slot="con" class="flex mt8">
							<view class="class-label main-bg">{{detail.category}}</view>
					
						</div>
					</dx-list-msg>
				</view>
				<view class="plr15 ptb10 lh-24 fs-16 fc-3">
					<view>{{ detail.title }}</view>
				</view>
			<!-- 	<view class="con p15 fs-15 fc-3">
					<u-parse :content="detail.content" />
				</view> -->
				<view class="img-item row_border">
					<image class="img" :src="item.img" mode="widthFix" v-for="(item,index2) in detail.getCover" :key="item" @click="previewImage(item.img)"></image>
				</view>
				<view class="read">
					<view class="Arial fs-13 fc-9">{{detail.created_at}}</view>
					<view class="right">
						<view class="read-nav">
							<text class="iconfont icon-demand-see"></text>
							<text class="span Arial">{{detail.views}}</text>
						</view>
						<view class="read-nav" @click="thumb(detail)">
							<text :class="['iconfont icon-demand-thumb',detail.thumb ? 'fc-red':'']"></text>
							<text class="span Arial">{{detail.thumbCount}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="mt12 info bg-f">
				<dx-list-cell name="电话：" nameColor="#666" iconName="tel-fill2" :iconSize="18" iconColor="#387ef8">
					<view slot="right" class="text-left flex-between flex-middle">
						<view class="Arial fs-15 fc-6 pr10">{{detail.phone}}</view>
						<dx-button type="primary" size="small" block @click="phone(detail.phone)">拨号</dx-button>
					</view>
				</dx-list-cell>
				<dx-list-cell name="地址：" nameColor="#666" iconName="location-fill" :iconSize="18" iconColor="#387ef8" v-if="detail.address">
					<view slot="right" class="text-left flex-between flex-middle">
						<view class="Arial fs-15 fc-6 pr10 lh-20">{{detail.address}}</view>
						<dx-button type="primary" size="small" block @click="location(detail.location_x,detail.location_y,detail.address)">导航</dx-button>
					</view>
				</dx-list-cell>
				<dx-list-cell name="公司：" nameColor="#666" iconName="iconfont icon-company" :iconSize="18" iconColor="#387ef8" v-if="detail.getUser.userInfo.company_name">
					<view slot="right" class="text-left flex-between flex-middle">
						<view class="Arial fs-15 fc-6 pr10 lh-20">{{detail.getUser.userInfo.company_name}}</view>
					</view>
				</dx-list-cell>
			</view>
			
			<!-- 红包领取列表 -->
			<view class="hongbao-list mtb12 bg-f" v-if="data.detail.red_packet">
				<view class="tit fs-14 fc-9 plr15 ptb5 bd-be">
					<text>已领红包</text>
					<!-- <text>已抢</text>
					<text class="Arial fc-red plr2">{{data.packetOrdersCount}}</text>
					<text class="Arial plr2">/</text>
					<text class="Arial pl2">{{data.detail.getRedPacket.red_packet_num}}</text>
					<text>份，共计</text>
					<text class="Arial fc-red plr2">{{data.packetOrdersSum}}</text>
					<text class="Arial plr2">/</text>
					<text class="Arial pl2">{{data.detail.getRedPacket.red_packet_amount}}</text>
					<text>元</text> -->
				</view>
				<view>
					<dx-list-cell :name="item.getUser.nickname" :imgSrc="item.getUser.headimgurl" :imgWidth="26" :imgHeight="26" :imgR="6" v-for="item in data.lists.data">
						<view slot="right" class="text-left flex-right flex-middle">
							<view class="iconfont icon-hongbao pr5 fc-red"></view>
							<view class="price">{{ item.amount }}元</view>
						</view>
					</dx-list-cell>
				</view>
			</view>
			<view id="show_footer">
				<view class="left plr8 bd-te">
					<button class="btn-item" hover-class="none" @click="goto('/pages/index/main',2)">
						<p class="iconfont icon-home"></p>
						<p class="txt">首页</p>
					</button>
					<button class="btn-item" hover-class="none" @click="goto('/pages/user/card/show/index?user_id='+detail.getUser.id,1)">
						<p class="iconfont icon-address-book"></p>
						<p class="txt">名片</p>
					</button>
					<button class="btn-item" hover-class="none" @click="openShareDiag">
						<p class="iconfont icon-share"></p>
						<p class="txt">分享</p>
					</button>
					<button class="btn-item cart" hover-class="none" @click="collection(detail)">
						<p :class="['iconfont',collect == true? 'icon-staryes main-color':'icon-starno']" ></p>
						<p :class="['txt',collect == true? 'main-color':'']">{{collect == true?'已收藏':'收藏'}}</p>
					</button>
				</view>
				<view class="right flex1 w-b100 pr5">
					<view class="r-nav">
						<view class="r-item r-item-green fs-14" @click="phone(detail.phone)">
							<view class="lh-20">一键拨号</view>
							<view class="lh-20 Arial">{{detail.phone}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 领红包浮标 -->
			<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="$refs.hongbaoDiag.thisDiag = true" myclass="r-item r-item-red" title="  " v-if="data.detail.red_packet">
				<view class="hongbao-icon"  slot="content">
					<image class="img" :src="getSiteName+'/images/wap/hongbao-icon.png'" mode="widthFix"></image>
				</view>
			</myform>
			
			
			<!-- 领红包层 -->
			<dx-diag :open="false" myclass="hongbao-diag" width="600rpx" ref="hongbaoDiag" :tbPadding="0" :lrPadding="0" @callBack="ajax">
				<view class="hongbao-off" :style="'background-image: url('+getSiteName+'/images/wap/hongbao-bg-no.png)'" v-if="hongbaoOpen == false">
					<view class="sendHead">
						<image class="img" :src="data.myUser.headimgurl"></image>
					</view>
					<view class="sendName" >{{data.myUser.nickname}}</view>
					<view class="tiptxt" v-if="data.myPacketOrdersCount">
						<view class="txt2">你已参加过活动</view>
					</view>
					<!-- <view class="tiptxt" v-else-if="parseInt(data.packetOrdersCount)>=parseInt(data.detail.getRedPacket.red_packet_num)">
						<view class="txt2">手慢了，已派完</view>
					</view> -->
					<view class="tiptxt" v-else>
						<view class="txt1">发了一个运气红包，金额随机</view>
						<view class="txt2">恭喜发财，大吉大利</view>
					</view>
					
					
					<view :class="['open-icon',iconMove ? 'open' :'']" @click="openHongBao()" v-if="data.myPacketOrdersCount == 0">
						<image class="img" :src="getSiteName+'/images/wap/hongbao-kai.png'"></image>
					</view>
				</view>
				<view class="hongbao-open" :style="'background-image: url('+getSiteName+'/images/wap/hongbao-bg2.png)'" v-else>
					<!-- <view class="userHead">
						<image class="img" src="https://thirdwx.qlogo.cn/mmopen/vi_32/V0wXWAkA83tWvP4DeKerfMZdBJeowgDYSpiaqvINJYoOicvLEynvkUaKVicdF1cX9UtMzpTZRFBXyjQTsSlZmMhpw/132"></image>
					</view>
					<view class="userName">东信科技-梅</view> -->
					<view class="hongbao-price text-center flex-baseline flex-center">
						<text class="fs-40 fw-bold">{{data.red_packet_money}}</text>
						<text class="nuit fs-15 pl5">元</text>
					</view>
					<view class="hongbao-tip text-center fs-13 pt20">已放入456钱包，可提现微信零钱</view>
					<dx-button size="lg" type="success" btnBg="#fed4a4" btnBd="#fed4a4" block @click="hongbao = false;goto('/pages/index/main',2)" >回到首页</dx-button>
				</view>
			</dx-diag>
			<sharePost  ref="sharePost" :ruleform="detail"></sharePost>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import dxListCell from "doxinui/components/list-cell/list-cell"
	import dxImages from "doxinui/components/images/images"
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxDiag from "doxinui/components/diag/diag"
	import sharePost from "@/components/poster/sharePost.vue";
	export default {
		components: {
			uParse,dxListCell,dxImages,dxListMsg,dxDiag,sharePost
		},
		data() {
			return {
				formAction: '/articleOrder/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				newsShow: false,
				collect: false,
				detail:{},
				ruleform:{},
				vaildate:{},
				hongbaoOpen: false,
				iconMove:false,
				shareL:{
					product:{
						price:'49.99',
						new_price:'39.99',
						name:'没什么，只是想给你发个红包（点进，右下角红包领取）',
					},
					dis:{name:'朱生'},
					user:{nickname:'东信科技-强'},
				},
				productFirstCover:'',
				qrcodeFilePath:'',
			}
		},
		methods: {
			openShareDiag(){
				console.log(this.$refs);
				this.$refs.sharePost.shareBtn = true
			},
			collection(item){
				this.postAjax("/articleOrder/collection",{articleOrder_id:item.id},"notloading").then(msg=>{
					if(msg.data.status == 2){
						this.collect = !this.collect;
					}
				});
			},
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
			},
			openHongBao(v){
				this.postAjax("/articleOrder/openHongBao",{price:this.data.red_packet_money,articleOrder_id:this.data.detail.id}).then(msg=>{
					if(msg.data.status == 2){
						this.iconMove = true;
						setTimeout(()=>{
							this.hongbaoOpen = true;
						},2000)	
					}
				});
			},
			ajax() {
				this.getAjax(this, {
				
				}).then(msg => {
					this.detail = msg.detail;
					this.setTitle(this.detail.title);
					this.collect = msg.detail.collection;
					wx.downloadFile({
						url: msg.detail.getCover[0].img,
						success: res => {
							this.$set(this.data.detail,"productFirstCover",res.tempFilePath);
							//this.data.detail.productFirstCover = res.tempFilePath;
						},
						fail: res => {
							console.log(res);
						}
					});
					wx.downloadFile({
						url: this.data.qrcode,
						success: res => {
							//this.qrcodeFilePath = res.tempFilePath;
							this.$set(this.data.detail,"qrcodeFilePath",res.tempFilePath);
							this.show = true;
						},
						fail: res => {
							console.log(res);
						}
					});
					
				});
			}
		},
		onLoad(options) {
			this.ajax();
			
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			return this.shareSource(this, this.data.detail.red_packet ? '助力领红包':'东信科技',1);
		},
		
	}
</script>
<style scoped="">
@import url('index.css');
</style>