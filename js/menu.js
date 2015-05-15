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
	if (localStorage.users){
		var users = JSON.parse(localStorage.users);
		var process = 0;
		var upload = {};
		for (var userid in users){
			var user = users[userid];
			if (user.done == "true"){
				process++;
			}
			var cont = localStorage[userid];
			if (cont){
				cont = JSON.parse(cont);
				if (cont.done == "false")
					upload[userid] = cont;
			}
			cont = localStorage[userid + ":product"];
			if (cont){
				cont = JSON.parse(cont);
				if (cont.done == "false")
					upload[userid + ":product"] = cont;
			}
		}
		localStorage.process = process;
		document.getElementsByClassName("process")[0].text = "实验进度： " + localStorage.process + " / 5";
	}else{
		var process = document.getElementsByClassName("process")[0]
		process.text = "被试测试数据尚未录入！点击报错！";
		process.href = "#";
		process.style.color = "red";
		data = {title:"No subject's users data！", content:localStorage.subjectID};
		console.log(JSON.stringify(data));
		process.onclick = function(){
			$.ajax({
		        url: "http://simonproject.sinaapp.com/email/errormail.php",
		        type: "POST",
		        data: data,
		        dataType: "json",
		        timeout: 1000,
		        async: false,
		        success:function(data, textStatus){
		        	console.log(textStatus + ":" + JSON.stringify(data));
		        	process.text = data;
		        },
		        error:function(XMLHttpRequest, textStatus, errorThrown){
		        	console.log("error" + textStatus + errorThrown);
		        	process.text = "报错失败，请使用用户反馈！";
		        },
		        complete:function(XMLHttpRequest, textStatus) {
		        	console.log("complete:"+textStatus);
		        	// alert("第"+n+"个数据上传失败！");
				        }
		    })
		}
		upload = {};
	}
	
	document.getElementsByClassName("js-account")[0].text = "被试ID： " + localStorage.subjectID;
	if (Object.keys(upload).length > 0){
		var btn_upload = document.getElementsByClassName("upload")[0];
		btn_upload.innerHTML = "有" + Object.keys(upload).length + "个未上传数据，点击上传";
		btn_upload.onclick = function(){
			var re = /product/;
			var n = 1;
			for (var key in upload){
				if (re.test(key) == false){
					btn_upload.innerHTML += "<br>正在上传...";
					$.ajax({
				        url: "http://simonproject.sinaapp.com/test.php",
				        type: "POST",
				        data: upload[key],
				        dataType: "json",
				        timeout: 1000,
				        async: false,
				        success:function(data, textStatus){
				        	console.log(textStatus + ":" + JSON.stringify(data));
				        	if (data.result == true){
					    		var user = JSON.parse(localStorage[key]);
					    		user.done = "true";
					    		localStorage[key] = JSON.stringify(key);
					    		btn_upload.innerHTML += "<br>第"+n+"个数据上传成功！";
					    	}
				        },
				        error:function(XMLHttpRequest, textStatus, errorThrown){
				        	console.log("error" + textStatus + errorThrown);
				        	btn_upload.innerHTML += "<br>第"+n+"个数据上传失败！";
				        },
				        complete:function(XMLHttpRequest, textStatus) {
				        	console.log("complete:"+textStatus);
				        	// alert("第"+n+"个数据上传失败！");
				        }
				    })
				}else{
					btn_upload.innerHTML += "<br>正在上传...";
					$.ajax({
				        url: "http://simonproject.sinaapp.com/track.php",
				        type: "POST",
				        data: upload[key],
				        dataType: "json",
				        timeout: 1000,
				        async: false,
				        success:function(data, textStatus){
				        	console.log(textStatus + ":" + JSON.stringify(data));
				    		var user = JSON.parse(localStorage[key]);
				    		user.done = "true";
				    		localStorage[key] = JSON.stringify(user);
				    		btn_upload.innerHTML += "<br>第"+n+"个数据上传成功！";
				        },
				        error:function(XMLHttpRequest, textStatus, errorThrown){
				        	console.log("error" + textStatus + errorThrown);
				        	btn_upload.innerHTML += "<br>第"+n+"个数据上传失败！";
				        },
				        complete:function(XMLHttpRequest, textStatus) {
				        	console.log("complete:"+textStatus);
				        	// alert("第"+n+"个数据上传失败！");
				        }
					})
				}
				n++;
			}
		};
		btn_upload.parentNode.style.display = "block";
	}
	if (Object.keys(upload).length == 0 && process == 5){
		var btn_upload = document.getElementsByClassName("upload")[0];
		btn_upload.innerHTML = "实验全部完成，点击填写问卷";
		btn_upload.href = "http://www.sojump.com/jq/5004012.aspx";
		btn_upload.target = "_blank";
		btn_upload.parentNode.style.display = "block";
	}
	document.getElementById("addAccount").onclick = function (){
		localStorage.removeItem("subjectID");
		localStorage.removeItem("group");
		localStorage.removeItem("lastDate");
		localStorage.removeItem("temp_userid");
		localStorage.removeItem("temp_username");
		localStorage.removeItem("users");
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