//判断那个端登陆
let siteName = 'https://sd.doxinsoft.com';
// #ifdef H5

uni.setStorageSync("openid", "okkED5KDsG6XGBq-6Xq4yaQQbFCA")
userInfo = {"nickName":"东信科技，梅","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/cgvO9iaoibVQPlExLxvqtrxbQgHrxs4SkywmWE3E0HicSFFtdwT3nUvzCBD7VXb1xSLNHWmJbT2s6NMVZgdlSQtTA/132","gender":1}
uni.setStorageSync("userInfo", userInfo)
uni.setStorageSync("unionid", "o__W-56gZWtLLKndcdienGhBztA4")
// #endif
uni.setStorageSync('source', 'wechatapp');
uni.login({
	provider: 'weixin',
	success: function(res) {

		console.log(JSON.stringify(res));
		if (res.code) {
			console.log('0013');
			let url = uni.getStorageSync('siteName') + '/getOpenOpenId?site_name=456&version=new&code=' + res.code;
			uni.request({
				url: url,
				data: {},
				header: {
					//'custom-header': 'hello' //自定义请求头信息
				},
				success: (msg) => {
					uni.setStorageSync('openid', msg.data.data.openid);
					//uni.setStorageSync('openid', 'ohOO94uhpRx-Un1DdDuSTpof_vpQ');
					uni.setStorageSync('session_key', msg.data.data.session_key);
					if ("unionid" in msg.data.data) {
						console.log(15471);
						uni.setStorageSync('unionid', msg.data.data.unionid);
					}

				}
			});
		} else {
			console.log('456');
				
			uni.request({
				url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + res.authResult.access_token + '&openid=' +
					res.authResult.openid,
				data: {},
				header: {
					//'custom-header': 'hello' //自定义请求头信息
				},
				success: (msg) => {
					uni.setStorageSync('openid', res.authResult.openid);
					let userInfo = {
						nickName: msg.data.nickname,
						unionid: res.authResult.unionid,
						avatarUrl: msg.data.headimgurl,
						openid: msg.data.openid,
					}
					console.log(JSON.stringify(userInfo));
					uni.setStorageSync('userInfo', userInfo);
					uni.setStorageSync('unionid', res.authResult.unionid);
					uni.setStorageSync('source', 'Android');
				}
			});
			//console.log(res.authResult.openid);
		}

	},
	fail: function(res) {
		console.log(JSON.stringify(res));
	}
});
