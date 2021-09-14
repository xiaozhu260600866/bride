<template>
	<section>
		<div class="login-header">
			<div class="w1360 clear">
				<div class="login-logo float_l"><img src="https://website.doxinsoft.com/images/admin/logo02.jpg"></div>
				<!-- <div class="service float_r">技术服务：0750-3229010</div> -->
			</div>
		</div>
		<div id="login-content" style="background-image: url(https://website.doxinsoft.com/images/admin/login_bg02.jpg);background-position: center center;background-repeat: no-repeat;">
			<div class="w1360 clear widthLimit">
				<div class="loginForm" style="margin-left: 30px">
					<div class="control-box">
						<div class="loginTypeDiv"><span>查询状态</span></div>
						<div class="control-list">
							<div class="control-form">
								<input type="text" class="ui-input" placeholder="请输入域名前缀" v-model="ruleform.site_name3">
							</div>
						</div>
						<div class="buttonArea">
							<div class="control-form" @click="submitStatus">
								<button type="submit" id="loginBtn" class="formSubmit" tabIndex="4">查询</button>
							</div>
							
						</div>
					</div>
				</div>
				<div class="loginForm" style="margin-left: 30px">
					<div class="control-box">
						<div class="loginTypeDiv"><span>发布代码</span></div>
						<div class="control-list">
							<div class="control-form">
								<input type="text" class="ui-input" placeholder="请输入域名前缀" v-model="ruleform.site_name">
							</div>
						</div>
						<div class="buttonArea">
							<div class="control-form" @click="submit">
								<button type="submit" id="loginBtn" class="formSubmit" tabIndex="4">发布代码</button>
							</div>
							
						</div>
					</div>
				</div>
				<div class="loginForm">
					<div class="control-box">
						<div class="loginTypeDiv"><span>上传代码</span></div>
						<div class="control-list">
							<div class="control-form">
								<input type="text" class="ui-input" placeholder="请输入域名前缀" v-model="ruleform.site_name2">
							</div>
						</div>
						<div class="buttonArea">
							<div class="control-form" @click="submitUpload">
								<button type="submit" id="loginBtn" class="formSubmit" tabIndex="4">上传代码</button>
							</div>
							
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="login-footer">
			<p><span>专注移动应用开发，让商业变得更智慧</span></p>
			<p><a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备14075094号-1</a></p>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			ruleform: { username: '', password: '' },
			vaildate: {
				username: { name: '帐号', vaild: 'require' },
				password: { name: '密码', vaild: 'require' },
			}
		}
	},
	mounted() {
		//console.log(this.getUser());
		//$("#app").css({ background: 'url(https://hjhp-new.doxinsoft.com/images/admin/login_201710/bg-3.jpg) no-repeat scroll top left transparent' })
	},
	methods: {
		submit() {
			window.open("https://boss.doxinsoft.com/publishCode/submit?site_name="+this.ruleform.site_name);
		},
		submitUpload(){
			
			window.open("https://boss.doxinsoft.com/publishCode/uploadandsubmit?site_name="+this.ruleform.site_name2);
		},
		submitStatus(){
			window.open("https://boss.doxinsoft.com/publishCode/checkcodestatus?site_name="+this.ruleform.site_name3);
		}
	}
}

</script>
<style type="text/css" scoped="">
*{margin: 0;padding: 0;box-sizing: border-box;font-family: '微软雅黑';}
html,body{height: 100%;overflow: hidden;}

.clear:after{content: "";display: block;clear: both;}
.float_l{float: left;}
.float_r{float: right;}

.w1360{width: 1360px;margin: 0 auto;}


.login-header{height: 100px;line-height: 100px;background: #fff;position: fixed;width: 100%;top: 0;z-index: 1000;}
.login-header .login-logo{height: 80px;margin-top: 10px;}
.login-header .login-logo img{height: 80px;display: flex;}
.login-header .conpany-name{font-size: 22px;color: #fff;}
.login-header .service{font-size: 16px;}


#login-content{position: relative;height: 100%;min-height: 800px;padding-top: 100px;}
#login-content .widthLimit{position: relative;}
#login-content .login_ad{float: left;max-width: 800px;max-height: 515px;margin-top: 7%;}


.loginForm{width: 420px;display: inline-block;float: right;margin-top: 7%;background-color: #fff;color: #C1C1C1;font-size: 14px;border-radius: 0;box-shadow:0 0 18px rgba(129,132,149,1);padding-bottom: 50px;}
.loginForm .loginTypeDiv{margin: 35px 10% 0;text-align: center;}
.loginForm .loginTypeDiv span{display: inline-block;width: 94%;height: 44px;line-height: 44px;font-size: 16px;color: #333;border-bottom: 1px #e4e4ee solid;text-align: left;}
.loginForm .control-list{margin: auto auto 45px;width: 320px;padding-top: 30px;}
.loginForm .control-form{position: relative;margin-bottom: 10px;}
.loginForm .control-form .ui-input{width: 320px;height: 48px;padding:10px 20px;line-height: 28px;border:1px solid #d5d5d5;border-radius: 2px;}
.loginForm .buttonArea{margin: auto 50px;width: 320px;}
.loginForm .buttonArea .checkArea{margin-top: 12px;}
.loginForm .buttonArea span{font-size: 12px;color: #333;}
.loginForm .control-form .formSubmit{background: #e41f2b;height: 50px;line-height: 50px;border-radius: 3px;width: 100%;border: 0;font-size: large;color: #fff;}


.login-footer{background: #fff;height: 180px;text-align: center;position: fixed;bottom: 0;width: 100%;}
.login-footer p{line-height: 24px;color: #666;font-size: 14px;margin-bottom: 0;}
.login-footer p span{padding: 0 10px;}
.login-footer p a{color: #666;}

@media screen and (max-width: 1700px) and (min-width: 800px){
	.login-header{height: 80px;line-height: 80px;}
	.login-header .login-logo,.login-header .login-logo img{height: 60px;}
	.login-footer{height: 100px;}
	#login-content{padding-top: 80px;min-height: 760px;}
}


input[type="checkbox"]{
	-webkit-appearance: none;
	vertical-align:middle;
	margin-top:0;
	background:#fff;
	border:#999 solid 1px;
	border-radius: 3px;
	min-height: 14px;
	min-width: 14px;
}
input[type="checkbox"]:checked {
	background: #3190e8;
}
input[type=checkbox]:checked::after{
	content: '';
	top: 3px;
	left: 3px;
	position: absolute;
	background: transparent;
	border: #fff solid 2px;
	border-top: none;
	border-right: none;
	height: 6px;
	width: 10px;
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg); 
	transform: rotate(-45deg);
}

</style>
