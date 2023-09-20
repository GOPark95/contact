
<%--
  Created by IntelliJ IDEA.
  User: GOPark
  Date: 2021-02-08
  Time: 오후 6:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
    <head>
        <jsp:include page="common/headTag.jsp"/>
        <link href=" /resources/css/common/header.css" rel="stylesheet" />
        <link href=" /resources/css/home.css" rel="stylesheet">
        <title>Title</title>

    </head>
    <body>
    <div class="flex_container">
        <!--Nav : 왼쪽메뉴 -->
        <jsp:include page="common/sidebar.jsp"/>
        <!-- //Nav : 왼쪽메뉴 -->
        <div class="container">
            <!-- Header : 헤더 -->
            <jsp:include page="common/header.jsp"/>

            <!-- //Header : 헤더 -->
            <!-- section : 메인 -->
            <section class="main" id="section">
                <div class="wrap">
                    <div class="main_logo">
                        <img src="/resources/images/KRi_logo_s.png" alt="KRI 메인로고">
                    </div>
                </div>
            </section>
            <!-- //section : 메인 -->
            <!-- footer -->
        </div>
    </div>
    </body>
    <script src=" /resources/js/home.js"></script>
</html>
