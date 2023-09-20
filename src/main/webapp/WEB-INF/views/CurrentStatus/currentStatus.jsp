<%--
  Created by IntelliJ IDEA.
  User: GOPark
  Date: 2022-08-02
  Time: 오후 2:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
    <head>
        <jsp:include page="../common/headTag.jsp"/>
        <link href=" /resources/css/common/header.css" rel="stylesheet" />
        <link href=" /resources/css/contactStatus/contactStatus.css" rel="stylesheet">
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
                <!-- section : ct03 -->
                <section class="ct03" id="section">
                    <div class="wrap">
                        <div class="project_info" id="listStatus_form">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>
                                        현황별 카운트
                                        <button id="statusExcelBtn">엑셀 다운로드</button>
                                    </p>

                                </div>
                                <div class="btn_form">
                                    <button class="statusBtn" data-code="1">결과코드별</button>
                                    <button class="statusBtn" data-code="2">분류코드별</button>
                                    <button class="statusBtn" data-code="3">면접원별</button>
                                </div>
                                <div class="project_txt">
                                    <p>결과코드별 현황</p>
                                    <div class="text_flied variableForm">
                                        <table style="width: 100%;" id="resultCodeTB">
                                            <colgroup>
                                                <col width="20%">
                                                <col width="60%">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>결과코드값</th>
                                                    <th>결과코드명</th>
                                                    <th>부수</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>

                                    <p>분류코드별 현황</p>
                                    <div class="text_flied variableForm">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th rowspan="2">대분류</th>
                                                    <th rowspan="2">소분류</th>
                                                    <th>결과코드별 부수</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>

                                    <p>면접원별 현황</p>
                                    <div class="text_flied variableForm">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th rowspan="2">면접원명</th>
                                                    <th>결과코드별 부수</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="project_info" id="selectedList_form">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>리스트 결과값 변경</p>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <p class="title">리스트 검색</p>
                                        <div class="selectBox">
                                            <input type="text" id="SEARCH_TYPE" class="link-selected" value="" placeholder="타입을 선택해주세요." readonly>
                                            <ul>
                                            </ul>
                                            <i class="fas fa-angle-down searchAngle"></i>
                                        </div>
                                        <input type="text" name="typeName" id="SEARCHTEXT" placeholder="검색어 입력해주세요.">
                                        <button id="searchListBtn">검색</button>
                                        <button id="searchReset" style="margin: 0;">초기화</button>
                                    </div>
                                    <div class="project_name">
                                        <p class="title">검색된 리스트 <span class="searchList_count"></span></p>
                                        <div class="text_flied variableForm">
                                            <table id="searchListTB">
                                                <colgroup>
<%--                                                    <col width="5%">--%>
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th><input type="checkbox" id="allChk"></th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="project_name">
                                        <div class="listId_addForm">
                                            <button id="listId_add">추가</button>
                                        </div>
                                        <p class="title">선택되어 있는 리스트 <span class="selectedList_count"></span></p>
                                        <div class="text_flied variableForm" id="selectedListForm">
                                        </div>
                                    </div>
                                    <div class="btn_form">
                                        <div class="selectBox">
                                            <input type="text" id="changeResult" class="link-selected" value="" placeholder="변경할 결과코드를 선택해주세요." readonly>
                                            <ul>
                                            </ul>
                                            <i class="fas fa-angle-down searchAngle"></i>
                                        </div>
                                        <button id="changeResultBtn">변경</button>
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

                        <div class="loadingPopupWrap" >  <!--style="display: none;"-->
                            <div class="loadingBar">
                                <p><img src="/resources/images/loading.svg"></p>
                                <p>잠시만 기다려주세요..</p>
                            </div>
                        </div>

                    </div>
                </section>
                <!-- footer -->
    <%--            <jsp:include page="../common/footer.jsp"/>--%>

            </div>
        </div>
        <script src=" /resources/js/common/header.js"></script>
        <script src=" /resources/js/index.js"></script>
        <script src=" /resources/js/ContactStatus/contactStatus.js"></script>

    </body>
</html>
