window.addEventListener("pageshow", load);

function load() {
	var data = chrome.extension.getBackgroundPage().adata;
	// $("#message").text("ddddddddd");
	if(data.error){
		$("#message").text(data.error);
		$("#content").hide();
	}else{
		$("#message").hide();
		$("#content-type").text(data.type);
		$("#content-author").text(data.author);
	}
};

// $(function(){
//     // $("body").append("<p>恭喜你，已经学会了使用Broswer Action!</p>");
//     var data = chrome.extension.getBackgroundPage().adata;
//     // $("#message").text("Load completed");
//     // $("#content-type").text("aaaa");
//     // alert(data);
//     if(data.error){
// 		$("#message").text(data.error);
// 		$("#content").hide();
// 	}else{
// 		$("#message").hide();
// 		$("#content-type").text(data.type);
// 		$("#content-author").text(data.author);
// 	}
// });