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
	var pattern = /^http:\/\/weibo.com\/u\/\d+\/home?/
	if (pattern.test(tab.url)){
		chrome.pageAction.show(tabId);
		data.url = tab.url;
	}
};


chrome.tabs.onUpdated.addListener(checkForValidUrl);

var response = {};
data.error = "加载中...";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    data = request;
    data.url = "http://weibo.com";
    if(data.isstart == true){
    	
	    // $.ajax({
	    //     url: "http://simonproject.sinaapp.com/test.php",
	    //     // cache: false,
	    //     type: "POST",
	    //     data: data,//JSON.stringify({url:data.url, isstart:data.isstart,totaltime:data.totaltime}),
	    //     dataType: "json",
	    //     timeout: 1000,
	    //     async: false,
	    //     success:function(data, textStatus){
	    //     	console.log(textStatus + ":" + JSON.stringify(data));
	    //     },
	    //     error:function(XMLHttpRequest, textStatus, errorThrown){
	    //     	console.log("error" + textStatus + errorThrown);
	    //     },
	    //     complete:function(XMLHttpRequest, textStatus) {
	    //     	console.log("complete:"+textStatus);
	    //     }
	    // })
	}
  });