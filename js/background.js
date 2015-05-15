var data = {};

// function getDominFromUrl(url){
// 	var host = "null";
// 	if (typeof url == "undefined" || null == url)
// 		url = window.location.href;
// 	var regex = /.*\:\/\/([^\/]*).*/;
// 	var match = url.match(regex);
// 	if (typeof match != "undefined" && null != match)
// 		host = match[1];
// 	return host
// }

// function checkForValidUrl (tabId, changeInfo, tab) {
// 	// var pattern1 = /^http:\/\/weibo.com\/u\/\d+\/home?/
// 	// var pattern2 = /^http:\/\/weibo.com\/mygroups?/
// 	// if (pattern1.test(tab.url) || pattern2.test(tab.url)){
// 	if (getDominFromUrl(tab.url) == "weibo.com" || getDominFromUrl(tab.url) == "www.weibo.com"){
// 		chrome.pageAction.show(tabId);
// 		data.url = tab.url;
// 	}
// };
// chrome.pageAction.show(tabId);

// chrome.tabs.onUpdated.addListener(checkForValidUrl);

var response = {};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.cmd == "post"){
    	// alert(JSON.stringify(request));
	    var data = request;
	    delete data["cmd"];
	    data.done = "false";
	    var userid = data.userid;
	    if(data.userid){
		    localStorage.process = parseInt(localStorage.process) + 1;
		    localStorage[userid] = JSON.stringify(data);
		    var users = JSON.parse(localStorage.users);
		    users[userid].done = "true";
		    localStorage.users = JSON.stringify(users);
		    localStorage.lastDate = data.date;
	    
	    	
		    $.ajax({
		        url: "http://simonproject.sinaapp.com/test.php",
		        // cache: false,
		        type: "POST",
		        data: data,//JSON.stringify({url:data.url, isstart:data.isstart,totaltime:data.totaltime}),
		        dataType: "json",
		        timeout: 1000,
		        async: false,
		        success:function(data, textStatus){
		        	console.log(textStatus + ":" + JSON.stringify(data));
		        	if (data.result == true){
			    		var user = JSON.parse(localStorage[userid]);
			    		user.done = "true";
			    		localStorage[userid] = JSON.stringify(user);
			    	}
		        },
		        error:function(XMLHttpRequest, textStatus, errorThrown){
		        	console.log("error" + textStatus + errorThrown);
		        },
		        complete:function(XMLHttpRequest, textStatus) {
		        	console.log("complete:"+textStatus);
		        }
		    })
		}
	}
	else if (request.cmd == "track"){
		// alert(JSON.stringify(request));
		var data = request;
		delete data["cmd"];
		data.done = "false";
		data.userid = localStorage.temp_userid;
		var userid = data.userid;
		if (userid){
			localStorage.xiangmai = data.xiangmai;
			localStorage.guanzhu = data.guanzhu;
			data.username = localStorage.temp_username;
			data.subjectID = localStorage.subjectID;
			localStorage[userid + ":product"] = JSON.stringify(data);
			$.ajax({
			        url: "http://simonproject.sinaapp.com/track.php",
			        type: "POST",
			        data: data,
			        dataType: "json",
			        timeout: 1000,
			        async: false,
			        success:function(data, textStatus){
			        	console.log(textStatus + ":" + JSON.stringify(data));
			    		var user = JSON.parse(localStorage[userid + ":product"]);
			    		user.done = "true";
			    		localStorage[userid + ":product"] = JSON.stringify(user);
			        },
			        error:function(XMLHttpRequest, textStatus, errorThrown){
			        	console.log("error" + textStatus + errorThrown);
			        },
			        complete:function(XMLHttpRequest, textStatus) {
			        	console.log("complete:"+textStatus);
			        }
			})
		}
	}
	else if (request.prop == "subjectID"){
		var result = {};
		result.subjectID = localStorage.subjectID;
		var group = localStorage.group;
		var users = JSON.parse(localStorage.users);
		var ol = [];
		var friend = [];
		result.userlist = [];
		for (var userid in users){
			var user = users[userid];
			if (user.done == "false"){
				if (user.type == "vip")
					ol.push(user);
				else
					friend.push(user);
			}else{
				result.userlist.push(user);
			}
		}
		if (group == "1"){
			// 0明星 5朋友
			if (friend.length != 0){
				var target = randUser(friend);
				result.userid = target.userid;
				result.username = target.username;
				localStorage.temp_userid = target.userid;
				localStorage.temp_username = target.username;
			}else
				result.error = "experiment complete";
		}else if (group == "2"){
			// 1明星 4朋友
			if (ol.length == 5){
				var target = randUser(ol);
				result.userid = target.userid;
				result.username = target.username;
				localStorage.temp_userid = target.userid;
				localStorage.temp_username = target.username;
			}else if (friend.length > 1){
				var target = randUser(friend);
				result.userid = target.userid;
				result.username = target.username;
				localStorage.temp_userid = target.userid;
				localStorage.temp_username = target.username;
			}else
				result.error = "experiment complete";
		}else if (group == "3"){
			// 4明星 1朋友
			if (friend.length == 5){
				var target = randUser(friend);
				result.userid = target.userid;
				result.username = target.username;
				localStorage.temp_userid = target.userid;
				localStorage.temp_username = target.username;
			}else if (ol.length > 1){
				var target = randUser(ol);
				result.userid = target.userid;
				result.username = target.username;
				localStorage.temp_userid = target.userid;
				localStorage.temp_username = target.username;
			}else
				result.error = "experiment complete";
		}else if (group == "4"){
			// 5明星
			if (ol.length != 0){
				var target = randUser(ol);
				result.userid = target.userid;
				result.username = target.username;
				localStorage.temp_userid = target.userid;
				localStorage.temp_username = target.username;
			}else
				result.error = "experiment complete";
		}
		sendResponse(result);
	}
	else if (request.prop == "process"){
		var result = {};
		if (localStorage.lastDate){
			result.lastDate = localStorage.lastDate;
		}else{
			var now = new Date();
			result.lastDate = null;
		}
		result.process = localStorage.process;
		sendResponse(result);
	}
	else if (request.prop == "product"){
		var result = {};
		result.xiangmai = localStorage.xiangmai;
		result.guanzhu = localStorage.guanzhu;
		sendResponse(result);
	}
  });

function randUser(users){
	var randomNum = Math.random()*users.length;
	var randomNum = parseInt(randomNum, 10);
	// alert(randomNum);
	return users[randomNum];
}