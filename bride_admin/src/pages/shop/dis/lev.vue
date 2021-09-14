<template>
	<section>
		   <dx-table :data="data" :globalData="globalData" >
               <div slot="append_table_first_distor" slot-scope="scope">
                  {{scope.row.first_distor}}
                   <el-tag>%</el-tag>
               </div>
               <div slot="append_table_second_distor" slot-scope="scope">
                  {{scope.row.second_distor}}
                   <el-tag>%</el-tag>
               </div>
               <div slot="append_table_third_distor" slot-scope="scope">
                   {{scope.row.third_distor}}
                   <el-tag>%</el-tag>
               </div>
               <div slot="append_form_first_distor" slot-scope="scope">
                   <el-input v-model="scope.row.first_distor" style="width:80px;margin-right: 5px"></el-input>
                   <el-tag>百分比</el-tag><span>规则为:如5%</span>
               </div>
               <div slot="append_form_second_distor" slot-scope="scope">
                   <el-input v-model="scope.row.second_distor" style="width:80px;margin-right: 5px"></el-input>
                   <el-tag>百分比</el-tag><span>规则为:如5%</span>
               </div>
               <div slot="append_form_third_distor" slot-scope="scope">
                   <el-input v-model="scope.row.third_distor" style="width:80px;margin-right: 5px"></el-input>
                   <el-tag>百分比</el-tag><span>规则为:如5%</span>
               </div>
               <div slot="append_form_upgrade_type" slot-scope="scope">
                   <el-radio v-model="scope.row.upgrade_type" :label="0">订单金额</el-radio>
                   <br>
                   <div v-if="scope.row.upgrade_type == 0">
                      完成订单金额满：<el-input v-model="scope.row.amount" style="width:100px;margin-right: 5px"></el-input>
                       <el-tag>元</el-tag>
                   </div>
               </div>
           </dx-table>
	</section>
</template>
<script type="text/javascript">
 import globalData from "./layouts/dis_lev.js";
export default {
	data() {
		return {
			formAction: '/admin/shop/dis/lev/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			globalData:globalData,
            ruleForm:{}
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
        levArr_() {
            let arr = [];
            for (var i = 0; i <= 100; i++) {
                arr.push(
                    {label:i,value:i}
                )
            }
            return arr;
        },
		ajax() {
            console.log(this.data.query);
			this.getAjax(this, { type: this.getOptions('type') }, msg => {
                 this.data.levArr = this.levArr_();
            });
		},

	},
	components: {
		 'dx-table': resolve => require(['xiaozhu/vue/components/admin/dx_table.vue'], resolve),
	}

}

</script>
