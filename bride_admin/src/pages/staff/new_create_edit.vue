<template>
	<el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" width="800px" :top="top" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<div class="group-item flex">
				<el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '姓名不能为空'},]">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="mobile" :rules="[{ required: true, message: '电话不能为空'}]">
					<el-input v-model="ruleForm.mobile"></el-input>
				</el-form-item>
			</div>
			<div class="group-item flex">
				<el-form-item label="帐号" prop="username" :rules="[{ required: true, message: '姓名不能为空'},]">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" :rules="[!ruleForm.id ? { required: true, message: '密码不能为空'} : '']">
					<el-input v-model="ruleForm.password" style="margin-right: 5px" type="password" :placeholder="!ruleForm.id ? '请填写密码' : '如为空则默认旧密码' "></el-input>
				</el-form-item>
			</div>
         <!--   <el-form-item label="角色"  :rules="[{ required: true, message: '角色不能为空'}]">
            	<el-select v-model="ruleForm.role_id" placeholder="请选择角色">
            		<el-option :label="v.name" :value="v.id" v-for="v in roleArr"></el-option>
            	</el-select>
            </el-form-item> -->
			<el-form-item label="水店" >
				<el-select v-model="ruleForm.water_userid" placeholder="请选择水店">
					<el-option :label="v.label" :value="v.value" v-for="v in waterShopArr"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="子帐号" >
				<el-radio class="radio" v-model="ruleForm.is_children" :label="0">否</el-radio>
				<el-radio class="radio" v-model="ruleForm.is_children" :label="1">是</el-radio>
			</el-form-item>
			

			<div class="group-item flex">

			<!-- 	<el-form-item label="性别">
					<el-select v-model="gender" placeholder="请选择性别">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="2"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="等级" v-if="ruleForm.is_children == 0">
					<el-select v-model="ruleForm.staff_lev" placeholder="请选择等级">
						<el-option label="一级" :value="1"></el-option>
						<el-option label="二级" :value="2"></el-option>
						<el-option label="三级" :value="3"></el-option>
					</el-select>
				</el-form-item>
			</div>
            <div class="group-item flex">
            <el-form-item label="城市" >
              <el-tree
                :data="city"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                :props="ruleForm.city"  :default-checked-keys="ruleForm.cityKey" v-if="city.length">
                    </el-tree>
                 <el-button @click="upgradeCity" v-else>一键点击更新城市</el-button>
            </el-form-item>
            </div>
		<!-- 	<div class="group-item flex">
				<el-form-item label="部门" prop="department" :rules="[{ required: true, message: '部门不能为空'},]">
					<el-cascader expand-trigger="hover" :options="departmentArr" v-model="ruleForm.department">
					</el-cascader>
				</el-form-item>

			</div>
			<div class="group-item flex">
				<el-form-item label="微信号" prop="wechat" :rules="[{ required: true, message: '微信号不能为空'},]">
					<el-input v-model="ruleForm.wechat"></el-input>
				</el-form-item>
			</div> -->

		<!-- 	<my-cropUpload v-model="ruleForm.pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'card',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：640*640" label="上传LOGO"></my-cropUpload> -->
			<div class="clearfix"></div>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
        <chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
	</el-dialog>
