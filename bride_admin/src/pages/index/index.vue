<template>
	<section class="index-sec" v-if="data.show">
		<div  v-if="getUser().role == 1">
			<div class="text-right pt20">
				<el-button-group>
					<el-button :type="searchType == 'today' ? 'primary': ''" @click="searchType = 'today';ajax()">今日</el-button>
					<el-button :type="searchType == 'yesterday' ? 'primary': ''" @click="searchType = 'yesterday';ajax()">昨日</el-button>
					<el-button :type="searchType == 'thismonth' ? 'primary': ''" @click="searchType = 'thismonth';ajax()">本月</el-button>
					<el-button :type="searchType == 'prevmonth' ? 'primary': ''" @click="searchType = 'prevmonth';ajax()">上月</el-button>
					<el-button :type="searchType == 'all' ? 'primary': ''" @click="searchType = 'all';ajax()">汇总</el-button>
				</el-button-group>
			</div>

			<div class="todayboxs">
				<div class="today-item">
					<div class="iconfont icon-index-wechatpay"></div>
					<div class="text">
						<div class="num">{{data.res.orderSumForWechat}}</div>
						<div class="title">微信支付金额</div>
					</div>
				</div>
				<div class="today-item">
					<div class="iconfont icon-index-withdraw"></div>
					<div class="text">
						<div class="num">{{data.res.orderSumForAccount}}</div>
						<div class="title">余额支付金额</div>
					</div>
				</div>
				<div class="today-item">
					<div class="iconfont icon-index-order"></div>
					<div class="text">
						<div class="num">{{data.res.orderType1Count}}</div>
						<div class="title">综合商城订单</div>
					</div>
				</div>
				<div class="today-item">
					<div class="iconfont icon-index-online-order"></div>
					<div class="text">
						<div class="num">{{data.res.orderType0Count}}</div>
						<div class="title">在线商城订单</div>
					</div>
				</div>
				<div class="today-item">
					<div class="iconfont icon-index-water-order"></div>
					<div class="text">
						<div class="num">{{data.res.packageOrderCount}}</div>
						<div class="title">水票订单</div>
					</div>
				</div>
				<div class="today-item">
					<div class="iconfont icon-index-see"></div>
					<div class="text">
						<div class="num">{{data.res.orderSumForOther}}</div>
						<div class="title">其他支付</div>
					</div>
				</div>
			</div>

			<div class="panel-row">
				<div class="panel-item">
					<div class="panel-head">
						<div class="name">待处理事务</div>

					</div>
					<div class="panel-body">
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/market-shop/order/lists?status=3')">
							<div class="name">待发货(综合商城)</div>
							<div class="num">{{data.res.orderType1status3}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/shop/order-lists?status=3')">
							<div class="name">待发货(在线商城)</div>
							<div class="num">{{data.res.orderType0status3}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/package/order-record-lists?status=0')">
							<div class="name">待发货(水票)</div>
							<div class="num">{{data.res.packageOrderRecordstatus0}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/market-shop/order/after-lists')">
							<div class="name">售后(综合商城)</div>
							<div class="num">{{data.res.orderType1status10}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/shop/order-after-lists')">
							<div class="name">售后(在线商城)</div>
							<div class="num">{{data.res.orderType0status10}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/market-shop/order/cancel-lists?status=0')">
							<div class="name">待退款(综合商城)</div>
							<div class="num">{{data.res.orderType1status0}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/shop/order-cancel-lists')">
							<div class="name">待退款(在线商城)</div>
							<div class="num">{{data.res.orderType0status0}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/ztd/come-out-lists?status=0')">
							<div class="name">自提点提现</div>
							<div class="num">{{data.res.ztdOut}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/setting/come-out-lists?status=0')">
							<div class="name">员工提现</div>
							<div class="num">{{data.res.staffOut}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/dis/come-out-lists?status=0')">
							<div class="name">分销商提现</div>
							<div class="num">{{data.res.disOut}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/dis/lists?status=0')">
							<div class="name">分销商审核</div>
							<div class="num">{{data.res.dising}}</div>
						</a>
						<a href="javascript:;" class="group-item" @click="goto('/vueadmin/merchant/come-out-lists?status=0')">
							<div class="name">商家提现</div>
							<div class="num">{{data.res.merchantOut}}</div>
						</a>
					</div>
				</div>
				<div class="panel-item">
					<div class="panel-head">
						<div class="name">最近7天数据指标</div>
					</div>
					<div class="panel-body">
						<div style="width:100%">
							<div id="myChart" :style="{width: '800px', height: '300px'}" v-show="chartShow == 0"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div v-if="getUser().role == 8">
            <h1>欢迎进入456后台系统</h1>
        </div>


	</section>
</template>
<script type="text/javascript">
import "./index.css";
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
export default {
	name: 'App',
	data() {
		return {
			ruleform: {},
			formAction: '/admin/user/boss-count-new',
			getSiteName: this.getSiteName(),
			searchType2: 7,
            searchType:"today",
			data: this.formatData(this),
			RDataTime: 1,
			chartShow:0,
			form: {
				region: '',
			}
		}
	},
	methods: {
		 ajax() {
            this.getAjax(this, {searchType2:this.searchType2,searchType:this.searchType}, msg => {
            	this.drawLine();
				this.show = true;
            });
        },
        drawLine: function() {
			setTimeout(() => {
				let myChart = echarts.init(document.getElementById('myChart'))
				myChart.setOption({
					color: ['#3398DB'],
					title: { text: '商城销量统计', textStyle: { fontSize: 15 }, left: 'center', top: "20px" },
					tooltip: {},
					xAxis: {
						data: this.data.data.shop.name
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: this.data.data.shop.value
					}]
				});
			}, 1000)
		},
	},
	mounted() {
		this.ajax();
	}
}
</script>
