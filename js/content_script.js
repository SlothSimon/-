var data = {
	isstart : false,
	subjectID : null,
	username: null,//"大自然保护协会-马云",
    userid: null,//2145291155,
	linkclick:null,
    picclick:null,
    shoucangclick:null,
    zhuanfaclick:null,
    pinglunclick:null,
    zanclick:null,
    pingbiweiboclick:null,
    pingbiyonghuclick:null,
    quxiaoguanzhuclick:null,
    jubaoclick:null,
    pingbiguanjianciclick:null,
	weibomouseover:null,
	weibomouseout:null,
	totaltime:0,
    date:null,
    url : window.location.href,
};

var elementClassList = new Array(
    "pic",
    "link",
    "shoucang",
    "pinglun",
    "zhuanfa",
    "zan",
    "pingbiweibo",
    "pingbiyonghu",
    "quxiaoguanzhu",
    "jubao",
    "pingbiguanjianci"
);
var jiazai = null;

 getItem("process", function(param){
    if (param.process < 5){
        var now = new Date();
        now = now.toLocaleDateString();
        if (now != param.lastDate){
            openDiv("test");
        }   
    }
 });
// openDiv("test");

var new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","http://code.jquery.com/jquery-2.0.0.min.js");
document.body.appendChild(new_element);
var laji = document.getElementById("v6_pl_ad_yaoyaofans");
if (laji)
    laji.remove();
