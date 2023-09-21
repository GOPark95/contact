<%--
  Created by IntelliJ IDEA.
  User: GOPark
  Date: 2022-10-26
  Time: 오후 3:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
    <head>
        <jsp:include page="../common/headTag.jsp"/>
        <link href=" /resources/css/common/header.css" rel="stylesheet" />
        <link href=" /resources/css/contact/contact.css" rel="stylesheet">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
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
                            <div class="project_box">
                                <div class="project_title">
                                    <p>개인정보 리스트
                                        <button class="line square_btn blue_line" id="contactMatchingBtn">컨택페이지 이동</button>
                                        <button class="line square_btn blue_line" id="contactRestart">재컨택</button>
                                    </p>
                                </div>
                                <div class="list_table" id="infoTable">
                                    <table>
                                        <colgroup>
                                            <col width="30%">
                                            <col width="60%">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>항목</th>
                                                <th>내용</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <c:choose>
                                                <c:when test="${empty dList}">
                                                    <tr>
                                                        <td colspan="2">리스트가 존재하지 않습니다.</td>
                                                    </tr>
                                                </c:when>
                                                <c:otherwise>
                                                    <c:forEach var="dList" items="${dList}">
                                                        <tr>
                                                            <td>${dList.list_header}</td>
                                                            <c:choose>
                                                                <c:when test="${dList.list_type == '리스트아이디'}">
                                                                    <td><span>${dList.list_data}</span><input type="hidden" id="listId" value="${dList.list_data}"></td>
                                                                </c:when>
                                                                <c:otherwise>
                                                                    <td><span>${dList.list_data}</span><input type="text" class="modifyInput" data-before="${dList.list_data}" data-order="${dList.list_order}" value="${dList.list_data}"></td>
                                                                </c:otherwise>
                                                            </c:choose>

                                                        </tr>
                                                    </c:forEach>
                                                </c:otherwise>
                                            </c:choose>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="btn_box flex_center mt20">

                                    <button class="line square_btn green_line" id="infoModifyBtn">수정하기</button>
                                    <button class="square_btn" id="modifySave">저장하기</button>
                                    <button class="square_btn gray_line" id="modifyCancel">취소하기</button>
                                </div>
                            </div>
                            <div class="tabs bg_w mt20 leftTab">
                                <ul>
                                    <li><a data-tab="1" class="tab01 tab_selected">결과코드 기록</a></li>
                                    <li><a data-tab="2" class="tab01">개인정보 수정</a></li>
                                </ul>
                            </div>
                            <div class="tab04 leftTab_tableForm">

                                <div class="list_table" id="resultCode_logTable">
                                    <table>
                                        <caption></caption>
                                        <colgroup>
                                            <col width="30%">
                                            <col width="10%">
                                            <col width="25%">
                                            <col width="35%">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>저장 일시</th>
                                                <th>입력자</th>
                                                <th>결과코드명</th>
                                                <th>메모사항</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <c:choose>
                                                <c:when test="${empty rlList}">
                                                    <tr>
                                                        <td colspan="4">결과코드 기록이 존재하지 않습니다.</td>
                                                    </tr>
                                                </c:when>
                                                <c:otherwise>
                                                    <c:forEach var="rlList" items="${rlList}">
                                                        <tr>
                                                            <td>${rlList.result_date}</td>
                                                            <td>${rlList.name}</td>
                                                            <td>${rlList.resultCode}</td>
                                                            <td>${rlList.content}</td>
                                                        </tr>
                                                    </c:forEach>
                                                </c:otherwise>
                                            </c:choose>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="list_table" id="infoModify_logTable">
                                    <table>
                                        <caption></caption>
                                        <colgroup>
                                            <col width="30%">
                                            <col width="20%">
                                            <col width="25%">
                                            <col width="25%">
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th>수정 일시</th>
                                            <th>항목</th>
                                            <th>변경전</th>
                                            <th>변경후</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <c:choose>
                                            <c:when test="${empty cmList}">
                                                <tr>
                                                    <td colspan="4">수정 기록이 존재하지 않습니다.</td>
                                                </tr>
                                            </c:when>
                                            <c:otherwise>
                                                <c:forEach var="cmList" items="${cmList}">
                                                    <tr>
                                                        <td>${cmList.modify_date}</td>
                                                        <td>${cmList.list_type}</td>
                                                        <td>${cmList.before_data}</td>
                                                        <td>${cmList.after_data}</td>
                                                    </tr>
                                                </c:forEach>
                                            </c:otherwise>
                                        </c:choose>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="project_info">
                            <div class="project_box" id="resultAdd_Form">
                                <div class="project_title">
                                    <p>컨택결과</p>
                                    <div class="selectBox">
                                        <input type="text" id="RESULT_LIST" class="link-selected" value="결과코드를 선택해주세요." readonly>
                                        <ul>
                                            <c:choose>
                                                <c:when test="${empty rList}">
                                                    <li><a class="link-select" data-code="" data-title="">${rList}</a></li>
                                                </c:when>
                                                <c:otherwise>
                                                    <c:forEach var="rList" items="${rList}">
                                                        <c:if test="${rList.rcode ne 0}"><li><a class="link-select" data-code="${rList.rcode}" data-title="${rList.rname}">${rList.rname}</a></li></c:if>
                                                    </c:forEach>
                                                </c:otherwise>
                                            </c:choose>
                                        </ul>
                                        <i class="fas fa-angle-down searchAngle"></i>
                                    </div>
                                </div>
                                <div class="text_flied resultTextForm"><textarea name="resultText" placeholder="메모사항을 입력해주세요."></textarea></div>
                                <div class="list_sh_box flex_center bd_none">
                                    <div class="btn_box ">
                                        <button class="round_btn gray" id="resultSave">컨택결과 추가</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="tabs blue bg_w rightTab">
                                    <ul>
                                        <li><a data-tab="1" class="tab02 tab_selected">통화 걸기</a></li>
                                        <li><a data-tab="2" class="tab02">이메일 발송</a></li>
                                        <li><a data-tab="3" class="tab02">문자 발송</a></li>
                                    </ul>
                                </div>
                                <div class="tab04 rightTab_tableForm">
                                    <div class="list_table" id="call_logTable">
                                        <div class="list_sh_box bd_none">
                                            <div class="btn_box ">
                                                <button class="round_btn green txt_send" id="callSendBtn"><i class="fas fa-phone-square-alt"></i> 전화 걸기</button>
                                            </div>
                                        </div>
                                        <p class="sub_title">통화 기록 (최근순)</p>
                                        <table>
                                            <colgroup>
                                                <col width="30%">
                                                <col width="20%">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>통화일시</th>
                                                <th>통화시간</th>
                                                <th>발신자(수신 전화번호)</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <c:choose>
                                                <c:when test="${empty clList}">
                                                    <tr>
                                                        <td colspan="3">통화기록이 존재하지 않습니다.</td>
                                                    </tr>
                                                </c:when>
                                                <c:otherwise>
                                                    <c:forEach var="clList" items="${clList}">
                                                        <tr>
                                                            <td>${clList.call_date}</td>
                                                            <td>${clList.callTime}</td>
                                                            <td>${clList.name} (${clList.callNumber})</td>
                                                        </tr>
                                                    </c:forEach>
                                                </c:otherwise>
                                            </c:choose>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="list_table" id="email_logTable">
                                        <div class="list_sh_box bd_none">
                                            <div class="btn_box ">
                                                <button class="round_btn green txt_send" id="emailSendBtn"><i class="fas fa-envelope-open-text"></i> 이메일 발송</button>
                                            </div>
                                        </div>
                                        <p class="sub_title">이메일 발송 기록 (최근순)</p>
                                        <table>
                                            <caption></caption>
                                            <colgroup>
                                                <col width="33%">
                                                <col width="33%">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>발송일시</th>
                                                <th>수신자</th>
                                                <th>발신자(발신 이메일)</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <c:choose>
                                                    <c:when test="${empty selList}">
                                                        <tr>
                                                            <td colspan="3">이메일 발송기록이 존재하지 않습니다.</td>
                                                        </tr>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <c:forEach var="selList" items="${selList}">
                                                            <tr>
                                                                <td>${selList.send_date}</td>
                                                                <td>${selList.receiver}</td>
                                                                <td>${selList.name} (${selList.sender})</td>
                                                            </tr>
                                                        </c:forEach>
                                                    </c:otherwise>
                                                </c:choose>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="list_table" id="sms_logTable">
                                        <div class="list_sh_box bd_none">
                                            <div class="btn_box ">
                                                <button class="round_btn green txt_send" id="smsSendBtn"><i class="fas fa-envelope-open"></i> 문자 발송</button>
                                            </div>
                                        </div>
                                        <p class="sub_title">문자 발송 기록 (최근순)</p>
                                        <table>
                                            <caption></caption>
                                            <colgroup>
                                                <col width="33%">
                                                <col width="33%">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>발송일시</th>
                                                    <th>수신자</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:choose>
                                                    <c:when test="${empty sslList}">
                                                        <tr>
                                                            <td colspan="3">문자 발송기록이 존재하지 않습니다.</td>
                                                        </tr>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <c:forEach var="selList" items="${sslList}">
                                                            <tr>
                                                                <td>${selList.send_date}</td>
                                                                <td>${selList.receiver}</td>
                                                            </tr>
                                                        </c:forEach>
                                                    </c:otherwise>
                                                </c:choose>
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <%--이메일 팝업--%>
                <div class="popup_container" id="email_popup" style="display: none;"> <%--display: none;--%>
                    <div class="popup_wrap">
                        <div class="popup_body">
                            <div class="popup_content">
                                <div class="title">
                                    <p>이메일 보내기 <span class="closeBtn"><i class="fas fa-times"></i></span></p>
                                </div>
                                <%--세팅한 이메일 타입--%>
                                <div class="selectBox">
                                    <input type="text" id="emailType" class="link-selected" value="이메일 타입을 선택해주세요." readonly>
                                    <ul>
                                        <c:choose>
                                            <c:when test="${empty cmsList}">
                                                <li><a class="link-select" data-code="" data-title="">${rList}</a></li>
                                            </c:when>
                                            <c:otherwise>
                                                <c:forEach var="cmsList" items="${cmsList}">
                                                    <c:if test="${cmsList.cmsType eq 'EMAIL'}">
                                                        <li><a class="link-select" data-code="${cmsList.code}" data-title="${cmsList.name}">${cmsList.name}</a></li>
                                                    </c:if>
                                                </c:forEach>
                                            </c:otherwise>
                                        </c:choose>
                                    </ul>
                                    <i class="fas fa-angle-down searchAngle"></i>
                                </div>
                                <%--등록된 이메일 리스트--%>
                                <div class="selectBox">
                                    <input type="text" id="emailList" class="link-selected" value="보내실 이메일을 선택해주세요." readonly>
                                    <ul>
                                        <c:forEach var="dList" items="${dList}">
                                            <c:if test="${dList.list_type eq '이메일'}">
                                                <li><a class="link-select" data-code="${dList.list_data}" data-title="${dList.list_data}">${dList.list_data}</a></li>
                                            </c:if>
                                        </c:forEach>
                                    </ul>
                                    <i class="fas fa-angle-down searchAngle"></i>
                                </div>

                                <div class="emailContent">
                                    <p class="empty">타입을 선택해주세요.</p>
                                </div>
                                <input type="hidden" id="emailsubject">
                                <input type="hidden" id="emailsender">
                                <input type="hidden" id="emailmailfile">
                                <div class="btn_Form">
                                    <button class="line square_btn blue_line" id="emailSend">발송</button>
                                    <button class="line square_btn " id="emailCancel">닫기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--이메일 발신 로딩--%>
                    <div class="loadingForm">
                        <div class="loadingBar">
                            <p><img src="/resources/images/loading.svg"></p>
                            <p>이메일 발송중입니다</p>
                        </div>
                    </div>
                </div>

                <%--전화걸기 팝업--%>
                <div class="popup_container" id="call_popup" style="display: none;"> <%--display: none;--%>
                    <div class="popup_wrap">
                        <div class="popup_body">
                            <div class="popup_content">
                                <div class="title">
                                    <p>전화 걸기<span class="closeBtn"><i class="fas fa-times"></i></span></p>
                                </div>
                                <%--등록된 전화번호 리스트--%>
                                <div class="selectBox">
                                    <input type="text" id="phoneList" class="link-selected" value="통화하실 전화번호를 선택해주세요." readonly>
                                    <ul>
                                        <c:forEach var="dList" items="${dList}">
                                            <c:if test="${dList.list_type eq '전화번호'}">
                                                <li><a class="link-select" data-code="${dList.list_data}" data-title="${dList.list_data}">${dList.list_data}</a></li>
                                            </c:if>
                                        </c:forEach>
                                    </ul>
                                    <i class="fas fa-angle-down searchAngle"></i>
                                </div>

                                <div class="callContent">
                                    <p id="callTime">00:00</p>
                                </div>

                                <input type="hidden" readonly  name="loginid" id="loginid" value="${cv.client_id}">
                                <input type="hidden" readonly  name="extension" id="extension" value="${cv.internal_no}">
                                <input type="hidden" readonly  name="ani_num" id="ani_num" value="${cv.external_no}" title='발신 번호'>
