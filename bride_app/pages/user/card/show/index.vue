<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb60" v-if="data.show">
			<view class="bg-f">
				<cardTemplate :type="ruleform.card_style_type" myclass="pb0" :ruleform="data.user"></cardTemplate>
				<view class="scroll_box card-info">
					<scroll-view class="scroll-view_x" scroll-x>
						<view class="p10">
							<view class="info-item mr10" @click="phone(ruleform.phone)">
								<view class="p p1"><text class="iconfont icon-phone"></text>手机</view>
								<view class="p Arial">{{ ruleform.phone }}</view>
							</view>
							<view class="info-item mr10" v-if="ruleform.tel" @click="phone(ruleform.tel)">
								<view class="p p1"><text class="iconfont icon-release-tel"></text>电话</view>
								<view class="p Arial">{{ ruleform.tel }}</view>
							</view>
							<view class="info-item mr10" v-if="ruleform.wechat" @click="copy(ruleform.wechat)">
								<view class="p p1"><text class="iconfont icon-wechat-all"></text>微信</view>
								<view class="p Arial">{{ ruleform.wechat }}</view>
							</view>
							<view class="info-item mr10" v-if="ruleform.email" @click="copy(ruleform.email)">
								<view class="p p1"><text class="iconfont icon-letter"></text>邮箱</view>
								<view class="p Arial">{{ ruleform.email }}</view>
							</view>
							<view class="info-item mr10" v-if="ruleform.company_name" @click="copy(ruleform.company_name)">
								<view class="p p1"><text class="iconfont icon-company"></text>公司</view>
								<view class="p">{{ ruleform.company_name }}</view>
							</view>
							<view class="info-item mr10" v-if="ruleform.address" @click="location(ruleform.location_x,ruleform.location_y,ruleform.address)">
								<view class="p p1"><text class="iconfont icon-release-location main-color"></text>地址</view>
								<view class="p">{{ ruleform.address }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="attention lh-20 fs-12 fc-9">
					<view class="attention_bd">
						<view class="head-item">
							<image v-for="(head,key) in data.seeLists.data" class="img" :src="key<0?'https://card.doxinsoft.com/images/wap/poster-bg01.jpg':head.getUser.headimgurl"
							 v-if="key <8"></image>
						
							<text class="fs-10" v-if="data.seeLists.data.length >8">•••</text>
						</view>
						<view><text class="Arial">{{ data.seeLists.data.length }}</text>人浏览</view>
					</view>
					<view class="attention_ft" @click="thumbUp()">
						<view :class="['fs-20', data.thumbUp ? 'fc-red' :'']">
							<text :class="['iconfont', data.thumbUp ? 'icon-praise' :'icon-praise-o']"></text>
						</view>
						<view  @click="thumbUp()">靠谱<text class="Arial">{{ data.thumbUpNum }}</text></view>
					</view>
				</view>
			</view>
			<view class="nw-sec bg-f mtb10">
				<view class="sec-nav" :class="">
					<view class="name" :class="[remark==1?'cur':'',data.user.is_authentication==0?'w-b33':'']" @click="remark=1">业务介绍</view>
					<view class="name" :class="[remark==2?'cur':'']" @click="remark=2" v-if="data.user.is_authentication">公司简介</view>
					<view class="name" :class="[remark==3?'cur':'']" @click="remark=3" v-if="data.user.is_authentication && data.articleOrderLists.length">公司需求</view>
					<view class="name" :class="[remark==4?'cur':'']" @click="remark=4" v-if="data.user.is_authentication && data.lists.data.length">服务产品</view>
				</view>
				<view v-if="remark==1">
					<view class="sec-con mb10" v-if="ruleform.remark.length || ruleform.remark_pic.length">
						<view class="p fs-16 fc-3 p15" v-if="ruleform.remark">{{ ruleform.remark }}</view>
						<view class="mb10 mlr10 pb10">
							<image class="img flex" :src="getSiteName+'/upload/images/user/800_'+v" mode="widthFix" @click="previewImage(v,'user')"
							 v-for="v in ruleform.remark_pic"></image>
						</view>
					</view>
					<view class="nodata" v-else>暂无数据</view>
				</view>
				<view v-if="remark==2">
					<view class="sec-con mb10" v-if="ruleform.remark_company.length || ruleform.remark_pic_company.length">
						<view class="p fs-16 fc-3  p15" v-if="ruleform.remark_company">{{ ruleform.remark_company }}</view>
						<view class="mb10 mlr10 pb10">
							<image class="img flex" :src="getSiteName+'/upload/images/user/800_'+v" mode="widthFix" @click="previewImage(v,'user')"
							 v-for="v in ruleform.remark_pic_company"></image>
						</view>
					</view>
					<view class="nodata" v-else>暂无数据</view>
				</view>
				<view v-if="remark==3">
					<block v-if="data.articleOrderLists.length">
						<demand-lists :data="data.articleOrderLists"></demand-lists>
					</block>
					<view class="nodata" v-else>暂无数据</view>
				</view>
				<view v-if="remark==4">
					<block v-if="data.lists.data.length">
						<productLists :data="data" :type="2"></productLists>
					</block>
					<view class="nodata" v-else>暂无数据</view>
				</view>
			</view>
			<!-- 已有名片 -->
			<view id="show_footer" v-if="data.myUser.userInfo.phone">
				<view class="left plr8 bd-te">
					<button class="btn-item" style="width: 140rpx;" hover-class="none" @click="goto('/pages/index/main',2)">
						<p class="iconfont icon-home"></p>
						<p class="txt">人脉/服务</p>
					</button>
					<button class="btn-item" style="width: 140rpx;" hover-class="none" @click="addPhoneContact">
						<p class="iconfont icon-address-book-o"></p>
						<p class="txt">存入通迅录</p>
					</button>
					<button class="btn-item" style="width: 140rpx;" hover-class="none"  v-if="data.myUser.id != data.user.id" @click="subscribe()">
						<p :class="['iconfont',data.isSubscribe ?'icon-staryes main-color':'icon-starno']"></p>
						<p :class="['txt',data.isSubscribe ?'main-color':'']">{{data.isSubscribe ? '已加' : '+'}}好友</p>
					</button>
				</view>
				<view class="right flex1 w-b100 pr5">
					<view class="r-nav">
						<button class="r-item main-bg" openType="share" hover-class="none">分享{{data.myUser.id == data.user.id ? '我' :'他'}}的名片</button>
					</view>
				</view>
			</view>
			<!-- 未注册名片 -->
			<view id="show_footer" v-else>
				<view class="left plr8 bd-te">
					<button class="btn-item" style="width: 140rpx;" hover-class="none" @click="goto('/pages/index/main',2)">
						<p class="iconfont icon-home"></p>
						<p class="txt">人脉/服务</p>
					</button>
					<button class="btn-item" style="width: 140rpx;" hover-class="none" @click="addPhoneContact">
						<p class="iconfont icon-address-book-o"></p>
						<p class="txt">存入通迅录</p>
					</button>
				</view>
				<view class="right flex1 w-b100 pr5">
					<view class="r-nav">
						<view class="r-item main-bg" @click="goto('/pages/user/card/register/index',1)">免费创建数字名片</view>
					</view>
				</view>
			</view>
		</view>
		<dx-diag :open="false" :OFFicon="false" title="授权微信访问" ref="diag">
			<view class="content text-center fs-16 fc-6 lh-24 ptb20">为保护他人的隐私，授权后可查看对方的名片</view>
			<view class="btn">
				<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" @callBack="ajax">
					<view slot="content">
						<dx-button type="success" size="lg" round block >授权微信</dx-button>
					</view>
				</myform>
			</view>
		</dx-diag>
	</view>
</template>

<script>
	import dxDiag from "doxinui/components/diag/diag"
	import cardTemplate from '@/components/cardTemplate'
	import demandLists from "@/components/demandLists";
	import productLists from "@/components/productLists";
	export default {
		components:{cardTemplate,dxDiag,demandLists,productLists},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{},
				remark:1,
				userInfo:{
					name:'东信梅',
					position:'普通员工',
					company_name:'江门市东信科技有限公司',
					phone:'13380951183',
					email:'3314024140@qq.com',
					address:'江门市蓬江区建设路82号金山大厦10楼1001室',
					company_logo:'',
					remark:'东信科技有限公司创立于2006年，专注于移动应用、电子商务领域开发与营销，是全国顶尖互联网平台开发服务商，是以移动互联网产品形状为代表的新税企业。在东信，我们每一天都一如既往的兴奋，追求超越，探索未知。我们总是推陈出新，为客户带来出色的服务并创造最大价值。',
					mien_remark:'未来智能制造就是跨界大数据，即用户大数据、制造流程大数据和供应链大数据三者打通。明年‘双11’，我们将会精确地备料和生产，储存多少零件，生产线什么时候开，这些都可以根据历史数据计算出来。”鸿海集团董事长郭台铭这样形容大数据的意义。'
				},
				seeLists:['/static/fenxiaobg.jpg','/static/image/E01.png','/static/fenxiaobg.jpg','/static/image/E01.png','/static/fenxiaobg.jpg','/static/image/E01.png'],
				card:{
					show_num:6,
					thumbUp: '',
					thumbUpNum:20,
				},
				demandLists:[
					{
						getLogo:'https://select.doxinsoft.com/upload/images/articleOrder/300_TM7z7qPrBK.jpg',
						name:'小朱',
						title:'1111',
						red_packet: 0,
						category:'采购',
						views:'4',
						created_at:'2021-07-17 11:30:45',
						thumbCount:'1',
						phone:'13326805396'
					}
				]
			}
		},
		
		onShareAppMessage() {
				if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			return this.shareSource(this, "你好，我是"+this.ruleform.name+"，这是我的名片，请惠存","true");
		},
		methods: {
			subscribe(v){
				if (this.data.myUser.id == this.data.user.id) return false;
				let authType = this.data.isSubscribe ? "del" : 'add';
				this.postAjax("/shop/user/card-create", { user_id: this.data.myUser.id, to_userid: this.data.user.id, type: 14, authType: authType }).then(msg=>{
					  this.data.isSubscribe = msg.data.isSubscribe;
				});
			},
			addPhoneContact() {
					uni.addPhoneContact({
						firstName: this.data.user.userInfo.name, //名字
						mobilePhoneNumber: this.data.user.userInfo.phone, //手机号
						success: () => {
							this.getSuccess("成功");
						}
					})
			},
			thumbUp() {
				if (this.data.myUser.id == this.data.user.id) return false;
				let authType = this.data.thumbUp ? "del" : 'add';
				this.postAjax("/shop/user/card-create", { user_id: this.data.myUser.id, to_userid: this.data.user.id, type: 2, authType: authType }).then(msg=>{
						  this.data.thumbUpNum = msg.data.thumbUpNum
					   if(authType == "add"){
						    this.data.thumbUp  =1;
					   }else{
						     this.data.thumbUp  =0;
					   }
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.user.userInfo;
					this.ruleform.remark_pic = msg.user.userInfo.remark_pic ? msg.user.userInfo.remark_pic.split(","): [];
					this.ruleform.remark_pic_company = msg.user.userInfo.remark_pic_company ? msg.user.userInfo.remark_pic_company.split(","): [];
					this.setTitle(this.ruleform.name+'的名片')
					wx.getStorage({
						key: 'userInfo',
						success:res=> {
							this.$refs.diag.thisDiag = false;
						},
						fail:res=> {
							this.$nextTick(()=>{
								this.$refs.diag.thisDiag = true;
							})
							
						}
					})
					
				});
			},
			
		},
		onLoad(options) {
			
			this.ajax();
		}
		
	}
</script>
<style scoped="">
@import "./index.css";
</style>