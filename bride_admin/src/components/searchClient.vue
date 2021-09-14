<template id="search_member">
    <div style="position: relative;display:inline-block">
        <!--    <input type="text" class="control" name="search1" v-model="searchMemberVal" @keyup="searchMember('keyup')"  autocomplete="false" @click="selectAll($event)"> -->
        <el-input v-model="data.query.searchFields" @keyup.native="searchMember" autocomplete="false" @click.native="selectAll($event)" :class="myclass">
        	 <span class="el-input__icon el-icon-caret-bottom"  slot="append"></span>
        </el-input>

        <!-- 搜索结果层 -->
        <div class="memberInfo" :style="{width:width}" v-show="memberInfoDig">
            <!-- 如果是绑定车辆处进入 -->
            <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading" @row-click="selectMemberNew">
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="getRole" label="类型"> </el-table-column>
                <el-table-column prop="phone" label="电话"> </el-table-column>
                <el-table-column prop="nickname" label="呢称"> </el-table-column>
                <el-table-column prop="created_at" label="时间"> </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar" style='margin:10px 0'>
                 <el-pagination  @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
        </el-pagination>
            </el-col>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
	props:["ismember","source",'width','isunit','myclass','packageType'],
    data() {
        return {
            searchMemberVal: '',
            formAction: '/admin/user/lists?cashier=1',
            memberInfo: {},
            data: this.formatData(this),
            memberData: [],
            listLoadingMember: false,
            memberInfoDig: false,
            page: 1
        }
    },
    methods: {
        selectAll(event) {
            var obj = event.currentTarget;
            $(obj).select();
        },
        searchMember(event) {
           if(event.keyCode == 13){
               this.memberInfoDig = true;
               if (this.memberInfoDig) {
                   this.ajax();
               }
           }
           
        },
        ajax() {
            var this_ = this;
            var val = this.searchMemberVal;
			if(this.packageType){
				this.formAction+="&packageType="+this.packageType
			}
            this.getAjax(this, { role:2 }, msg => {});

        },
        handleCurrentChange(val) {
            this.page = val;
            this.ajax();
        },
        selectMemberNew(item) {
            this.$emit('callback', item);
            this.data.query.searchFields = item.name;
            this.memberInfoDig = false;

        }
    },
}

</script>
<style type="text/css" scoped="">
.control {
    display: table-cell;
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
    height: inherit;
    padding: 2px 4px;
    border: 0px;
    border: 1px solid transparent;
    background-color: #fff !important;
    line-height: inherit;
    vertical-align: middle;
    line-height: 14px;
}

.icon {
    position: absolute;
    top: 0;
    right: -10px;
    z-index: 999;
    display: inline-block;
    width: 18px;
    height: 34px;
    line-height: 34px;
    background: #f3f3f3;
    text-align: center;
}

.memberInfo {
    min-height: 60px;
    width: 61vw;
    background-color: #F5F5F5;
    padding: 10px;
    position: absolute;
    top: 35px;
    z-index: 99;
    padding: 0;
    -moz-box-shadow: 1px 2px 8px #ddd;
    -webkit-box-shadow: 1px 2px 8px #ddd;
    box-shadow: 1px 2px 8px #ddd;
}

.table {
    margin-bottom: 0;
}

.memberInfo tr:hover {
    cursor: pointer
}

</style>
