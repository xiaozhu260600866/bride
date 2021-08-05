<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<section v-if="data.show">
			<block v-for="item in data.lists" :key="item.id">
				<view id="group" class="bgf mb5">
					<view class="info mlr10 ptb10">
						<navigator open-type="redirect" @click="gotoOrder(item)" :data-id="item.id">
							<view class="name fs14">{{item.name}}
								<text class="Arial pl10">{{item.phone}}</text>
							</view>
							<view class="address fs14">地址：{{item.province}}{{item.city}}{{item.area}}{{item.address}}</view>
						</navigator>
					</view>
<!-- 					<view class="ad_nav bd-t mlr10 ptb5">
						<view class="edit float_r">
							<navigator style="display:block;" :url="'/pages/user/address/create_edit/main?id='+item.id">
								<button type="default">编辑</button>
							</navigator>
						</view>
						<view class="del float_r">
							<button type="default" @click="delAddress(item)">删除</button>
						</view>
						<view class="clear"></view>
					</view> -->
				</view>
			</block>
			<p class="flex-center mt20" v-if="data.lists.length >= 1">如需修改地址；请联系客服，谢谢！</p> 
			<hasMore :parentData="data" source="nodata" message="还没有添加地址"></hasMore>
			<view id="footer-btn" v-if="data.lists.length == 0">
				<view class="f-dx-btn dx-btn-orange fs16" @click="createAddress">
					<text class="iconfont icon-count-plus fs18 pr5"></text><span class="fs16">添加地址</span>
				</view>
			</view>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/user/address-lists',
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
			gotoOrder(item) {
				let order_no = uni.getStorageSync('order_no')+'';
				if (order_no) {
					let address_id = item.id;
					console.log(typeof order_no)
					if(order_no.indexOf('b')!=-1){
						this.goto("/pages/package/order/buy/main?address_id=" + address_id + "&order_no=" + order_no);
					}else{
						this.goto("/pages/order/buy/main?address_id=" + address_id + "&order_no=" + order_no);
					}
					
				}
				let id = wx.getStorageSync('package');
				if (id) {
					let address_id = item.id;
					this.goto("/pages/package/left_num/main?address_id=" + address_id + "&id=" + id);
				}
			},
			createAddress() {
				return this.goto("/pages/user/address/create_edit/main", 1);
				this.createAddressUniapp(res => {
					if (res) {
						this.ajax();
					} else {
						this.goto("/pages/user/address/create_edit/main", 1);
					}
				});
			},
			delAddress(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这个地址吗',
					success: res => {
						if (res.confirm) {
							this.postAjax('/ajax/mydel', {
								id: item.id,
								tablename: 'user_address'
							}).then(msg => {
								if (msg.data.status == 2) {
									this.ajax();
								}
							});
						}
					}
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
