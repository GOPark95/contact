<%--
  Created by IntelliJ IDEA.
  User: GOPark
  Date: 2022-10-17
  Time: 오후 2:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
    <head>
        <jsp:include page="../common/headTag.jsp"/>
        <link href=" /resources/css/common/header.css" rel="stylesheet" />
        <link href=" /resources/css/contact/contactMatching.css" rel="stylesheet">
    </head>
    <body>
        <div class="flex_container">
            <!--Nav : 왼쪽메뉴 -->
            <jsp:include page="../common/sidebar.jsp"/>
            <!-- //Nav : 왼쪽메뉴 -->
            <div class="container">
                <!-- Header : 헤더 -->
                <jsp:include page="../common/header.jsp"/>
                <!-- //Header : 헤더 -->
                <!-- section : ct04 -->
                <section class="ct04" id="section">
                    <div class="wrap">
                        <div class="project_info">
                            <div class="project_box bd_2">
                                <div class="project_title">
                                    <p>분류코드 선택</p>
                                </div>
                                <div class="btn_box">
<%--                                    <button class="line round_btn gray_line">분류 추가</button>--%>
                                    <button class="default round_btn green" id="randomMove">컨택 이동</button>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <div class="text_flied h200">
                                            <p>프로젝트를 선택해주세요.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="project_box">
                                <div class="project_title">
                                    <p>리스트 검색</p>
                                </div>
                                <div class="btn_box">
                                    <button class="default round_btn green" id="listMove">컨택 이동</button>
                                </div>
                                <div class="project_name">
                                    <p class="title">리스트 아이디</p>
                                    <div class="list_sh_box bd_none">
                                        <label for="listSearch"><span class="search_icon search_100"><img src="/resources/images/search.png" alt="" class=""></span></label>
                                        <input type="text" id="listSearch" placeholder="" class="w100" >
                                        <input type="hidden" id="listId" placeholder="" class="w100" >
                                    </div>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <div class="text_flied h200">
                                            <p>리스트 아이디를 검색해주세요.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="project_info">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>현황 차트</p>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <p class="title">일자별 데이터</p>
                                        <div class="text_flied gray_bg" id="chart1"></div>
                                    </div>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <p class="title">결과코드별 현황</p>
                                        <div>
                                            <div class="text_flied" id="chart2"></div>
                                        </div>
                                    </div>
                                    <div class="project_name">
                                        <p class="title">면접원별 현황</p>
                                        <div class="text_flied" id="chart3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="infoPopupWrap" >  <!--style="display: none;"-->
                            <div>
                                <i class="fas fa-level-down-alt"></i>
                                <p>왼쪽 위의 목록에서</p>
                                <p>프로젝트를 선택해주세요.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <script src=" /resources/js/common/header.js"></script>
        <script src=" /resources/js/index.js"></script>
        <script src=" /resources/js/contact/contactMatching.js"></script>
        <script>


        </script>
    </body>
</html>
