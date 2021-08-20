<template>
	<view class="conn-body" :class="[myclass]">
		<view class="conn-item plr15 ptb10" v-for="v in lists">
			<view @click="goto('/pages/user/card/show/index?user_id='+v.id,1)" class="head_img">
				<image class="img" :src="v.userInfo.company_logo?getSiteName+'/upload/images/card/'+v.userInfo.company_logo:v.headerPic" mode="aspectFill"></image>
			</view>
			<view class="info plr15">
				<view class="fs-14 fc-6 lh-20" @click="goto('/pages/user/card/show/index?user_id='+v.id,1)">
					<view class="name mb5">
						<text class="fs-17 fc-black">{{ v.userInfo.name?v.userInfo.name: v.username }}2</text>
						<text class="pl5" v-if="v.userInfo.position">{{ v.userInfo.position }}</text>
					</view>
					<view class="company" v-if="v.userInfo.company_name">{{ v.userInfo.company_name }}</view>
				</view>
			</view>
			<block v-if="data.myUser.id != v.id">
				<view class="r-btn" @click="subscribe(v)" v-if="v.isSubscribe==0">
					<view class="dx-btn dx-btn-blue">+ 好友</view>
				</view>
				<view class="r-btn" @click="subscribe(v)" v-if="v.isSubscribe">
					<view class="dx-btn dx-btn-default bg-f5 fc-7">已关注</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['myclass','lists','data'],
		data() {
			return {
				getSiteName: this.getSiteName(),
			}
		},
		methods: {
			subscribe(v){
				if (this.data.myUser.id == v.id) return false;
				let authType = v.isSubscribe ? "del" : 'add';
				this.postAjax("/shop/user/card-create", { user_id: this.data.myUser.id, to_userid: v.id, type: 14, authType: authType }).then(msg=>{
					  this.getParent(this).ajax();
				});
			},
		}
	}
</script>

<style>
/* 人脉列表 */
.conn-body .conn-item{background: #fff;border-radius: 12rpx;margin: 24rpx;overflow: hidden;display: flex;align-items: center;}
.conn-body .conn-item .head_img .img{width: 60px;border-radius: 30%;height: 60px;display: flex;}
.conn-body .conn-item .info{position: relative;flex: 1;overflow: hidden;}
</style>