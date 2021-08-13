//判断那个端登陆
let siteName = 'https://bride.doxinsoft.com';
uni.setStorageSync('siteName', siteName);
wx.setStorageSync('site_name', 'bride');
let site_name = uni.getStorageSync('siteName');
let gotoWechat = uni.getStorageSync("gotoWechat179");
let userInfo = uni.getStorageSync('userInfo');
if (getOptions('openid') && getOptions('new2') && gotoWechat) {
	let userInfo = {
		nickName: getOptions('nickname'),
		avatarUrl: getOptions('headimgurl'),
		unionid: getOptions('unionid'),
		openid: getOptions('openid'),
	}
	uni.setStorageSync("userInfo", userInfo);
	uni.setStorageSync("openid", getOptions('openid'));
	uni.setStorageSync("unionid", getOptions('unionid'));
	uni.setStorageSync("source", 'wap');
}
if (getCookie('openid') && gotoWechat) {
	let userInfo = {
		nickName: getOptions('nickname'),
		avatarUrl: getCookie('headimgurl'),
		openid: getCookie('openid'),
	}
	uni.setStorageSync("userInfo", userInfo);
	uni.setStorageSync("openid", getCookie('openid'));
	uni.setStorageSync("source", 'wap');
}
if (!gotoWechat) {

	var args = new Object();
	var url1 = window.location.href;
	var url1 = url1.substr(url1.indexOf("?") + 1);

	var pairs = url1.split("&"); //在逗号处断开
	for (var i = 0; i < pairs.length; i++) {
		let pos = pairs[i].indexOf('='); //查找name=value
		if (pos == -1) { //如果没有找到就跳过
			continue;
		}
		var argname = pairs[i].substring(0, pos); //提取name
		var value = pairs[i].substring(pos + 1); //提取value
		if (argname != 'openid' && argname != "nickname" && argname != "source" && argname != "headimgurl") {
			args[argname] = unescape(value); //存为属性
		}

	}
	let newUrl = window.location.href.substr(0, window.location.href.indexOf("?") + 1);
	let pages = newUrl.substr(newUrl.indexOf('pages') - 1);
	for (let key1 in args) {
		pages += key1 + '=' + args[key1] + '&';
	}
	//let source = siteName + '/h5/';
	let source = window.location.href.split("#")[0];
	var url = siteName + '/openid?page=' + pages + '&source=' + source;
	//alert(url);
	let newUrl_ = url.replace("/?from=singlemessage#", "");
	console.log(newUrl_);
	uni.setStorageSync("gotoWechat179", 1);
	window.location.href = newUrl_;
}

function getOptions(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var url = window.location.href;
	var r = url.substr(url.indexOf("?") + 1).match(reg);
	if (name == 'audit' && r != null) return decodeURI(r[2]) == 0 ? null : decodeURI(r[2]);;
	if (r != null) return decodeURI(r[2]);
	return null;
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			var c_start = c_start + c_name.length + 1
			var c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return "";
}
