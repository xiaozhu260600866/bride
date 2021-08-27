<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="bg-f plr15" v-if="data.show">
			<trendsLists :data="data.articleOrder" :type="2"></trendsLists>
		</view>
	</view>
</template>

<script>
	import trendsLists from "@/components/trendsLists"
	export default {
		components: {trendsLists},
		data() {
			return {
				formAction: '/people.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				dynamic:[
					{
						day:'07',
						date:'21-07',
						title:'东信科技有限公司创立于2006年，专注于移动应用、电子商务领域开发与营销，',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg','/static/fenxiaobg.jpg','/static/show-top-bg.jpg','/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},{
						day:'06',
						date:'21-07',
						title:'东信科技有限公司创立于2006年，专注于移动应用、电子商务领域开发与营销，',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},{
						day:'05',
						date:'21-07',
						title:'东信科技有限公司创立于2006年',
						photo:[]
					},{
						day:'04',
						date:'21-07',
						title:'',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},
				],
			
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
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>