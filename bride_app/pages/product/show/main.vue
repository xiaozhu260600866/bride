<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
		
			<div class="show_banner bg-f" id="arrowTop">
				<myswiper :data="data.covers" purl="product" :zIndex="9"></myswiper>
			</div>
			<div class="pro_infor bg-f pt10" v-if="data.product">
				<div class="pro_name fs-16 plr15">{{data.product.name}}</div>
				<div class="cms_price plr15 pt5">
					<p class="saleprice fs-20">￥{{data.product.fclass == 84 ? '0.00':data.product.price}}</p>
					<p class="cprice fs-13" v-if="data.product.new_price">￥{{data.product.new_price}}</p>
				</div>
				<div class="reward mlr15 ptb10 bd-te mt5" v-if="data.dis && data.product.fclass != 84 && data.product.fclass !=105 && data.product.fclass !=106 && !data.product.merchantuser_userid">
					<div v-if="!data.dis.lev_id">
						<p class="fs-13 fc-6">一级奖励：<span class="Arial"><span v-if="data.product.firstDisPrice.type == 0">{{ data.product.firstDisPrice.ratio }}%</span>(￥{{ data.product.firstDisPrice.price }})</span></span></p>
						<p class="fs-13 fc-6">二级奖励：<span v-if="data.product.secondDisPrice.type == 0">{{ data.product.secondDisPrice.ratio }}%</span>(￥{{ data.product.secondDisPrice.price }})</span></p> 
					</div>
					<div v-for="lev in data.levs" v-if="data.dis.lev_id == lev.dis_lev_id">
						<p class="fs-13 fc-6">{{lev.name}}一级奖励：
							<span class="Arial">
								<span v-if="lev.type == 0">{{ data.product.price * lev.first_distor / 100  }}%</span>
								<span v-if="lev.type == 1">￥({{  lev.first_distor   }})</span>
							</span>
						</p>
						<p class="fs-13 fc-6">{{lev.name}}二级奖励：
							<span class="Arial">
								<span v-if="lev.type == 0">{{ data.product.price * lev.second_distor / 100  }}%</span>
								<span v-if="lev.type == 1">￥({{  lev.second_distor   }})</span>
							</span>
						</p>
					</div>
				</div>
				
				<div class="other-info fs-14 plr15 pb8" v-if="data.product.fclass != 84 && data.product.fclass !=105 && !data.product.wechat_card_id">
					<div class="info-item" v-if="data.product.yunfei !='0.00'">运费：{{ data.product.yunfei == 0 ? '免运费' : data.product.yunfei }}</div>
					<div class="info-item" v-else></div>
					<div class="info-item">已售<span class="Arial">{{ data.product.self_num_  + data.product.self}}</span><span class="plr5">|</span>剩余<span class="Arial">{{ data.product.num }}</span></div>
				</div>
			</div>
			
			<div class="buy-num plr15 ptb10 flex-between bg-f mt10" v-if="!data.product.hidd_buy_num  && data.product.fclass != 84 && ruleform.pay_method == 1">
				<div class="fs-15 lh-30">选购数量</div>
				<tui-numberbox :value="num" @change="change" :max="data.product.fclass == 160 ? 1 : 11000"></tui-numberbox>
			</div>

			<div class="pro_title mt10 bg-f" v-if="ruleform.pay_method == 1">
				<div class="title-item" @click="showEvaluate=false">
					<span :class="!showEvaluate ? 'cur' :''">商品详情</span>
				</div>
				<div class="title-item" @click="showEvaluate=true" v-if="data.product.fclass !=105">
					<span :class="showEvaluate ? 'cur' : ''">评价</span>
				</div>
			</div>
			<div :class="['pro-content','bg-f',ruleform.pay_method == 1 ? '': 'mt10']" v-if="!showEvaluate && data.product ">
				<div class="pro-con-main">
					<div class="img-item" v-for="(item,index2) in product_cover">
						<image :src="getSiteName + '/upload/images/product/'+item " mode="aspectFill" @click="previewImage(item,'product')"></image>
					</div>
					<u-parse :content="data.product.content" />
				</div>
			</div>
			<div class="evalute pb50 bd-be" v-if="showEvaluate">
				<div class="evalute-item p10 bg-f bd-be" v-for="v in data.suggestLists">
					<div class="u-info">
						<div class="u-info-box">
							<div class="u-img"><img class="img" :src="v.getUser.headimgurl"></div>
							<div class="u-name pl10">
								<p class="name lh20 fs-14">{{ v.getUser.nickname }}</p>
								<p class="fs-14 fc-6" v-if="v.suggestStatus == 1">好评</p>
								<p class="fs-14 fc-6" v-if="v.suggestStatus == 2">中评</p>
								<p class="fs-14 fc-6" v-if="v.suggestStatus == 3">差评</p>
							</div>
							<div class="r-time Arial fs-12 fc-9 pl10">{{ v.created_at }}</div>
						</div>
					</div>
					<div class="u-con pt10 plr15">
						<p class="p">{{ v.suggestContent1?v.suggestContent1:'该用户没有填写评价内容' }}</p>
						<div class="image-group">
							<div class="img-item" v-for="(item,index2) in v.getSuggestLogo">
								<image :src="getSiteName + '/upload/images/order/'+item " mode="aspectFill"></image>
							</div>
						</div>
					</div>
					<div class="u-con pb10 mlr15" v-if="v.suggestStatus ==2">
						<p class="fs-13 again mtb15 pl8 font_bold">追评 <span class="Arial">{{ v.updated_at }}</span></p>
						<p class="p" v-if="v.suggestContent2.length">{{ v.suggestContent2 }}</p>
						<div class="image-group">
							<div class="img-item" v-for="(item,index2) in v.getSuggestLogo2">
								<image :src="getSiteName + '/upload/images/order/'+item " mode="aspectFill"></image>
							</div>
						</div>
					</div>
				</div>
				<div class="data-con" v-if="data.suggestLists.length == 0">
					<p class="fs-12 fc-9 p10 text-center">暂无评价</p>
				</div>
			</div>
			<view class="pro_footer"></view>
			<info :productInfo="data.productInfo" @callback="infoCallBack" ref="productInfo" :product="data.product"></info>
			<div id="show_footer">
				<div class="left left_w40 plr8 bd-te">
					<button class="btn-item" hover-class="none" @click="goto('/pages/index/main',2)"><!-- v-if="data.product.type != 1" -->
						<p class="iconfont icon-home"></p>
						<p class="txt">首页</p>
					</button>
					<button class="btn-item" hover-class="none" @click="$refs.shareProduct.shareBtn = true">
						<p class="iconfont icon-share"></p>
						<p class="txt">分享</p>
					</button>
					<button class="btn-item cart" hover-class="none" @click=" goto('/pages/user/cart/main?historyUrl=del',1)" v-if="data.product.type == 1">
						<p class="iconfont icon-user-cart"></p>
						<p class="txt">购物车</p>
						<block v-if="data.cartNum >= 1">
							<div class="sum">{{ data.cartNum }}</div>
						</block>
					</button>
				</div>
				<div class="right flex1 w-b100 pr5" v-if="!data.product.is_miaosha">
					<div class="r-nav" v-if="data.product.add_cart && data.product.fclass!=105 && data.product.cart && !data.product.merchantuser_userid && data.product.type == 1">
						<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="addCart" myclass="r-item r-item-red" title="加入购物车"></myform>
					</div>
					<div class="r-nav">
						<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="toBuy"
						 :myclass="['r-item',data.product.fclass!=105 && data.product.cart && !data.product.merchantuser_userid && data.product.type == 1
						  ? 'r-item-yellow' : 'r-item-red']" title="立即下单"></myform>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 如果该商品可以购买开始 -->
		<view class="share-overlay" @click="shareDiag=!shareDiag" v-if="shareDiag"></view>
		<div class="share-tip" @click="shareDiag=!shareDiag" v-if="shareDiag">
			<img class="img" src="https://niu-shop-app.doxinsoft.com/images/jmb/share-tip.png" mode="widthFix">
		</div>
		<sharePro :data="data" :headimgurl="headimgurl" ref="shareProduct"  :qrcodeFilePath="qrcodeFilePath" :posterFilePath="posterFilePath" v-if="show"></sharePro>
	</view>