laji = document.getElementsByClassName("WB_feed WB_feed_newuser")
if (laji.length > 0)
    laji[0].remove();

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
    newDiv.innerHTML = "是否开始实验？";//新弹出层内容  
    document.body.appendChild(newDiv);//新弹出层添加到DOM中  

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.title = "已阅读实验说明及隐私协定";
    checkbox.style.textAlign = "center";
    checkbox.style.fontSize = "15px";
    checkbox.onclick = function(){
        if (checkbox.checked){
            var btn = document.getElementById("btn_start");
            btn.disabled = false;
        }else{
            var btn = document.getElementById("btn_start");
            btn.disabled = true;
        }
    };
    newDiv.appendChild(document.createElement("br"));
    newDiv.appendChild(checkbox);


    var newtext = document.createElement("a");
    newtext.innerHTML = "已阅读实验说明及隐私协定";
    newtext.style.textAlign = "center";
    newtext.style.fontSize = "15px";
    newtext.style.textDecoration="underline";
    newtext.href = "http://simonproject.sinaapp.com/agreement.png";
    newDiv.appendChild(newtext);
    



    //关闭新图层和mask遮罩层  
 
    var newA = document.createElement("button");  
    newA.id = "btn_start";
    newA.href = "#";  
    newA.style.position = "absolute";//span位置  
    newA.style.top=70+ "px";
    newA.style.left=80+ "px";  
    newA.disabled = true; // 在阅读实验说明和隐私协定后才能点击
    newA.innerHTML = "开始实验";  
    newA.onclick = function()//处理关闭事件  
    {  
        data.isstart = true;
        // 获取推送的博主
        getItem("subjectID", function(param){

            if (param.error == "experiment complete"){
                newDiv.innerHTML = "全部实验已完成！";
                return;
            }else{

                window.onbeforeunload = function(){
                    if (jiazai == false)
                        return "确定结束本次实验？";
                };

                window.onunload = function(){
                    var myDate = new Date();
                    var end = myDate.getTime();
                    if (data.weibomouseout == null || data.weibomouseout < data.weibomouseover)
                        if (data.weibomouseover != null)
                            data.totaltime += end - data.weibomouseover;
                    data.cmd = "post";
                    if (jiazai == false){
                        var now = new Date();
                        data.date = now.toLocaleDateString();
                        chrome.runtime.sendMessage(data);
                    }
                };

                data.subjectID = param.subjectID;
                if (data.subjectID){
                    newDiv.innerHTML = "请等待网页加载完毕...<br>若等待时间超过1分钟，请刷新！";
                    jiazai = true;
                }
                else{
                    newDiv.innerHTML = "请登录后再次刷新进行实验！";
                    return ;
                }

                // 获得推送的博主
                data.userid = param.userid;
                data.username = param.username;

                // 显示假微博
                var weibolist = document.getElementsByClassName('WB_feed')[0];
                var weibo = document.getElementsByClassName('WB_cardwrap WB_feed_type S_bg2')[1];
                var new_weibo_url = chrome.extension.getURL('weibo.html');
                $.get(new_weibo_url, function(result, status){
                    // 获得微博推送html代码
                    var text = result;
                    // 替换用户名和用户ID
                    text = text.replace(new RegExp("USERNAME", 'g'), data.username);
                    text = text.replace(new RegExp("USERID", 'g'), data.userid);

                    // 转化为html node 类型
                    var new_weibo = $.parseHTML(text)[0];
                    var friends = param.userlist;

                    if (friends && friends.length > 0){
                        var prefix = '<div class="W_arrow_bor W_arrow_bor_t"><i class="S_bg1_br"></i></div><div class="expand S_bg1" style="width: 230px;"><div class="content"><div class="layer_emotion" node-type="inner"></br><a style="color:#000000">&nbsp;&nbsp;您关注的以下用户也购买了该产品：</a><ul class="emotion_list clearfix" node-type="faceList">';
                        var backfix = '</ul></div></div></div>';
                        var user = '<li uid="USERID"><a href="/u/USERID"><img src="http://tp4.sinaimg.cn/USERID/50/5724208507/0" alt="USERNAME" title="USERNAME"></a></li>'
                        for (var i = 0; i < friends.length; i++){
                            var friend = friends[i];
                            var temp = user.replace(new RegExp("USERNAME", 'g'), friend.username);
                            temp = temp.replace(new RegExp("USERID", 'g'), friend.userid)
                            prefix += temp;
                        }

                        var result = prefix + backfix;
                        var otherusers = $.parseHTML(result);
                        for (var i = 0; i < otherusers.length; i++){
                            new_weibo.getElementsByClassName("cheatusers")[0].appendChild(otherusers[i]);
                        }
                    }

                    // 添加事件监听
                    for (var i = 0; i < elementClassList.length; i++) {
                        var className = elementClassList[i];
                        var element = new_weibo.getElementsByClassName(className)[0];
                        element.onclick = function(){
                            var myDate = new Date();
                            data[this.className+"click"] = myDate.getTime();
                            if (this.className == "pinglun"){
                                var weibo = document.getElementsByClassName("cheatweibo")[0];
                                var list = weibo.getElementsByClassName("repeat_list");
                                if (list.length > 0) 
                                    list[0].remove();
                            }
                            if (this.className == "zhuanfa"){
                                var list = document.getElementsByClassName("repeat_list S_line1");
                                if (list.length > 0) 
                                    list[0].remove();
                            }
                            if (this.className == "zan"){
                                var like_status = this.getElementsByClassName("W_icon icon_praised_b");
                                if (like_status.length > 0){
                                    var em = document.createElement("em");
                                    em.innerHTML = "&nbsp;1";
                                    like_status[0].parentNode.appendChild(em);
                                    like_status[0].setAttribute("class", "W_icon icon_praised_bc ");
                                }else{
                                    like_status = this.getElementsByClassName("W_icon icon_praised_bc ");
                                    while (like_status[0].parentNode.children[1])
                                        like_status[0].parentNode.children[1].remove();
                                    // like_status[0].parentNode.children[1].remove();
                                    like_status[0].setAttribute("class", "W_icon icon_praised_b");
                                }
                            }
                        }//recordTime(className + "click");
                        if (className == "zan"){
                            element.getElementsByClassName("S_txt2")[0].setAttribute("action-type", "");
                        }
                    };
                    new_weibo.onmouseenter = function(){
                            var myDate = new Date();
                            data.weibomouseover = myDate.getTime();
                    };
                    new_weibo.onmouseleave = function(){
                        var myDate = new Date();
                        data.weibomouseout = myDate.getTime();
                        if (data.weibomouseout > data.weibomouseover)
                            data.totaltime += data.weibomouseout - data.weibomouseover;
                    };

                    setInterval(
                        function(){
                            var list = new_weibo.getElementsByClassName("repeat_list");
                            if (list.length > 0){
                                list[0].remove();
                                var pinglun = new_weibo.getElementsByClassName("pinglunnum")[0];
                                pinglun.children[0].innerHTML = "评论";
                            }
                            var list = document.getElementsByClassName("repeat_list S_line1");
                            if (list.length > 0){
                                list[0].remove();
                            }
                            var zhuanfa = new_weibo.getElementsByClassName("zhuanfanum")[0];
                            zhuanfa.children[0].innerHTML = "转发";

                            var node = $("[title$='测试1号2015']")
                            if (node.length > 0){
                                node = node[0];
                                node.innerHTML = "@" + param.username;
                                node.href = "/u/" + param.userid +"?from=feed&loc=nickname";
                                node.setAttribute("nick-name", param.username);
                                node.setAttribute("usercard", "id=" + param.userid);
                                var str = '我在微商城购买了GlassRock。<span class="link"><a class="W_btn_b btn_22px W_btn_cardlink" title="iGlasses" href="http://simonproject.sinaapp.com/product.html" action-type="feed_list_url" alt="#"><i class="W_ficon ficon_cd_link S_ficon">O</i><i class="W_vline S_line1"></i><em class="W_autocut S_link1">点击了解：GlassRock</em></a></span>';
                                if (node.parentNode.parentNode.children[1])
                                    node.parentNode.parentNode.children[1].innerHTML = str;
                                else
                                    node.parentNode.parentNode.children[0].children[1].children[0].innerHTML = str;
                                
                                // 图片
                                var pic = node.parentNode.parentNode.children[2];
                                if (pic)
                                    pic.getElementsByClassName("bigcursor")[1].src = "http://simonproject.sinaapp.com/glasses.jpg";

                                // 时间戳
                                if (node.parentNode.className != "getTogether-txt")
                                    var t = node.parentNode.parentNode.children[4].children[1].children[0];
                                if (time && t) 
                                    t.setAttribute("date", time);
                                node.title = param.username;
                            }
                        },
                        10
                        );


                    // 替换时间戳
                    var timenode = new_weibo.getElementsByClassName('S_txt2')[1];
                    var cankao_timenode = weibo.getElementsByClassName("WB_from S_txt2")[0].children[0];
                    for (var x=0;x < cankao_timenode.attributes.length;x ++){
                        if (cankao_timenode.attributes[x].localName == "date"){
                           var time = Number(cankao_timenode.attributes[x].value) + 1000;
                           break;
                        }
                    }
                    timenode.setAttribute("date", time);
                    timenode.innerHTML = cankao_timenode.innerHTML;

                    // 插入到微博列表中
                    weibo = document.getElementsByClassName('WB_cardwrap WB_feed_type S_bg2')[2];
                    weibolist.insertBefore(new_weibo, weibo);


                    if (document.readyState == "complete"){
                        document.body.removeChild(newMask);//移除遮罩层     
                        document.body.removeChild(newDiv);////移除弹出框 
                        jiazai = false;
                    }

                });
            }
            return false;

        });  
    };  
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

     getItem("process", function(param){
        if (param.process >= 5){
            document.body.removeChild(newMask);//移除遮罩层     
            document.body.removeChild(newDiv);////移除弹出框  
        }
        var now = new Date();
        now = now.toLocaleDateString();
        if (now == param.lastDate){
            document.body.removeChild(newMask);//移除遮罩层     
            document.body.removeChild(newDiv);////移除弹出框 
        }
     });
 
} 

