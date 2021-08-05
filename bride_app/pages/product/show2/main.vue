<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="show_banner bg-f" id="arrowTop">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</div>
			<div class="pro_infor bg-f pt10" v-if="data.product">
				<div class="pro_name fs-16 plr15">{{data.product.name}}</div>
				<div class="cms_price plr15 pt5">
					<p class="saleprice fs20 float_l">￥{{data.product.fclass == 84 ? '0.00':data.product.price}}</p>
					<p class="cprice fs-13 float_l" v-if="data.product.new_price">￥{{data.product.new_price}}</p>
				</div>
				<div class="reward mlr15 ptb10 bd-te mt5" v-if="data.dis && data.product.fclass != 84 && data.product.fclass !=105 && data.product.fclass !=106 && !data.product.merchantuser_userid">
					<p class="fs-13 fc-6">一级奖励：<span class="Arial"><span v-if="data.product.firstDisPrice.type == 0">{{ data.product.firstDisPrice.ratio }}%</span>(￥{{ data.product.firstDisPrice.price }})</span></span></p>

					<!-- 	<p class="fs-13 fc-6">二级奖励：<span v-if="data.product.secondDisPrice.type == 0">{{ data.product.secondDisPrice.ratio }}%</span>(￥{{ data.product.secondDisPrice.price }})</span></p>  -->
				</div>
				<div class="other-info fs-12 plr15 pb8" v-if="data.product.fclass != 84 && data.product.fclass !=105">
					<div class="info-item" v-if="data.product.yunfei !='0.00'">运费：{{ data.product.yunfei == 0 ? '免运费' : data.product.yunfei }}</div>
					<div class="info-item" v-else></div>
					<div class="info-item">已售<span class="Arial">{{ data.product.self_num_  + data.product.self}}</span><span class="plr3">|</span>剩余<span class="Arial">{{ data.product.num }}</span></div>
				</div>
				<div class="brand-nav p10 flex" v-if="data.package">
					<p :class="['nav','w-b33','mlr5','fs-15',ruleform.pay_method == 1 ? 'cur': '']" @click="ruleform.pay_method = 1">现金</p>
					<p :class="['nav','w-b33','mlr5','fs-15',ruleform.pay_method == 2 ? 'cur': '']" @click="ruleform.pay_method = 2">使用套票</p>
				</div>
				<div class="brand-nav plr10 pb10 flex flex-wrap" v-if="data.product.fclass == 105">
					<div class="item p5" v-for="v in data.brand">
						<p :class="['nav','fs-15',ruleform.brand == v.label ? 'cur': '']" @click="changeBrand(v.label)">{{ v.label }}</p>
					</div>
				</div>
				<!-- <weui-input v-model="ruleform.brand" myclass="text" name="brand" datatype="require" label="桶装水品牌" placeholder="请选择品牌" changeField="label" type="select" :data="data.brand" v-if="data.product.fclass == 105"></weui-input>  -->
			</div>
			
			<div class="buy-num plr15 ptb10 flex-between bg-f mt10" v-if="!data.product.hidd_buy_num  && data.product.fclass != 84 && ruleform.pay_method == 1">
				<div class="fs-15 lh-30">选购数量</div>
			
				<tui-numberbox :value="num" @change="change" :max="data.product.fclass == 160 ? 1 : 11000"></tui-numberbox>
			</div>
			<p class="buy-num plr15 ptb10 flex-between bg-f mt10 fs-15 lh-30" v-if="data.product.fclassArr.length && data.product.fclassArr[0] == 238">邮件寄递合作服务商：中国邮政</p>

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
			<div id="show_footer" v-if="data.product.fclass != 84 && ruleform.pay_method == 1 && data.product.fclass != 109 && data.product.fclass != 110 ">
				<div class="left left_w40 plr8 bd-te">
					<button class="btn-item" hover-class="none" @click="goto('/pages/index/main',2)"><!-- v-if="data.product.type != 1" -->
						<p class="iconfont icon-home"></p>
						<p class="txt">首页</p>
					</button>
					
				</div>
				<div class="right flex1 w-b100 pr5" v-if="!data.product.is_miaosha">
					
					<div class="r-nav">
						
						  <button class="data-v-309c0408 data-v-309c0408 plr0 plr0 r-item r-item r-item-yellow r-item-yellow" @click="toBuy">
							  <label class="_span _span data-v-309c0408 data-v-309c0408">
								  立即使用
							  </label>
						  </button>
					</div>
				</div>
			</div>
			<div id="show_footer" v-if="(data.product.fclass == 84 || data.product.fclass == 109 || data.product.fclass == 110) && ruleform.pay_method == 1">
				<div class="left plr8">
					<button class="btn-item share" hover-class="none" open-type="share">
						<p class="iconfont icon-share"></p>
						<p class="txt">分享</p>
					</button>
				</div>
				<div class="right">
					<div class="r-nav pr10">
						<myform :ruleform="ruleform" :vaildate="vaildate" style="width:100%" @callBack="toBuy" myclass="r-item r-item-red" title="立即办理"></myform>
					</div>
				</div>
			</div>
			<div id="show_footer" v-if="ruleform.pay_method == 2">
				<div class="left plr8">
					<button class="btn-item share" hover-class="none" open-type="share">
						<p class="iconfont icon-share"></p>
						<p class="txt">分享</p>
					</button>
				</div>
				<div class="right">
					<div class="r-nav pr10">
						<div class="r-item r-item-red" @click="toBuyPackage" :data-is_info="info? 1 :0 " :data-num="num">套餐支付</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 如果该商品可以购买开始 -->
		<view class="share-overlay" @click="shareDiag=!shareDiag" v-if="shareDiag"></view>
		<div class="share-tip" @click="shareDiag=!shareDiag" v-if="shareDiag">
			<img class="img" src="https://niu-shop-app.doxinsoft.com/images/jmb/share-tip.png" mode="widthFix">
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	import info from './layouts/info'
	export default {
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
				data: this.formatData(),
				num: 1,
				showEvaluate: false,
				keepAlive: false,
				showType: '',
				intoView: '',
				shareDiag: false,
				product_cover:[],
				rule_type: 0,
				vaildate:{}
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
				if (this.data.product.fclass == 105) {
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
		},
		components: {
			uParse,
			info,
			tuiNumberbox

		}
	}
</script>
<style>

</style>
