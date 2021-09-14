<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="姓名：">
						<el-input v-model="data.query.name" placeholder="请输入联系人姓名"></el-input>
					</el-form-item>
					<el-form-item label="呢称：">
						<el-input v-model="data.query.nickname" placeholder="请输入联系人呢称"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input v-model="data.query.phone" placeholder="请输入联系人电话"></el-input>
					</el-form-item>
					<el-form-item label="区域：">
						<el-input placeholder="请输入区域" name="area_name" v-model="data.query.area_name"></el-input>
					</el-form-item>
					<el-form-item label="来源：">
						<el-input placeholder="请输入来源" name="shareSource" v-model="data.query.shareSource"></el-input>
					</el-form-item>
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="商家名称：">
						<el-input v-model="data.query.company_name" placeholder="请输入商家名称"></el-input>
					</el-form-item>
					<el-form-item label="行业：">
						<el-select v-model="data.query.industry" placeholder="请选择行业">
							<el-option :label="v.label" :value="v.value" v-for="v in data.industryArr"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="ajax">查询</el-button>
					<el-button type="success" @click="exportExcel">导出数据</el-button>
				</div>
				<div class="Tlnav-po">
					<el-button type="primary" @click="$refs.createEdit.ajax('',data.industryArr)">新增</el-button>
				</div>
			</el-form>
		</div>
		<el-col :span="24">
			<el-tabs v-model="data.query.status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="审核中" :name="''+0"></el-tab-pane>
				<el-tab-pane label="审核拒绝" :name="''+2"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
		
			<el-table-column label="序号" width="60">
				<template scope="scope">{{ scope.$index+1 }}</template>
			</el-table-column>
			<el-table-column label="所在街道" width="80">
				<template scope="scope">{{scope.row.userInfo.area}}</template>
			</el-table-column>
			  <el-table-column label="商家名称" min-width="150">
				<template scope="scope">{{ scope.row.userInfo.company_name }}</template>
			</el-table-column>
			<el-table-column label="姓名" width="100">
				<template scope="scope">{{ scope.row.name }}</template>
			</el-table-column>
			<el-table-column prop="nickname" label="呢称" width="120"> </el-table-column>
			<el-table-column prop="phone" label="电话" width="120">
				<template scope="scope">{{ scope.row.phone }}</template>
			</el-table-column>
			<el-table-column prop="merchant_amount" label="商家收益" width="110">
				<template scope="scope">{{ scope.row.merchant_amount }}</template>
			</el-table-column>
			<el-table-column prop="amount" label="余额" width="110">
				<template scope="scope">{{ scope.row.amount }}</template>
			</el-table-column>
            <el-table-column prop="integral" label="积分" width="110">
            	<template scope="scope">{{ scope.row.integral }}</template>
            </el-table-column>
			<el-table-column prop="phone" label="来源" width="120">
				<template scope="scope">{{ scope.row.source }}</template>
			</el-table-column>
			<el-table-column label="行业" width="80">
				<template scope="scope">{{ scope.row.userInfo.industry }}</template>
			</el-table-column>
			<el-table-column label="注册日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
            <el-table-column align="center" label="排序" width="78">
            	<template scope="scope">
            		<el-input v-model="scope.row.sort"  @change="editField(scope.row,'sort')"></el-input>
            	</template>
            </el-table-column>
			<!-- <el-table-column align="center" label="是否自提" width="80">
				<template scope="scope">
					 <el-switch v-model="scope.row.show_index" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'show_index')"> </el-switch>
				</template>
			</el-table-column> -->
		
			
			<el-table-column label="操作" width="110">
				<template scope="scope">
					<el-dropdown>
						<el-button type="primary" size="small">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="$refs.createEdit.ajax(scope.row,data.industryArr)">编辑</el-dropdown-item>
							<el-dropdown-item @click.native="$router.push('/vueadmin/user/info?user_id='+scope.row.id)">商家详情</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.coupon.ajax(scope.row,data.coupon)" v-if="scope.row.status == 1">赠送优惠券</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.integral.ajax(scope.row)" v-if="scope.row.status == 1">充值积分</el-dropdown-item>
							<el-dropdown-item @click.native="dialogFormVisible=true,userId = scope.row.id">买单二维码</el-dropdown-item>
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-dropdown-item>
							<el-dropdown-item size="small" @click.native="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=1">审核通过</el-dropdown-item>
							 <el-dropdown-item size="small" @click.native="changeStatus(scope.$index, scope.row,'2')" type="warning" v-if="scope.row.status!=2">审核拒绝</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
		
			
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[60]" :page-size="60" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<el-dialog title="查看二维码" :visible.sync="dialogFormVisible" width="800px" :top="0" :before-close="handleClose">
					<img :src="siteName + '/website-recode?id='+userId">
		</el-dialog>
		<my-table :searchFields="{order_no:'',searchDate:[]}" tableName="orders" ref="table" style="width:100%" :fieldArr="[
			   {prop:'order_no',label:'订单号'},
			   {prop:'getShipping',label:'购买方式'},
			   {prop:'status_message',label:'状态'},
			   {prop:'productInfo',label:'商品'}
		   ]" />
		<my-rechargeCoupon :top="'10%'" ref="coupon"></my-rechargeCoupon>
		<my-status ref="status" style="width:100%" formAction="/admin/merchant/change-status" />
		<my-create-edit ref="createEdit"></my-create-edit>
        <my-recharge-integral ref="integral"></my-recharge-integral>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/merchant/lists',
			data: this.formatData(this),
			dialogFormVisible:false,
			userId:'',
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
        showIndexAll(){
            this.getConfirm("是否批量上架",msg=>{
                this.postAjax("/admin/merchant/editField", { type:'all',data:this.sels,field:"show_index2",value:1 }, msg => {
                	if (msg.data.status == 2) {
                		this.ajax();
                	}
                });
            })
        },
		handleClose(){
			this.dialogFormVisible=false;

		},
		editField(row,field){
			this.postAjax("/admin/merchant/editField", { id:row.id,field:field,value:row[field] }, msg => {
				if (msg.data.status == 3) {
					row[field] =0;
				}
			});
		},
		editField2(row,field){
			this.postAjax("/admin/merchant/editField", { id:row.id,field:field,value:row.show_index2 }, msg => {
				if (msg.data.status == 3) {
					row[field] =0;
				}
			});
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
			let url = this.urlApendOpenid("/admin/merchant/export", this);
			window.open(this.siteName+url);
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
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		},
		clickStatus(tab, event) {
			this.data.query.status = tab.name;
			this.ajax();
		},
		changeStatus(index, item, status) {
			this.$refs.status.ajax({ id: item.id, status: status });
		},
	},
	components: {
		'my-create-edit': resolve => require(['./create_edit'], resolve),
		'my-recharge-integral': resolve => require(['./layouts/rechargeIntegral.vue'], resolve),
		'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
		'my-rechargeCoupon': resolve => require(['../user/layouts/rechargeCoupon.vue'], resolve),
	}

}

</script>
