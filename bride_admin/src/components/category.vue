<!--
使用：
1.components: {
		'my-category':()=>import('xiaozhu/vue/components/admin/category.vue')
	}
2.      <my-category :lists="lists"  actionPrefix="/admin/system" actionUrl="/admin/system" canupload="0" type="0"></my-category>的前缀
 -->
<template>
	<div>
		<table class="table table-hover">
			<thead>
				<tr class="ta_th_tr">
					<th width="80" align="center">排序</th>
					<th width="20%">名称</th>
					<th>url</th>
					<th width="100">隐藏/显示</th>
					<th width="290">操作</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(v,key) in lists" v-if="v.type==type">
					<tr class="active" :id="'tr_'+v.id">
						<td>
							<input type="text" name="sort" class="form-control input_w50 text_center v_name noborder"@blur="blurField(v.id,v.sort,'sort')" :id="'sort_'+v.id" v-model="v.sort" />
						</td>
						<td>
							<div class="flex">
								<i v-if="hasSon" class="float_l ico_sh" :data-id="v.id" @click="toggleChild(v.id,$event)"><img :src="getSiteName + '/images/arrow_right.png'" /></i>
								<input type="text" name="sort" v-model="v.name" class="form-control v_name noborder" @blur="blurField(v.id,v.name,'name')" />
							</div>
						</td>
						<td>
							<input type="text" name="url" class="form-control v_name noborder"@blur="blurField(v.id,v.url,'url')" v-model="v.url" />
						</td>
						<td>
							<el-switch v-model="v.can_show" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="blurField(v.id,v.can_show,'can_show')"></el-switch>
						</td>
						<td>
							<div class="btn btn-primary" @click="uploadPic2(v.id,v.cover2)">{{ v.cover2 ? '已上传轮播图' :'上传轮播图' }}</div>
							<div v-if="canupload" class="btn btn-primary" @click="uploadPic(v.id,v.cover)">{{ v.cover ? '已上传图片' :'上传图片' }}</div>
							<div class="btn btn-danger del_fc" :data-id="v.id" :data-url="actionUrl" @click="delfc(getSiteName+actionUrl,v.id,key)">删除</div>
						</td>
					</tr>
					<template v-if="v.zclass">
						<template v-for="(son,key2) in v.zclass">
							<tr :class="'zclass_'+v.id" :id="'tr_'+son.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
								<td>
									<input type="text" name="sort" class="form-control input_w50 text_center v_name noborder" @blur="blurField(son.id,son.sort,'sort')" v-model="son.sort" />
								</td>
								<td class="ope01 seclist" style="padding-left:50px;">
									<input type="text" name="sort" class="form-control v_name noborder" @blur="blurField(son.id,son.name,'name')" v-model="son.name" />
								</td>
								<td class="ope01 seclist" style="padding-left:50px;">
									<input type="text" name="url" class="form-control v_name noborder" @blur="blurField(son.id,son.url,'url')" v-model="son.url" />
								</td>
								<td>
									<el-switch v-model="son.can_show" on-text="" off-text="" :active-value="1"
										:inactive-value="0" @change="blurField(son.id,son.can_show,'can_show')">
									</el-switch>
								</td>
								<td>
									<div class="btn btn-primary" @click="uploadPic2(son.id,son.cover2)">{{ son.cover2 ? '已上传轮播图' :'上传轮播图' }}</div>
									<div v-if="canupload" class="btn btn-primary" @click="uploadPic(son.id,son.cover)">{{ son.cover ? '已上传图片' :'上传图片' }}</div>
									<div class="btn btn-default del_zc" :data-id="son.id" :data-url="actionUrl" @click="delzc(getSiteName+actionUrl,son.id,key,key2)">删除子类别</div>
								</td>
							</tr>
						</template>
						<!-- 添加子类别 -->
						<tr :class="' zclass_'+v.id" :id="'add_btn_'+v.id" :style="fid ?fid==v.id && show ? '':'display:none':'display:none'">
							<td></td>
							<td colspan="4" class="ope01 seclist" style="padding-left:50px;">
								<div @click="addZc(v.id)" class="btn btn-primary" :data-id="v.id"><span class="glyphicon glyphicon-plus-sign"></span> 新增子类别</div>
							</td>
						</tr>
						<tr :id="type+'add_form_'+v.id" style="display:none">
							<td>
								<input type="text" v-model="sort" name="sort"
									class="form-control input_w50 text_center" />
							</td>
							<td class="ope01 seclist" style="padding-left:50px;">
								<input type="text" v-model="name" name="name" class="form-control" datatype="*" />
							</td>
							<td class="ope01 seclist" style="padding-left:50px;">
								<input type="text" v-model="url" name="url" class="form-control" datatype="*" />
							</td>
							<td></td>
							<td>
								<div class="btn btn-primary" @click="addClass(v.id)">提交</div>
								<div class="btn btn-danger" :data-id="v.id" @click="cancelAdd(v.id)">取消</div>
							</td>
						</tr>
					</template>
				</template>
				<tr :id="type+'add_btn_'">
					<td></td>
					<td colspan="4" class="ope01 seclist" style="padding-left:50px;"><a href="javascript:;"
							@click="addZc('')" class="btn btn-primary" data-id=""><span
								class="glyphicon glyphicon-plus-sign"></span> 新增</a>
					</td>
				</tr>
				<tr :id="type+'add_form_'" style="display:none">
					<td>
						<input type="hidden" name="fid" value="0" />
						<input type="text" name="sort" class="form-control input_w50 text_center" v-model="sort" />
					</td>
					<td class="ope01 seclist" style="padding-left:50px;">
						<input type="text" name="name" class="form-control" datatype="*" v-model="name" />
					</td>
					<td class="ope01 seclist" style="padding-left:50px;">
						<input type="text" name="url" class="form-control" datatype="*" v-model="url" />
					</td>
					<td></td>
					<td>
						<div class="btn btn-primary" @click="addClass(0)">提交</div>
						<div class="btn btn-danger" @click="cancelAdd('')">取消</div>
					</td>
				</tr>
			</tbody> <!-- 如果不是职称就显示这个内容 -->
		</table>
		<!-- 上传图片 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
			<div class="el-form-item">
				<label class="el-form-item__label" style="width:100px">上传图片</label>
				<my-upload upurl="product" :uploadLength="1" :fileList="fileList" :sizearr="[120]" opentype="ablank">
				</my-upload>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="uploadsubmit">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 上传图片结束 -->

		<!-- 上传轮播图 -->
		<el-dialog title="提示" :visible.sync="dialogVisible2" size="tiny" :before-close="handleClose2">
			<div v-show="listDialog">
			    <!-- 列表 -->
			    <table class="table table-hover">
			        <tr>
			            <th width="100">名称</th>
			
			            <th width="30">url</th>
			            <th width="30">排序</th>
			            <th width="25">时间</th>
			            <th width="70" class="text-center">操作</th>
			        </tr>
			        <tr v-for="(item,key) in coverLists" v-if="coverLists.length>0" style="height:40px">
			            <td>{{ item.name }}</td>
			            <td>{{ item.url }}</td>
			            <td>{{ item.sort }}</td>
			            <td>{{ item.created_at }}</td>
			            <td>
			                <el-button size="small" @click="editInfo(item)">编辑</el-button>
			                <el-button type="danger" size="small" @click="delInfo(key,item.id)">删除</el-button>
			            </td>
			        </tr>
			    </table>
			    <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="addCover">添 加</el-button>
			    <el-button @click="handleClose">取 消</el-button>
			  </span>
			</div>
			
			<div v-show="addEditDialog">
			    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:300px;">
			        <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空'},]">
			            <el-input v-model="ruleForm.name"></el-input>
			        </el-form-item>
			        <el-form-item label="排序" prop="sort" :rules="[{ required: true, message: '库存不能为空'},]">
			            <el-input v-model="ruleForm.sort"></el-input>
			        </el-form-item>
			        <el-form-item label="连接url" prop="url" :rules="[{ required: true, message: '售价不能为空'},]">
			            <el-input v-model="ruleForm.url"></el-input>
			        </el-form-item>
			        <div class="el-form-item">
			            <label class="el-form-item__label" style="width:100px">上传图片</label>
			            <my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.cover" sizearr="120"></my-upload>
			        </div>
			    </el-form>
			    <span slot="footer" class="dialog-footer pull-right">
			        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			        <el-button @click="addEditDialog=false;listDialog=true">取 消</el-button>
			    </span>
			</div>
			
			
			
			<!-- <div class="el-form-item">
				<label class="el-form-item__label" style="width:100px">上传轮播图片</label>
				<my-upload upurl="product" :uploadLength="5" :fileList="fileList" :sizearr="[120]" opentype="ablank">
				</my-upload>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="uploadsubmit2">确 定</el-button>
			</span> -->
		</el-dialog>
		<!-- 上传多图片结束 -->
	</div>
