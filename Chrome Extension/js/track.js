var data = {
    mouseenter:null,
    mouseleave:null,
    totaltime:0,
    xiangmai:false,
    goumai:false,
    guanzhu:false,
    url : window.location.href,
};



    var myDate = new Date();
    data.mouseenter = myDate.getTime();

// window.onpageshow = function () {
    console.log("track");

    function getItem(item,callback){
      chrome.runtime.sendMessage({prop:item},function(response){
            callback(response);
      });
    }

    for (var i=0;i < 2; i++){
        var element = document.getElementsByClassName("unfancied")[i];
        element.onclick = function(){
            for (var i=0;i < 2; i++){
                var e = document.getElementsByClassName("unfancied")[i];
                if (e.innerText == "想买"){
                    e.innerHTML = '<i class="fa fa-heart-o"></i>已想买';
                    data.xiangmai = true;
                }else{
                    e.innerHTML = '<i class="fa fa-heart-o"></i>想买';
                    data.xiangmai = false;
                }
            }
        };
    }

    for (var i=0;i < 2; i++){
        var element = document.getElementsByClassName("unowned")[i];
        element.onclick = function(){
            for (var i=0;i < 2; i++){
                var e = document.getElementsByClassName("unowned")[i];
                if (e.innerText == "关注"){
                    e.innerHTML = '<i class="fa fa-check-circle-o"></i><i class="fa fa-circle-o"></i>已关注';
                    data.guanzhu = true;
                }else{
                    e.innerHTML = '<i class="fa fa-check-circle-o"></i><i class="fa fa-circle-o"></i>关注';
                    data.guanzhu = false;
                }
            }
        };
    }

    for (var i=0;i < 2; i++){
        var element = $("li.add_to_list")[i];
        element.onclick = function(){
            data.goumai = true;
            alert("抱歉，该产品目前只供内测用户购买！");
        };
    }

    window.onunload = function(){
        var myDate = new Date();
        data.mouseleave = myDate.getTime();
        data.totaltime += data.mouseleave - data.mouseenter;
        data.cmd = "track";
        chrome.runtime.sendMessage(data);
    };

   getItem("product", function(param){
        if (param.xiangmai == "true")
            for (var i=0;i < 2; i++){
                var element = document.getElementsByClassName("unfancied")[i];
                element.click();
                break;
            }
        if (param.guanzhu == "true")
            for (var i=0;i < 2; i++){
                var element = document.getElementsByClassName("unowned")[i];
                element.click();
                break;
            }

    });


// }