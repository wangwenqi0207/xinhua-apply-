!(function($) {
  document.documentElement.style.fontSize =
    document.documentElement.clientWidth / 7.5 + "px";
  $(".topcontainer").load("./header.html");
  $(".footercontainer").load("./footer.html");
})(jQuery);
// 接口地址
// var queryUrl = "http://192.168.1.187:4280/insurance-intact-web";
// var globalUrl = "http://192.168.1.187:4280/upload";
// var queryUrl = "http://ecare.tpddns.cn:8081/insurance-intact-web";
// var globalUrl = "http://ecare.tpddns.cn:8081/upload";
var queryUrl = "http://ecare.tpddns.cn:8081/xinhua-intact-web/";
var globalUrl = "http://ecare.tpddns.cn:8081/upload";
// var queryUrl = "http://192.168.1.203:6104/xinhua_intact_web";
// var globalUrl = "http://192.168.1.203:6104/upload";

// // 定义事件侦听器函数

function displayWindowSize(){
  // 获取窗口的宽度和高度，不包括滚动条
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;
  // console.log("宽: " + w + ", " + "高: " + h)
  console.log(w,h)
  if(w<=1024){
    document.getElementsByTagName("body")[0].style.width=1024+"px";
    window.resizeTo(1024+'px',800+'px');
  }else{
    document.getElementsByTagName("body")[0].style.width=document.documentElement.clientWidth+"px";
  }
}
// 将事件侦听器函数附加到窗口的resize事件
window.addEventListener("resize", displayWindowSize);
// 第一次调用该函数
displayWindowSize();
// 点击登录函数
function clickLogin() {
  var checkStatus=$('#remember').is(':checked');
  
  var $loginName = $("#inputName").val();
  var $loginPwd = $("#inputPassword").val();
  if(checkStatus){
    $.cookie("rememberName", $loginName, {path: '/',expires: 7});
    $.cookie("rememberPwd", $loginPwd, {path: '/',expires: 7 });
  }else{
    $.cookie("rememberName", null, {path: '/',expires: -1});
    $.cookie("rememberPwd", null, {path: '/',expires: -1});
  }
  var data = {
    loginName: $loginName,
    loginPwd: $loginPwd
  };
  $.ajax({
    type: "POST",
    url: queryUrl+"/loginByPwd",
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    dataType: "json",
    success:function(res){
      if (res.resultCode=="000000") {
        $.cookie("loginName", $loginName, {path: '/' }); 
        tip('登录成功~');         
        $('.loginInBtn').hide();
        $('.loginOutBtn').show();
        $('.topnavbarright li:nth-child(1)').addClass("current").siblings().removeClass('current')//li 标签current 属性          
        $(".mask").hide();
        $(".login_btn").hide();
        $(".out_btn").show();
        $('#userNameTxt').html('申请窗口测试');
        $('#headerImg').attr('src','././images/header.png');
      }else{
        tip(res.resultMsg);
      }
    },
    error:function(){
      tip('登录失败，服务器无响应！')
    }
  }
    );
}

!(function($) {
    if($.cookie('loginName')){
          
    }else{  
      console.log(window.location);
        if(window.location.href!=(window.location.origin+'/xinhua-web/')){
          window.location.href=window.location.origin+'/xinhua-web/';
        }      
    }
  window.onload = function(){
    var userNameTxt="申请窗口测试";
    if ($.cookie("loginName")) {
      $(".mask").hide();
      $(".login_btn").hide();
      $(".out_btn").show();
      $('#userNameTxt').html(userNameTxt);
      $('#headerImg').attr('src','./images/header.png');
    } else {
      $(".login_btn").show();
      $(".out_btn").hide();     
    }
    if($('#loginClose')){
        $('#loginClose').on('click',function(){
          $('.mask').hide();
        });
    }
  
    $("#loginButton").on("click",clickLogin);
   
}
})(jQuery);