</template>

<script>
	import "./index.css";
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	import info from './layouts/info'
	import sharePro from "@/components/poster/sharePro.vue";
	export default {
		components: {uParse,info,tuiNumberbox,sharePro},
		data() {
			return {
				formAction: '/shop/product/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					brand: '',
					pay_method: 1
				},
				vaildate: {},
				show:false,
				data: this.formatData(),
				num: 1,
				showEvaluate: false,
				keepAlive: false,
				showType: '',
				intoView: '',
				shareDiag: false,
				product_cover:[],
				rule_type: 0,
				vaildate:{},
				fingerprint: '',
				posterFilePath: '',
				proposterBg: '',
				tempFilePath: '',
				qrcodeFilePath: '',
				headimgurl: '',
			}
		},
		onReachBottom() {
			console.log('123');
			this.hasMore(this);
		},
		
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			this.data.query.proid = this.data.product.id;
			return this.shareSource(this, this.data.product.name);
		},
		onLoad(options) {
			this.rule_type = wx.getStorageSync('role_type');
			this.num = 1;
      		this.ruleform.pay_method = 1;
			if (options.user_id) wx.setStorageSync('card_user_id', options.user_id);
			this.ajax();
		},
		methods: {
			changeBrand(val){
				this.ruleform.brand = val;
			},
			rechargeYaji() {
				setTimeout(() => {
					this.postAjax('/shop/user/ready-recharge-yaji', {
						amount: this.data.product.price * this.num,
						type: 0,
						brand: this.ruleform.brand,
						num: this.num
					}).then(msg=>{
						if (msg.data.status == 2) {
							this.goto("/pages/user/yaji/pay_center/main?order_no=" + msg.data.order_no);
						}
					});
				}, 50)
			},
			toBuyPackage() {
				this.goto("/pages/package/left_num/main?id=" + this.data.package.id);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.product.name);
					if(msg.product.product_cover){
						this.product_cover = msg.product.product_cover.split(",");
					}
					if(msg.package){
						this.ruleform.pay_method = 2;
					}
					let poster_cover = msg.product.poster_cover ? this.getSiteName + '/upload/images/product/' + msg.product.poster_cover :
						msg.product.firstCover
					wx.downloadFile({
						url: poster_cover,
						success: res => {
							this.posterFilePath = res.tempFilePath;
						},
						fail: res => {
							console.log(res);
						}
					});
					console.log(msg.user.headimgurl);
					wx.downloadFile({
						url: msg.user.headimgurl,
						success: res => {
							this.headimgurl = res.tempFilePath;
						},
						fail: res => {
							console.log(res);
						}
					});
					
					
					wx.downloadFile({
						url: this.data.product.firstCover,
						success: res => {
							this.productFirstCover = res.tempFilePath;
							//this.show = true;
						},
						fail: res => {
							console.log(res);
						}
					});
					wx.downloadFile({
						url: this.data.qrcode,
						success: res => {
							this.qrcodeFilePath = res.tempFilePath;
							this.show = true;
						},
						fail: res => {
							console.log(res);
						}
					});
					
			
				});
			},
			addCart() {
				this.$store.state.mutations.cart = true;
				this.$refs.productInfo.showType = 'addCart';
				//uni.setStorageSync('refreshUrl',"/pages/user/cart/main");
				this.updateUrl(["/pages/user/cart/main","/pages/index/main","/pages/user/index/main",'/pages/discount/index/index','/pages/index-phone/main']);
				if (this.data.productInfo.length > 0) {
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					this.$refs.productInfo.addCartAjax({
						id: this.data.product.id,
						num: this.num,
						is_info: 0
					});
				}
			},
			infoCallBack(cartNum) {
				this.data.cartNum = cartNum;
			},
			toBuy() {
				//押金
				if (this.data.product.fclass == 10505) {
					this.rechargeYaji();
				} else {
					this.$refs.productInfo.showType = '';
					if (this.data.productInfo.length > 0) {
						this.$refs.productInfo.toggleInfoDiag();
					} else {
						this.$refs.productInfo.addCartAjax({
							id: this.data.product.id,
							num: this.num,
							is_info: 0
						});
					}
				}

			},
			addUserCollection() {
				let product_id = this.data.product.id;
				let url = "/shop/product/collection";
				if (this.data.collections) return false;
				this.postAjax(url, {
					id: product_id
				}, msg => {
					if (msg.data.status == 2) {
						this.data.collections = 1;
					}
				});
			},
			change: function(e) {
				this.num = e.value
			},
		}
	}
</script>
<style>

</style>
