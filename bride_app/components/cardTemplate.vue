<template>
	<view>
		<view :class="['cardOne p10',myclass]" v-if="type == 1">
			<view class="cardOne-box">
				<view class="card-top">
					<image class="head" :src="ruleform.headerPic"></image>
					<view class="right-info fs-14 fc-6">
						<view class="fs-18 fc-3 fw-bold">
							{{ ruleform.userInfo.name?ruleform.userInfo.name:ruleform.nickname }}</view>
						<view class="row">{{ ruleform.userInfo.position?ruleform.userInfo.position:'暂末填写职位' }}</view>
						<view class="row">{{ ruleform.userInfo.company_name?ruleform.userInfo.company_name:'暂末填写公司' }}
						</view>
					</view>
				</view>
				<view class="card-bottom fs-14 fc-8">
					<view class="row Arial" v-if="ruleform.userInfo.phone">
						<text class="icon iconfont icon-tel"></text>
						<text class="txt">{{ ruleform.userInfo.phone }}</text>
					</view>
					<view class="row Arial" v-if="ruleform.userInfo.email">
						<text class="icon iconfont icon-letter"></text>
						<text class="txt">{{ ruleform.userInfo.email }}</text>
					</view>
					<view class="row" v-if="ruleform.userInfo.address">
						<text class="icon iconfont icon-location"></text>
						<text class="txt">{{ ruleform.userInfo.address }}</text>
					</view>
				</view>
			</view>
		</view>
		<view :class="['cardOne p10',myclass]" v-if="type == 1.2">
			<view class="cardOne-box">
				<view class="card-top">
					<image class="head" :src="ruleform.headerPic"></image>
					<view class="right-info fs-14 fc-6">
						<view class="fs-18 fc-3 fw-bold">{{ ruleform.userInfo.name?ruleform.userInfo.name:ruleform.nickname }}</view>
						<view class="row">{{ ruleform.userInfo.position?ruleform.userInfo.position:'暂末填写职位' }}</view>
						<view class="row">{{ ruleform.userInfo.company_name?ruleform.userInfo.company_name:'暂末填写公司' }}</view>
					</view>
				</view>
				<view class="card-bottom fs-14 fc-8">
					<view class="row Arial">
						<text class="icon iconfont icon-tel"></text>
						<text class="txt">{{ ruleform.userInfo.phone?ruleform.userInfo.phone:'暂末填写手机号' }}</text>
					</view>
					<view class="row Arial">
						<text class="icon iconfont icon-letter"></text>
						<text class="txt">{{ ruleform.userInfo.email?ruleform.userInfo.email:'暂末填写邮箱' }}</text>
					</view>
					<view class="row">
						<text class="icon iconfont icon-location"></text>
						<text class="txt">{{ ruleform.userInfo.address?ruleform.userInfo.address:'暂末填写地址' }}</text>
					</view>
				</view>
			</view>
		</view>
		<view :class="['cardTwo p10',myclass]" v-if="type == 2">
			<view class="cardTwo-box">
				<view class="card-left">
					<view class="header-img">
						<image class="img" :src="ruleform.headerPic"></image>
					</view>
				</view>
				<view class="card-right">
					<view class="pt8 pl15 fc-6 fs-12 text-right">
						{{ ruleform.userInfo.company_name?ruleform.userInfo.company_name:'暂末填写公司' }}</view>
					<view class="info-Name">
						<view class="fs-22">{{ ruleform.userInfo.phone?ruleform.userInfo.name:ruleform.nickname }}
						</view>
						<view class="fs-14 fc-6">{{ ruleform.userInfo.position?ruleform.userInfo.position:'暂末填写职位' }}
						</view>
					</view>
					<view class="cr-group pt20 fs-13">
						<view class="cr-item" @click="phone(ruleform.userInfo.phone)" v-if="ruleform.userInfo.phone">
							<view class="name Arial">{{ ruleform.userInfo.phone }}</view>
							<view class="icon fc-9"><text class="iconfont icon-tel"></text></view>
						</view>
						<view class="cr-item" v-if="ruleform.userInfo.email">
							<view class="name">{{ ruleform.userInfo.email }}</view>
							<view class="icon fc-9"><text class="iconfont icon-letter"></text></view>
						</view>
						<view class="cr-item" v-if="ruleform.userInfo.address">
							<view class="name">{{ ruleform.userInfo.address }}</view>
							<view class="icon fc-9"><text class="iconfont icon-location"></text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view :class="['cardThree p10',myclass]" v-if="type == 3">
			<view class="cardThree-box p10 pb20 bg-f">
				<view class="big-info">
					<view class="header-img">
						<image class="img" :src="ruleform.headerPic" mode="widthFix"></image>
					</view>
					<view class="card-info p15">
						<view class="left">
							<view class="fs-19">
								{{ruleform.userInfo.name?ruleform.userInfo.name:ruleform.nickname }}<span
									class="fs-14 fc-6 pl10">{{ ruleform.userInfo.position ? ruleform.userInfo.position:'暂末填写职位' }}</span>
							</view>
							<view class="fs-16 Arial fc-6" @click="phone(ruleform.userInfo.phone)">
								{{ ruleform.userInfo.phone?ruleform.userInfo.phone:'暂末填写手机号' }}</view>
						</view>
						<view class="right" v-if="ruleform.userInfo.company_logo">
							<image class="img"
								:src="getSiteName+'/upload/images/card/300_'+ruleform.userInfo.company_logo"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['myclass', 'type', 'ruleform'],
		data() {
			return {
				user: {
					nickname: '东信科技-梅',
					headerPic: 'https://card.doxinsoft.com/images/wap/poster-bg01.jpg',
					userInfo: {
						name: '东信梅',
						position: '普通员工',
						company_name: '江门市东信科技有限公司',
						phone: '13380951183',
						email: '3314024140@qq.com',
						address: '江门市蓬江区建设路82号金山大厦10楼1001室',
						company_logo: ''
					},
				}
			}
		},
		methods: {

		}
	}
