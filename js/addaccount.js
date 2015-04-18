var tip = "";
var flag = false;
var width;
var height;
var cookie = "";

if (localStorage.subjectID){
	self.location = "info.html";
}

function _$init() {
	__initDOM();
	__initEventListener();
	$(".account").trigger("focus");
}

function __initDOM() {
	width = $(".g-doc").width();
	height = $(".g-doc").height();
	window.resizeTo(width, height);
}

function __initEventListener() {
	$(document).ready(function() {
		$(".account").bind("focus", __onFocusAccount).bind("blur", __onBlurAccount);
		$(".password").bind("focus", __onFocusPassword).bind("blur", __onBlurPassword);
		$("#cancel").bind("click", __onClickCancel);
		$(".close").bind("click", __onClickCancel);
		$("#addaccount").bind("click", __onAddAccount);
	});
}

function __onFocusAccount() {
	$("#saccount").hide();
	__hideError();
}

function __onBlurAccount() {
	if ($.trim($(".account").val()) === "") {
		$("#saccount").show();
	} else {
		$("#saccount").hide();
	}
}

function __onFocusPassword() {
	$("#spassword").hide();
	__hideError();
}

function __onBlurPassword() {
	if ($(".password").val() === "") {
		$("#spassword").show();
	} else {
		$("#spassword").hide();
	}
}

function __onClickCancel() {
	window.close();
}

function __onAddAccount() {
	var g = $.trim($(".account").val()).toLowerCase();
	var c = $.trim($(".password").val());
	if (g === "") {
		tip = "请输入帐号";
		__showError(tip);
		return;
	}
	var e = new RegExp("^[0-9]+");
	if (!e.test(g)) {
		tip = "被试ID只能输入数字";
		__showError(tip);
		return;
	}
	if (!c) {
		tip = "请输入密码";
		__showError(tip);
		return;
	}
	URS.login(g, c, {
		async: false,
		onSuc: __loginSunCB,
		onFail: __loginFailCB
	});
	if (flag) {
		self.location = "info.html";		
	} else {
		__showError(tip);
	}
}

function __loginSunCB(subjectID, group, users) {
	flag = true;
	// cookie = a;
	localStorage.subjectID = subjectID;
	localStorage.group = group;
	var process = 0;
	var new_users = {};
	for (var i=0;i<users.length;i++){
		if (users[i].done === "true")
			process += 1;
		new_users[users[i].userid] = users[i];
	}
	localStorage.users = JSON.stringify(new_users);
	localStorage.process = process;
}

function __loginFailCB(errorcode) {
	flag = false;
	var a = errorcode;
	if (!a) {
		tip = "网络异常";
		return;
	}
	switch (a) {
		case "412":
			tip = "密码错误次数过多，请1小时后再重试";
			break;
		case "420":
			tip = "帐号不存在";
			break;
		case "422":
			tip = "帐号被冻结";
			break;
		case "460":
			tip = "密码错误";
			break;
		case "401":
			tip = "程序异常，请联系作者";
			break;
		default:
			tip = "服务器异常";
	}
}

function __showError(a) {
	$(".error").text(a);
	$(".error").show();
	$(".g-doc").height(height + 19);
	window.resizeTo(width, height + 19);
}

function __hideError() {
	$(".error").text("");
	$(".error").hide();
	$(".g-doc").height(height);
	window.resizeTo(width, height);
}
$(window).load(_$init);