<%--
  Created by IntelliJ IDEA.
  User: GOPark
  Date: 2021-02-02
  Time: 오후 2:53
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<nav id="nav">
    <div class="wrap">
        <a href="/home"><h1>Contact</h1></a>
        <ul>
            <c:if test="${loginUser.p_type eq '관리자'}"><li><a href="/contactProject/Main">프로젝트 리스트</a></li></c:if>
            <c:if test="${loginUser.p_type eq '관리자'}"><li><a href="/ListManagement/ListMain">리스트 관리</a></li></c:if>
            <c:if test="${loginUser.p_type eq '관리자'}"><li><a href="/contactCMS/SettingMain">이메일/문자 설정</a></li></c:if>
            <li><a href="/contact/MatchingView">컨택</a></li>
            <c:if test="${loginUser.p_type eq '관리자'}"><li><a href="/CurrentStatus/CSMain">현황</a></li></c:if>
<%--            <c:if test="${loginUser.p_type eq '관리자'}"><li><a href="">면접원 관리</a></li></c:if>--%>
        </ul>
    </div>
</nav>