</script>

<style>
	/* 模版一 */
	.cardOne-box {
		background: #fff;
		position: relative;
		border-radius: 16rpx;
		-moz-box-shadow: 0 6rpx 30rpx #ddd;
		-webkit-box-shadow: 0 6rpx 30rpx #ddd;
		box-shadow: 0 6rpx 30rpx #ddd;
	}

	.cardOne-box .card-top {
		padding: 30rpx;
		display: flex;
		align-items: center;
	}

	.cardOne-box .card-top .head {
		width: 160rpx;
		height: 160rpx;
		display: flex;
		border-radius: 50%;
		margin-right: 30rpx;
	}

	.cardOne-box .right-info {
		flex: 1;
	}

	.cardOne-box .card-bottom {
		padding: 0 30rpx 30rpx;
	}

	.cardOne-box .card-bottom .row {
		line-height: 40rpx;
		padding: 6rpx 0;
		display: flex;
	}

	.cardOne-box .card-bottom .icon {
		font-size: 20rpx;
		background: #bbb;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		margin: 4rpx 10rpx 0 0;
	}

	.cardOne-box .card-bottom .txt {
		flex: 1;
	}

	/* 模版二 */
	.cardTwo {
		position: relative;
	}

	.cardTwo-box {
		position: relative;
		z-index: 1;
		background: #fff;
		background-size: 100% 100%;
		border-radius: 16rpx;
		-moz-box-shadow: 0 6rpx 30rpx #ddd;
		-webkit-box-shadow: 0 6rpx 30rpx #ddd;
		box-shadow: 0 6rpx 30rpx #ddd;
		display: flex;
		justify-content: space-between;
		height: 200px;
	}

	.cardTwo-box .card-left {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2px;
		z-index: 2;
	}

	.cardTwo-box .card-left .header-img {
		display: flex;
	}

	.cardTwo-box .card-left .header-img .img {
		height: 200px;
		width: 200px;
		border-radius: 16rpx 0 0 16rpx;
	}

	.cardTwo-box .card-right {
		width: 68%;
		margin-left: 32%;
		background: url('https://card.doxinsoft.com/images/wap/cardType02-bg01.png') no-repeat;
		background-size: cover;
		position: relative;
		z-index: 3;
		padding: 0 10px;
		border-radius: 0 8px 8px 0;
	}

	.cardTwo-box .card-right .info-Name {
		height: 54px;
		padding-left: 80px;
		margin-top: 12px;
	}

	.cardTwo-box .card-right .cr-group {
		text-align: right;
		position: absolute;
		right: 10px;
		bottom: 15px;
		padding-left: 35px;
	}

	.cardTwo-box .card-right .cr-group .cr-item {
		display: flex;
		align-items: center;
		line-height: 18px;
		margin-bottom: 3px;
	}

	.cardTwo-box .card-right .cr-item .icon {
		padding-left: 4px;
		position: relative;
	}

	.cardTwo-box .card-right .cr-item .name {
		width: 100%;
		line-height: 15px;
	}

	/* 模版三 */
	.cardThree {
		position: relative;
	}

	.cardThree-box {
		background: #fff;
		border-radius: 6px;
		-moz-box-shadow: 0 6rpx 30rpx #ddd;
		-webkit-box-shadow: 0 6rpx 30rpx #ddd;
		box-shadow: 0 6rpx 30rpx #ddd;
	}

	.cardThree-box .header-img {
		position: relative;
	}

	.cardThree-box .header-img .img {
		width: 100%;
		border-radius: 6px 6px 0 0;
		display: flex;
	}

	.cardThree-box .header-img .infoNav {
		position: absolute;
		right: 15px;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.8);
		color: #fff;
		line-height: 34px;
		text-align: center;
	}

	.cardThree-box .header-img .infoNav1 {
		top: 15px;
	}

	.cardThree-box .header-img .infoNav2 {
		top: 70px;
	}

	.cardThree-box .card-info {
		display: flex;
		align-items: center;
	}

	.cardThree-box .card-info .left {
		flex: 1;
		overflow: hidden;
	}

	.cardThree-box .card-info .companyInfo {
		line-height: 16px;
		display: flex;
		justify-content: center;
		padding: 2px 0;
	}

	.cardThree-box .card-info .right {
		height: 36px;
		padding-left: 15px;
	}

	.cardThree-box .card-info .right .img {
		width: 36px;
		height: 36px;
		overflow: hidden;
		border-radius: 6px;
	}
</style>
