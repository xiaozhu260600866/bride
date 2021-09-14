<template>
	<section>
		   <dx-table :data="data" :globalData="globalData" >
               <div slot="append_form_ratio" slot-scope="scope">
                   <el-input v-model="scope.row.ratio" style="width:80px;margin-right: 5px"></el-input>
                   <el-tag>百分比</el-tag><span>规则为:如5%</span>
               </div>
           </dx-table>
	</section>
</template>
<script type="text/javascript">
 import globalData from "./layouts/lev.js";
export default {
	data() {
		return {
			formAction: '/admin/manager/lev/lists',
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
                 //this.data.levArr = this.levArr_();
            });
		},

	},
	components: {
		 'dx-table': resolve => require(['xiaozhu/vue/components/admin/dx_table.vue'], resolve),
	}

}

</script>
