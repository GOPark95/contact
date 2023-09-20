<%--
  Created by IntelliJ IDEA.
  User: GOPark
  Date: 2021-02-13
  Time: 오후 1:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- 팝업창 --%>
<header>
    <div class="header">
        <div class="wrap">
            <div class="selectBox">
                <input type="text" id="PROJECT_LIST" class="link-selected" value="프로젝트를 선택해주세요." readonly>
                <ul>
                    <c:choose>
                        <c:when test="${empty cList}">
                            <li><a href="#" class="link-select" data-code="" data-title="">리스트가 존재하지 않습니다.</a></li>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="cList" items="${cList}">
                                <li><a href="#" class="link-select" data-code="${cList.code}" data-title="${cList.name}">[${cList.code}] / [${cList.intranet_code}] - ${cList.name}</a></li>
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </ul>
                <i class="fas fa-angle-down searchAngle"></i>
            </div>
            <div class="logout_box">
                <div class="user_name"><p>안녕하세요,<span>${loginUser.p_name}<input type="hidden" id="user_type" value="${loginUser.p_type}"></span>님!</p></div>
                <button class="logout_btn" onclick="location.href='/logout'">logout</button>
            </div>
        </div>
    </div>
</header>

<script>
    $(function(){
        //selectbox 목록 클릭 시, 세팅
        // $(document).on('click', '.link-select', function(){
        //     var dv = $(this).attr('data-value');
        //     var dc = $(this).attr('data-code');
        //     var dti = $(this).attr('data-title');
        //     var dt = $(this).text();
        //
        //     if(dv != "N"){
        //         $(this).parents('.selectBox').find('input').attr('data-value',dv);
        //         $(this).parents('.selectBox').find('input').attr('data-code',dc);
        //         $(this).parents('.selectBox').find('input').attr('data-title',dti);
        //         $(this).parents('.selectBox').find('input').val(dt);
        //     }else{
        //         $(this).parents('.selectBox').find('input').attr('data-value', "");
        //         $(this).parents('.selectBox').find('input').attr('data-code', "");
        //         $(this).parents('.selectBox').find('input').attr('data-title', "");
        //         $(this).parents('.selectBox').find('input').val(dt);
        //     }
        //
        //     $(this).parents('ul').siblings('.fa-angle-down').removeClass('rotate-angle');
        //     $(this).parents('ul').hide();
        // })

        //K-ON 연동 selectBox 처리
        $(".header .selectBox>input").on("click", function(){
            $(this).siblings("ul").toggle();
            if($(this).siblings("ul").is(":visible")){
                $(this).siblings('.fa-angle-down').addClass('rotate-angle');
            }else{
                $(this).siblings('.fa-angle-down').removeClass('rotate-angle');
            }
        })
    });



</script>