window.onload = function(){
    console.log("onload")
    if (jiazai == true){
        var temp = document.getElementById("mask");
        document.body.removeChild(temp);
        temp = document.getElementById("test");
        document.body.removeChild(temp);
        jiazai = false;
    }
};

setInterval(
    function(){
        if (data.isstart == false){
            var nodes = $("[title$='测试1号2015']");
            for (var i = 0; i < nodes.length; i++){
                nodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
            }
        }
    },
    10);

window.addEventListener('pageshow', function (){
    console.log("pageshow")

	// document.getElementsByClassName('WB_cardwrap WB_feed_type S_bg2')[0].onmouseover = function(){
	// 	var myDate = new Date();
	// 	data.weibomouseover = myDate.getTime();
	// };

	// document.getElementsByClassName('WB_cardwrap WB_feed_type S_bg2')[0].onmouseout = function(){
	// 	var myDate = new Date();
	// 	data.weibomouseout = myDate.getTime();
	// 	data.totaltime += data.weibomouseout - data.weibomouseover;
	// };

	// document.getElementsByClassName('W_btn_b btn_22px W_btn_cardlink')[0].onclick = function(){
	// 	var myDate = new Date();
	// 	data.linkclick = myDate.getTime();
	// 	if (data.weibomouseout == null || data.weibomouseout < data.weibomouseover)
	// 		data.totaltime += data.linkclick - data.weibomouseover;	
 //        data.cmd = "post";
 //        chrome.runtime.sendMessage(data);
	// };

});


function getItem(item,callback){
  chrome.runtime.sendMessage({prop:item},function(response){
        callback(response);
  });
}

function recordTime(key){
    return function(key){
        var myDate = new Date();
        data[key] = myDate.getTime();
 }
}