</template>
<style type="text/css">
	textarea,
	input[type="text"],
	input[type="password"],
	input[type="datetime"],
	input[type="datetime-local"],
	input[type="date"],
	input[type="month"],
	input[type="time"],
	input[type="week"],
	input[type="number"],
	input[type="email"],
	input[type="url"],
	input[type="search"],
	input[type="tel"],
	input[type="color"] {border-radius: 0 !important;color: #858585;padding: 5px 4px;line-height: 1.2;font-size: 14px;font-family: inherit;-webkit-box-shadow: none !important;box-shadow: none !important;-webkit-transition-duration: .1s;transition-duration: .1s;
	}
	.table thead tr.ta_th_tr {background: #EEF1F9;border: 0;height: 50px;}
	.btn-primary{background-color: #409EFF;border-color: #409EFF;}
</style>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				name: "",
				sort: 0,
				url: '',
				jiaoyan_score: 0,
				keyan_score: 0,
				ruleForm:{cover:[]},
				getSiteName: this.getSiteName(),
				fid: '',
				show: false,
				uploadId: 0,
				coverLists:[],
				listDialog:true,
				addEditDialog:false,
				dialogVisible: false,
				dialogVisible2: false,
				fileList: [],
			}
		},
		updated: function() {

		},
		mounted: function() {
			setTimeout(this.nameFocus, 1500);
		},
		props: ['actionUrl', 'lists', 'canupload', 'type', 'actionPrefix', 'hasSon'], //父类的数据
		methods: {
			delInfo: function(index, id) {
			    this.getConfirm("此操作将永久删除该文件, 是否继续?",msg=>{
			       this.postAjax("/ajax/mydel",{id:id,tablename:"category_covers"},msg=>{
			          this.coverLists.splice(index,1);
			       });
			    });
			},
			editInfo: function(item) {
			    this.listDialog = false;
			    this.addEditDialog = true;
			    this.ruleForm = item;
			    this.ruleForm.cover = this.splitCover(item.cover, "product");
			
			    this.listDialog = false;
			    this.addEditDialog = true;
			    this.formAction = "/admin/categoryCover/edit?id=" + item.id;
			},
			submitForm(formName) {
			    this.$refs[formName].validate((valid) => {
			        if (valid) {
			            this.ruleForm.category_id = this.uploadId;
			            this.postAjax(this.formAction, this.ruleForm, msg=> {
			                if (msg.data.status == 2) {
			                    this.coverLists = msg.data.lists.data;
			                    this.listDialog = true;
			                    this.addEditDialog = false;
			                }
			            })
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
			    });
			},
			addCover(){
				this.ruleForm = { sort: 0,cover:[] },
				this.listDialog = false;
				this.addEditDialog = true;
				this.formAction = "/admin/categoryCover/create";
			},
			addClass: function(pid) {
				var url = this.actionUrl + "/class";
				var that = this;
				this.postAjax(url, {
					_token: $("#token").val(),
					url: this.url,
					name: this.name,
					sort: this.sort,
					fid: pid,
					type: this.type,
					jiaoyan_score: this.jiaoyan_score,
					keyan_score: this.keyan_score
				}, function(msg) {
					if (msg.data.status == 2) {
						that.lists = msg.data.lists;
						$("#" + that.type + "add_form_" + pid).hide();
						$("#" + that.type + "add_btn_" + pid).show();
						$('#' + that.type + 'add_form_').hide();
						$("#" + that.type + "add_btn_").show();
						/*$(".add_zc").show();*/
						that.name = "";
						that.sort = 0;
						that.fid = pid;
						that.show = true;
					}
				});
			},

			nameFocus: function() {
				//alert($(".v_name").length);
				$(".v_name").focus(function() {
					$(this).removeClass('noborder');
				});
			},
			addZc: function(id) {
				$("#" + this.type + "add_btn_" + id).hide();
				$("#" + this.type + "add_form_" + id).show();
			},
			cancelAdd: function(id) {
				if (!id) {
					$("#" + this.type + "add_btn_" + id).show();
					$("#" + this.type + "add_form_" + id).hide();
				} else {

					$("#" + this.type + "add_btn_" + id).show();
					$("#" + this.type + "add_form_" + id).hide();
				}

			},
			delzc: function(url, id, parentKey, childrenKey) {
				let that = this;
				if (!confirm("确认要删除吗？")) {
					return false;
				} else {
					var url = this.actionUrl + "/ajaxclass";
					var dataid = id;
					this.postAjax(url, {
						type: 'del_zc',
						v: dataid
					}, msg => {
						that.lists[parentKey].zclass.splice(childrenKey, 1);
					});

				}
			},
			/*删除子类结束*/
			delfc: function(url, id, key) {
				/*删除父类开始*/
				let that = this;
				if (!confirm("确认要删除吗？")) {
					return false;
				} else {
					var dataid = id;
					var url = this.actionUrl + "/ajaxclass";
					this.postAjax(url, {
						type: 'del_fc',
						v: dataid
					}, msg => {
						that.lists.splice(key, 1);
					});
				}
			},
			/*删除父类结束*/
			blurField: function(id, name, type) {
				var dataid = id;
				var datat = name;
				var datatype = type;
				var value = name;
				var url = this.actionUrl + "/ajaxclass";
				this.postAjax(url, {
					type: 'update_class',
					t: datatype,
					id: id,
					v: value
				}, msg => {

				}, "notloading");
				$("#tr_" + id).find("input").addClass('noborder');
			},
			toggleChild: function(fid, event) {
				$(".zclass_" + fid).toggle();
				let obj = event.currentTarget;
				if ($(".zclass_" + fid).is(':hidden')) {
					$(obj).find('img').attr('src', this.getSiteName + '/images/arrow_right.png');
				} else {
					$(obj).find('img').attr('src', this.getSiteName + '/images/arrow_down.png');
				}
			},
			handleClose(done) {
				this.dialogVisible = false;
			},
			handleClose2(done) {
				this.dialogVisible2 = false;
			},
			uploadPic(id, cover) {

				this.dialogVisible = true;
				this.uploadId = id;
				if (cover) this.fileList = this.splitCover(cover, "product");
				else this.fileList = [];
			},
			uploadPic2(id, cover) {
				
				this.postAjax("/admin/categoryCover/lists",{category_id:id}).then(msg=>{
					this.dialogVisible2 = true;
					this.uploadId = id;
					this.coverLists = msg.data.lists.data;
					// if (cover) this.fileList = this.splitCover(cover, "product");
					// else this.fileList = [];
				});
			
			},
			uploadsubmit() {
				var cover = this.implodeCover(this.fileList);
				this.postAjax(this.actionUrl + "/uploadpic", {
					cover: cover,
					id: this.uploadId
				}, msg => {
					this.dialogVisible = false;
					this.lists = msg.data.lists;
				})
			},
			uploadsubmit2() {
				var cover = this.implodeCover(this.fileList);
				this.postAjax(this.actionUrl + "/uploadpic", {
					cover2: cover,
					id: this.uploadId
				}, msg => {
					this.dialogVisible2 = false;
					this.lists = msg.data.lists;
				})
			},

		},

		components: {

		}


	}
</script>
