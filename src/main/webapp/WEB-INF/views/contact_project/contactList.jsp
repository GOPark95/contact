<%--
  Created by IntelliJ IDEA.
  User: GOPark
  Date: 2021-02-15
  Time: 오후 1:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
    <head>
        <jsp:include page="../common/headTag.jsp"/>
        <link href=" /resources/css/common/header.css" rel="stylesheet" />
        <link href=" /resources/css/contact/contactList.css" rel="stylesheet">
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
                <!-- section : ct01 -->

                <section class="ct01" id="section">
                    <div class="wrap">
                        <div class="list_section">
                            <div class="list_sh_box">
                                <form action="/contactProject/Main" id="search_form" method="post">
                                    <label for="text01"><button type="button" class="search_icon"><img src="resources/images/search.png" alt=""></button></label>
                                    <input type="number" id="text01" name="SC" placeholder="프로젝트 코드" value="${sv.code}">
                                    <label for="text02"><button type="button" class="search_icon"><img src="resources/images/search.png" alt=""></button></label>
                                    <input type="text" id="text02" name="SN" placeholder="프로젝트 이름" value="${sv.name}">
                                    <button class="round_btn gray" type="button" id="reset">초기화</button>
                                </form>
                                <div class="btn_box">
                                    <button class="round_btn ">프로젝트 등록</button>
                                </div>
                            </div>

                            <div class="list_table">
                                <table>
                                    <caption></caption>
                                    <colgroup>
                                        <col width="10%">
                                        <col width="90%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>코드</th>
                                        <th>프로젝트명</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <c:choose>
                                            <c:when test="${empty cList}">
                                                <tr>
                                                    <td colspan="2">리스트가 존재하지 않습니다.</td>
                                                </tr>
                                            </c:when>
                                            <c:otherwise>
                                                <c:forEach var="cList" items="${cList}">
                                                    <tr class="list" data-project-name="${cList.name}" data-intranet-code="${cList.intranet_code}" data-intranet-name="${cList.intranet_name}" data-kon-code="${cList.kon_code}" data-kon-name="${cList.kon_name}">
                                                        <td>${cList.code}</td>
                                                        <td>${cList.name}</td>
                                                    </tr>
                                                </c:forEach>
                                            </c:otherwise>
                                        </c:choose>


                                    </tbody>
                                </table>
                            </div>
                            <div class="paging">
                                <ul>
                                    <c:url var="start" value="${ loc }">
                                        <c:param name="page" value="1"/>
                                        <c:if test="${sv.code ne null }"><c:param name="SC" value="${sv.code}"/></c:if>
                                        <c:if test="${sv.name ne null }"><c:param name="SN" value="${sv.name}"/></c:if>
                                    </c:url>
                                    <li><a class="prev_more" href="${ start }"><i class="fas fa-backward"></i></a></li>
                                    <!--10개씩 전 페이징  -->
                                    <c:url var="prev" value="${ loc }">
                                        <c:param name="page" value="${pi.startPage}"/>
                                        <c:if test="${sv.code ne null }"><c:param name="SC" value="${sv.code}"/></c:if>
                                        <c:if test="${sv.name ne null }"><c:param name="SN" value="${sv.name}"/></c:if>
                                    </c:url>
                                    <li><a class="prev" href="${ prev }"><i class="fas fa-caret-left"></i></a></li>
                                    <!-- 기본페이지 -->
                                    <c:forEach var="p" begin="${ pi.startPage }" end="${ pi.endPage }">
                                        <c:if test="${ p eq pi.currentPage }">
                                            <li><a class="on">${ p }</a></li>
                                        </c:if>
                                        <c:if test="${ p ne pi.currentPage }">
                                            <c:if test="${p ne 0}">
                                                <c:url var="pagination" value="${ loc }">
                                                    <c:param name="page" value="${ p }"/>
                                                    <c:if test="${sv.code ne null }"><c:param name="SC" value="${sv.code}"/></c:if>
                                                    <c:if test="${sv.name ne null }"><c:param name="SN" value="${sv.name}"/></c:if>
                                                </c:url>
                                                <li><a class="" href="${ pagination }">${ p }</a></li>
                                            </c:if>
                                        </c:if>
                                    </c:forEach>
                                    <!--10개씩 다음 페이징  -->
                                    <c:url var="next" value="${ loc }">
                                        <c:param name="page" value="${pi.endPage}"/>
                                        <c:if test="${sv.code ne null }"><c:param name="SC" value="${sv.code}"/></c:if>
                                        <c:if test="${sv.name ne null }"><c:param name="SN" value="${sv.name}"/></c:if>
                                    </c:url>
                                    <li><a class="next" href="${ next }"><i class="fas fa-caret-right"></i></a></li>
                                    <!--맨 끝으로 -->
                                    <c:url var="end" value="${ loc }">
                                        <c:param name="page" value="${ pi.maxPage }"/>
                                        <c:if test="${sv.code ne null }"><c:param name="SC" value="${sv.code}"/></c:if>
                                        <c:if test="${sv.name ne null }"><c:param name="SN" value="${sv.name}"/></c:if>
                                    </c:url>
                                    <li><a class="next_more" href="${ end }"><i class="fas fa-forward"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="project_info update" style="display: none;">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>프로젝트 정보</p>
                                </div>
                                <div class="btn_box">
                                    <button class="line option"><i class="fas fa-sliders-h"></i> 세부 옵션</button>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <p class="title">프로젝트명</p>
                                        <input type="text">
                                    </div>
                                    <div class="project_name">
                                        <p class="title">인트라넷 연동 프로젝트</p>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="btn_box center">
                                    <button class="square_btn line project_delete">프로젝트 삭제</button>
                                    <button class="square_btn default project_modify">수정</button>
                                    <!-- <button class="square_btn default">등록</button> -->
                                </div>
                            </div>
                        </div>
                        <div class="project_info insert" style="display: none;">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>프로젝트 정보</p>
                                </div>
                                <div class="btn_box">
                                    <button class="line option"><i class="fas fa-sliders-h"></i> 세부 옵션</button>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <p class="title">프로젝트명</p>
                                        <input type="text" id="projectName" autocomplete="off">
                                    </div>
                                    <div class="project_name">
                                        <p class="title">인트라넷 연동 프로젝트</p>
                                        <div class="selectBox">
                                            <input type="text" id="intranetProject" name="intranetProject" class="link-selected" value="" autocomplete="off">
                                            <ul>
                                            </ul>
                                            <i class="fas fa-angle-down searchAngle"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn_box center">
                                    <button class="square_btn default">등록</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- //section : ct01 -->
                <!-- footer -->
                <jsp:include page="../common/footer.jsp"/>

                <%--팝업창--%>
                <div class="popup_container" style="display: none;">
                    <div class="popup_wrap">
                        <div class="popup_body">
                            <div class="popup_content">
                                <div class="popup_title">
                                    <p>세부 옵션 <span class="closeBtn"><i class="fas fa-times"></i></span></p>
                                </div>
                                <div class="tabs">
                                    <ul>
                                        <li><a class="tab01 active">결과 코드</a></li>
                                        <li><a class="tab02">분류 코드</a></li>
                                        <li><a class="tab03">K-ON 연동</a></li>
                                    </ul>
                                </div>
                                <%--popup1--%>
                                <div class="tab01 tab_box">
                                    <div class="list_section">
                                        <div class="project_title">
                                            <p class="notice">
                                                <b> * 저장 안할 시, 내용 초기화 됩니다.</b>
                                            </p>
                                            <button class="line add round_btn">
                                                <i class="fas fa-plus"></i>추가하기
                                            </button>
                                        </div>
                                        <div class="list_table">
                                            <table>
                                                <caption></caption>
                                                <colgroup>
                                                    <col width="15%">
                                                    <col width="85%">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>결과 코드</th>
                                                        <th>결과 내용</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="btn_box">
                                            <button class="square_btn save">저장하기</button>
                                        </div>
                                    </div>
                                    <div class="project_box01">
                                        <div class="project_title">
                                            <p>미리보기</p>
                                        </div>
                                        <div class="box01">
                                            <table style="display: none;">
                                                <colgroup>
                                                    <col width="30%">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>결과 코드</th>
                                                        <th>결과 내용</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <%--popup2--%>
                                <div class="tab02 tab_box" style="display: none;">
                                    <div class="list_section">
                                        <div class="project_title">
                                            <p class="notice">* 리스트를 올리실 때는 첫째 줄에 꼭 헤더를 넣어주세요!</p>
                                            <button class="line add round_btn">
                                                <i class="fas fa-plus"></i>추가하기
                                            </button>
                                        </div>
                                        <div class="drop_box">
                                            <input type="file" id="uploadFile" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                            <p><i class="fas fa-cloud-upload-alt"></i> 첨부할 파일을 마우스로 끌어서 추가할 수 있습니다.</p>
                                        </div>
                                        <div id="fileList">
                                        </div>
                                        <div class="list_table">
                                            <table>
                                                <caption></caption>
                                                <colgroup>
                                                    <col width="30%">
                                                    <col width="50%">
                                                    <col width="30%">
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th>분류열</th>
                                                    <th>분류명</th>
                                                    <th>분류세팅</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colspan="3">파일을 업로드해주세요.</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="btn_box">
                                            <button class="square_btn save">저장하기</button>
                                        </div>
                                    </div>
                                    <div class="project_box01">
                                        <div class="project_title">
                                            <p>미리보기</p>
                                        </div>
                                        <div class="box01">
                                            <table style="display: none;">
                                                <colgroup>
                                                    <col width="30%">
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th>분류 코드</th>
                                                    <th>분류 내용</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab03 tab_box" style="display: none;">
                                    <div class="list_section">
                                        <div class="project_title">
                                            <p class="notice">
                                                <b>*주의사항</b><br>
                                                - 프로젝트를 선택 후, AutoCoding 원하시는 결과코드를 선택해주세요. <br>
                                                - K-ON 파일을 AutoCoding 하기 때문에 신중히 선택 부탁드립니다. <br>
                                                - 잘못 저장하셨다면, 꼭 데이터솔루션 팀에 문의 부탁드립니다.
                                            </p>
                                        </div>
                                        <div class="project_txt">
                                            <div class="project_name">
                                                <p class="title blue">K-ON 프로젝트 선택</p>
                                                <div class="select_box">
                                                    <div class="selectBox">
                                                        <input type="text" id="kon_intraProject" name="kon_intraProject" class="link-selected" value="" placeholder="K-ON 프로젝트 코드를 입력해주세요.">
                                                        <ul>
                                                            <li><a href='#' class='link-select'>프로젝트가 존재하지 않습니다.</a></li>
                                                        </ul>
                                                        <i class="fas fa-angle-down searchAngle"></i>
                                                    </div>
                                                    <p class="title blue">K-ON AutoCoding 선택</p>
                                                    <p class="sub_title">완료 (END)</p>
                                                    <div class="selectBox">
                                                        <input type="text" id="auto_end" name="autoCoding" class="link-selected" value="선택" readonly>
                                                        <ul>
                                                            <li><a href='#' class='link-select' data-code='' data-title=''>선택</a></li>
                                                        </ul>
                                                        <i class="fas fa-angle-down searchAngle"></i>
                                                    </div>
                                                    <p class="sub_title">스크린 (SCREEN)</p>
                                                    <div class="selectBox">
                                                        <input type="text" id="auto_screen" name="autoCoding" class="link-selected" value="선택" readonly>
                                                        <ul>
                                                            <li><a href='#' class='link-select' data-code='' data-title=''>선택</a></li>
                                                        </ul>
                                                        <i class="fas fa-angle-down searchAngle"></i>
                                                    </div>
                                                    <p class="sub_title">쿼터 (QUOTA)</p>
                                                    <div class="selectBox">
                                                        <input type="text" id="auto_quota" name="autoCoding" class="link-selected" value="선택" readonly>
                                                        <ul>
                                                            <li><a href='#' class='link-select' data-code='' data-title=''>선택</a></li>
                                                        </ul>
                                                        <i class="fas fa-angle-down searchAngle"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="btn_box">
                                                <button class="square_btn save">저장하기</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="project_box01">
                                        <div class="project_title">
                                            <p>미리보기</p>
                                        </div>
                                        <div class="box01">
                                            <table style="display: none;">
                                                <colgroup>
                                                    <col width="30%">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>K-ON 응답 상태</th>
                                                        <th>K-ON 연동 코드</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>완료 (END)</td>
                                                    </tr>
                                                    <tr>
                                                        <td>스크린 (SCREEN)</td>
                                                    </tr>
                                                    <tr>
                                                        <td>쿼터 (QUOTA)</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src=" /resources/js/common/header.js"></script>
        <script src=" /resources/js/index.js"></script>
        <script src=" /resources/js/contact/contactList.js"></script>
        <script>
            <%--$(function(){--%>
            <%--    let loginUser_type = "${loginUser.p_type}";--%>
            <%--})--%>

        </script>
    </body>
</html>
