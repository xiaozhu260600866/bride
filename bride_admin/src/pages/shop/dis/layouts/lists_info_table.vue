<template>
	<section>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading">
			<el-table-column prop="name" label="姓名/手机号码" width="200">
				<template scope="scope">
					<div class="flex">
						<div class="pr8"><img :src="scope.row.getUser.headerPic" width="36" height="36" class="bdr3"></div>
						<div class="flex1 lh-18 fs-13">
							<p>{{ scope.row.name }}[{{scope.row.getUser.nickname}}]</p>
							<p class="Arial">{{ scope.row.phone }}</p>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="amount" label="累计佣金" width="80"> </el-table-column>
			<el-table-column  label="下级分销商" min-width="100">
				<template scope="scope">
					<a href="javascript:;" @click="showDownDis(scope.$index, scope.row)" >
						<div>一级{{ scope.row.downCount.one }}个</div>
						<div >二级{{ scope.row.downCount.two }}个</div>
					</a>
				</template>
			</el-table-column>
			<el-table-column prop="clientCount" label="客户数" width="80"> </el-table-column>
			<el-table-column prop="orderCount" label="订单数" width="80"> </el-table-column>
			<el-table-column label="日期" width="100">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="320">
				<template scope="scope">
					<el-button type="primary" size="mini" @click="showDownDis(scope.$index, scope.row)" v-if="scope.row.getDownCount>0">查看下级分销商</el-button>
					<el-button type="primary" size="mini" @click="showClient(scope.$index, scope.row)">查看客户</el-button>
					<el-button type="primary" size="mini"  @click="showOrder(scope.$index, scope.row)">查看分销订单</el-button>
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool mtb20 flex-between">
			<el-pagination  @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
		<el-dialog :title="clientTitle" :visible.sync="dialogClientVisible2" size="large" append-to-body :modal="false">
			<my-client ref="myclient2"> </my-client>
		</el-dialog>
		<el-dialog :title="orderTitle" :visible.sync="dialogOrderVisible" size="large" append-to-body>
			<my-order-info ref="myOrder"> </my-order-info>
		</el-dialog>
	</section>
</template>
<script type="text/javascript">
import myclient from './client_info.vue'
export default {
	data() {
		return {
			listDataDown: [],
			dialogClientVisible2: false,
			data: this.formatData(this),
			formAction: '/admin/shop/dis/lists',
			clientTitle:'查看客户',
			disTitle:'',
			orderTitle:'',
			page:1,
			fid:0,
			dialogOrderVisible:false

		}
	},
	methods: {
		handleCurrentChange(val) {
			this.page = val;
			this.ajax(this.fid)
		},
		handleDel: function(index, item) {
			this.del_vuex(item, index, this);
		},
		showOrder(index, item) {
			this.orderTitle = item.name+'的分销订单';
			this.dialogOrderVisible = true;
			setTimeout(() => {
				this.$refs.myOrder.ajax(item.id);
			}, 500)
		},
		showClient(index, item) {
			console.log(this.$parent);
			this.clientTitle = item.name;
			this.dialogClientVisible2 = true;
			setTimeout(() => {
				this.$refs.myclient2.ajax(item.id);
			}, 500)
		},
		showDownDis(index, item) {
			this.fid = item.id;
			this.ajax(item.id);
		},
		ajax(fid) {
			this.fid = fid;
			this.getAjax(this, { fid: fid,page:this.page }, msg => {});
		}
	},
	components: {
		'my-client': myclient,
		'my-order-info': resolve => require(['./order_lists'], resolve),
	}
}

</script>
