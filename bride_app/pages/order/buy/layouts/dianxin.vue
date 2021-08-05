<template>
	<section>
		<section v-if="data.show">
			<div class="pro-info bgf mb8" v-for="item in ruleform.products">
				<div class="cart-tb p10">
					<div class="pro-img pr10">
						<image :src="item.getProduct.firstCover" />
					</div>
					<div class="pro-name">
						<div class="name lh-20 fs-14 nowrap">{{item.getProduct.name}}</div>
						<div class="mark">
							<p class="nowrap fs-12" v-if="item.is_info">{{item.attribute}}</p>
						</div>
						<div class="group lh-20">
							<p class="num fs-12">数量：<span class="Arial">{{item.num}}</span></p>
							<p class="price fs-14" valign="center">￥0.00</p>
						</div>
					</div>
				</div>
			</div>
			<div class="mode bgf mb10">
				<weui-input v-model="ruleform.addr_name" label="姓名" type="text" name="addr_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.addr_phone" label="电话" type="text" name="addr_phone" datatype="require|phone"></weui-input>
				<dx-address v-model="ruleform.addr_address" padding="plr10" fontSize="fs-14"></dx-address>
			</div>
			
			<view class="buy-footer" v-if="ruleform.status == 1">
				<view class="f_left price plr10 fs-14">合计：<span class="Arial fs-16">.00</span></view>
				<myform class="f_right" :ruleform="ruleform" :vaildate="vaildate" @callBack="$parent.submit" title="马上办理"></myform>
			</view>
			<view class="buy-footer" v-else-if="ruleform.status == 3 || ruleform.status == 5">
				<view class="f_left"></view>
				<view class="f_right" @click="$parent.canReceipt">确认收货</view>
			</view>
			<view class="buy-footer" v-else>
				<view class="f_left"></view>
				<view class="f_right">完成</view>
			</view>
		</section>
	</section>
</template>
<script type="text/javascript">

export default{
	props:["ruleform","data","amount",'vaildate'],
	data(){
		return {
			
		}
	}
}	
</script>

<style>
.mode .weui-label{width: 80px;font-size: 16px}
.mode .picker,.mode .weui-input,.mode .weui-cell__bd label{font-size: 16px}
.mode .weui-cell__bd ._div,.mode .order-picker{height: 36px;min-height: 36px;line-height: 36px;}

/* 结算脚部 */
.buy-footer {height: 50px;line-height: 50px;position: fixed;left: 0;bottom: 0;width: 100%;background: #fff;display: flex;}
.buy-footer .f_left {color: #FF4351;flex: 1;overflow: hidden;}
.buy-footer .f_right{color: #fff;background: #FF4351;font-size: 18px;border-radius: 0;line-height: 50px;}
.buy-footer button{color: #fff;background: #FF4351;font-size: 18px;border-radius: 0;line-height: 50px;}
</style>