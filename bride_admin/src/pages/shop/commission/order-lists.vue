<template>
    <section>
        <el-col :span="24" class="toolbar t-search float-r">
            <el-form :inline="true" id="search" :model="searchFields">
                <el-col :span="6">
                    <my-search placeholder="请输入微信呢称" tablename="users" searchfield="nickname" v-model="searchFields.nickname" ref="searchClient" style="width:100%" :formAction="'/ajax/vue-search?role=4'" @callback="searchCallBack" :fieldArr="[
                       {prop:'nickname',label:'呢称'},
                       {prop:'created_at',label:'时间'} 
                     ]" />
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="toSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
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
            <el-table-column label="特权折扣" min-width="50">
                <template scope="scope">
                    <el-input v-model="scope.row.user.commission_val" placeholder="请输入内容" @change="editField(scope.row.user,'commission_val')">
                          <template slot="append">折</template>
                    </el-input>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/card/lists',
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
        editField(user,field){
            let user_id = user.id;
            this.postAjax("/admin/card/editField", { user_id:user_id,field:field,value:user[field] }, msg => {
                if (msg.data.status == 3) {
                    user[field] =0;
                }
            });
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
