<template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible"  :before-close="handleClose" width="30%">
        <div class="flex">
            <el-input v-model="ruleForm.content" placeholder="请输入姓名" >
                 <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            
        </div>
        <ul class="search-list" v-loading="data.listLoading">
            <li :class="[v.checked ? 'active' :'']" v-for="(v,key) in data.lists" @click="choose(v,key)" v-if="ruleForm.content ? ruleForm.content == v.user.userInfo.name :true">{{ v.user.userInfo.name }}
                <img  src="https://boss.doxinsoft.com/images/check.png" style="position: absolute; left: 45%; top: 8px;" v-if="v.checked">
                <span  class="department-name el-tooltip item" aria-describedby="el-tooltip-9568" tabindex="0">
                {{ v.user.userInfo.position }}</span>
            </li>
        </ul>
       <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
</template>
<script>
export default {
    props: [],
    data() {
        return {
            ruleForm: { content: '' },
            formAction: '/admin/card/lists',
            data: this.formatData(this),
            dialogFormVisible: false,
            status:0,
            title:''
           
        };
    },
    mounted(){
        //this.ajax();
    },
    methods: {
        search(){
            console.log(this.ruleForm.content);
        },
        submit(){
            let checkArr = [];

           for (var i = 0; i <  this.data.lists.length; i++) {
                let v = this.data.lists[i];
                if(v.checked){
                    if(this.status == 0){
                        if(v.user.userInfo.see_work1 !=0 && v.user.userInfo.see_work2!=0){
                            this.getConfirm("请先将交出方-"+v.user.userInfo.name+"的名片禁用,否则不能继续进行工作交接",msg=>{
                                this.goto("/vueadmin/setting/merchant/staff-lists");
                            });
                            return false;
                        }
                    }else{
                       if(v.user.userInfo.see_work1 !=1 && v.user.userInfo.see_work2!=1){
                            this.getConfirm("请先将交出方-"+v.user.userInfo.name+"的名片启用,否则不能继续进行工作交接",msg=>{
                                this.goto("/vueadmin/setting/merchant/staff-lists");
                            });
                            return false;
                        } 

                    }
                    v.user.client = v.client;
                    checkArr.push(v.user);
                }

           }
           
            if(!checkArr.length){
                this.getError("您还没有勾选，请不要提交");
                return false;
            }
            this.$emit("callBack",checkArr);
            this.handleClose();

        },
        choose(v,key) {
             this.data.lists.forEach((v,key)=>{
                 this.$set(this.data.lists[key],"checked",false); 
            });
            let checked = !v.checked;
            this.$set(this.data.lists[key],"checked",checked); 
        },
        ajax: function() {
           this.getAjax(this, {  }, msg => {});
        },
        open(status){
             this.dialogFormVisible = true;
             this.status = status;
             this.title =this.status == 0 ? '选择交出方' : '选择接收方';

            this.ajax();
        },

        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
<style type="text/css" scoped="">
 .search-list{
    width: 100%;
    height: 290px;
    border: 1px solid #d4d4d4;
    margin-top: 25px;
    overflow-y: auto;
    padding-top: 10px;
}
.search-list li {
    list-style: none;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #333;
    letter-spacing: 0;
    padding: 5px 0;
    cursor: pointer;
    position: relative;
    text-indent: 1em;
}
.department-name {
    margin-right: 20px;
    float: right;
    color: #9a9a9a;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
} 
.active{
    color: #1aad19!important;
}  
</style>
