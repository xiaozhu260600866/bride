<template>
  <div>
    <dx-table :data="data" :global-data="globalData" :operate-width="100" @submitBeforeCallBack="submitBeforeCallBack">
      <div slot="tableLeft" slot-scope="scope">
        <div class="ml20" style="margin-left: 20px;"><el-button type="danger" :disabled="scope.row.length===0 " @click="finishAll(scope.row)">批量完成</el-button></div>
      </div>
    </dx-table>
  </div>
</template>
<script type="text/javascript">
    import globalData from './layouts/activityOrder.js'
    export default {
        components: {
            'dx-table': resolve => require(['xiaozhu/vue/components/admin/dx_table.vue'], resolve)
            // "dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve),
        },
        data() {
            return {
                formAction: '/admin/activity/order/lists',
                data: this.formatData(this),
                siteName: this.getSiteName(),
                globalData: globalData
            }
        },
        watch: {
            '$route': 'ajax'
        },
        mounted() {
            this.ajax()
        },
        methods: {
			finishAll(row) {
				this.getConfirm('是否批量完成', msg => {
					this.postAjax('/admin/activity/order/finishAll', { row: row }).then(msg => {
						if (msg.data.status == 2) {
							this.ajax()
						}
					})
				})
			},
            submitBeforeCallBack(ruleform) {
                delete ruleform.api_token
                console.log(ruleform)
                this.$set(ruleform, 'role', 7)
            },
            ajax() {
                this.getAjax(this, {}, msg => {
                  // this.$nextTick(()=>{
                  //   this.$refs.createEdit.ajax('',this.data,this.globalData.data.formFields);
                  // })
                })
            }
        }
    }
</script>
