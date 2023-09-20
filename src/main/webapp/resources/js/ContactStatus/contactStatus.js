//selectbox 목록 클릭 시, 세팅
$(document).on('click', '.link-select', function(){
    var dv = $(this).attr('data-value');
    var dc = $(this).attr('data-code');
    var dti = $(this).attr('data-title');
    var dt = $(this).text();

    if(dv != "N"){
        $(this).parents('.selectBox').find('input').attr('data-value',dv);
        $(this).parents('.selectBox').find('input').attr('data-code',dc);
        $(this).parents('.selectBox').find('input').attr('data-title',dti);
        $(this).parents('.selectBox').find('input').val(dt);
    }else{
        $(this).parents('.selectBox').find('input').attr('data-value', "");
        $(this).parents('.selectBox').find('input').attr('data-code', "");
        $(this).parents('.selectBox').find('input').attr('data-title', "");
        $(this).parents('.selectBox').find('input').val(dt);
    }

    $(this).parents('ul').siblings('.fa-angle-down').removeClass('rotate-angle');
    $(this).parents('ul').hide();
})

//K-ON 연동 selectBox 처리
$("#section .selectBox>input").on("click", function(){
    $(this).siblings("ul").toggle();
    if($(this).siblings("ul").is(":visible")){
        $(this).siblings('.fa-angle-down').addClass('rotate-angle');
    }else{
        $(this).siblings('.fa-angle-down').removeClass('rotate-angle');
    }
})

function loginChk(){
    alert('로그인 세션이 만료되었습니다.\n로그인 다시 부탁드립니다.');
    location.href='/logout';
}

