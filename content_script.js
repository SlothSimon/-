window.addEventListener('pageshow', function (){
	var postInfo = $("div.WB_feed div").first();
	if(postInfo.length!=1){
		chrome.runtime.sendMessage({type:"error", error:"获取信息失败."});
	}
	else{
		var msg = {
			type: "明星用户",
			// title : $("#cb_post_title_url").text(),
			// postDate : postInfo.find("#post-date").text(),
			author : postInfo.find("a.W_f14.W_fb.S_txt1")[0].innerText,
			// url: document.URL
		};
		chrome.runtime.sendMessage(msg);
	}
})

// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse){
// 		console.log(sender.tab ?
// 					"from a content scrit:" + sender.tab.url :
// 					"from the extension");
// 		// if (request.type == "明星用户"){
			
// 		// }
// 	}
// 	)