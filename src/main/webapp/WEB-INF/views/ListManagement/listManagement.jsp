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
        <link href=" /resources/css/Listmanagement/listManagement.css" rel="stylesheet">
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
                        <div class="project_info" id="listAdd_form">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>리스트 추가</p>
                                </div>
                                <div class="project_txt">
                                    <div class="btn_box">
                                        <input type="file" id="uploadFile" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                        <button class="square_btn line green_line" id="fileUpload">파일업로드</button>
                                        <button class="square_btn line green_line" id="listAddTypeForm">리스트추가</button>
                                        <button class="square_btn line green_line" id="ListFormDownload">양식다운</button>
                                    </div>
                                    <div class="project_name">
                                        <p class="title">업로드 리스트 <span class="currentList_count"></span></p>
                                        <div class="text_flied variableForm">
                                            <table id="listAdd_table">
                                                <colgroup></colgroup>
                                                <thead></thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="project_info" id="currentList_form">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>현재 리스트</p>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <p class="title">리스트 검색</p>
                                        <div class="selectBox">
                                            <input type="text" id="SEARCH_TYPE" class="link-selected" value="타입을 선택해주세요." readonly>
                                            <ul>
                                            </ul>
                                            <i class="fas fa-angle-down searchAngle"></i>
                                        </div>
                                        <input type="text" name="typeName" id="SEARCHTEXT" placeholder="검색어 입력해주세요.">
                                        <button id="searchListBtn">검색</button>
                                        <button id="searchReset" style="margin: 0;">초기화</button>
                                    </div>
                                    <div class="project_name">
                                        <p class="title">등록되어 있는 리스트 <span class="currentList_count"></span></p>
                                        <div class="text_flied variableForm">
                                            <table id="currentList_table">
                                                <colgroup></colgroup>
                                                <thead></thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
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

                        <div class="listAddPopupWrap" style="display: none;">
                            <div class="popupContent">
                                <p>리스트 추가방식 선택</p>
                                <p>
                                    <label><input type="radio" name="listAddType" value="add"> 추가</label>
                                    <label><input type="radio" name="listAddType" value="change"> 교체</label>
                                </p>
                                <div class="btn_Form">
                                    <button class="line square_btn green_line" id="saveBtn">저장</button>
                                    <button class="line square_btn " id="cancelBtn">닫기</button>
                                </div>
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
        <script src=" /resources/js/Listmanagement/listManagement.js"></script>

    </body>
</html>
