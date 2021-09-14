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
                </div>
                <div class="Tsec_group">
                    <el-form-item label="日期搜索：">
                        <el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at">
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
            <el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
                <el-tab-pane label="已付款" :name="''+3"></el-tab-pane>
                <el-tab-pane label="已完成" :name="''+9"></el-tab-pane>
            </el-tabs>
            <h3 class="pl15 lh-40">共{{data.sum}}件</h3>
        </el-col>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
            @selection-change="selsChange" v-loading="data.listLoading">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column prop="order_no" label="订单编号" width="80">
                <template scope="scope">
                    {{scope.row.order_no}} <span v-if="scope.row.is_group">(团购{{scope.row.rob == 1 ? '完成':""}})</span>
                </template>

            </el-table-column>
            <el-table-column label="商品" width="130">
                <template scope="scope"> <span v-for="product in scope.row.products" v-if="product.getProduct">{{ product.is_info ? product.getProduct.name+"("+product.attribute+")" : product.getProduct.name}}</span></template>
            </el-table-column>
            <el-table-column prop="num" align="center" label="数量" width="50"> </el-table-column>
            <el-table-column prop="amount" label="总价" width="80"> </el-table-column>
            <el-table-column label="客户信息" width="115">
                <template scope="scope">
                    <p>{{ scope.row.addr_name}}</p>
                    <p>{{ scope.row.nickname}} ({{scope.row.role == 5 ? '商家' : '会员'}}) </p>
                    <p>{{ scope.row.addr_phone}}</p>
                </template>
            </el-table-column>
            <el-table-column label="地址" min-width="140" prop="getAddress"> </el-table-column>
            <!-- <el-table-column label="地址" min-width="140">
				<template scope="scope">
					<div v-if="scope.row.fclass !=238">{{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</div>
					<div v-else>
						<p>寄件人姓名:{{scope.row.send_name}}</p>
						<p>寄件人街道地址:{{scope.row.send_address}}</p>
						<p>寄件人城市:{{scope.row.send_city}}</p>
						<p>寄件人省份:{{scope.row.send_province}}</p>
						<p>寄件人邮编:{{scope.row.send_post}}</p>
						<p>寄件人国家:{{scope.row.send_country}}</p>
						<p>寄件人电话:{{scope.row.send_phone}}</p>
						<p>收件人姓名:{{scope.row.addr_name}}</p>
						<p>收件人街道地址:{{scope.row.addr_address}}</p>
						<p>收件人城市:{{scope.row.addr_city}}</p>
						<p>收件人省份:{{scope.row.addr_province}}</p>
						<p>收件人邮编:{{scope.row.addr_post}}</p>
						<p>收件人国家:{{scope.row.addr_country}}</p>
						<p>收件人电话:{{scope.row.addr_phone}}</p>
					</div>
				</template>
			</el-table-column> -->




            <el-table-column label="来源" width="70">
                <template scope="scope">{{ scope.row.source  && scope.row.source == 'admin' ? '后台' :'小程序' }}</template>
            </el-table-column>

            <el-table-column prop="finish_date" label="完成时间" width="60" v-if="status == 9"> </el-table-column>
            <el-table-column label="日期" width="100">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
            <el-table-column label="操作" width="280">
                <template scope="scope">
                   
                    <el-button type="primary" size="small" @click="finishOrder(scope.row)">完成</el-button>
                    <el-dropdown class="ml10">
                        <el-button type="primary" size="small">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="changeOrder(scope.row,0,'是否取消该笔订单',msg=>{
								ajax();
							})">订单取消</el-dropdown-item>
                            <el-dropdown-item @click.native="handleDel(scope.$index, scope.row)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar mtb20">
            <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>

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
                formAction: '/admin/shop/order/lists?dianxin=1',
                data: this.formatData(this),
                siteName: this.getSiteName(),
                tableName: 'orders',
                status: this.getOptions("status"),
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
            finishOrder(item) {
                let title = "是否确认完成?";
                this.getConfirm(title, () => {
                    this.postAjax("/admin/shop/order/change-order-status", {
                        id: item.id,
                        status: 9
                    }, msg => {
                        if (msg.data.status == 2) {
                            this.ajax();
                        }
                    });
                });
            },
            ajax() {

                this.getAjax(this, msg => {});
            },
            exportExcel() {
                let url = this.urlApendOpenid("/admin/shop/order/export?type=0&dianxin=1", this);
                window.open(this.siteName + url);
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
