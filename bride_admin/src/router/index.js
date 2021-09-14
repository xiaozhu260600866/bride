import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
var role = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).role : '';
Vue.use(Router)
export default new Router({
	//mode: 'history',
	routes: [{
			path: '*',
			redirect: '/vueadmin/index',
			hidden: true,
		},
		{
			path: '/vueadmin',
			name: '常用',
			url: '/vueadmin',
			iconCls: 'iconfont icon8', //图标样式class
			component: resolve => require(['../default'], resolve),
			children: [{
					iconCls: 'iconfont icon-456-home', //图标样式class
					path: 'index*',
					url: '/vueadmin/index',
					name: '首页',
					component: resolve => require(['../pages/index/index'], resolve),
					open: false,
				},

				// 折扣商城开始
				{
					path: 'market-shop*',
					url: 'market-shop',
					name: '商家商城',
					hidden: true,
					open: false,
					iconCls: 'iconfont icon-456-shop', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'count*',
							url: '/vueadmin/market-shop/count/order_lists?type=1&searchType=today',
							name: '数据统计',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/market-shop/count/order_lists'], resolve),
							permission: []
						},
						{
							path: 'sum*',
							url: '/vueadmin/market-shop/sum?searchType=today&type=1',
							name: '采购单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/market-shop/count/count'], resolve),
							permission: []
						},
						{
							path: 'product/lists*',
							url: '/vueadmin/market-shop/product/lists?type=1',
							name: '商品管理',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/market-shop/product/lists'], resolve),
							permission: []
						},
						{
							path: 'product/create*',
							url: '/vueadmin/market-shop/product/create',
							name: '产品增加',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/market-shop/product/create_edit'], resolve),
						}, {
							path: 'product/edit*',
							url: '/vueadmin/market-shop/product/edit',
							name: '产品修改',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/market-shop/product/create_edit'], resolve),
						},

						{
							path: 'order/lists*',
							url: '/vueadmin/market-shop/order/lists?status=3',
							name: '商家订单管理',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/market-shop/order/lists'], resolve),
							permission: [],
						},
						{
							path: 'order/cancel-lists*',
							url: '/vueadmin/market-shop/order/cancel-lists?status=0',
							name: '申请退款',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/market-shop/order/cancel_lists'], resolve),
							permission: [],
						},
						{
							path: 'order/evaluate-lists*',
							url: '/vueadmin/market-shop/order/evaluate-lists',
							name: '订单评价列表',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/market-shop/order/evaluate_lists'], resolve),
							permission: [],
						},
						{
							path: 'order/after-lists*',
							url: '/vueadmin/market-shop/order/after-lists',
							name: '订单售后列表',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/market-shop/order/after_lists'], resolve),
							permission: [],
						},
					]
				},
				//折扣商城结束


				{
					path: 'shop*',
					url: 'shop',
					name: '在线商城',
					hidden: false,
					open: false,
					iconCls: 'iconfont icon-456-online', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [

						{
							path: 'count*',
							url: '/vueadmin/shop/count/order_lists?type=0&searchType=today',
							name: '数据统计',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/count/order_lists'], resolve),
							permission: []
						},
						{
							path: 'sum*',
							url: '/vueadmin/shop/sum?type=0&searchType=today',
							name: '采购单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/count/count'], resolve),
							permission: []
						},
						// {
						// 	path: 'cashier-create*',
						// 	url: '/vueadmin/shop/cashier-create',
						// 	name: '线下开单',
						// 	iconCls: 'iconfont icon8', //图标样式class
						// 	component: resolve => require(['../pages/shop/cashier/create_edit'], resolve),
						// 	permission: []
						// },
						{
							path: 'lists*',
							url: '/vueadmin/shop/product/lists?type=0&status=0',
							name: '产品管理',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/product/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/shop/product/lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/shop/product/lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/shop/product/lists/edit'
							}, {
								name: '类别',
								url: '/vueadmin/shop/product/lists/class'
							}, ]
						},

						{
							path: 'order-lists*',
							url: '/vueadmin/shop/order-lists?status=3',
							name: '订单管理',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/shop/order-lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/shop/order-lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/shop/order-lists/edit'
							}, {
								name: '类别',
								url: '/vueadmin/shop/order-lists/class'
							}, ],
						},
						{
							path: 'order-lists*',
							url: '/vueadmin/shop/order-lists?status=3&new_order=1',
							name: '新会员订单',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/shop/order-lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/shop/order-lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/shop/order-lists/edit'
							}, {
								name: '类别',
								url: '/vueadmin/shop/order-lists/class'
							}, ],
						},
						{
							path: 'mask-order-lists*',
							url: '/vueadmin/shop/mask-order-lists?status=3&fclass=238',
							name: '口罩订单',
							hidden: true,
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/mask_lists'], resolve),
							permission: [],
						},
						{
							path: 'dianxin-order-lists*',
							url: '/vueadmin/shop/dianxin-order-lists?status=3',
							name: '电信订单',
							hidden: true,
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/dianxin_lists'], resolve),
							permission: [],
						},
						{
							path: 'group-lists*',
							url: '/vueadmin/shop/group-lists?status=0',
							name: '团购管理',
							hidden: true,
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/group/info'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/shop/order-lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/shop/order-lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/shop/order-lists/edit'
							}, {
								name: '类别',
								url: '/vueadmin/shop/order-lists/class'
							}, ],
						},


						{
							path: 'order-evaluate-lists*',
							url: '/vueadmin/shop/order-evaluate-lists',
							name: '评价列表',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/evaluate_lists'], resolve),
							permission: [],
						},
						{
							path: 'order-after-lists*',
							url: '/vueadmin/shop/order-after-lists',
							name: '商城订单售后',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/after_lists'], resolve),
							permission: [],
						},
						{
							path: 'order-cancel-lists*',
							url: '/vueadmin/shop/order-cancel-lists',
							name: '申请退款',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/cancel_lists'], resolve),
							permission: [],
						},




						{
							path: 'order-info*',
							url: '/vueadmin/shop/order-info',
							name: '查看详情',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/order/info'], resolve),
						},
						{
							path: 'create*',
							url: '/vueadmin/shop/product/create',
							name: '产品增加',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/product/create_edit'], resolve),
						}, {
							path: 'edit*',
							url: '/vueadmin/shop/product/edit',
							name: '产品修改',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/product/create_edit'], resolve),
						},


						// {
						// 	path: 'poster-lists*',
						// 	url: '/vueadmin/shop/poster-lists?type=1',
						// 	name: '广告管理',
						// 	iconCls: 'iconfont icon12', //图标样式class
						// 	component: resolve => require(['../pages/shop/poster/lists'], resolve),
						// 	permission: [{
						// 		name: '删除',
						// 		url: '/vueadmin/shop/poster-lists/del'
						// 	}, {
						// 		name: '新建',
						// 		url: '/vueadmin/shop/poster-lists/create'
						// 	}, {
						// 		name: '修改',
						// 		url: '/vueadmin/shop/poster-lists/edit'
						// 	}, {
						// 		name: '类别',
						// 		url: '/vueadmin/shop/poster-lists/class'
						// 	}, ],
						// },


					]
				},
				{
					path: 'articleOrder*',
					url: 'articleOrder',
					name: '贴子管理',
					open: false,
					iconCls: 'iconfont icon-456-articleOrder', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'lists*',
							url: '/vueadmin/articleOrder/lists?status=3',
							name: '信息系统',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/articleOrder/lists'], resolve),
							permission: []
						},
						{
							path: 'category*',
							url: '/vueadmin/articleOrder/category',
							name: '分类列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/articleOrder/category'], resolve),
							permission: []
						},
						{
							path: 'expire*',
							url: '/vueadmin/articleOrder/expire?status=3',
							name: '贴子置顶',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/articleOrder/expire'], resolve),
							permission: []
						},
						{
							path: 'config*',
							url: '/vueadmin/articleOrder/config?status=3',
							name: '贴子配置',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/articleOrder/config'], resolve),
							permission: []
						},

					]
				},

				{
					path: 'commission*',
					url: 'commission',
					name: '收益管理',
					open: false,
					iconCls: 'iconfont icon-456-commission', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'commission-lists*',
							url: '/vueadmin/commission/commission-lists',
							name: '分销商收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/commission_lists'], resolve),
							permission: [],

						},
						{
							path: '2come-in-lists*',
							url: '/vueadmin/commission/2come-in-lists?status=1',
							name: '供货商收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/supplier/come_in_lists'], resolve),
							permission: [],
						},
						{
							path: '3come-in-lists*',
							url: '/vueadmin/commission/3come-in-lists?status=1',
							name: '区域代理收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/manager/come_in_lists'], resolve),
							permission: [],
						},
						{
							path: '6come-in-lists*',
							url: '/vueadmin/commission/6come-in-lists?status=1',
							name: '配送员收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/staff/come_in_lists'], resolve),
							permission: []
						},
						{
							path: '4come-in-lists*',
							url: '/vueadmin/commission/4come-in-lists?status=1',
							name: '投资方收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/investor/come_in_lists'], resolve),
							permission: [],
						},
						{
							path: 'come-in-lists*',
							url: '/vueadmin/commission/come-in-lists?status=1',
							name: '商家收益',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/come_in_lists'], resolve),
							permission: [],
						},
						{
							path: '5come-in-lists*',
							url: '/vueadmin/commission/5come-in-lists?status=1',
							name: '自提点收益',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/ztd/come_in_lists'], resolve),
							permission: [],
						},
					]
				},
				{
					path: 'activity*',
					url: 'activity',
					name: '活动管理',
					open: false,
					hidden: false,
					iconCls: 'iconfont icon-456-openOrder', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [
						{
							path: 'lists*',
							url: '/vueadmin/activity/lists',
							name: '活动列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/activity/lists'], resolve),
							permission: []
						},
						{
							path: 'order-lists*',
							url: '/vueadmin/activity/order-lists?status=3',
							name: '活动订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/activity/order/lists'], resolve),
							permission: []
						},
				
					]
				},

				{
					path: 'cashier*',
					url: 'cashier',
					name: '线下开单',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-openOrder', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'create*',
							url: '/vueadmin/cashier/create',
							name: '线下开单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/cashier/create_edit'], resolve),
							permission: []
						},

					]
				},
				{
					path: 'bucket*',
					url: 'coupon',
					name: '回桶管理',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-bucket', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
						path: 'lists*',
						url: '/vueadmin/bucket/lists?table=order',
						name: '回桶管理',
						iconCls: 'iconfont icon8', //图标样式class
						component: resolve => require(['../pages/bucket/lists'], resolve),
						permission: []
					}, ]
				},
				{
					path: 'coupon*',
					url: 'coupon',
					name: '优惠券',
					open: false,
					iconCls: 'iconfont icon-456-coupon', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'package*',
							url: '/vueadmin/coupon/package',
							name: '线下现金券卡包',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/coupon/coupon_packages'], resolve),
							permission: []
						},
						{
							path: 'wechatCard*',
							url: '/vueadmin/coupon/wechatCard?scanQrocde=0',
							name: '微信卡券',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/coupon/wechatCard'], resolve),
							permission: []
						},
						{
							path: 'coupon-lists*',
							url: '/vueadmin/coupon/coupon-lists',
							name: '优惠券',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/coupon/lists'], resolve),
							permission: []
						},
						{
							path: 'coupon-create*',
							url: '/vueadmin/coupon/coupon/coupon-create',
							name: '优惠券',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/coupon/create_edit'], resolve),
						},
					]
				},

				{
					path: 'package*',
					url: 'package',
					name: '套餐',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-package', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'lists*',
							url: '/vueadmin/package/lists?type=0',
							name: '套餐',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/package/lists'], resolve),
							permission: []
						},
						{
							path: 'create*',
							url: '/vueadmin/coupon/coupon/create',
							name: '套餐新增',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/package/create_edit'], resolve),
						},
						{
							path: 'order-lists*',
							url: '/vueadmin/package/order-lists?status=3',
							name: '套餐订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/package/order_lists'], resolve),
							permission: []
						},
						{
							path: 'order-record-lists*',
							url: '/vueadmin/package/order-record-lists?status=0',
							name: '扣次订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/package/order_record_lists'], resolve),
							permission: []
						},
					]
				},
				{
					path: 'borrowBucket*',
					url: 'borrowBucket',
					name: '借桶还桶',
					hidden: true,
					open: false,
					iconCls: 'iconfont icon-456-borrowBucket', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'bucketCreate*',
							url: '/vueadmin/borrowBucket/bucketCreate?type=1',
							name: '借桶开单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/cashier/bucket_create'], resolve),
							permission: []
						},
						{
							path: 'lists*',
							url: '/vueadmin/borrowBucket/lists?type=1',
							name: '借桶品牌',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/borrowBucket/lists'], resolve),
							permission: []
						},
						{
							path: 'create*',
							url: '/vueadmin/coupon/coupon/create',
							name: '套餐新增',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/borrowBucket/create_edit'], resolve),
						},
						{
							path: 'order-lists*',
							url: '/vueadmin/borrowBucket/order-lists?status=3&type=1',
							name: '借桶订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/borrowBucket/order_lists'], resolve),
							permission: []
						},
						{
							path: 'order-record-lists*',
							url: '/vueadmin/borrowBucket/order-record-lists?status=9&type=1',
							name: '还桶订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/borrowBucket/order_record_lists'], resolve),
							permission: []
						},
					]
				},

				{
					path: 'article*',
					url: 'article',
					name: '新闻管理',
					open: false,
					iconCls: 'iconfont icon-456-news', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'lists*',
							url: '/vueadmin/article/lists',
							name: '新闻列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/article/lists'], resolve),
							permission: []
						},
						{
							path: 'create*',
							url: '/vueadmin/article/create',
							name: '优惠券',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/article/create_edit'], resolve),
						},
						{
							path: 'edit*',
							url: '/vueadmin/article/edit',
							name: '优惠券',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/article/create_edit'], resolve),
						},
					]
				},

				{
					path: 'dis*',
					url: 'dis',
					name: '分销管理',
					open: false,
					hidden: false,
					iconCls: 'iconfont icon-456-distribution', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [

						{
							path: 'lists*',
							url: '/vueadmin/dis/lists?status=0',
							name: '分销商审核',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/lists'], resolve),
							permission: [],
						},
						{
							path: 'list-info*',
							url: '/vueadmin/dis/list-info?status=1',
							name: '分销商列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/lists_info'], resolve),
							permission: [],

						},
						{
							path: 'ad-lists*',
							url: '/vueadmin/dis/ad-lists',
							name: '广告列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/ad'], resolve),
							permission: [],
						
						},
						{
							path: 'lev*',
							url: '/vueadmin/dis/lev',
							name: '分销商等级',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/lev'], resolve),
							permission: [],

						},
						{
							path: 'commission-lists*',
							url: '/vueadmin/dis/commission-lists?status=0',
							name: '分销商收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/commission_lists'], resolve),
							permission: [],

						},
						{
							path: 'come-out-lists*',
							url: '/vueadmin/dis/come-out-lists?status=0',
							name: '分销商提现',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/come_out_lists'], resolve),
							permission: [],
						},
						{

							path: 'user_come_out_lists*',
							url: '/vueadmin/dis/user_come_out_lists?status=0',
							name: '余额提现',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/user/come_out_lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/user/lists/del'
							}, ],
						},
						// {

						// 	path: 'user_yaji_come_out_lists*',
						// 	url: '/vueadmin/dis/user_yaji_come_out_lists?status=0',
						// 	name: '押金提现',
						// 	iconCls: 'iconfont icon8', //图标样式class
						// 	component: resolve => require(['../pages/user/come_out_lists_yaji'], resolve),
						// 	permission: [{
						// 		name: '删除',
						// 		url: '/vueadmin/user/lists/del'
						// 	}, ],
						// },
						{
							path: 'config*',
							url: '/vueadmin/dis/config?status=0',
							name: '分销设置',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/config'], resolve),
							permission: [],

						},


					]
				},
				{
					path: 'integral*',
					url: 'integral',
					name: '积分商城',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-integral', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [

						{
							path: 'lists*',
							url: '/vueadmin/integral/lists',
							name: '积分列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/lists'], resolve),
							permission: [],
						},
						{
							path: 'order-lists*',
							url: '/vueadmin/integral/order-lists?status=3',
							name: '积分订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/order_lists'], resolve),
							permission: [],
						},

						{
							path: 'order-info*',
							url: '/vueadmin/integral/order-info',
							name: '查看详情',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/info'], resolve),
						},
						{
							path: 'create*',
							url: '/vueadmin/integral/create',
							name: '积分产品增加',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/create_edit'], resolve),
						},
						{
							path: 'edit*',
							url: '/vueadmin/integral/edit',
							name: '积分产品修改',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/create_edit'], resolve),
						}


					]
				},
				{
					path: 'user*',
					url: '/user',
					name: '客户管理',
					open: false,
					iconCls: 'iconfont icon-456-client', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [

						{

							path: 'lists*',
							url: '/vueadmin/user/lists?buy=1',
							name: '会员列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/user/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/user/lists/del'
							}, ],
						},
						{
						
							path: 'auth-lists*',
							url: '/vueadmin/user/auth-lists?auth=1',
							name: '会员认证',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/user/auth'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/user/lists/del'
							}, ],
						},
						{
							path: 'expire-lists*',
							url: '/vueadmin/user/expire-lists',
							name: '会员等级购买配置',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/user/expire/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/user/lists/del'
							}, ],
						},
						{

							path: 'memberLev-lists*',
							url: '/vueadmin/user/memberLev-lists',
							name: '会员等级',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/memberLev/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/user/lists/del'
							}, ],
						},
						{

							path: 'info*',
							url: '/vueadmin/user/info',
							hidden: true,
							name: '会员列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/user/info'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/user/info/del'
							}, ],
						},
						{
							path: 'coupon-record*',
							url: '/vueadmin/user/coupon-record?scanQrcode=1',
							name: '领取线下现金券',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/user/coupon_record_wechatCard'], resolve),
							permission: [{
									name: '删除',
									url: '/vueadmin/user/coupon-record/del'
								},
								{
									name: '兑换',
									url: '/vueadmin/user/coupon-record/exchange'
								},


							]
						},

						{
							path: 'recharge-record*',
							url: '/vueadmin/user/recharge-record?status=1',
							name: '充值记录',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/user/come_out_lists_recharge'], resolve),
							permission: [

							]
						},
						{
							path: 'come-out-lists*',
							url: '/vueadmin/user/come-out-lists?status=0',
							name: '提现记录',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/user/come_out_lists'], resolve),
							permission: [
						
							]
						},
					]
				},
				{
					path: 'merchant*',
					url: '/merchant',
					name: '商家管理',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-business', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'category*',
							url: '/vueadmin/merchant/category',
							name: '分类列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/category'], resolve),
							permission: []
						},
						{
							path: 'expire*',
							url: '/vueadmin/merchant/expire?status=0',
							name: '商家注册时效',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/expire'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/merchant/expire/del'
							}, ],
						},


						{
							path: 'lists*',
							url: '/vueadmin/merchant/lists?status=0',
							name: '商家列表(审核)',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/merchant/lists/del'
							}, ],
						},
						{
							path: 'info_lists*',
							url: '/vueadmin/merchant/info_lists?show_index2=12',
							name: '商家列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/lists_info'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/merchant/lists/del'
							}, ],
						},
						{
							path: 'product-lists*',
							url: '/vueadmin/merchant/product-lists?status=1',
							name: '产品审核',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/product/lists'], resolve),
							permission: [],
						},
						{
							path: 'product-edit*',
							url: '/vueadmin/merchant/product-edit',
							name: '产品修改',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/product/create_edit'], resolve),
							permission: [],
						},
						{
							path: 'order-lists*',
							url: '/vueadmin/merchant/order-lists?status=3',
							name: '商家订单管理',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/merchant_lists'], resolve),
							permission: [],
						},
						{
							path: 'come-in-lists*',
							url: '/vueadmin/merchant/come-in-lists?status=1',
							name: '商家收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/come_in_lists'], resolve),
							permission: [],
						},
						{
							path: 'come-out-lists*',
							url: '/vueadmin/merchant/come-out-lists?status=0',
							name: '商家提现',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/come_out_lists'], resolve),
							permission: [],
						},

					]
				},

				{
					path: 'supplier*',
					url: '/supplier',
					name: '供货商管理',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-supplier', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'lists*',
							url: '/vueadmin/supplier/lists',
							name: '供货商列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/supplier/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/supplier/lists/del'
							}, ],
						},
						{
							path: 'come-out-lists*',
							url: '/vueadmin/supplier/come-out-lists?status=0',
							name: '供货商提现',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/supplier/come_out_lists'], resolve),
							permission: [],
						},
						{
							path: 'come-in-lists*',
							url: '/vueadmin/supplier/come-in-lists?status=1',
							name: '供货商佣金',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/supplier/come_in_lists'], resolve),
							permission: [],
						},
					]
				},
				{
					path: 'manager*',
					url: '/manager',
					name: '区域代理管理',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-manager', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'lev*',
							url: '/vueadmin/manager/lev',
							name: '区域代理等级',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/manager/lev'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/manager/lev/del'
							}, ],
						},
						{
							path: 'lists*',
							url: '/vueadmin/manager/lists',
							name: '区域代理列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/manager/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/manager/lists/del'
							}, ],
						},
						{
							path: 'addUser*',
							url: '/vueadmin/manager/addUser',
							name: '区域代理划分',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/manager/addUser'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/manager/addUser/del'
							}, ],
						},
						{
							path: 'come-out-lists*',
							url: '/vueadmin/manager/come-out-lists?status=0',
							name: '区域代理提现',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/manager/come_out_lists'], resolve),
							permission: [],
						},
						{
							path: 'come-in-lists*',
							url: '/vueadmin/manager/come-in-lists?status=1',
							name: '区域代理收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/manager/come_in_lists'], resolve),
							permission: [],
						},

					]
				},
				{
					path: 'investor*',
					url: '/investor',
					name: '投资方管理',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-investor', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [

						{
							path: 'lists*',
							url: '/vueadmin/investor/lists',
							name: '投资方列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/investor/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/investor/lists/del'
							}, ],
						},

						{
							path: 'come-out-lists*',
							url: '/vueadmin/investor/come-out-lists?status=0',
							name: '投资方提现',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/investor/come_out_lists'], resolve),
							permission: [],
						},
						{
							path: 'come-in-lists*',
							url: '/vueadmin/investor/come-in-lists?status=1',
							name: '投资方收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/investor/come_in_lists'], resolve),
							permission: [],
						},

					]
				},
				{
					path: 'alliance*',
					url: '/alliance',
					name: '加盟商管理',
					hidden: true,
					open: false,
					iconCls: 'iconfont icon-456-alliance', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [

						{
							path: 'lists*',
							url: '/vueadmin/alliance/lists',
							name: '加盟商列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/alliance/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/alliance/lists/del'
							}, ],
						},

					]
				},

				{
					path: 'ztd*',
					url: '/ztd',
					name: '自提点管理',
					open: false,
					hidden: true,
					iconCls: 'iconfont icon-456-ztd', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'lists*',
							url: '/vueadmin/ztd/lists',
							name: '自提点列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/ztd/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/ztd/lists/del'
							}, ],
						},
						{
							path: 'come-out-lists*',
							url: '/vueadmin/ztd/come-out-lists?status=0',
							name: '自提点提现',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/ztd/come_out_lists'], resolve),
							permission: [],
						},
						{
							path: 'come-in-lists*',
							url: '/vueadmin/ztd/come-in-lists?status=1',
							name: '自提点佣金',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/ztd/come_in_lists'], resolve),
							permission: [],
						},

					]
				},

				{
					path: 'setting*',
					url: '/vueadmin/setting',
					name: '配送管理',
					hidden: true,
					open: false,
					iconCls: 'iconfont icon-456-staff', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [
						{
							path: 'category*',
							url: '/vueadmin/setting/category',
							name: '水店设置',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/staff/category'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/setting/merchant/category/del'
							}, {
								name: '新建',
								url: '/vueadmin/setting/merchant/category/create'
							}, {
								name: '修改',
								url: '/vueadmin/setting/merchant/category/edit'
							}, ]
						},
						
						{
							path: 'staff-new-lists*',
							url: '/vueadmin/setting/staff-new-lists',
							name: '配送列表',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/staff/new_lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/setting/merchant/staff-lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/setting/merchant/staff-lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/setting/merchant/staff-lists/edit'
							}, ]
						},
						{
							path: 'come-out-lists*',
							url: '/vueadmin/setting/come-out-lists?status=0',
							name: '配送提现',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/staff/come_out_lists'], resolve),
							permission: []
						},
						{
							path: 'come-in-lists*',
							url: '/vueadmin/setting/come-in-lists?status=1',
							name: '配送收益',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/staff/come_in_lists'], resolve),
							permission: []
						},
					]
				},
				{
					path: 'auth*',
					url: '/vueadmin/auth',
					hidden: true,
					name: '授权管理',
					open: false,
					iconCls: 'iconfont icon-456-authorize', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'configForApp*',
							url: '/vueadmin/auth/configForApp',
							name: '小程序授权',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/system/configForApp'], resolve),
							permission: []
						},
						{
							path: 'configForCrop*',
							url: '/vueadmin/auth/configForCrop',
							name: '企业号授权',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/system/configForCrop'], resolve),
							permission: []
						},
					]
				},
				{
					path: 'system*',
					url: '/vueadmin/system',
					name: '系统管理',
					open: false,
					iconCls: 'iconfont icon-456-config', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'config*',
							url: '/vueadmin/system/config',
							name: '基本设置',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/system/config'], resolve),
							permission: []
						},
						{
							path: 'role*',
							url: '/vueadmin/system/role',
							name: '角色管理',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/role/lists'], resolve),
							permission: []
						},
						{
							path: 'city*',
							url: '/vueadmin/system/city',
							name: '城市管理',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/city/lists'], resolve),
							permission: []
						},
						{
							path: 'password*',
							name: '修改密码',
							permission: [],
							url: '/vueadmin/system/password',
							component: resolve => require(['../pages/system/password'], resolve),
						},
						{
							path: 'ad-lists*',
							url: '/vueadmin/system/ad-lists?type=1',
							name: '广告管理',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/poster/lists'], resolve),
							permission: [],
						},
						{
							path: 'ad-new-lists*',
							url: '/vueadmin/system/ad-new-lists?type=1000',
							name: '广告管理(新)',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/poster/list_new'], resolve),
							permission: [],
						},

					]
				},
			]
		},
		{
			path: '/login/index',
			name: 'login',
			hidden: true,
			component: resolve => require(['../pages/login/index'], resolve)
		},
		{
			path: '/login/ip-allow',
			name: 'login',
			hidden: true,
			component: resolve => require(['../pages/login/allow_ip'], resolve)
		},
		{
			path: '/publishCode/index',
			name: 'publishCode',
			hidden: true,
			component: resolve => require(['../pages/publishCode/index'], resolve)
		},


	]
})
