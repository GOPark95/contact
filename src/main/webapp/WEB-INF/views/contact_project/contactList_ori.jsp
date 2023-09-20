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
        <title>Title</title>
    </head>
    <style>
        .search-back{
            width: 83%; height: 50px;
            border: 1px solid #dedede; border-radius: 5px;
            background-color: #3d67b5;
            margin: 2% 0;
        }

        .search-back .search-form{
            background-color: #f7f7f7;
            height: 100%;
            margin: 0 10px;
        }
        .search-back .search-area{
            padding: 0 2%;
        }
        .search-back .title{
            color: #000;
            font-size: 13px;
            height: 15px;
            font-family: NotoSans-Regular;
            background-color: #fff;
            padding: 6px 10px;
            border: 1px solid #969696;
            border-radius: 3px 0 0 3px;
            border-right: 0;
            line-height: 50px;
        }
        .search-back .search-input{
            font-size: 13px;
            padding: 6px 10px;
            border: 1px solid #969696;
            border-radius: 0 3px 3px 0;
        }
        .search-back .search-area button{
            border: 0;
            background-color: #3d67b5;
            color: #fff; font-weight: bold;
            padding: 6px 10px;
            border-radius: 3px;
            margin-left: 10px;
        }
        .left-box{
            padding: 1% 1%;
            /*max-height: 100%;*/
            /*overflow-y: scroll;*/
        }

        #contact_list_form{
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0 5px;
            border-top: 1px solid #c3c3c3;
            border-bottom: 1px solid #c3c3c3;

        }
        #contact_list_form thead th{
            height: 50px;
            color: #fff;
            line-height: 50px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            background-color: #3d67b5;
        }
        #contact_list_form tbody td{
            height: 40px; line-height: 40px;
            color: #000;
            border-top: 1px solid #c3c3c3;
            border-bottom: 1px solid #c3c3c3;
            text-align: center;
            font-size: 14px; font-weight: bold;
        }
        #contact_list_form tbody tr:nth-child(even){
            background-color: #dee8f9;
        }

        #contact_list_form tbody tr:first-child td{
            border-top: 1px solid #c3c3c3;
        }

        #contact_list_form tbody tr:last-child td{
            border-bottom: 0;
        }

        #contact_list_form tbody tr{
            position: relative;
        }

        #contact_list_form tbody tr:hover{
            border-left: 3px solid #3d67b5;
            background-color: #becce4;
            cursor: pointer;
        }

        .pg-form{
            text-align: center;
            width: 92%;
            margin: 0 auto;
            margin-top: 2%;
        }

        .pg_page{
            display: inline-block;
            vertical-align: middle;
            background: #d8d8d8;
            color: #959595;
            font-size: 1.083em;
            height: 30px;
            line-height: 28px;
            min-width: 30px;
            text-decoration: none;
            border-radius: 3px;
        }

        .pg_page:hover{
            background-color: #3d67b5;
            color: #fff;
            cursor: pointer;
        }
        .pg_page svg{
            height: 30px;
        }
        /*footer*/
        .footer{
            min-width: 100%;
            height: 63px;
            background-color: #212227;
            color: #8e8f97;
        }
        .footer ul li {
            float: left;
            padding: 5px;
            margin-right: 50px;
        }
        .copyright{
            font-size: 9px;
            line-height: 15px;
        }
        .right-box ul li h2{
            position: absolute;
            top: -3px;
            left: -7px;
            padding: 0 15px;
            min-width: 132px;
            border-radius: 2px;
            box-sizing: border-box;
            background: #3d67b5;
            font-weight: bold;
            font-size: 15px;
            color: #fff;
            line-height: 35px;
            text-align: center;
        }
        .right-box ul li h2:after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0px;
            height: 0px;
            border-top: 6px solid #345494;
            border-left: 6px solid transparent;
        }

        .list-title{
            padding: 2%;
            font-size: 17px;
            font-weight: bold;
        }
        .list-info{
            padding: .5rem 1rem;
            text-decoration: none;
        }


        /*select box*/
        .selectBox {
            position: relative;
            display: block;
            width: 100%;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border-radius: .25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }

        .selectBox > a {
            color: #000;
            font-size: 13px;
            z-index: 5;
            font-family: NotoSans-Regular;
            width: 100%;
            height: 15px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }

        .selectBox ul {
            display: none;
            position: absolute;
            top: 38px;
            left: -1px;
            background-color: #fff;
            border-radius: 3px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.19), 0 0px 6px rgba(0, 0, 0, 0.23);
            width: 100%;
            max-height: 405px;
            font-size: 12px;
            z-index: 99;
            overflow-y: scroll;
            padding: 5px 0;
        }

        .selectBox ul li {
            padding: 0px 5px;
        }

        .link-selected {
            display: inline-block;
        }

        .link-select {
            display: block;
            border-radius: 3px !important;
            padding: 10px 5px;
            color: #000;
        }

        .searchAngle {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }

        .rotate-angle {
            transform: rotate(180deg);
        }

        .selectBox ul li:hover .link-select {
            background-color: #3d67b5;
            color: #fff;
            cursor: pointer;
        }
        .visibleBackColor{
            background-color: #fff!important;
        }
        .visibleColor{
            color: #fff!important;
        }
        #intraSearch{
            width: 100%;
            border: 0;
        }
    </style>
    <body>

        <div class="container-fluid p-3" id="container" >
            <%--header(헤더, 사용자표시)--%>
            <jsp:include page="../common/header.jsp"/>
            <%--Content--%>
            <div class="d-flex flex-row" id="content_box">
                <%--좌측 컨텐츠--%>
                <div class="left-box  w-50" style="">
                    <%--button form--%>
                    <div id="in_out_form">
                        <button class="btn btn-sm btn-outline-success " id="contact_insert_btn">프로젝트 등록</button>

                    </div>
                    <%--검색 폼--%>
                    <div class="search-back">
                        <div class="search-form">
                            <div class="search-area align-middle">
                                <span class="title">프로젝트 코드</span><input type="text" class="search-input">
                                <span class="title">프로젝트 이름</span><input type="text" class="search-input" style="width: 220px;">
                                <button>검색</button>
                            </div>
                        </div>
                    </div>
                    <%--컨택리스트--%>
                    <table id="contact_list_form" class="align-middle">
                        <colgroup>
                            <col width="15%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>코드</th>
                                <th>프로젝트명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>1</td><td>1</td></tr>
                            <tr><td>2</td><td>2</td></tr>
                            <tr><td>3</td><td>3</td></tr>
                            <tr><td>4</td><td>4</td></tr>
                            <tr><td>5</td><td>5</td></tr>
                            <tr><td>6</td><td>6</td></tr>
                            <tr><td>7</td><td>7</td></tr>
                            <tr><td>8</td><td>8</td></tr>
                            <tr><td>8</td><td>8</td></tr>
                            <tr><td>10</td><td>10</td></tr>
                            <tr><td>11</td><td>11</td></tr>
                            <tr><td>12</td><td>12</td></tr>
                            <tr><td>13</td><td>13</td></tr>
                            <tr><td>14</td><td>14</td></tr>
                            <tr><td>15</td><td>15</td></tr>
                        </tbody>
                    </table>
                    <div class="pg-form">
                        <a class="pg_page"><i class="fas fa-backward"></i></a>
                        <a class="pg_page"><i class="fas fa-caret-left"></i></a>
                        <a class="pg_page">1</a>
                        <a class="pg_page">2</a>
                        <a class="pg_page">3</a>
                        <a class="pg_page">4</a>
                        <a class="pg_page">5</a>
                        <a class="pg_page">6</a>
                        <a class="pg_page">7</a>
                        <a class="pg_page">8</a>
                        <a class="pg_page">9</a>
                        <a class="pg_page">10</a>
                        <a class="pg_page"><i class="fas fa-caret-right"></i></a>
                        <a class="pg_page"><i class="fas fa-forward"></i></a>
                    </div>

                </div>
                <%--우측 컨텐츠--%>
                <div class="right-box w-50" style="padding: 1% 1%;">
                    <ul class="border rounded shadow-sm" id="contact_modify_form" style="margin: 5% 0; width: 100%; border: 1px solid #bbb!important; display: none;">
                            <li class="clearfix" style="position: relative;">
                                <h2>프로젝트 정보</h2>
                                <button class="btn btn-sm btn-outline-danger " id="contact_delete_btn" style="float: right; margin: 2%; clear: both;">프로젝트 삭제</button>
                                <button class="btn btn-sm btn-outline-success " id="contact_modify_btn" style="float: right; margin: 2% 0; ">프로젝트 수정</button>
                                <button class="btn btn-sm btn-outline-success " id="contact_modify_btn_2" style="float: right; margin: 2% 2%; ">프로젝트 세부 수정</button>
                            </li>
                            <li class="list-title" class="text-center" style="background-color: #3d67b5; color: #fff">프로젝트 코드</li>
                            <li class="list-info" ><input class="form-control"></li>
                            <li class="list-title" class="text-center" style="background-color: #3d67b5; color: #fff">프로젝트명</li>
                            <li class="list-info" ><input class="form-control"></li>
                    </ul>

                    <ul class="border rounded shadow-sm" id="contact_insert_form" style="margin: 5% 0; width: 100%; border: 1px solid #bbb!important; display: none;">
                        <li class="clearfix" style="position: relative;">
                            <h2>프로젝트 등록</h2>
                            <button class="btn btn-sm btn-outline-danger " id="contact_cancel_btn" style="float: right; margin: 2%; clear: both;">취소</button>
                            <button class="btn btn-sm btn-outline-success " id="contact_insert_btn_2" style="float: right; margin: 2% 0; ">등록</button>
                        </li>
                        <li class="list-title" class="text-center" style="background-color: #3d67b5; color: #fff">프로젝트 코드</li>
                        <li class="list-info" ><input class="form-control"></li>
                        <li class="list-title" class="text-center" style="background-color: #3d67b5; color: #fff">프로젝트명</li>
                        <li class="list-info" ><input class="form-control"></li>
                        <li class="list-title" class="text-center" style="background-color: #3d67b5; color: #fff">인트라넷 프로젝트 연동</li>
                        <li class="list-info" >
                            <div class="selectBox">
                                <input type="hidden" id="selectProject" name="selectProject" data-value="0">
                                <input class="form-control" id="intraSearch" placeholder="프로젝트명을 입력해주세요." />
                                <ul>
                                    <c:forEach var="pl" items="${pList}">
                                        <li><a class='link-select' data-value="${pl.p_child_sn}">[${pl.p_child_sn}] ${pl.p_subject} - ${pl.p_method_nm}</a></li>
                                    </c:forEach>
                                </ul>
                                <i class="fas fa-angle-down searchAngle"></i>
                            </div>
                            <script>
                                $("#intraSearch").on("keyup", function(){
                                    var inputVal = $(this).val();
                                    $.ajax({
                                        url: "/contactProject/SearchIntranetList",
                                        data:{"inputVal":inputVal},
                                        success: function(data){

                                        }

                                    })
                                    if(inputVal != ""){
                                        $(".selectBox ul").show();
                                    }else{
                                        $(".selectBox ul").hide();
                                    }
                                })
                            </script>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer">
            <ul style="padding:10px;">
                <li>
                    <p class="footer_logo"><img src="resources/images/KRI_logo.png" height="35"></p>
                </li>
                <li>
                    <p class="copyright">Copyright © 2019 Korea Research International.<br>All Rights Reserved.</p>
                </li>
            </ul>

        </div>
        <script src=" /resources/js/common/header.js"></script>
        <script src=" /resources/js/index.js"></script>
        <script>
            $(function(){
                $("#contact_insert_btn").on("click", function(){
                    $("#contact_modify_form").hide();
                    $("#contact_insert_form").show();
                })
                $("#contact_cancel_btn").on("click", function(){
                    $("#contact_insert_form").hide();
                })
                $("#contact_list_form tr").on("click", function(){
                    $("#contact_insert_form").hide();
                    $("#contact_modify_form").show();
                })

            })
            // $(function(){
            //     $("#projectList").remove();
            //     //팝업창 ON일때,
            //     if($(".popup-form").is(":visible")){
            //         $("#menuicon + label>span").addClass("visibleBackColor");
            //         $("#title").addClass("visibleColor");
            //     }else{
            //         $("#menuicon + label>span").removeClass("visibleBackColor");
            //         $("#title").removeClass("visibleColor");
            //     }
            // })

        </script>
    </body>
</html>
