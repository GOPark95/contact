<%--
  Created by IntelliJ IDEA.
  User: GOPark
  Date: 2021-02-02
  Time: 오후 2:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <jsp:include page="WEB-INF/views/common/headTag.jsp"/>
  <link href=" /resources/css/index.css" rel="stylesheet">
  <title>Title</title>
</head>
<body>
<div class="container-fluid d-flex align-items-stretch justify-content-between p-4" id="container">
  <div id="loginWrap">
<%--    <div class="login-left">--%>
<%--      <p class="text-center"><img alt="" src="resources/images/KRI_logo2.png" width="60%"></p>--%>
<%--      <p class="text-center"><img alt="" src="resources/images/KRI_logo.png" width="60%"></p>--%>
<%--    </div>--%>
    <div class="top-border"></div>
    <div class="login-form">

      <h1 class="text-center">Contact</h1>
      <form class="text-center" action="/home" id="loginForm" method="post">
        <div class="login-input input-id">
          <i class="fas fa-user"></i>
          <input placeholder="ID" type="text" name="id" autocomplete=”off” spellcheck="false">
        </div>
        <div class="login-input input-password">
          <i class="fas fa-unlock-alt"></i>
          <input placeholder="Password" type="password" name="pwd" autocomplete=”off”>
        </div>
        <div class="remember-form text-left">
          <input type="checkbox" id="idRemember"> <label for="idRemember"><i></i> 아이디 기억</label>
        </div>
        <div class="login-btn-wrap">
          <button class="login-btn" type="button">Login</button>
        </div>
      </form>
<%--      <p class="Logininfo">--%>
<%--        <label class="star">*</label> 직원은 이메일, 컨택원은 이름을 입력해주세요.<br>--%>
<%--        <label class="star">*</label> 등록된 정보가 없을 시, 관리자에게 문의 주세요.--%>
<%--      </p>--%>
      <p class="text-center error-form" ><label id="errorMsg">등록된 정보가 없습니다.</label></p>
    </div>
  <p class="text-center imageForm"><img src="/resources/images/KRI_logo.png" width="20%"> <img src="/resources/images/KRI_logo2.png" width="20%"></p>
  </div>

</div>
<script src=" /resources/js/index.js"></script>
<script>
  function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
  }

  function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if (start != -1) { // 쿠키가 존재하면
      start += cookieName.length;
      var end = cookieData.indexOf(';', start);
      if (end == -1) // 쿠키 값의 마지막 위치 인덱스 번호 설정
        end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
  }

  function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
  }

  $(function(){
      var cookie_id = getCookie("key");
      if(cookie_id != ""){
        $(".login-input input:eq(0)").val(cookie_id);
        $("#idRemember").prop("checked", true);
      }
  })
  $(".login-input input").on(
    {focus: function(){
        $(this).closest("div").addClass("active");
      },focusout: function(){
        $(this).closest("div").removeClass("active");
    }
  })

  //엔터시 로그인 클릭
  $(".login-input input").on("keyup", function(e){
    if(e.keyCode == 13) $(".login-btn").click()
  })
  /*로그인*/
  $(".login-btn").on("click", function(){
    var id = $("input[name=id]").val();
    var pwd = $("input[name=pwd]").val();
    <%--var ipaddress='<%=request.getRemoteAddr()%>';--%>

    // if(ipaddress.substring(0,6) !== "10.10." && ipaddress.substring(0,6) !== "0:0:0:" && ipaddress.substring(0,6) != "127.0."){
    //   alert("외부에서는 접속이 불가능합니다.");
    //   return;
    // }

    /*로그인 검사*/
    if(id === ''){
      $("input[name=id]").focus();
      msg_popup("아이디를 입력해주세요.");
      return;
    }

    if(pwd === ''){
      $("input[name=pwd]").focus();
      msg_popup("비밀번호를 입력해주세요.");
      return;
    }

    //로그인 정보 확인
    $.ajax({
      url: '/login',
      data: {
        "id":id,
        "pwd":pwd
      },
      success: function(data){
        if(data === '1'){
          if($("#idRemember").is(":checked")) setCookie("key", id, 7);
          else deleteCookie("key");
          $("#loginForm").submit();
        }else{
          msg_popup("등록된 정보가 없습니다.");
        }

      }, error: function(xhr, option, error){
        console.log(xhr);
      }

    })
  })

  /*메시지 팝업*/
  function msg_popup(t){
    $("#errorMsg").text(t);
    $("#errorMsg").hide();
    $("#errorMsg").fadeIn();

    setTimeout(function(){
      $("#errorMsg").fadeOut();
    }, 3000);
  }

</script>
</body>
</html>
