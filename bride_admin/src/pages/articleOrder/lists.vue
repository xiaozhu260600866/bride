<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-form-item label="姓名：">
						<el-input placeholder="请输入帖子联系人名称/电话/内容" name="content" v-model="searchFields.content"></el-input>
					</el-form-item>
					<el-form-item label="置顶：">
						<el-select v-model="searchFields.top" placeholder="请选择置顶状态">
							<el-option label="是" value="1"></el-option>
							<el-option label="否" value="0"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="分类搜索：">
                    	<el-select v-model="data.query.category" placeholder="请输入分类">
                    		<el-option v-for="v in data.category" :label="v.label" :value="v.value">
                    	</el-option>
                    </el-select>
                    </el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="searchFields.searchDate"> </el-date-picker>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					
				</div>
			</el-form>
		</div>
		<el-col :span="24">
			<el-tabs v-model="status" type="card" @tab-click="clickStatus">
               
				<el-tab-pane label="审核中" :name="''+3"></el-tab-pane>
				<el-tab-pane label="审核通过" :name="''+4"></el-tab-pane>
				<el-tab-pane label="审核拒绝" :name="''+5"></el-tab-pane>
				 <el-tab-pane label="全部" :name="''+12"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column prop="id" label="贴子id" width="80"> </el-table-column>
            <el-table-column prop="city" label="城市" width="80"> </el-table-column>
            <el-table-column label="发布时间" width="100">
            	<template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
             <el-table-column prop="name" label="发布人" width="100"> </el-table-column>
             <el-table-column prop="phone" label="发布人电话" width="100"> </el-table-column>
			<el-table-column label="贴子简介" min-width="160">
				<template scope="scope">
					{{scope.row.title}}
				</template>
			</el-table-column>
            <el-table-column label="图片" width="181">
            	<template scope="scope">
            		<div class="imgG">
            			<a :href="img.img" class="aimg" target="_blank" v-for="img in scope.row.getCover" :style="'background-image: url('+img.img+')'"></a>
            		</div>
            	</template>
            </el-table-column>
            <el-table-column label="是否置顶" width="80">
            	<template scope="scope">
            		 {{scope.row.top ? '置顶时间为:'+ scope.row.top_expire_date  : '否'}}
            	</template>
            </el-table-column>
            	<el-table-column prop="getStatus" label="状态" width="80"> </el-table-column>
			<el-table-column  label="金额" width="80"> 
				<template scope="scope"> {{scope.row.pay_method == 2 ? 0 :  scope.row.amount  }}	</template>
			</el-table-column>
			<el-table-column prop="address" label="地址" min-width="100"> </el-table-column>
            <el-table-column align="center" label="热门" width="65">
            	<template scope="scope">
            		<el-switch v-model="scope.row.hot " on-text="" off-text="" :active-value="1" :inactive-value="0"
            			@change="editField(scope.row,'hot')"> </el-switch>
            	</template>
            </el-table-column>
			<el-table-column align="center" label="排序" width="120">
				<template scope="scope">
					<el-input v-model="scope.row.sort " 
						@change="editField(scope.row,'sort')"> </el-input>
				</template>
			</el-table-column>
			<el-table-column align="center" label="显示/隐藏" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.can_show " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'can_show')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="访问量" width="90">
				<template scope="scope">
					<el-input v-model="scope.row.views"  @change="editField(scope.row,'views')"></el-input>
				</template>
			</el-table-column>
			<el-table-column align="center" label="红包" width="150">
				<template scope="scope">
					<span v-if="scope.row.red_packet && scope.row.getRedPacket">
						{{scope.row.getRedPacket.red_packet_average ? '单个金额:' : '福利金额:'}}{{scope.row.getRedPacket.red_packet_amount}} </br>{{scope.row.getRedPacket.red_packet_average ? '总共几份:' : '分成几份:'}}{{scope.row.getRedPacket.red_packet_num}} 	
					</span>
					<span v-else>
						无
					</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="260">
				<template scope="scope">
                    <el-button type="danger"  size="small" @click="changeStatus(scope.$index, scope.row,'2')"v-if="scope.row.status!=5">审核拒绝</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    	<el-button size="small" @click="$refs.createEdit.ajax(scope.row,data.category)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-button type="danger" @click="passAll" :disabled="this.sels.length===0 ">批量通过</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
		<my-status ref="status" style="width:100%" formAction="/admin/articleOrder/change-status" />
        <my-create-edit ref="createEdit"></my-create-edit>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/articleOrder/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'article_orders',
			status: 0,
			sels: [], //列表选中列,
			searchFields: {
				searchDate: '',
				name: '',
				lev: ''
			}
		}
	},
	mounted() {
		this.status = this.getOptions('status');
		this.ajax();
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		"$route": "ajax"
	},
	methods: {
        editField(row, field) {
        	this.postAjax("/admin/articleOrder/editField", {
        		id: row.id,
        		field: field,
        		value: row[field]
        	}, msg => {
        		if (msg.data.status == 3) {
        			row[field] = 0;
        		}
        	});
        },
		ajax() {
			this.getAjax(this, { status: this.status }, msg => {});
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
		handleDel(index, item) {
			this.del_vuex(item, index, this)
		},
		delAll() { /*批量删除*/
			this.deleteAll(this);
		},
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		},
		changeStatus(index, item, status) {
			this.$refs.status.ajax({ id: item.id, status: status });
		},
		clickStatus(tab, event) {
			this.status = tab.name;
			this.ajax();
		},
        passAll(){
            if(this.sels.length == 0){
                 return this.getError('请勾选项目')
            }
            this.getConfirm("是否确认此操作",()=>{
                this.postAjax("/admin/articleOrder/pass-all",{data:this.sels}).then(msg=>{
                    if(msg.data.status == 2){
                           this.ajax();
                    }
                })
            })
        }
	},
	components: {
		'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
        'my-create-edit': resolve => require(['./create_edit'], resolve),
	}

}

</script>
<style type="text/css" scoped>
.imgG{display: flex;flex-wrap: wrap;}
.imgG .aimg{width: 50px;height: 50px;margin: 0 5px 5px 0;background-size: cover;background-position: center;}
.imgG .aimg:nth-child(3n){margin-right: 0;}
</style>