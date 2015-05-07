// var accountMap = AccountHolder.get();
// var temp = $('<div class="account3"><span><a href="#" class="js-account"></a></span>&nbsp;<span class="unread"></span></div>');
// var correctClass = "account1";
// var pwdModifyClass = "account2";
// var noPwdClass = "account3";
// var lodingClass = "account4";
// var width;
// var height;
// var port = "";

window.addEventListener('pageshow', function (){
	var users = JSON.parse(localStorage.users);
	var process = 0;
	for (var userid in users){
		var user = users[userid];
			if (user.done == "true"){
				process++;
			}
	}
	localStorage.process = process;
	
	document.getElementsByClassName("js-account")[0].text = "被试ID： " + localStorage.subjectID;
	document.getElementsByClassName("process")[0].text = "实验进度： " + localStorage.process + " / 5";
	document.getElementById("addAccount").onclick = function (){
		localStorage.removeItem("subjectID");
		localStorage.removeItem("group");
		self.location = "login.html";
	};
	document.getElementsByClassName("line1")[0].focus();
	// document.getElementsByClassName("line1")[0].blur();
})
// function _$init() {
// 	// __initPort();
// 	__initDOM();
// 	__initEventListener();
// }

// function __initPort() {
// 	port = Explorer.Extension.connect({
// 		name: "menu"
// 	});
// 	port.onMessage.addListener(__onPortMessage);
// }

// function __initDOM() {
// 	width = $(".g-doc").width();
// 	height = $(".g-doc").height();
// 	__initShowAccount();
// }

// function __initEventListener() {
// 	$(document).ready(function() {
// 		// $(".js-account").each(function() {
// 		// 	$(this).bind("click", __onClickAccount);
// 		// });
// 		// $("#addAccount").bind("click", __onClickAddAccount);
// 		// $(".g-doc .line3 .line3-1").find("a").attr("href", "http://zhidao.mail.163.com/zhidao/newsugg.jsp#chrome应用");
// 	});
// }

// function __onClickAddAccount() {
// 	if ($(".js-account").length >= 3) {
// 		return false;
// 	}
// 	window.location.href = "addaccount.html";
// }

// function __onPortMessage(a) {
// 	if (!a) {
// 		console.log("[DEBUG] received message: request is empty");
// 		return;
// 	}
// 	switch (a.event) {
// 		case "getUnreadCountResult":
// 			__initUnreadInfo(a);
// 			break;
// 		default:
// 			console.log("[DEBUG] received message, unknown event: " + a.event);
// 			break;
// 	}
// }

// function __initShowAccount() {
// 	var a = height;
// 	var d = 0;
// 	for (var c in accountMap) {
// 		++d;
// 		var e = temp.clone();
// 		if (accountMap[c].password) {
// 			e.removeClass(noPwdClass);
// 			if (accountMap[c].status === "normal") {
// 				e.addClass(correctClass);
// 			} else {
// 				e.addClass(pwdModifyClass);
// 			}
// 		}
// 		if (!accountMap[c].password || accountMap[c].status === "normal") {
// 			port.postMessage({
// 				cmd: "getUnreadCount",
// 				username: c
// 			});
// 		}
// 		var b = accountMap[c].email;
// 		e.attr("id", Util.Misc.md5Hex(b));
// 		$(e.children()[0].children[0]).text(accountMap[c].email);
// 		a = a + 25;
// 		$("#accoutdiv").append(e);
// 	}
// 	if (d >= 3) {
// 		$("#addAccount").addClass("disabled");
// 	}
// 	$(".g-doc").height(a);
// 	window.resizeTo(width, a);
// }

// function __initUnreadInfo(c) {
// 	var e = c.username;
// 	var a = c.retcode;
// 	var b = c.unread;
// 	if (!e) {
// 		return;
// 	}
// 	if ("200" !== a) {
// 		return;
// 	}
// 	if (-1 === b) {
// 		return;
// 	}
// 	var d = $("#" + Util.Misc.md5Hex(e));
// 	if (d.size() < 1) {
// 		return;
// 	}
// 	$(d.children()[1]).text("(" + b + ")");
// }

// function __onClickAccount() {
// 	var c = $(this).parent().parent();
// 	if (c.hasClass(lodingClass)) {
// 		return false;
// 	}
// 	if (c.hasClass(pwdModifyClass) || $(c).hasClass(noPwdClass)) {
// 		window.location.href = "login.html#account=" + $(this).html();
// 	} else {
// 		var b = $(this).text();
// 		var a = AccountHolder.get(b).password;
// 		Webmail.enterWithPasswd({
// 			username: b,
// 			password: a,
// 			from: "pushext_menu"
// 		}, {
// 			onSuc: function(e, d) {
// 				AccountHolder.updateStatus(e, "normal");
// 				window.location.reload(true);
// 			},
// 			onFail: function(e, d) {
// 				if ("412" === d || "460" === d) {
// 					AccountHolder.updateStatus(e, "wrong");
// 				} else {
// 					if ("420" === d || "422" === d) {
// 						AccountHolder.remove(e);
// 					}
// 				}
// 				window.location.reload(true);
// 			}
// 		});
// 	}
// }
// $(window).load(_$init);