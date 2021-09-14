<template>
    <section>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading">
            <el-table-column label="订单号" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ? scope.row.getOrder.order_no : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="购买人" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ? scope.row.getOrder.addr_name : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="购买人电话" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ? scope.row.getOrder.addr_phone : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="购买人地址" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ? scope.row.getOrder.addr_address : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="产品" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ?   scope.row.getOrder.product_str : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="订单金额" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ? scope.row.getOrder.amount : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="订单数量" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ? scope.row.getOrder.num : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="佣金" width="150">
                <template scope="scope">
                    <div v-if="scope.row.source != '456充值' ">{{ scope.row.amount ? scope.row.amount : '' }}</div>
                    <div v-if="scope.row.source == '456充值' ">{{ scope.row.amount }}(456充值)</div>
                </template>
            </el-table-column>
            <el-table-column label="时间" width="200">
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
			id:0,
            data: this.formatData(this),
            formAction: '/admin/shop/dis/commission-lists'
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
            this.getAjax(this, { dis_id: id,status:1,aa:true}, msg => {});
        }
    },
}

</script>
