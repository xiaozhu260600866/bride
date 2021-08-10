<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="datum bg-f">
				<weui-input v-model="ruleform.course" label="最喜欢的一道菜" placeholder="请输入" type="text" name="course" datatype="require"></weui-input>
				<weui-input v-model="ruleform.famous_person" label="最喜欢的名人" placeholder="请输入" type="text" name="famous_person" datatype="require"></weui-input>
				<weui-input v-model="ruleform.book" label="最喜欢的一本书" placeholder="请输入" type="text" name="book" datatype="require"></weui-input>
				<view class="dx-cell dx-cell_input" @click="hobbyShow = true">
					<view class="dx-cell_hd">
						<view class="dx-label">喜欢的事<span class="star">*</span></view>
					</view>
					<view class="dx-cell_bd">
						<view class="picker-label">请选择</view>
						<view class="value">
							<view class="tag" v-for="(item,key) in hobby" :key="key">{{item}}<text class="comma">,</text></view>
						</view>
					</view>
					<view class="dx-cell_ft dx_ft-access"></view>
				</view>
			</view>
			<dxftButton type="primary" size="lg" round @click="submit">确认</dxftButton>
			<view class="drawer">
				<view class="dxi-mask" :class="hobbyShow == true?'dxi-mask_show':''" @click="hobbyShow = false"></view>
				<view class="dxi-drawer dxi-drawer_bottom" :class="hobbyShow == true?'dxi-drawer_show':''">
					<view class="hobby-box">
						<view class="title fs-16 lh-30">
							<view class="name">最喜欢的事<text class="fc-7">(多选)</text></view>
							<view class="sure main-color" @click="hobbyShow = false">确定</view>
						</view>
						<scroll-view scroll-x>
							<view class="hobby-lists">
								<view class="hobby-label">
									<view class="label" :class="[key==1?'cur':'']" v-for="(item,key) in hobby" :key="key">{{item}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{},
				cur: 1,
				hobbyShow: false,
				hobby:['朋友聚会','DIY','茶艺','插花','极限运动','水世界','游乐场','密室逃脱','工作狂','社交活动','思考人生','文艺小清新','探险','快乐宅','体育竞技','旅行','户外','看电影','看书','画画','舞蹈','健身','美食','街舞']
			}
		},
		mounted() {
		
		},
		methods: {
			
			ajax() {
				this.getAjax(this).then(msg => {
				});
			},
			
		},
		onLoad(options) {
			this.type = options.type;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="" lang="scss">
@import "xiaozhu/css/dx-input.css";
@import "css.scss";
.datum{
	padding: 0 30rpx
	::v-deep .dx-cell{
		display: block;padding: 24rpx 0;
		.dx-cell_hd{
			.star{display: none;}
			.dx-label{width: 100%;}
		}
		.dx-cell_bd{
			padding: 10rpx 30rpx 0 0;color: #434343;
			.dx-label{text-align: left;}
			.picker{text-align: left;}
			.picker-label{color: #999;}
			.input-placeholder{color: #999;}
			.value{
				display: flex;align-items: center;flex-wrap: wrap;
				.tag{
					&:last-child .comma{display: none;}
				}
			}
		}
		.dx_ft-access{position: absolute;top: 116rpx;right: 0rpx;}
	}
}
</style>