<template>
	<section>
		 <div v-if="data.show" class="addUser">
             <el-form :inline="true" :model="ruleForm">
                <el-form-item label="区域经理：">
                   <el-select v-model="ruleForm.manager_id" placeholder="请选择区域经理">
                       <el-option v-for="item in data.manager" :label="item.label" :value="item.value">
                       </el-option>
                   </el-select>
                </el-form-item>
            </el-form>
            <div class="flex flex-between">
               <el-input placeholder="请选择要搜索的姓名或电话或地址" v-model="data.query.searchFields"></el-input>
               <el-button @click="data.nextPage=1;ajax()">搜索</el-button>
            </div>
            <div class="mt50" v-loading="data.listLoading">
                <el-transfer v-model="ruleForm.userArr" :data="userLists" ></el-transfer>
            </div>
           <el-col :span="24" class="toolbar mtb20">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
                    :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
                    style='float: right'>
                </el-pagination>
           </el-col>
             <el-col :span="24" class="toolbar mtb20 flex-center"><el-button type="danger" size="medium" @click="submit">提交</el-button></el-col>
         </div>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/user/lists?cashier=1&role=2&managerIdNull=1',
			data: this.formatData(this),
			siteName: this.getSiteName(),
            ruleForm:{userArr:[]},
            userLists:[]
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
        handleSizeChange(val) {
        	this.data.nextPage = val;
        	this.ajax();

        },
        handleCurrentChange(val) {
        	this.data.nextPage = val;
        	this.ajax();
        },
        submit(){
           if(!this.ruleForm.manager_id){
               this.getError("请选择区域经理");
               return false;
           }
           if(!this.ruleForm.userArr.length){
               this.getError("还没有选择");
               return false;
           }
           this.postAjax("/admin/manager/addUser",this.ruleForm).then(msg=>{
              if(msg.data.status == 2){
                 setTimeout(()=>{
                       window.location.reload();
                 },1000)

              }
           });
        },
		ajax() {
			this.getAjax(this,{}, msg => {
                this.userLists = [];
                msg.lists.forEach(v=>{
                    let name = "";
                    if(v.nickname){
                         if(v.address){
                              name = v.nickname + '('+v.phone+')' + v.address;
                         }else{
                              name = v.nickname + '('+v.phone+')';
                         }

                    }else{
                        if(v.address){
                             name = v.name+ '('+v.phone+')'+ v.address;
                        }else{
                             name = v.name+ '('+v.phone+')';
                        }
                    }

                    this.userLists.push(
                        {label:name,key:v.id},
                    );
                });


            });
		},

	},
	components: {

	}

}

</script>
