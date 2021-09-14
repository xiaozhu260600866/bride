<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-col>
						<el-form-item label="优惠券：">
							<el-input placeholder="请输入优惠券名称" name="name" v-model="searchFields.name"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="toSearch">查询</el-button>
						</el-form-item>
					</el-col>
					<el-form-item>
						<el-button type="primary" @click="$router.push({path: '/vueadmin/coupon/coupon/coupon-create'})" >新增</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="name" label="优惠券名称" min-width="200"> </el-table-column>
			<el-table-column prop="amount" label="优惠券金额" width="100"> </el-table-column>
			<el-table-column label="有效期" width="125">
				<template scope="scope">{{ scope.row.start_date }} ~ {{ scope.row.end_date }}</template>
			</el-table-column>
			<el-table-column prop="getType" label="类型" width="200"> </el-table-column>
			<el-table-column prop="getProduct" label="指定产品使用" min-width="200"> </el-table-column>
            <el-table-column align="center" label="发放动商城" width="100">
                <template scope="scope">
                    <el-switch v-model="scope.row.is_index " on-text="" off-text="" :active-value="1" :inactive-value="0"
                        @change="editField(scope.row,'is_index')"> </el-switch>
                </template>
            </el-table-column>
			<el-table-column label="操作" width="160">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path: '/vueadmin/coupon/coupon/coupon-create?id='+scope.row.id})" >编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/coupon/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'coupons',
			sels: [], //列表选中列,
			searchFields: {
				user_id: '',
				name: '',
			}
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
        editField(row, field) {
            this.postAjax("/admin/shop/coupon/editField", {
                id: row.id,
                field: field,
                value: row[field]
            }, msg => {
                if (msg.data.status == 3) {
                    row[field] = 0;
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
		}
	},
	components: {

	}

}

</script>
