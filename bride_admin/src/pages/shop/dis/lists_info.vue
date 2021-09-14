<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="姓名：">
						<el-input placeholder="请输入姓名" name="name" v-model="searchFields.name"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input placeholder="请输入电话" name="name" v-model="searchFields.phone"></el-input>
					</el-form-item>
					<el-form-item label="区域：">
						<el-input placeholder="请输入区域" name="area_name" v-model="searchFields.area_name"></el-input>
					</el-form-item>
					<el-form-item label="经销商等级：">
							<el-select v-model="searchFields.lev_id" placeholder="请选择经销商">
								<el-option :label="v.label" :value="v.value" v-for="v in data.disLev"></el-option>
							</el-select>
					</el-form-item>
					<el-form-item label="推荐人：">
						<my-search placeholder="请选择推荐人" tablename="distributions" searchfield="name" v-model="searchFields.distribution_name" ref="searchClient" style="width:100%" :formAction="'/ajax/vue-search'" @callback="searchCallBack" :fieldArr="[
					   {prop:'name',label:'姓名'},
					   {prop:'created_at',label:'时间'}
					 ]" />
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="searchFields.searchDate"> </el-date-picker>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="success" @click="exportExcel">导出</el-button>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading" class="dis-list">
			<el-table-column type="selection" width="40"> </el-table-column>
			<el-table-column prop="id" label="id" width="100"> </el-table-column>
			<el-table-column label="所在区域" width="100">
				<template scope="scope">{{ scope.row.area_name }}</template>
			</el-table-column>
			<el-table-column label="分销商等级" width="100">
				<template scope="scope">{{ scope.row.getDev ? scope.row.getDev.name :'' }}</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名/手机号码" min-width="100">
				<template scope="scope">
					<div class="flex" v-if="scope.row.getUser">
						<div class="pr8"><img :src="scope.row.getUser.headerPic" width="36" height="36" class="bdr3"></div>
						<div class="flex1 lh-18 fs-13">
							<p>{{ scope.row.name }}[{{scope.row.getUser.nickname}}]</p>
							<p class="Arial">{{ scope.row.phone }}</p>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="推荐人" min-width="100">
				<template scope="scope">
					<div v-html="scope.row.getReferrer"></div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="名称" width="90">
				<template scope="scope">
					<el-input v-model="scope.row.name"  @change="editField(scope.row,'name')"></el-input>
				</template>
			</el-table-column>
			<el-table-column align="center" label="电话" width="190">
				<template scope="scope">
					<el-input v-model="scope.row.phone"  @change="editField(scope.row,'phone')"></el-input>
				</template>
			</el-table-column>
		
			<el-table-column prop="amount" label="累计佣金" width="100"></el-table-column>
			<el-table-column  label="下级分销商" width="100">
				<template scope="scope">
					<a href="javascript:;" @click="showDownDis(scope.$index, scope.row)" >
						<div>一级{{ scope.row.downCount.one }}个</div>
						<div >二级{{ scope.row.downCount.two }}个</div>
					</a>
				</template>
			</el-table-column>
			</el-table-column>
			<el-table-column align="center" prop="clientCount" label="客户数" width="70">
					<template scope="scope">
							<a href="javascript:;" @click="showClient(scope.$index, scope.row)">{{scope.row.clientCount}}</a>
					</template>
			</el-table-column>
			<el-table-column align="center" prop="orderCount" label="订单数" width="70">
					<template scope="scope">
							<a href="javascript:;" @click="showOrder(scope.$index, scope.row)">{{scope.row.orderCount}}</a>
					</template>
				</el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<!-- <el-button size="mini" @click="$refs.coupon.ajax(scope.row.getUser,data.coupon)">赠送优惠券</el-button> -->
					<el-dropdown>
						<el-button type="primary" size="small">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="$router.push('/vueadmin/user/info?user_id='+scope.row.user_id)">查看详情</el-dropdown-item>
							<el-dropdown-item @click.native="showQrcode(scope.row)">查看二维码</el-dropdown-item>
							<el-dropdown-item @click.native="changeLev(scope.row)">更改经销商等级</el-dropdown-item>
							<el-dropdown-item @click.native="showDownDis(scope.$index, scope.row)" v-if="scope.row.downCount>0">下级分销商</el-dropdown-item>
							<el-dropdown-item @click.native="showClient(scope.$index, scope.row)">客户</el-dropdown-item>
							<el-dropdown-item @click.native="showOrder(scope.$index, scope.row)">分销订单</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.commission.ajax(scope.row)">充值佣金</el-dropdown-item>
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool mtb20 flex-between">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total"></el-pagination>
		</div>
		<el-dialog :title="disTitle" :visible.sync="dialogTableVisible" size="large">
			<my-down-dis ref="mytable"> </my-down-dis>
		</el-dialog>
		<el-dialog :title="clientTitle" :visible.sync="dialogClientVisible" size="large">
			<my-client-info ref="myclient"> </my-client-info>
		</el-dialog>
		<el-dialog :title="orderTitle" :visible.sync="dialogOrderVisible" size="large">
			<my-order-info ref="myOrder"> </my-order-info>
		</el-dialog>
		<my-commission ref="commission"></my-commission>
		<my-rechargeCoupon top="10%" ref="coupon"></my-rechargeCoupon>
		<my-create-edit2  ref="createEdit2" :fields="formFields" :data="data" editAction="/admin/shop/dis/updateLev" ></my-create-edit2>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/dis/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'distributions',
			formFields:{},
			dialogTableVisible: false,
			dialogClientVisible: false,
			dialogOrderVisible: false,
			clientTitle:'',
			orderTitle:'',
			disTitle:'查看下级分销商',
			sels: [], //列表选中列,
			searchFields: {
				name: '',
			}
		}
	},
	mounted() {
		this.status = this.getOptions('status');
		this.ajax();
	},
	methods: {
		editField(row, field) {
			this.postAjax("/admin/shop/dis/editField", {
				id: row.id,
				field: field,
				value: row[field]
			}, msg => {
				if (msg.data.status == 3) {
					row[field] = 0;
				}
			});
		},
		showQrcode(row){
			window.open(this.siteName + '/shop/dis/bing-wechat-qrcode?dis_id='+row.id+"&site_name=456");
		},
		changeLev(row){
			this.formFields =[
				{prop:'lev_id',label:'经销商等级',type:'select',datatype:'require',datakey:"disLev",style:"width:350px"},
			];

			setTimeout(()=>{
				this.$refs.createEdit2.ajax(row,this.data,this.formFields);
			},500);
		},
		exportExcel() {
		   let url = this.urlApendOpenid("/admin/shop/dis/export?type=0", this);
		   window.open(this.siteName+url);
		},
		ajax() {
			this.getAjax(this, { status: this.status }, msg => {
				// this.data.disLev.unShift(
				//     {label:'普通分销商',value:0}
				// );
			});
		},
		showDownDis(index, item) {
			this.disTitle = item.name+'的下级分销商';
			let fid = item.id;
			this.dialogTableVisible = true;
			setTimeout(() => {
				this.$refs.mytable.ajax(fid);
			}, 500)
		},
		selsChange: function(sels) {
			this.sels = sels;
		},
		toSearch() {
			this.searchField(this);
		},
		showClient(index, item) {
			this.clientTitle = item.name+'所属客户';
			this.dialogClientVisible = true;
			setTimeout(() => {
				this.$refs.myclient.ajax(item.id);
			}, 500)
		},
		showOrder(index, item) {
			this.orderTitle = item.name+'的分销订单';
			this.dialogOrderVisible = true;
			setTimeout(() => {
				this.$refs.myOrder.ajax(item.id);
			}, 500)
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
			this.searchFields.fid = res.id;
		},
	},
	components: {
		'my-down-dis': resolve => require(['./layouts/lists_info_table'], resolve),
		'my-client-info': resolve => require(['./layouts/client_info'], resolve),
		'my-order-info': resolve => require(['./layouts/order_lists'], resolve),
		'my-commission': resolve => require(['./layouts/commission'], resolve),
		'my-rechargeCoupon': resolve => require(['../../user/layouts/rechargeCoupon.vue'], resolve),
		"my-create-edit2": resolve => require(['xiaozhu/vue/components/admin/create_edit.vue'], resolve),
	}

}

</script>
