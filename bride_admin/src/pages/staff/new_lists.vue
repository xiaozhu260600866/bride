<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="呢称：">
						<el-input v-model="searchFields.nickname" placeholder="请输入呢称"></el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input v-model="searchFields.name" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input v-model="searchFields.phone" placeholder="请输入电话"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
				<!-- 	<el-button type="primary" @click="synchronize">同步企业微信</el-button> -->
					<el-button type="primary" @click="$refs.category.ajax()">部门</el-button>
                    <el-button type="success" @click="exportExcel">导出</el-button>
				</div>
				<div class="Tlnav-po">
					<el-button type="primary" @click="$refs.createEdit.ajax('',data.merchantLists,data.department,data.areaArr,data.roleArr,data.waterShops)">新增</el-button>
				</div>
			</el-form>
		</div>
		<el-col :span="24">
			<el-tabs v-model="status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="审核中" :name="''+0"></el-tab-pane>
				<el-tab-pane label="审核通过" :name="''+1"></el-tab-pane>
				<el-tab-pane label="审核拒绝" :name="''+2"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="序号" width="60">
				<template scope="scope">{{ scope.$index+1 }}</template>
			</el-table-column>
			<el-table-column label="姓名" min-width="50">
				<template scope="scope">{{ scope.row.name }}</template>
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="130">
				<template scope="scope">{{ scope.row.phone }}</template>
			</el-table-column>
			<el-table-column prop="amount" label="金额" width="130">
				<template scope="scope">{{ scope.row.amount }}</template>
			</el-table-column>
            <el-table-column prop="amount" label="地区" width="130">
            	<template scope="scope">{{ scope.row.city }}</template>
            </el-table-column>
			<el-table-column prop="staff_lev" label="级别" width="130">
				<template scope="scope">{{ scope.row.staff_lev }}</template>
			</el-table-column>
			 <el-table-column label="BOSS端" width="90">
				<template scope="scope">
					 <el-switch v-model="scope.row.qy_boss_auth " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'qy_boss_auth')"> </el-switch>
				</template>
			</el-table-column>
			  <el-table-column label="员工端" width="90">
				<template scope="scope">
					 <el-switch v-model="scope.row.qy_staff_auth " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'qy_staff_auth')"> </el-switch>
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
							<el-dropdown-item @click.native="$refs.createEdit.ajax(scope.row,data.merchantLists,data.department,data.areaArr,data.roleArr,data.waterShops)">编辑</el-dropdown-item>
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-dropdown-item>
							<el-dropdown-item @click.native="updateRole(scope.row)">升级为水店</el-dropdown-item>
							<el-dropdown-item @click.native="delLgout(scope.row)" >清除缓存</el-dropdown-item>
							<el-dropdown-item size="small" @click.native="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=1">审核通过</el-dropdown-item>
							 <el-dropdown-item size="small" @click.native="changeStatus(scope.$index, scope.row,'2')" type="warning" v-if="scope.row.status!=2">审核拒绝</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<my-create-edit ref="createEdit"></my-create-edit>
		<my-class top="2%" ref="category" :type="0" :formAction="'/admin/department/'" :sizearr="300"></my-class>
		<my-status ref="status" style="width:100%" formAction="/admin/staff/change-status" />
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/staff/lists?role=7',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'users',
			sels: [], //列表选中列,
			status:"1",
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
		updateRole(user){
			this.getConfirm("是否升级为水店？",msg=>{
				this.postAjax("/admin/staff/updateRole", { user_id:user.id }, msg => {
					this.ajax();
				});
			});
		},
		delLgout(user){
			this.getConfirm("是否清除app缓存？",msg=>{
				this.postAjax("/admin/staff/editField", { user_id:user.id,field:"api_token",value:"null" }, msg => {
					this.ajax();
				});
			});
		},
		changeStatus(index, item, status) {
			this.$refs.status.ajax({ id: item.id, status: status });
		},
		clickStatus(tab, event) {
			this.status = tab.name;
			this.ajax();
		},
		synchronize(){
			this.getConfirm("是否同步企业微信？",msg=>{
				this.postAjax("/admin/staff/synchronize",{},msg=>{
					this.ajax();
				});
			});
		},
		editField(user,field){
			this.postAjax("/admin/staff/editField", { user_id:user.id,field:field,value:user[field] }, msg => {
				if (msg.data.status == 3) {
					user[field] =0;
				}
			});
		},
		ajax() {
			this.getAjax(this, {status:this.status}, msg => {});
		},
		selsChange: function(sels) {
			this.sels = sels;
		},
		toSearch() {
			this.searchField(this);
		},
		exportExcel() {
            let url = this.urlApendOpenid("/admin/user/export?role=7&excel=1", this);
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
		'my-create-edit': resolve => require(['./new_create_edit'], resolve),
		"my-class": resolve => require(['xiaozhu/vue/components/admin/class.vue'], resolve),
			'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
	}

}

</script>
