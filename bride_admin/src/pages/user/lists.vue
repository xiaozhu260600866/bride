<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="呢称：">
						<el-input v-model="searchFields.nickname" placeholder="请输入会员呢称"></el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input v-model="searchFields.name" placeholder="请输入会员姓名"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input v-model="searchFields.phone" placeholder="请输入会员电话"></el-input>
					</el-form-item>
					<el-form-item label="区域：">
						<el-input placeholder="请输入区域" name="area_name" v-model="searchFields.area_name"></el-input>
					</el-form-item>

				</div>
				<div class="Tsec_group">
                    <el-form-item label="会员等级：">
                    	<el-select v-model="searchFields.member_id" placeholder="请选择会员等级">
							<el-option label="普通会员" value="0"></el-option>
                    		<el-option :label="v.name" :value="v.id" v-for="v in data.lev"></el-option>
                    	</el-select>
                    </el-form-item>
					<el-form-item label="来源：">
						<el-select v-model="searchFields.shareSource" placeholder="请选择会员来源">
							<el-option label="全部" value="0"></el-option>
							<el-option label="扫码" value="扫码"></el-option>
							<el-option label="转发" value="转发"></el-option>
							<el-option label="搜索" value="搜索"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="区域经理：">
                    	<el-select v-model="searchFields.manager_id" placeholder="请选择区域经理">
                    		<el-option :label="v.label" :value="v.value" v-for="v in data.manager"></el-option>
                    	</el-select>
                    </el-form-item>

				</div>

				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="success" @click="exportExcel">导出数据</el-button>
				</div>

				<el-form-item class="Tlnav-po">
					<el-button type="primary" @click="$refs.createEdit.ajax('')">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
        <el-col :span="24">
        	<el-tabs v-model="data.query.buy" type="card" @tab-click="ajax">
        		<el-tab-pane label="会员" :name="''+1"></el-tab-pane>
        		<el-tab-pane label="散客" :name="''+0"></el-tab-pane>
        	</el-tabs>
        </el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="序号" width="60">
				<template scope="scope">{{ scope.$index+1 }}</template>
			</el-table-column>
			<el-table-column prop="nickname" label="呢称" min-width="100"> </el-table-column>
			<el-table-column label="姓名" min-width="100">
				<template scope="scope">{{ scope.row.name }} ({{scope.row.getRole}})</template>
			</el-table-column>
            <el-table-column label="等级" min-width="100">
            	<template scope="scope">
					<el-select v-model="scope.row.member_id" placeholder="请选择会员" @change="editField(scope.row,'member_id')" filterable>
						<el-option label="普通会员" :value="0"></el-option>
						<el-option :label="v.name" :value="v.id" v-for="v in data.lev"></el-option>
					</el-select>
				</template>
            </el-table-column>
			<el-table-column prop="phone" label="电话" width="130">
				<template scope="scope">{{ scope.row.phone }}</template>
			</el-table-column>
			<el-table-column prop="phone" label="来源" min-width="120">
				<template scope="scope">{{ scope.row.source }}</template>
			</el-table-column>
			<el-table-column prop="phone" label="余额" width="120">
				<template scope="scope">{{ scope.row.amount }}</template>
			</el-table-column>
            <el-table-column align="center" label="排序" width="78">
            	<template scope="scope">
            		<el-input v-model="scope.row.sort" type="textarea" @change="editField(scope.row,'sort')"></el-input>
            	</template>
            </el-table-column>
			<el-table-column label="绑定" width="80">
				<template scope="scope">{{ scope.row.openid ? '绑定' :'未绑定' }}</template>
			</el-table-column>
			 <el-table-column label="新建方式" width="80">
				<template scope="scope">{{ scope.row.type == 2 ? '后台' :'小程序' }}</template>
			</el-table-column>
            <el-table-column label="所在地址" width="80">
            	<template scope="scope">{{scope.row.address}}</template>
            </el-table-column>
			<el-table-column align="center" label="同城置顶" width="80">
				<template scope="scope">
					 <el-switch v-model="scope.row.show_index" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'show_index')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="上/下架" width="80">
				<template scope="scope">
					 <el-switch v-model="scope.row.show_index2" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'show_index2')"> </el-switch>
				</template>
			</el-table-column>
		
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			
			<el-table-column label="操作" width="120">
				<template scope="scope">
					<el-dropdown>
						<el-button type="primary" size="small">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="updateMember(scope.row,1)" v-if="scope.row.is_authentication == 0" @click="auth(scope.row)">认证</el-dropdown-item>
							<el-dropdown-item @click.native="scope.row.role == 2 ? $refs.createEdit.ajax(scope.row) : $refs.merchantCreateEdit.ajax(scope.row,data.industryArr)">编辑</el-dropdown-item>
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
            <el-button type="danger" @click="chanelManager" :disabled="this.sels.length===0 ">批量取消区域经理</el-button>
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<my-table :searchFields="{order_no:'',searchDate:[]}" tableName="orders" ref="table" style="width:100%" :fieldArr="[
			   {prop:'order_no',label:'订单号'},
			   {prop:'getShipping',label:'购买方式'},
			   {prop:'status_message',label:'状态'},
			   {prop:'productInfo',label:'商品'}
		   ]" />
		<my-rechargeCoupon top="10%" ref="coupon"></my-rechargeCoupon>
		<my-rechargeCouponPackage top="10%" ref="couponPackage"></my-rechargeCouponPackage>
		<my-create-edit ref="createEdit"></my-create-edit>
		<merchant-create-edit ref="merchantCreateEdit"></merchant-create-edit>
		<my-qrcord ref="qrcord"></my-qrcord>
		<my-rechargeAmount top="10%" ref="amount"></my-rechargeAmount>
		<my-outAmount ref="outAmount" top="10%"></my-outAmount>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/user/lists?role=2',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'users',
			sels: [], //列表选中列,
			searchFields: {
				user_id: '',
				shareSource: '',
				nickname: '',
			}
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
		auth(row){
			this.getConfirm("是否确认操作？",msg=>{
			   this.postAjax("/admin/user/updateMember",{id:row.id,is_authentication:1},msg=>{
				   if(msg.data.status == 2){
					   this.ajax();
				   }
			   })
			})
		},
        editField(row, field) {
        	this.postAjax("/admin/user/editField", {
        		product_id: row.id,
        		field: field,
        		value: row[field]
        	}, msg => {
        		if (msg.data.status == 3) {
        			row[field] = 0;
        		}
        	});
        },
		updateMember(row,buy){
			this.getConfirm("是否确认操作？",msg=>{
			   this.postAjax("/admin/user/updateMember",{id:row.id,buy:buy},msg=>{
				   if(msg.data.status == 2){
					   this.ajax();
				   }
			   })
			})
		},
        chanelManager(){
            this.getConfirm("是否确认取消区域经理？",msg=>{
               this.postAjax("/admin/user/chanelManager",{data:this.sels},msg=>{
            	   if(msg.data.status == 2){
            		   this.ajax();
            	   }
               })
            })
        },
		upgradeMerchant(row,role){
			this.getConfirm("是否确认升级为商家？",msg=>{
			   this.postAjax("/admin/user/upgradeMerchant",{id:row.id,role:role},msg=>{
				   if(msg.data.status == 2){
					   this.ajax();
				   }
			   })
			})
		},
		ajax() {
			this.getAjax(this, {}, msg => {});
		},
		selsChange: function(sels) {
			this.sels = sels;
		},
		toSearch() {
			this.searchField(this);
		},
		exportExcel() {
			window.location.href = this.siteName + "admin/user/export?api_token=" + this.getUser().api_token;
		},
		handleSizeChange(val) {
			this.data.nextPage = val;
			this.ajax();
		},
		handleCurrentChange(val) {
			this.data.nextPage = val;
			this.ajax();
		},
		handleDel(index, item) {
			this.del_vuex(item, index, this)
		},
		delAll() { /*批量删除*/
			this.deleteAll(this);
		},
		addDis(row) {
			this.getConfirm("是否升级为经销商？", msg => {
				this.postAjax("/admin/user/add-dis", { id: row.id }, msg => {
					if (msg.data.status == 2) {
						this.ajax();
					}
				});
			});
		},
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		}
	},
	components: {
		'my-rechargeCoupon': resolve => require(['./layouts/rechargeCoupon.vue'], resolve),
		'my-rechargeCouponPackage': resolve => require(['./layouts/rechargeCouponPackage.vue'], resolve),
		'my-create-edit': resolve => require(['./create_edit'], resolve),
		'merchant-create-edit': resolve => require(['../merchant/create_edit.vue'], resolve),
		'my-qrcord': resolve => require(['./layouts/bingQrcode'], resolve),
		'my-rechargeAmount': resolve => require(['./layouts/rechargeAmount.vue'], resolve),
		'my-outAmount': resolve => require(['./layouts/outAmount.vue'], resolve),
	}

}

</script>
