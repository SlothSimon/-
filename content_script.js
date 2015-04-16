var data = {
	isstart : false,
	subjectID : "test",
	author : null,
	linkClick:null,
	weibomouseover:null,
	weibomouseout:null,
	totaltime:0,
    url : null,
};

openDiv("test");

function openDiv(newDivID)  
   {  
      var newMaskID = "mask";  //遮罩层id  
      var  newMaskWidth =document.body.scrollWidth;//遮罩层宽度  
      var  newMaskHeight =5000;//document.body.Height;//遮罩层高度      
      //mask遮罩层    
     var newMask = document.createElement("div");//创建遮罩层  
    newMask.id = newMaskID;//设置遮罩层id 
    newMask.class = "newMask" 
    newMask.style.position = "absolute";//遮罩层位置  
    newMask.style.zIndex = "999";//遮罩层zIndex  
    newMask.style.width = newMaskWidth + "px";//设置遮罩层宽度  
    newMask.style.height = newMaskHeight + "px";//设置遮罩层高度  
    newMask.style.top = "0px";//设置遮罩层于上边距离  
    newMask.style.left = "0px";//设置遮罩层左边距离  
    newMask.style.background = "black";//#33393C//遮罩层背景色  
    newMask.style.filter = "alpha(opacity=40)";//遮罩层透明度IE  
    newMask.style.opacity = "0.90";//遮罩层透明度FF  
    document.body.appendChild(newMask);//遮罩层添加到DOM中  
     
    //新弹出层  
    var newDivWidth = 400;//新弹出层宽度  
    var newDivHeight = 100;//新弹出层高度  
    var newDiv = document.createElement("div");//创建新弹出层  
    newDiv.id = newDivID;//设置新弹出层ＩＤ
    newDiv.class = "newDiv"  
    newDiv.style.position = "absolute";//新弹出层位置  
    newDiv.style.zIndex = "9999";//新弹出层zIndex  
   
    newDiv.style.width = newDivWidth + "px";//新弹出层宽度  
    newDiv.style.height = newDivHeight + "px";//新弹出层高度  
    var newDivtop=300 ;//新弹出层距离上边距离  
    var newDivleft=(document.body.scrollLeft + document.body.clientWidth/2   
            - newDivWidth/2);//新弹出层距离左边距离  
    newDiv.style.top = newDivtop+ "px";//新弹出层距离上边距离  
    newDiv.style.left = newDivleft + "px";//新弹出层距离左边距离  
    newDiv.style.background = "#EFEFEF";//新弹出层背景色  
    newDiv.style.border = "1px solid #860001";///新弹出层边框样式  
    newDiv.style.padding = "5px";//新弹出层 
    newDiv.style.textAlign = "center";
    newDiv.style.fontSize = "20px";
    newDiv.innerHTML = "是否开始实验？\n［此处应有实验说明、隐私保护协定等］";//新弹出层内容  
    document.body.appendChild(newDiv);//新弹出层添加到DOM中  
     
    //关闭新图层和mask遮罩层  
 
    var newA = document.createElement("button");  
    newA.href = "#";  
    newA.style.position = "absolute";//span位置  
    newA.style.top=70+ "px";
    newA.style.left=80+ "px";  
    newA.innerHTML = "开始实验";  
    newA.onclick = function()//处理关闭事件  
    {  
        for (key in data){
            if (key != "subjectID")
                if (key != "totaltime")
                    data[key] = null;
                else
                    data[key] = 0;
        };
    	data.isstart = true;
        newDiv.innerHTML = "请等待网页加载完毕...";

        // 显示假微博
        var weibolist = document.getElementsByClassName('WB_feed')[0];
        var weibo = document.getElementsByClassName('WB_cardwrap WB_feed_type S_bg2')[0];
        var new_weibo = weibo.cloneNode(true);
        // var textNode = new_weibo.children[0].children[2].children[1].
        var textNode = new_weibo.getElementsByClassName("WB_text W_f14")[0];
        textNode.innerText = "测试，此处应显示伪造推送信息，我购买了虚拟现实眼镜";
        textNode.innerHTML = "测试，此处应显示伪造推送信息，我购买了虚拟现实眼镜";
        var expandNode = new_weibo.getElementsByClassName("WB_feed_expand")[0];
        if (expandNode != null){
            var parent = new_weibo.getElementsByClassName("WB_detail")[0];
            parent.removeChild(expandNode);
        }
        weibolist.insertBefore(new_weibo, weibo);


        if (document.readyState == "complete"){
            document.body.removeChild(newMask);//移除遮罩层     
            document.body.removeChild(newDiv);////移除弹出框 
        }

        return false;  
    }  
    newDiv.appendChild(newA);//添加关闭span

    var newB = document.createElement("button");  
    newB.href = "#";  
    newB.style.position = "absolute";//span位置  
    newB.style.top=70+ "px";
    newB.style.right=80+ "px";  
    newB.innerHTML = "不，正常浏览";  
    newB.onclick = function()//处理关闭事件  
    {  
    	data.isstart = false;
        document.body.removeChild(newMask);//移除遮罩层     
        document.body.removeChild(newDiv);////移除弹出框  
        return false;  
     }  
     newDiv.appendChild(newB);//添加关闭span 
 
} 

window.onload = function(){
    console.log("onload")
    if (data.isstart == true){
        var temp = document.getElementById("mask");
        document.body.removeChild(temp);
        temp = document.getElementById("test");
        document.body.removeChild(temp);
    }
}

window.addEventListener('pageshow', function (){
    console.log("pageshow")

	document.getElementsByClassName('WB_cardwrap WB_feed_type S_bg2')[0].onmouseover = function(){
		var myDate = new Date();
		data.weibomouseover = myDate.getTime();
	};

	document.getElementsByClassName('WB_cardwrap WB_feed_type S_bg2')[0].onmouseout = function(){
		var myDate = new Date();
		data.weibomouseout = myDate.getTime();
		data.totaltime += data.weibomouseout - data.weibomouseover;
	};

	document.getElementsByClassName('W_f14 W_fb S_txt1')[0].onclick = function(){
		var myDate = new Date();
		data.linkClick = myDate.getTime();
		if (data.weibomouseout == null || data.weibomouseout < data.weibomouseover)
			data.totaltime += data.linkClick - data.weibomouseover;	
        chrome.runtime.sendMessage(data);
	};

});

// window.onpagehide = function(){
// 	chrome.runtime.sendMessage(data);
// }

// window.onunload = function(){
// 	chrome.runtime.sendMessage(data);
// }


// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse){
// 		console.log(sender.tab ?
// 					"from a content scrit:" + sender.tab.url :
// 					"from the extension");
// 		// if (request.type == "明星用户"){
			
// 		// }
// 	}
// 	)