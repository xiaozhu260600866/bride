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
				</div>
				<div class="Tlnav-po">
					<el-button type="primary" @click="$refs.createEdit.ajax('')">新增</el-button>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="序号" width="60">
				<template scope="scope">{{ scope.$index+1 }}</template>
			</el-table-column>
			<el-table-column label="水店名称" min-width="50">
				<template scope="scope">{{ scope.row.userInfo.company_name }}</template>
			</el-table-column>
			<el-table-column label="联系人" min-width="50">
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
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="120">
				<template scope="scope">
					<el-dropdown>
						<el-button type="primary" size="small">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="$refs.createEdit.ajax(scope.row)">编辑</el-dropdown-item>
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-dropdown-item>
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
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/staff/lists?role=13&status=1',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'users',
			sels: [], //列表选中列,
			status:1,
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
		}
	},
	components: {
		'my-create-edit': resolve => require(['./category_create_edit'], resolve),
	}

}

</script>