<%--                                <input type="hidden" readonly  name="dn" id="dn" value="${cv.external_no}">--%>

                                <div class="btn_Form">
                                    <button class="line square_btn blue_line" id="callSend">통화걸기</button>
                                    <button class="line square_btn " id="callCancel">통화끊기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <%--문자 팝업--%>
                <div class="popup_container" id="sms_popup" style="display: none;"> <%--display: none;--%>
                    <div class="popup_wrap">
                        <div class="popup_body">
                            <div class="popup_content">
                                <div class="title">
                                    <p>문자 보내기<span class="closeBtn"><i class="fas fa-times"></i></span></p>
                                </div>
                                <%--세팅한 이메일 타입--%>
                                <div class="selectBox">
                                    <input type="text" id="smsType" class="link-selected" value="문자 타입을 선택해주세요." readonly>
                                    <ul>
                                        <c:forEach var="cmsList" items="${cmsList}">
                                            <c:if test="${cmsList.cmsType eq 'SMS'}">
                                                <li><a class="link-select" data-code="${cmsList.code}" data-title="${cmsList.name}">${cmsList.name}</a></li>
                                            </c:if>
                                        </c:forEach>
                                    </ul>
                                    <i class="fas fa-angle-down searchAngle"></i>
                                </div>
                                <%--등록된 문자 리스트--%>
                                <div class="selectBox">
                                    <input type="text" id="smsList" class="link-selected" value="보내실 번호를 선택해주세요." readonly>
                                    <ul>
                                        <c:forEach var="dList" items="${dList}">
                                            <c:if test="${dList.list_type eq '전화번호'}">
                                                <li><a class="link-select" data-code="${dList.list_data}" data-title="${dList.list_data}">${dList.list_data}</a></li>
                                            </c:if>
                                        </c:forEach>
                                    </ul>
                                    <i class="fas fa-angle-down searchAngle"></i>
                                </div>

                                <div class="smsContent">
                                    <p class="empty">타입을 선택해주세요.</p>
                                </div>
                                <input type="hidden" id="smssubject">
                                <input type="hidden" id="smssender">
                                <div class="btn_Form">
                                    <button class="line square_btn blue_line" id="smsSend">발송</button>
                                    <button class="line square_btn " id="smsCancel">닫기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--문자 발신 로딩--%>
                    <div class="loadingForm">
                        <div class="loadingBar">
                            <p><img src="/resources/images/loading.svg"></p>
                            <p>문자 발송중입니다</p>
                        </div>
                    </div>
                </div>

                <!-- footer -->
<%--                <jsp:include page="../common/footer.jsp"/>--%>

            </div>
        </div>
        <script src=" /resources/js/common/header.js"></script>
        <script src=" /resources/js/index.js"></script>
        <script src=" /resources/js/contact/contact.js"></script>
        <script>

        </script>
    </body>
</html>
