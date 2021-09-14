<template>
    <section>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading">
			<el-table-column label="微信呢称" width="150">
			    <template scope="scope">
			        <div>{{ scope.row.getUser ? scope.row.getUser.nickname : '游客' }}</div>
			    </template>
			</el-table-column>
            <el-table-column label="名称" width="150">
                <template scope="scope">
                    <div>{{ scope.row.name ? scope.row.name : '游客' }}</div>
                </template>
            </el-table-column>
			<el-table-column label="电话" width="150">
			    <template scope="scope">
			        <div>{{ scope.row.phone ? scope.row.phone : '游客' }}</div>
			    </template>
			</el-table-column>
            <el-table-column label="关注时间" width="200">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
			
        </el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            listDataDown: [],
            data: this.formatData(this),
			id:0,
            formAction: '/admin/shop/dis/client'
        }
    },
    methods: {
		handleSizeChange(val) {
			this.data.nextPage = val;
			this.ajax(this.id);
		},
		handleCurrentChange(val) {
			this.data.nextPage = val;
			this.ajax(this.id);
		},
        handleDel: function(index, item) {
            this.del_vuex(item, index, this);
        },
        ajax(id) {
			this.id = id;
            this.getAjax(this, { id: id }, msg => {});
        }
    },
}

</script>
