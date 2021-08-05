<template>
	<section>
		<section v-if="data.show">
			<div class="pro-info bgf mb8" v-for="item in ruleform.products">
				<div class="cart-tb p10">
					<div class="pro-img pr10">
						<image :src="item.getProduct.firstCover" />
					</div>
					<div class="pro-name">
						<div class="name lh20 fs14 nowrap">{{item.getProduct.name}}</div>
						<div class="mark">
							<p class="nowrap fs12" v-if="item.is_info">{{item.attribute}}</p>
						</div>
						<div class="group lh20">
							<p class="num fs12">数量：<span class="Arial">5</span></p>
							<p class="price fs14" valign="center">￥0.00</p>
						</div>
					</div>
				</div>
			</div>
			<div id="mode" class="bgf mb10">
				<weui-input v-model="ruleform.addr_name" label="姓名" type="text" name="addr_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.addr_phone" label="电话" type="text" name="addr_phone" datatype="require|phone"></weui-input>
				<weui-input v-model="ruleform.remark" label="商家号" type="text" name="remark" datatype="require"></weui-input>
				<dx-address v-model="ruleform.addr_address"></dx-address>
			</div>
			
			<view id="footer" class="footer2" v-if="ruleform.status == 1">
				<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="$parent.submit">
					<div slot="content">
						<button class="f_right float_r" form-type="submit" style="width:100%">提交</button>
					</div>
				</myform>
			</view>
			<view id="footer" v-else-if="ruleform.status == 3 || ruleform.status == 5">
				<view class="f_right float_r" @click="$parent.canReceipt">确认收货</view>
			</view>
			<view id="footer" class="bd-t" v-else>
				<view class="f_right float_r">完成</view>
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
