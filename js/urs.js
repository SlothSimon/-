var URS;
if (!URS) {
	URS = {};
}(function() {
	var a = function(errorcode) {
		var c = errorcode;
		if (!c) {
			Explorer.Notify.system("../img/error.png", "登录失败", "网络异常", 3000);
		} else {
			if ("412" === c) {
				Explorer.Notify.system("../img/error.png", "登录失败", "密码错误次数过多，请1小时后再重试", 3000);
			} else {
				if ("420" === c) {
					Explorer.Notify.system("../img/error.png", "登录失败", "帐号不存在", 3000);
				} else {
					if ("422" === c) {
						Explorer.Notify.system("../img/error.png", "登录失败", "帐号被冻结", 3000);
					} else {
						if ("460" === c) {
							Explorer.Notify.system("../img/error.png", "登录失败", "密码错误", 3000);
						} else {
							if ("401" === c) {
								Explorer.Notify.system("../img/error.png", "登录失败", "程序异常，请联系作者", 3000);
							} else {
								Explorer.Notify.system("../img/error.png", "登录失败", "服务器异常", 3000);
							}
						}
					}
				}
			}
		}
	};
	URS.getDefaultOnFail = function() {
		return a;
	};
	URS.md5HexPwd = function(c) {
		if (!c) {
			return "";
		}
		c = c.replace("\\", "\\\\");
		c = c.replace("'", "\\'");
		return hex_md5(c);
	};
	URS.login = function(h, n, d) {
		if (!h) {
			throw "username is undefined!";
		}
		if (!n) {
			throw "password is undefined!";
		}
		var e = d.async;
		var l = d.timeout;
		var k = d.onSuc;
		var c = d.onFail;
		var m = "mobilemail";
		var j = 1;
		var p = 0;
		var i = 0;
		if (typeof(e) !== "boolean") {
			e = true;
		}
		if (typeof(l) !== "number") {
			l = 5000;
		}
		var f = "http://simonproject.sinaapp.com/login.php";
		var o = $.ajax({
			url: f,
			async: e,
			cache: false,
			timeout: l,
			type: "POST",
			dataType: "json",
			data: {
				subjectID: h,
				password: n,
			},
			success: function(v, t, x) {
				var s = undefined;
				// if (x.readyState === 4 && x.status === 200) {
					// var r = v.split(/\r\n|\r|\n/);
				if (v && typeof(v) === "object"){
					s = v["status"];
					if ("success" === s) {
						if (k && typeof(k) === "function") {
							k(h, v["group"], v["users"]);
						}
						return;
					}
				}
				// }
				if (c && typeof(c) === "function") {
					c(s);
				} else {
					a(s);
				}
			},
			error: function(s, q, r) {
				if (c && typeof(c) === "function") {
					c();
				} else {
					a();
				}
			}
		});
		return o;
	};
})();