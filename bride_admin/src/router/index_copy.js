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
			hidden: false,
			url: '/vueadmin',
			iconCls: 'iconfont icon8', //图标样式class
			component: resolve => require(['../default'], resolve),
			children: [{
					path: 'index',
					name: 'index',
					hidden: true,
					component: resolve => require(['../pages/index/index'], resolve)
				},
				{
					path: 'website*',
					url: 'website',
					name: '官网',
					iconCls: 'iconfont icon12', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [
						{
							path: '/info/index*',
							url: '/website/info/index?type=1',
							name: '公司简介',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/website/info/index'], resolve),
						}, {
							path: 'wenhua*',
							url: '/website/info/wenhua?type=2',
							name: '品牌文化',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/website/info/wenhua'], resolve),
						},

						{
							path: '/article/lists*',
							url: '/vueadmin/website/article/lists',
							name: '新闻管理',
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/website/article/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/website/article/lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/website/article/lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/website/article/lists/edit'
							}, {
								name: '类别',
								url: '/vueadmin/website/article/lists/class'
							}, ],
						},
						{
							path: '/vueadmin/website/article/create*',
							url: '/vueadmin/website/article/create',
							name: '新闻增加',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/website/article/create_edit'], resolve),
						}, {
							path: '/vueadmin/website/article/edit*',
							url: '/vueadmin/website/article/edit',
							name: '新闻修改',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/website/article/create_edit'], resolve),
						},


						{
							path: 'product*',
							url: '/vueadmin/website/product',
							name: '产品管理',
							hidden: true,
							iconCls: 'iconfont icon11', //图标样式class
							component: resolve => require(['../p'], resolve),
							children: [{
								path: 'lists*',
								url: '/vueadmin/website/product/lists',
								name: '产品列表',
								iconCls: 'iconfont icon8', //图标样式class
								component: resolve => require(['../pages/website/product/lists'], resolve),
								permission: [{
									name: '删除',
									url: '/vueadmin/website/product/lists/del'
								}, {
									name: '新建',
									url: '/vueadmin/website/product/lists/create'
								}, {
									name: '修改',
									url: '/vueadmin/website/product/lists/edit'
								}, {
									name: '类别',
									url: '/vueadmin/website/product/lists/class'
								}, ]
							}, {
								path: 'create*',
								url: '/vueadmin/product/create',
								name: '产品增加',
								hidden: true,
								iconCls: 'iconfont icon8', //图标样式class
								component: resolve => require(['../pages/website/product/create_edit'], resolve),
							}, {
								path: 'edit*',
								url: '/vueadmin/product/edit',
								name: '产品修改',
								hidden: true,
								iconCls: 'iconfont icon8', //图标样式class
								component: resolve => require(['../pages/website/product/create_edit'], resolve),
							}]
						},
					]
				},
			]
		},
		{
			path: '/vueadmin/website',
			name: '小程序官网',
			url: '/vueadmin/website',
			iconCls: 'iconfont icon12', //图标样式class
			component: resolve => require(['../default'], resolve),
			children: [{
				path: 'poster*',
				url: '/vueadmin/website/poster',
				name: '广告设置',
				iconCls: 'iconfont icon1', //图标样式class
				component: resolve => require(['../p'], resolve),
				children: [{
					path: 'lists*',
					url: '/vueadmin/website/poster/lists?type=1',
					name: '首页幻灯片',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/website/poster/lists'], resolve),
				}, {
					path: 'lists*',
					url: '/vueadmin/website/poster/lists?type=2',
					name: '首页广告位',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/website/poster/lists'], resolve),
				}, {
					path: 'lists*',
					url: '/vueadmin/website/poster/lists?type=5',
					name: '首页导航',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/website/poster/lists'], resolve),
				}, ]
			}, {

				path: '/vueadmin/website/user/lists*',
				url: '/vueadmin/website/user/lists',
				name: '会员列表',
				iconCls: 'iconfont icon8', //图标样式class
				component: resolve => require(['../pages/user/lists'], resolve),
				permission: [{
					name: '删除',
					url: '/vueadmin/website/user/lists/del'
				}, ],
			}, ]
		},
		{
			path: '/vueadmin/shop',
			name: '商城管理',
			url: '/vueadmin/shop',
			iconCls: 'iconfont icon12', //图标样式class
			component: resolve => require(['../default'], resolve),
			children: [
			{
				path: 'order*',
				url: '/vueadmin/shop/order',
				name: '订单管理',
				iconCls: 'iconfont icon13', //图标样式class
				component: resolve => require(['../p'], resolve),
				children: [{
					path: 'lists*',
					url: '/vueadmin/shop/order/lists?status=3',
					name: '已付款',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/order/lists'], resolve),
					permission: [{
						name: '删除',
						url: '/vueadmin/shop/order/lists/del'
					}, {
						name: '详情',
						url: '/vueadmin/shop/order/lists/info'
					}, ]
				}, {
					path: 'lists*',
					url: '/vueadmin/shop/order/lists?status=5',
					name: '发货中',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/order/lists'], resolve),
					permission: [{
						name: '删除',
						url: '/vueadmin/shop/order/lists/del'
					}, {
						name: '详情',
						url: '/vueadmin/shop/order/lists/info'
					}, ]
				}, {
					path: 'lists*',
					url: '/vueadmin/shop/order/lists?status=9',
					name: '已完成',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/order/lists'], resolve),
					permission: [{
						name: '删除',
						url: '/vueadmin/shop/order/lists/del'
					}, {
						name: '详情',
						url: '/vueadmin/shop/order/lists/info'
					}, ]
				}, {
					path: 'info*',
					url: '/vueadmin/shop/order/info',
					name: '查看详情',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/order/info'], resolve),
				}, ]
			}, {
				path: 'product*',
				url: '/vueadmin/shop/product',
				name: '产品管理',
				iconCls: 'iconfont icon11', //图标样式class
				component: resolve => require(['../p'], resolve),
				children: [
				{
					path: 'lists*',
					url: '/vueadmin/shop/product/lists',
					name: '产品列表',
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
				}, {
					path: 'create*',
					url: '/vueadmin/product/create',
					name: '产品增加',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/product/create_edit'], resolve),
				}, {
					path: 'edit*',
					url: '/vueadmin/product/edit',
					name: '产品修改',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/product/create_edit'], resolve),
				}]
			}, {
				path: 'poster*',
				url: '/vueadmin/shop/poster',
				name: '广告设置',
				iconCls: 'iconfont icon1', //图标样式class
				component: resolve => require(['../p'], resolve),
				children: [{
					path: 'lists*',
					url: '/vueadmin/shop/poster/lists?type=1',
					name: '首页幻灯片',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/poster/lists'], resolve),
				}, {
					path: 'lists*',
					url: '/vueadmin/shop/poster/lists?type=2',
					name: '首页广告位',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/poster/lists'], resolve),
				}, {
					path: 'lists*',
					url: '/vueadmin/shop/poster/lists?type=5',
					name: '首页导航',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/poster/lists'], resolve),
				}, ]
			}, {
				path: '/vueadmin/shop/dis',
				name: '经销商管理',
				url: '/vueadmin/shop/dis',
				iconCls: 'iconfont icon12', //图标样式class  
				component: resolve => require(['../p'], resolve),
				children: [{
					path: 'lists*',
					url: '/vueadmin/shop/dis/lists?status=0',
					name: '经销商审核',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/dis/lists'], resolve),
				}, {
					path: 'list-info*',
					url: '/vueadmin/shop/dis/list-info?status=1',
					name: '经销商列表',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/dis/lists_info'], resolve),
				}, {
					path: 'come-out-lists*',
					url: '/vueadmin/shop/dis/come-out-lists?status=0',
					name: '提现审核',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/dis/come_out_lists'], resolve),
				}, {
					path: 'config*',
					url: '/vueadmin/shop/dis/config?status=0',
					name: '分销设置',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/dis/config'], resolve),
				}, ]
			}, {
				path: 'user*',
				url: '/vueadmin/shop/user',
				name: '会员管理',
				iconCls: 'iconfont icon8', //图标样式class
				component: resolve => require(['../p'], resolve),
				children: [{
					path: 'lists*',
					url: '/vueadmin/shop/user/lists',
					name: '会员列表',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/user/lists'], resolve),
					permission: [{
						name: '删除',
						url: '/vueadmin/shop/user/lists/del'
					}, {
						name: '升级经销商',
						url: '/vueadmin/shop/user/lists/add-dis'
					}, {
						name: '赠送优惠券',
						url: '/vueadmin/shop/user/lists/give-coupon'
					}, ],
				}, {
					path: 'coupon-record*',
					url: '/vueadmin/shop/user/coupon-record',
					name: '会员领取优惠券',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/user/coupon_record'], resolve),
					permission: [{
						name: '删除',
						url: '/vueadmin/shop/user/coupon-record/del'
					}, {
						name: '兑换',
						url: '/vueadmin/shop/user/coupon-record/exchange'
					}, ]
				}]
			}, {
				path: 'coupon*',
				url: '/vueadmin/shop/coupon',
				name: '优惠券管理',
				iconCls: 'iconfont icon4', //图标样式class
				component: resolve => require(['../p'], resolve),
				children: [{
					path: 'lists*',
					url: '/vueadmin/shop/coupon/lists',
					name: '优惠券列表',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/coupon/lists'], resolve),
					permission: [{
						name: '删除',
						url: '/vueadmin/shop/coupon/lists/del'
					}, {
						name: '新建',
						url: '/vueadmin/shop/coupon/lists/create'
					}, {
						name: '修改',
						url: '/vueadmin/shop/coupon/lists/create'
					}, ]
				}, {
					path: 'create*',
					url: '/vueadmin/coupon/create',
					name: '优惠券增加',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/coupon/create_edit'], resolve),
				}]
			}, {
				path: '/vueadmin/shop/integral',
				name: '积分商城',
				url: '/vueadmin/shop/integral',
				iconCls: 'iconfont icon10', //图标样式class
				component: resolve => require(['../p'], resolve),
				children: [{
					path: 'lists*',
					url: '/vueadmin/shop/integral/lists',
					name: '积分产品列表',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/integral/lists'], resolve),
				}, {
					path: 'order-lists*',
					url: '/vueadmin/shop/integral/order-lists?status=3',
					name: '积分已付款',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/integral/order_lists'], resolve),
				}, {
					path: 'order-lists*',
					url: '/vueadmin/shop/integral/order-lists?status=5',
					name: '积分发货中',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/integral/order_lists'], resolve),
				}, {
					path: 'order-lists*',
					url: '/vueadmin/shop/integral/order-lists?status=9',
					name: '积分已完成',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/integral/order_lists'], resolve),
				}, {
					path: 'order-info*',
					url: '/vueadmin/integral/order-info',
					name: '查看详情',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/integral/info'], resolve),
				}, {
					path: 'create*',
					url: '/vueadmin/integral/create',
					name: '积分产品增加',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/integral/create_edit'], resolve),
				}, {
					path: 'edit*',
					url: '/vueadmin/integral/edit',
					name: '积分产品修改',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/shop/integral/create_edit'], resolve),
				}]
			}, ]
		},


		{
			path: '/vueadmin/setting',
			name: '企业号管理',
			url: '/vueadmin/setting',
			iconCls: 'iconfont icon8', //图标样式class
			component: resolve => require(['../default'], resolve),
			children: [{
				path: 'merchant*',
				url: '/vueadmin/setting/merchant',
				name: '商家管理',
				iconCls: 'iconfont icon8', //图标样式class
				component: resolve => require(['../p'], resolve),
				children: [
				{
					path: 'merchant-lists*',
					url: '/vueadmin/setting/merchant/merchant-lists',
					name: '商家列表',
					hidden: true,
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/merchant/lists'], resolve),
					permission: [{
						name: '删除',
						url: '/vueadmin/setting/merchant/merchant-lists/del'
					}, {
						name: '新建',
						url: '/vueadmin/setting/merchant/merchant-lists/create'
					}, {
						name: '修改',
						url: '/vueadmin/setting/merchant/merchant-lists/edit'
					}, ]
				}, {
					path: 'staff-lists*',
					url: '/vueadmin/setting/merchant/staff-lists',
					name: '员工列表2',
					iconCls: 'iconfont icon8', //图标样式class
					component: resolve => require(['../pages/staff/lists'], resolve),
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
				}, ]
			}, {
				path: 'config*',
				url: '/vueadmin/setting/config',
				name: '网站基本配置',
				iconCls: 'iconfont icon8', //图标样式class
				component: resolve => require(['../pages/system/config'], resolve),
			}, {
				path: 'role*',
				url: '/vueadmin/setting/role',
				name: '角色列表',
				iconCls: 'iconfont icon8', //图标样式class
				component: resolve => require(['../pages/role/lists'], resolve),
			}, {
				path: 'password*',
				hidden: true,
				name: '修改密码',
				url: '/vueadmin/setting/password',
				component: resolve => require(['../pages/system/password'], resolve),
			}, ]
		}, {
			path: '/login/index',
			name: 'login',
			hidden: true,
			component: resolve => require(['../pages/login/index'], resolve)
		},
	]
})