</template>
<script>
    import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
	export default {
	props: ['top'],
    components: {
        chooseLocation
    },
	data() {
		return {
			ruleForm: {username:''},
			formAction: '',
			see:false,
			dialogFormVisible: false,
			merchantLists: [],
            roleArr:[],
			waterShopArr:[],
			inputValue:'',
			inputVisible:'',
            area:[],
			status: 0,
            city:[],
			gender: 1,
			demoTags: ['诚信至上', '广交朋友', '原则性强','豪爽耿直','互联网创业者','有俩把刷子','小奶猫'],
			tags:[],
			departmentArr: [],
			industryArr: [{
					label: '金融业',
					value: '金融业',
					children: [
						{ label: '基金/证券/期货/投资', value: '基金/证券/期货/投资' },
						{ label: '银行', value: '银行' },
						{ label: '保险', value: '保险' },
						{ label: '信托/担保/拍卖/典当', value: '信托/担保/拍卖/典当' },
					]
				},
				{
					label: 'IT/通信/互联网',
					value: 'IT/通信/互联网',
					children: [
						{ label: '互联网/电子商务', value: '互联网/电子商务' },
						{ label: '计算机服务', value: '计算机服务' },
						{ label: '计算机软件', value: '计算机软件' },
						{ label: '计算机硬件', value: '计算机硬件' },
					]
				},


			],
		};
	},
	methods:{
        upgradeCity(){
          if(sessionStorage.getItem("citys")){
                this.city = JSON.parse(sessionStorage.getItem("citys"));
          }else{
              this.postAjax("/admin/user/updateCity").then(msg => {
                  this.city = msg.data.citys;
                  sessionStorage.setItem("citys",JSON.stringify(this.city));
              })
          }
        },
        chooseLocation() {
        	this.$refs.chooseLocation.ajax();
        },
        locationCallBack(res) {
        	if (res.latlng) {
        		this.$refs.chooseLocation.handleClose();
        		this.$set(this.ruleForm,"address",res.poiaddress);

        		this.ruleForm.location_x = res.latlng.lat;
        		this.ruleForm.location_y = res.latlng.lng;
        	}
        },
	  showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
	  appendTags(v){
			for (let i = 0; i < this.tags.length; i++) {
				  if(this.tags[i] == v){
				  	this.getError("请不要添加重复");
				  	return false;
				  }
			}
			this.tags.push(v);
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
                    if(this.$refs.tree){
                        this.ruleForm.city = this.$refs.tree.getCheckedNodes();
                        this.ruleForm.cityKey = this.$refs.tree.getCheckedKeys();
                    }
					this.ruleForm.status = this.status;
					this.ruleForm.gender = this.gender;
					this.ruleForm.see = this.see;
					this.ruleForm.tags = this.tags;
					this.postAjax(this.formAction, this.ruleForm, msg => {
						if (msg.data.status == 2) {
							this.dialogFormVisible = false;
							this.$parent.ajax();
						}

					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},

		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		ajax: function(params, merchantLists, departmentArr,area,roleArr,waterShops) {
			
			this.$nextTick(()=>{
                this.area = area;
				this.waterShopArr = waterShops;
				this.merchantLists = merchantLists;
				this.departmentArr = departmentArr;
                this.roleArr = roleArr;
				this.dialogFormVisible = true;
				if (params) {
					this.formAction = '/admin/staff/edit?id=' + params.id;

					//this.ruleForm = { role_id: '', sort: 0, status: 0, gender: '' };
					this.ruleForm = params.userInfo;
					this.$set(this.ruleForm,"water_userid","")
					this.$set(this.ruleForm,"is_children","")
                    this.ruleForm.city = params.city;
					this.ruleForm.water_userid = params.water_userid;
					
					this.ruleForm.is_children = params.is_children;
                    this.ruleForm.cityKey = params.cityKey;
					this.ruleForm.staff_lev = params.staff_lev;
					//alert(this.ruleForm.staff_lev)
					this.$set(this.ruleForm,"username",params.username);
					this.$set(this.ruleForm,"status",params.status);
					this.$set(this.ruleForm,"role_id",params.role_id);
					this.status = this.ruleForm.status == 2 ? 0 : 1;
					this.gender = parseInt(this.ruleForm.sex);
					this.see = this.ruleForm.see ? true :false;
				} else {
					this.ruleForm = { role_id: '', sort: 0, status: 0, gender: '',water_userid:'' };
					this.formAction = '/admin/staff/create';
				}
				this.ruleForm.pic = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "staff") : [];;
                 console.log(this.ruleForm.city)
                this.ruleForm.city = this.ruleForm.city ? this.ruleForm.city.split(',') :[],
                this.ruleForm.cityKey = this.ruleForm.cityKey? this.ruleForm.cityKey.split(','):[]
				//this.ruleForm.industry = this.ruleForm.industry ? this.ruleForm.industry.split(",") : [];
				this.ruleForm.department = this.ruleForm.getDepartmentArr;

				this.$set(this.ruleForm,"mobile",this.ruleForm.phone);

				//this.ruleForm.mobile = this.ruleForm.phone;
				this.ruleForm.gender = this.ruleForm.sex;
				console.log(this.ruleForm);
			});

		},
		handleClose() {
			this.dialogFormVisible = false;
		}
	},
}

</script>
<style type="text/css" scoped="">
.el-input,
.el-cascader,
.el-select {
	width: 210px;
}

.el-upload-list--picture-card .el-upload-list__item {
	width: 100px;
	height: 100px;
}

.styleImg {
	width: 100px;
}

.v-link .el-input {
	width: 100%;
}

</style>
