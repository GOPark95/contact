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
        <link href=" /resources/css/CMS/cmsSet.css" rel="stylesheet">
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
                        <div class="project_info" id="emailBox">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>이메일 세팅</p>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <p class="title">메일 목록</p>
                                        <div class="selectBox">
                                            <input type="text" id="CMS_EMAIL_TYPE" class="link-selected" value="메일 제목을 선택해주세요." readonly>
                                            <ul>
                                                <li><a href='#' class='link-select' data-code='add' data-title=''>추가하기</a></li>
                                            </ul>
                                            <i class="fas fa-angle-down searchAngle"></i>
                                        </div>

                                    </div>
                                    <div class="project_name">
                                        <p class="title">메일 제목</p>
                                        <input type="text" name="typeName">
                                    </div>
                                    <div class="project_name">
                                        <p class="title">이메일에 사용할 변수 리스트</p>
                                        <div class="text_flied variableForm">
                                            <div class="variableHeader"><p>변수명</p><p>사용변수</p></div>
    <%--                                        <div class="variableList"><p>리스트아이디</p><p>[#리스트아이디#]</p></div>--%>
    <%--                                        <div class="variableList"><p>혈액형</p><p>[#혈액형#]</p></div>--%>
    <%--                                        <div class="variableList"><p>혈액형</p><p>[#혈액형#]</p></div>--%>
    <%--                                        <div class="variableList"><p>혈액형</p><p>[#혈액형#]</p></div>--%>
    <%--                                        <div class="variableList"><p>혈액형</p><p>[#혈액형#]</p></div>--%>
                                        </div>
                                    </div>
                                    <div class="project_name">
                                        <p class="title">발신자 이메일</p>
                                        <input type="text" name="sender">
                                    </div>
                                    <div class="project_name">
                                        <p class="title">이메일 내용</p>
                                        <textarea id="emailContent"></textarea>
                                    </div>
                                </div>
                                <div class="btn_box center">
                                    <div class="btn_box">
                                        <button class="square_btn line add_file gray_line">파일 첨부</button>
                                    </div>
                                    <div class="center">
                                        <button class="square_btn line green_line modify_btn email">수정하기</button>
                                        <button class="square_btn default add_btn email">추가하기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="project_info" id="smsBox">
                            <div class="project_box">
                                <div class="project_title">
                                    <p>문자 세팅</p>
                                </div>
                                <div class="project_txt">
                                    <div class="project_name">
                                        <p class="title">타입 목록</p>
                                        <div class="selectBox">
                                            <input type="text" id="CMS_SMS_TYPE" class="link-selected" value="타입을 선택해주세요." readonly>
                                            <ul>
                                                <li><a href='#' class='link-select' data-code='add' data-title=''>추가하기</a></li>
                                            </ul>
                                            <i class="fas fa-angle-down searchAngle"></i>
                                        </div>
                                    </div>
                                    <div class="project_name">
                                        <p class="title">타입명</p>
                                        <input type="text" name="typeName">
                                    </div>
                                    <div class="project_name">
                                        <p class="title">SMS에 사용할 변수 리스트</p>
                                        <div class="text_flied variableForm">
                                            <div class="variableHeader"><p>변수명</p><p>사용변수</p></div>
                                        </div>
                                    </div>
<%--                                    <div class="project_name">--%>
<%--                                        <p class="title">발신자 전화번호</p>--%>
<%--                                        <input type="text" name="sender">--%>
<%--                                    </div>--%>
                                    <div class="project_name">
                                        <p class="title">문자 내용</p>
                                        <textarea id="smsContent"></textarea>
                                    </div>
                                </div>
                                <div class="btn_box center">
                                    <div class="center">
                                        <button class="square_btn line green_line modify_btn sms">수정하기</button>
                                        <button class="square_btn default add_btn sms">추가하기</button>
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

                        <div class="filePopupWrap" style="display: none;">
                            <div class="popupContent">
                                <p>파일 업로드<i class="fas fa-times"></i></p>
                                <input type="file" id="uploadFile" multiple>
                                <input type="text" id="deleteFile" multiple>
                                <div class="drop_box">
                                    <p><i class="fas fa-cloud-upload-alt"></i> 첨부할 파일을 클릭하거나 마우스로 끌어서 추가할 수 있습니다.</p>
                                </div>
                                <div class="fileList">
                                    <p>파일리스트</p>
                                    <div class="fileListTB">
                                        <table>
                                            <colgroup>
                                                <col width="80%">
                                                <col width="20%">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>파일명</th>
                                                    <th>삭제</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
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
        <script src=" /resources/js/CMS/cmsSet.js"></script>
        <script src="https://ckeditor.com/apps/ckfinder/3.5.0/ckfinder.js"></script>

    </body>
</html>
