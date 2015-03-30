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
	if (getDominFromUrl(tab.url).toLowerCase() == "weibo.com"){
		chrome.pageAction.show(tabId);
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

var adata = {};
adata.error = "加载中...";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    adata = request;
  });