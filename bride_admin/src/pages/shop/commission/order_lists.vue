<template>
    <section class="pt15">
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">

             <el-table-column label="头像" min-width="60" class="text-center" align="center">
                <template scope="scope"><img :src="scope.row.user.headerPic" width="50"></template>
            </el-table-column>
            <el-table-column label="姓名" min-width="60">
                <template scope="scope">{{ scope.row.user.userInfo.name }}</template>
            </el-table-column>
            <el-table-column label="部门" min-width="60">
                <template scope="scope">{{ scope.row.user.getDepartment }}</template>
            </el-table-column>
    
            <el-table-column label="电话" min-width="80">
                <template scope="scope">{{ scope.row.user.userInfo.phone }}</template>
            </el-table-column>
            <el-table-column label="成交订单数" min-width="80">
                <template scope="scope">{{ scope.row.orderNum }}</template>
            </el-table-column>
            <el-table-column label="成交金额" min-width="80">
                <template scope="scope">{{ scope.row.orderSum }}</template>
            </el-table-column>
        </el-table>
             <el-col :span="24" class="toolbar mtb20">
            <!-- <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
            </el-pagination>
        </el-col>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/card/order-count',
            data: this.formatData(this),
            siteName: this.getSiteName(),
            tableName: 'business_cards',
            sels: [], //列表选中列,
            searchFields: {
                name: '',
                user_id: 0
            }
        }
    },
    mounted() {
        this.ajax();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "ajax"
    },
    methods: {
        ajax() {
            this.getAjax(this, { type: this.getOptions('type') }, msg => {});
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
       
        searchCallBack(res) {
            this.searchFields.user_id = res.id;
        }
    },
    components: {
        
    }

}

</script>
