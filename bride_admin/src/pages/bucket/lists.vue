<template>
    <section>
        <div class="Tsearch">
            <el-form :inline="true" :model="data.query">
                <div class="Tsec_group">
                    <el-form-item label="订单搜索：">
                        <el-input placeholder="请输入订单编号" name="order_no" v-model="data.query.order_no"></el-input>
                    </el-form-item>
                    <el-form-item label="商品搜索：">
                        <el-input placeholder="请输入商品名称" name="product_str" v-model="data.query.product_str"></el-input>
                    </el-form-item>
                    <el-form-item label="电话搜索：">
                        <el-input placeholder="请输入客户电话" name="addr_phone" v-model="data.query.addr_phone"></el-input>
                    </el-form-item>
                    <el-form-item label="配送员：">
                        <el-input placeholder="请输入配送员" name="staff_name" v-model="data.query.staff_name"></el-input>
                    </el-form-item>
                </div>
                <div class="Tsec_group">
                    <el-form-item label="完成日期搜索：" v-if="data.query.table == 'package'">
                        <el-date-picker placeholder="选择日期范围" type="daterange" v-model="data.query.finish_at">
                        </el-date-picker>
                    </el-form-item>
					<el-form-item label="完成日期搜索：" v-else>
					    <el-date-picker placeholder="选择日期范围" type="daterange" v-model="data.query.finish_date">
					    </el-date-picker>
					</el-form-item>
                </div>
                <div class="Tsec_group Tlnav">
                    <el-button type="primary" @click="toSearch">查询</el-button>
                   	<el-button type="success" @click="exportExcel">导出</el-button>
                </div>
            </el-form>
        </div>
        <el-col :span="24" class="flex">
            <el-tabs v-model="data.query.table" type="card" @tab-click="search">
                <el-tab-pane label="普通订单" name="order"></el-tab-pane>
                <el-tab-pane label="套餐订单" name="package"></el-tab-pane>
            </el-tabs>
            <h3 class="pl15 lh-40">共{{data.sum}}件</h3>
        </el-col>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
            @selection-change="selsChange" v-loading="data.listLoading">
            <el-table-column prop="order_no" label="订单编号" width="80">
                <template scope="scope">
                    {{scope.row.order_no}} <span v-if="scope.row.is_group">(团购{{scope.row.rob == 1 ? '完成':""}})</span>
                </template>
            </el-table-column>
            <el-table-column label="商品" width="130">
                <template scope="scope">
                    <div v-if="data.query.table == 'order'">
                        {{scope.row.product_str}}
                    </div>
                    <div v-else>
                            {{scope.row.getProduct.name}}
                    </div>

                </template>
            </el-table-column>
            <el-table-column label="客户信息" width="115">
                <template scope="scope">
                    <p>{{ scope.row.addr_name}}</p>
                    <p>{{ scope.row.nickname}} ({{scope.row.role == 5 ? '商家' : '会员'}}) </p>
                    <p>{{ scope.row.addr_phone}}</p>
                </template>
            </el-table-column>
             <el-table-column label="地址" min-width="140">
                    <template scope="scope">
                        <div v-if="data.query.table == 'order'">
                            {{scope.row.getAddress}}
                        </div>
                        <div v-else>
                             {{scope.row.addr_address}}
                        </div>

                    </template>
              </el-table-column>
             <el-table-column label="配送员" width="70">
                 <template scope="scope">{{ scope.row.staff_name ? scope.row.staff_name + scope.row.staff_phone :'总部' }}</template>
             </el-table-column>
            <el-table-column label="区域" width="100">
                <template scope="scope">
                    {{scope.row.area}}
                </template>
            </el-table-column>
             <el-table-column  align="center" label="供应商" width="100">
                    <template scope="scope">
                         <div v-if="data.query.table == 'order'">
                            {{scope.row.supplier_company_name}}
                        </div>
                        <div v-else>
                         {{scope.row.getSupplier?scope.row.getSupplier.userInfo.company_name : ''}}
                        </div>
                    </template>
             </el-table-column>
            <el-table-column label="回桶品牌" width="130">
                <template scope="scope">
                     {{scope.row.bucket_brand}}
                </template>
            </el-table-column>
            <el-table-column label="入仓数量" width="130">
                <template scope="scope">
                     {{scope.row.bucket_num}}
                </template>
            </el-table-column>
            <el-table-column label="回桶仓库" width="130">
                <template scope="scope">
                      {{scope.row.getSupplierBucket ? scope.row.getSupplierBucket.userInfo.company_name : ''}}
                </template>
            </el-table-column>

            <el-table-column label="来源" width="70">
                <template scope="scope">{{ scope.row.source  && scope.row.source == 'admin' ? '后台' :'小程序' }}</template>
            </el-table-column>
            <el-table-column prop="bucket_date" label="回桶日期" width="100">
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar mtb20">

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
                :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
                style='float: right'>
            </el-pagination>
        </el-col>
    </section>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                formAction: '/admin/shop/order/lists/',
                data: this.formatData(this),
                siteName: this.getSiteName(),
                tableName: 'orders',
                status: 9,
                sels: [], //列表选中列,
                searchFields: {

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
            search(){
                if(this.data.query.table == 'order'){
                    this.formAction = '/admin/shop/order/lists/';
                }else{
                     this.formAction = '/admin/shop/package/order-record-lists';
                }
                this.data.lists = [];
               // return false;
                this.ajax();

            },
            ajax() {
                this.getAjax(this, {
                    status: this.status,
                    'bucketNotNull':1
                }, msg => {});
            },
            exportExcel() {
				 if(this.data.query.table == 'order'){
					  var url = this.urlApendOpenid("/admin/shop/order/export?type=0&bucketNotNull=1", this);
				}else{
					  var url = this.urlApendOpenid("/admin/shop/package/order-record-export?bucketNotNull=1", this);
				}
             
               window.open(this.siteName+url);
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
                this.searchFields.staff_userid = res.id;
            },
            clickStatus(tab, event) {
                this.status = tab.name;
                this.ajax();
            }
        },
        components: {


        }

    }
</script>