$(function(){
    function currentGetList(prj_code){
        $.ajax({
            url: "/CurrentStatus/GET_LIST_TYPE",
            data: {
                "prj_code" : prj_code
            },
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").css("display", "contents");
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                $("#searchListTB thead th:gt(0), #searchListTB tbody, #SEARCH_TYPE ~ ul").html('');

                //리스트 헤더
                $.each(data, function(i, e){
                    $("#searchListTB thead tr").append("<th title='"+e.header+"' data-type='"+e.type+"'>"+e.header+"</th>");

                    //검색 분류타입에 추가
                    $("#SEARCH_TYPE ~ ul").append("<li><a href='#' class='link-select' data-code='"+(i+1)+"' data-title='"+e.header+"'>"+e.header+"</a></li>");
                })

                $(".loadingPopupWrap").fadeOut();
            },error: function(xhr, status, error){
                console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    }

    function ListGetStatus(prj_code){
        $.ajax({
            url: "/CurrentStatus/GETStatus",
            type: "POST",
            data: {"prj_code": prj_code},
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").css("display", "contents");
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function (data) {
                //헤더 세팅(결과코드)
                if($("#listStatus_form table:eq(1) thead tr").length >= 2) $("#listStatus_form table:eq(1) thead tr:last, #listStatus_form table:eq(2) thead tr:last").remove();

                $("#listStatus_form table:eq(1) thead tr:first th:last, #listStatus_form table:eq(2) thead tr:first th:last").attr("colspan", data.rList.length);
                $("#listStatus_form table thead").append("<tr></tr>");
                $.each(data.rList, function(i, e){
                    $("#listStatus_form table:eq(1) thead tr:last, #listStatus_form table:eq(2) thead tr:last").append("<th>"+e.rname+"</th>");
                    $("#changeResult ~ ul").append("<li><a href='#' class='link-select' data-code='"+e.rcode+"' data-title='"+e.rname+"'>"+e.rname+"</a></li>")
                })


                $("#listStatus_form table tbody").html('');

                //결과코드별 데이터 세팅
                $.each(data.rscList, function(i, e){
                    $("#listStatus_form table:eq(0) tbody").append("<tr><td>"+e.code+"</td><td>"+e.name+"</td><td>"+e.statCount+"</td></tr>");
                })

                //분류코드별 데이터 세팅
                if(data.dscList.length > 0){
                    $.each(data.dscList, function(i, e){
                        $("#listStatus_form table:eq(1) tbody").append("<tr><td>"+e.name+"</td><td>"+e.header+"</td></tr>");

                        $.each(e.statCount.split(","), function(i2, e2){
                            $("#listStatus_form table:eq(1) tbody tr:last").append("<td>"+e2+"</td>");
                        })
                    })
                }else{
                    var colNum = $("#listStatus_form table:eq(1) thead tr:last th").length + 2;

                    $("#listStatus_form table:eq(1) tbody").append("<tr><td colspan='"+colNum+"'>분류코드가 존재하지 않습니다.</td></tr>");
                }

                //면접원별 데이터 세팅
                if(data.mscList.length > 0){
                    $.each(data.mscList, function(i, e){
                        $("#listStatus_form table:eq(2) tbody").append("<tr><td>"+e.name+"</td></tr>");

                        $.each(e.statCount.split(","), function(i2, e2){
                            $("#listStatus_form table:eq(2) tbody tr:last").append("<td>"+e2+"</td>");
                        })
                    })
                }else{
                    var colNum = $("#listStatus_form table:eq(2) thead tr:last th").length + 1;

                    $("#listStatus_form table:eq(2) tbody").append("<tr><td colspan='"+colNum+"'>목록이 존재하지 않습니다.</td></tr>");
                }

                $(".loadingPopupWrap").fadeOut();
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    }


    //리스트 가져오기
    $(document).on("click", "#PROJECT_LIST ~ ul .link-select", function(){
        $(".infoPopupWrap").fadeOut();
        sessionStorage.setItem("select_prjCode", $(this).attr("data-code"));

        var prj_code = $("#PROJECT_LIST").attr("data-code");
        ListGetStatus(prj_code);
        currentGetList(prj_code);
    })

    //프로젝트 코드 있으면 세팅
    if(![undefined, ""].includes(sessionStorage.getItem("select_prjCode"))){
        $("#PROJECT_LIST ~ ul .link-select[data-code="+sessionStorage.getItem("select_prjCode")+"]").click();
    }


    $("#searchListBtn").on("click", function(){
        var prj_code = $("#PROJECT_LIST").attr("data-code");
        var searchOption = $("#SEARCH_TYPE").val();
        var searchText = $("#SEARCHTEXT").val();


        if(searchOption == "타입을 선택해주세요." || searchOption == ""){
            alert("검색 타입을 선택해주세요.");
            return false;
        }

        if(searchText == ""){
            alert("검색어를 입력해주세요.");
            return false;
        }

        $.ajax({
            url: "/ListManagement/SearchList",
            type: "POST",
            data: {
                "prj_code":prj_code,
                "searchOption":searchOption,
                "searchText":searchText
            },
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").css("display", "contents");
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function (data) {

                $("#searchListTB tbody").html('');
                $("#allChk").prop("checked", false);

                if(data.length > 0){
                    //리스트 세부정보
                    $.each(data, function(i, e){
                        if(e.list_order == "1") $("#searchListTB tbody").append("<tr class='variableList'><td><input type='checkbox' name='listId' value='"+e.list_id+"' data-stat='"+e.contact_stat+"'></td><td title='"+e.list_data+"'>"+e.list_data+"</td></tr>");
                        else $("#searchListTB tbody tr:last").append("<td title='"+e.list_data+"'>"+e.list_data+"</td>");
                    })

                }else{
                    $("#searchListTB tbody").append("<tr><td colspan='"+$("#searchListTB thead th").length+"'>리스트가 존재하지 않습니다.</td></tr>")
                }

                //리스트 개수
                var listCount = data.length / $("#searchListTB thead th:gt(0)").length;
                $("#searchListTB").closest(".variableForm").prev().find(".searchList_count").text("(" + listCount + "건)");

                $(".loadingPopupWrap").fadeOut();
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })
    //리스트 검색
    $("input[name=typeName]").on("keyup", function(e){
        if (e.keyCode === 13) {
            e.preventDefault();

            if($("#SEARCH_TYPE").val() == ""){
                alert("검색 타입을 선택해주세요.");
                return false;
            }

            if($(this).val() == ""){
                alert("검색어를 입력해주세요.");
                return false;
            }

            $("#searchListBtn").click();
        }
    })

    //리스트 초기화
    $("#searchReset").on("click", function(){
        $("#selectedList_form table:eq(0) tbody").html('');
    })

    //체크박스 올 체크
    $("#allChk").on("click", function(){
        $("input[name=listId]").prop("checked", $(this).is(":checked"));
    })

    //리스트 추가
    $("#listId_add").on("click", function(){
        var listArr = $("span[name=selectedId]").map(function(){return $(this).attr("data-listid")}).get();
        var dupChk = 0;

        if($("input[name=listId]:checked").length == 0){
            alert("변경하실 리스트를 선택해주세요.");
            return false;
        }

        $("input[name=listId]:checked").each(function(i, e){
            if(!listArr.includes($(e).val())) $("#selectedListForm").append("<span name='selectedId' data-listid='"+$(this).val()+"'>"+$(e).val()+"<br>("+$(e).attr("data-stat")+")<i class='far fa-times-circle'></i></span>");
            else dupChk++;
        })

        if(dupChk > 0){
            var total = $("input[name=listId]:checked").length - dupChk;
            alert("선택하신 " + $("input[name=listId]:checked").length + "건 중 " + total +"건 등록되었습니다.");
        }
        //건수
        $(".selectedList_count").text("(" + $("span[name=selectedId]").length + "건" + ")");
    })

    //리스트 삭제
    $(document).on("click", "span[name=selectedId] .fa-times-circle", function(){
        $(this).closest("span").remove();

        //건수
        $(".selectedList_count").text("(" + $("span[name=selectedId]").length + "건" + ")");
    })

    //결과코드별 클릭 시, 리스트 검색
    $(document).on("click", "#listStatus_form table:eq(0) tbody tr", function(){
        var prj_code = $("#PROJECT_LIST").attr("data-code");
        var code = $(this).find("td:first").text();

        $.ajax({
            url: "/CurrentStatus/SearchClickList",
            data:{
                "prj_code": prj_code,
                "resultCode": code
            },
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").css("display", "contents");
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function (data) {

                $("#searchListTB tbody").html('');
                $("#allChk").prop("checked", false);

                if(data.length > 0){
                    //리스트 세부정보
                    $.each(data, function(i, e){
                        if(e.list_order == "1") $("#searchListTB tbody").append("<tr class='variableList'><td><input type='checkbox' name='listId' value='"+e.list_id+"' data-stat='"+e.contact_stat+"'></td><td title='"+e.list_data+"'>"+e.list_data+"</td></tr>");
                        else $("#searchListTB tbody tr:last").append("<td title='"+e.list_data+"'>"+e.list_data+"</td>");
                    })
                }else{
                    $("#searchListTB tbody").append("<tr><td colspan='"+$("#searchListTB thead th").length+"'>리스트가 존재하지 않습니다.</td></tr>")
                }

                //리스트 개수
                var listCount = data.length / $("#searchListTB thead th:gt(0)").length;
                $("#searchListTB").closest(".variableForm").prev().find(".searchList_count").text("(" + listCount + "건)");

                $(".loadingPopupWrap").fadeOut();

            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }

        })
    })

    //리스트 결과코드 변경
    $("#changeResultBtn").on("click", function(){
        var prj_code = $("#PROJECT_LIST").attr("data-code");
        var listArr = $("span[name=selectedId]").map(function(){return $(this).attr("data-listid")}).get();
        var updateResult = $("#changeResult").attr("data-code");

        if(updateResult == ""){
            alert("변경할 결과코드를 선택해주세요.");
            return false;
        }

        if(listArr.length == 0){
            alert("선택된 리스트가 없습니다.");
            return false;
        }

        $.ajax({
            url: "/CurrentStatus/ListChangeResult",
            data:{
                "prj_code": prj_code,
                "listArr": listArr,
                "updateResult": updateResult
            },
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").css("display", "contents");
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                if(data > 0){
                    alert("변경되었습니다.");
                    location.reload();
                }
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }

        })
    })


    //분류별 버튼 클릭시 보여주기
    $(".statusBtn").on("click", function(){
        var code = $(this).attr("data-code");

        $("#listStatus_form .variableForm, #listStatus_form p:gt(0)").hide();

        switch (code){
            case "1":
                $("#listStatus_form p:eq(1)").show();
                $("#listStatus_form .variableForm:eq(0)").show();
                break;
            case "2":
                $("#listStatus_form p:eq(2)").show();
                $("#listStatus_form .variableForm:eq(1)").show();
                break;
            case "3":
                $("#listStatus_form p:eq(3)").show();
                $("#listStatus_form .variableForm:eq(2)").show();
                break;
        }
    })
    
    //결과코드 먼저 나옴
    $(".statusBtn:eq(0)").click();

    //컨택현황리스트 양식 다운
    $("#statusExcelBtn").on("click", function(){
        var prj_code = $("#PROJECT_LIST").attr("data-code");

        $.ajax({
            url: "/CurrentStatus/ContactStautsExcelDown/" + prj_code,
            xhrFields: {
                responseType: "blob",
            },
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").show();
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            }
        }).done(function (blob, status, xhr) {
            // check for a filename
            var fileName = "컨택 현황 리스트_" + prj_code + ".xlsx";
            var disposition = xhr.getResponseHeader("Content-Disposition");

            // for IE
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (fileName) {
                    var a = document.createElement("a");

                    if (a.download === undefined) {
                        window.location.href = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location.href = downloadUrl;
                }
            }

            if(status === "success"){
                $(".loadingPopupWrap").fadeOut();
                alert("컨택 현황 리스트 다운로드 완료했습니다.");
            }else{
                $(".loadingPopupWrap").fadeOut();
                alert("데이터 솔루션팀에 문의 부탁드립니다.");
            }
        });
    })
})
