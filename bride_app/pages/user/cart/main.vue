<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
				
			<div class="cart_list">
				<div class="have-pro bg-f mb10 bdr6"  v-if="data.lists.length">
					<div id="pro_info" v-for="(item,key) in data.lists" :key="item.product_id">
						<div class="list-group bd-b flex">
							<div class="zheng">
								<checkbox-group @change="checkboxChange($event,item,key)">
									<checkbox value="1" :checked="item.is_check==1 ? true :false" :data-price="item.price" :data-is_check="isCheck"
									 :data-key="key" />
								</checkbox-group>
							</div>
							<div class="pro_img">
								<image :src="item.cover"></image>
							</div>
							<div class="info flex1">
								<div class="title fs-15 wrap2 pr40">{{item.name}}</div>
								<div class="type fc-6">
									<p class="nowrap fs-14" v-if="item.is_info">{{item.attribute}}</p>
								</div>
								<div class="flex-between flex-middle">
									<div class="price fs-15">￥{{item.price}}</div>
									<tui-numberbox v-model="item.num"></tui-numberbox>
								</div>
								<div class="del bg-f2 iconfont icon-cart-del fs-15 fc-7" @click="del(item.product_id)"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="cart-empty pt50" v-if="data.lists.length == 0">
					<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" />
					<p class="fs-18 mt10">您的购物车空空的</p>
					<p class="fs-14 fc-9 mt5">赶紧去挑些喜欢的填满它吧</p>
					<button hover-class="none" class="btn mt10" @click="goto('/pages/index/main',2)">去首页逛逛</button>
				</div>
				<div id="cartfooter" v-if="data.lists.length >0">
					<div class="bd-t lInfo" style="width: 100%;">
						<div class="group left">
							<div class="zheng">
								<checkbox-group @change="checkboxAll">
									<checkbox />
								</checkbox-group>
							</div>
							<p class="txt fs-15">全选</p>
						</div>
						<div class="group right plr10">
							<p class="count fs-15">合计：</p>
							<p class="price fs-18 font_bold"><span class="fs-15">￥</span>{{amount}}</p>
						</div>
					</div>
					<div class="submit sub-btn fs-18 fs-white" @click="cartSubmit" :style="checkLength == 0 ? 'background: #ddd' :'background:#FF4351'">去结算</div>
				</div>
				

			</div>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	export default {
		components: {
			tuiNumberbox
		},
		data() {
			return {
				formAction: '/shop/cart/lists',
				ruleform: {
					content: ''
				},
				actIndex: 0,
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
		},
		computed: {
			amount() {
				let amount = 0;
				this.checkLength = 0;
				for (var i = 0; i < this.data.lists.length; i++) {
					var v = this.data.lists[i];
					if (v.is_check) {
						amount += parseFloat(v.price) * parseInt(v.num);
						this.checkLength++;
					}

				}
				return amount.toFixed(2);
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
		onShow(){
			this.onShow(this);
    	},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			plus(item){
				item.num ++ ;
			},
			minus(item){
				item.num = item.num<=1 ? 1:item.num-=1;
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			},
			del(id) {
				console.log(id);
				this.getConfirm("真的确认删除吗？", () => {
					this.postAjax("/shop/cart/del-all",{id:id}).then(msg=>{
						if (msg.data.status == 2) {
							this.ajax();
						}
					});
				});
			},
			cartSubmit() {
				if (this.checkLength == 0) {
					this.getError("请勾选项目");
					return false;
				}
				this.postAjax("/shop/cart/add", {
					data: this.data.lists
				}).then(msg => {
					if (msg.data.status == 2) {
						this.goto('/pages/order/buy/main?order_no=' + msg.data.order_no,1);
						return false;
					}
				});

			},
			checkboxChange(e, item, key) {
				let isCheck = e.mp.detail.value.length > 0 ? 1 : 0;
				this.data.lists[key].is_check = isCheck;
			},
			checkboxAll(e) {
				let isCheck = e.mp.detail.value.length > 0 ? 1 : 0;

				for (var i = 0; i < this.data.lists.length; i++) {
					var v = this.data.lists[i];
					v.is_check = isCheck;
				}

			}
		}
	}
</script>
