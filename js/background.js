var data = {};

function getDominFromUrl(url){
	var host = "null";
	if (typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if (typeof match != "undefined" && null != match)
		host = match[1];
	return host
}

function checkForValidUrl (tabId, changeInfo, tab) {
	// var pattern1 = /^http:\/\/weibo.com\/u\/\d+\/home?/
	// var pattern2 = /^http:\/\/weibo.com\/mygroups?/
	// if (pattern1.test(tab.url) || pattern2.test(tab.url)){
	if (getDominFromUrl(tab.url) == "weibo.com" || getDominFromUrl(tab.url) == "www.weibo.com"){
		chrome.pageAction.show(tabId);
		data.url = tab.url;
	}
};


chrome.tabs.onUpdated.addListener(checkForValidUrl);

var response = {};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.cmd == "post"){
	    var data = request;
	    delete data["cmd"];
	    data.done = false;
	    var userid = data.userid;
	    localStorage.process = parseInt(localStorage.process) + 1;
	    localStorage[userid] = JSON.stringify(data);
	    if(data.isstart == true){
	    	
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
		    		var user = JSON.parse(localStorage[userid]);
		    		user.done = true;
		    		localStorage[userid] = JSON.stringify(user);
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
		sendResponse({subjectID: localStorage.subjectID});
	}
  });