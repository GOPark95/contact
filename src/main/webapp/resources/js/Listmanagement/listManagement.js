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
    var listidOrder = "";
    
    //현재 등록된 리스트 가져오기
    function currentGetList(prj_code){
        $.ajax({
            url: "/ListManagement/ListMain/" + prj_code,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                $("#currentList_table thead, #currentList_table tbody, #listAdd_table thead, #SEARCH_TYPE ~ ul").html('');
                // console.log(data)
                //리스트 헤더
                $.each(data.ctList, function(i, e){
                    if(i == 0) $("#currentList_form table thead, #listAdd_form table thead").append("<tr><th title='"+e.header+"' data-type='"+e.type+"'>"+e.header+"</th></tr>");
                    else $("#currentList_form table thead tr, #listAdd_form table thead tr").append("<th title='"+e.header+"' data-type='"+e.type+"'>"+e.header+"</th>");

                    //검색 분류타입에 추가
                    $("#SEARCH_TYPE ~ ul").append("<li><a href='#' class='link-select' data-code='"+(i+1)+"' data-title='"+e.header+"'>"+e.header+"</a></li>");

                    //리스트 아이디
                    if(e.type == "리스트아이디") listidOrder = i;
                })

                //리스트 세부정보
                $.each(data.cdList, function(i, e){
                    if(e.list_order == "1") $("#currentList_form table tbody").append("<tr class='variableList'><td title='"+e.list_data+"'>"+e.list_data+"</td></tr>");
                    else $("#currentList_form table tbody tr:last").append("<td title='"+e.list_data+"'>"+e.list_data+"</td>");
                })


                //리스트 개수
                var listCount = data.cdList.length / data.ctList.length;
                $("#currentList_table").closest(".variableForm").prev().find(".currentList_count").text("(" + listCount + "건)");

                $("#cancelBtn").click();

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
        currentGetList(prj_code);
    })

    //프로젝트 코드 있으면 세팅
    if(![undefined, ""].includes(sessionStorage.getItem("select_prjCode"))){
        $("#PROJECT_LIST ~ ul .link-select[data-code="+sessionStorage.getItem("select_prjCode")+"]").click();
    }


    //추가하기 클릭시
    $("#fileUpload").on("click", function(){
        $("#uploadFile").click();
    })

    //파일 변경시
    $("#uploadFile").on("change", function(e){
        Excel_GetList();
    })

    function Excel_GetList(){

        var ext = $("#uploadFile").val().split(".").pop().toLowerCase();

        if (!["xlsx", "xls", ""].includes(ext)) {
            alert('등록 할수 없는 파일입니다.');
            $("#uploadFile").val(""); // input file 파일명을 다시 지워준다.
            return false;
        }

        const formData = new FormData();
        formData.append('excel', $("#uploadFile")[0].files[0]);

        $.ajax({
            url: '/contactProject/ContactExcel',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").show();
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function (data) {
                console.log(data)
                $("#listAdd_table tbody").html('');

                // 헤더 비교
                if($("#listAdd_table thead tr:first th").length != data[0].length){
                    $("#listAdd_form .currentList_count").html('');
                    alert("기존 리스트의 헤더와 업로드 하신 헤더의 개수가 불일치합니다.\n확인 부탁드립니다.");
                    return false;
                }
                
                $("#listAdd_table thead tr:first th").each(function(i, e){
                    var headerText = $(this).text().trim();
                    var uploadHeaderText = data[0][i].trim();

                    if(headerText != uploadHeaderText){
                        $("#listAdd_form .currentList_count").html('');
                        alert("기존 리스트의 헤더명과 업로드 하신 헤더명이 불일치합니다.\n확인 부탁드립니다.");
                        return false;
                    }
                })

                //업로드 리스트 세부정보 세팅
                //기본 리스트 아이디 중복 체크! (추후에 중복체크 옵션 추가)
                var listIdArr = [], dupCount = 0;
                $("#currentList_table tbody tr").each(function(){
                    listIdArr.push($(this).find("td:eq("+listidOrder+")").text().trim());
                })

                //업로드 리스트 세팅
                $.each(data, function(i, e){
                    if(i > 0){
                        $.each(data[i], function(i2 ,e2){
                            if(i2 == 0) {
                                if(i2 == listidOrder && listIdArr.includes(e2)){
                                    $("#listAdd_table tbody").append("<tr class='variableList dupList'><td title='"+e2+"'>"+e2+"</td></tr>");
                                    dupCount++;
                                }else{
                                    $("#listAdd_table tbody").append("<tr class='variableList'><td title='"+e2+"'>"+e2+"</td></tr>");
                                }
                            }else {
                                if(i2 == listidOrder && listIdArr.includes(e2)){
                                    $("#listAdd_table tbody tr:last").append("<td title='"+e2+"'>"+e2+"</td>").addClass("dupList");
                                    dupCount++;
                                }else{
                                    $("#listAdd_table tbody tr:last").append("<td title='"+e2+"'>"+e2+"</td>");
                                }
                            }
                        })
                    }
                })

                //리스트 개수
                $("#listAdd_table").closest(".variableForm").prev().find(".currentList_count").html("(총 : " + (data.length - 1) + "건 / <span class='dupCount'>중복 : " + dupCount + "건</span>)");
                
                //파일 초기화
                $("#uploadFile").val("");
            },
            error: function () {
                alert("리스트 파일 확인 부탁드립니다.\n재업로드시에도 동일한 경우에는 데이터솔루션팀에 문의 부탁드립니다.");
                $("#listAdd_table tbody").html('');
                $(".loadingPopupWrap").fadeOut();
            }
        }).done(function (blob, status, xhr) {
            console.log(status)
            if(status === "success"){
                $(".loadingPopupWrap").fadeOut();
            }
        });
    }

    //컨택리스트 양식 다운
    $("#ListFormDownload").on("click", function(){
        var prj_code = $("#PROJECT_LIST").attr("data-code");
        // $(".loadingPopupWrap").fadeIn();
        $.ajax({
            url: "/ListManagement/AddListFormExcelDown/" + prj_code,
            xhrFields: {
                responseType: "blob",
            },
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").show();
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            }
        }).done(function (blob, status, xhr) {
            // check for a filename
            var fileName = "컨택리스트 양식.xlsx";
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
                alert("컨택 리스트 양식 다운로드 완료했습니다.");
            }else{
                $(".loadingPopupWrap").fadeOut();
                alert("데이터 솔루션팀에 문의 부탁드립니다.");
            }
        });
    })



    //리스트 추가 팝업창 띄우기
    $("#listAddTypeForm").on("click", function(){
        if($("#listAdd_table tbody tr").length == 0){
            alert("리스트를 업로드해주세요.");
            return false;
        }
        $(".listAddPopupWrap").fadeIn();
    })

    //리스트 추가 팝업창 닫기
    $("#cancelBtn").on("click", function(){
        $("input[name=listAddType]").prop("checked", false);
        $(".listAddPopupWrap").fadeOut();
    })
    
    //리스트 추가/교체 하기
    $("#saveBtn").on("click", function(){
        var dupLength = $("#listAdd_table tbody tr.dupList").length;

        //방식 선택
        if($("input[name=listAddType]:checked").length == 0){
            alert("리스트 추가방식을 선택해주세요.");
            return false;
        }

        //리스트 중복 리스트 건수체크
        if(dupLength > 0 && $("input[name=listAddType]:checked").val() == "add"){
            alert("중복리스트 "+dupLength+"건이 있습니다.\n확인부탁드립니다.");
            $("input[name=listAddType]").prop("checked", false);
            $(".listAddPopupWrap").fadeOut();
            return false;
        }

        //헤더 배열 추가
        var diviArr = [], listId_index = "";
        $("#listAdd_table thead th").each(function(i, e){
            diviArr.push($(this).text().trim());
            if($(this).attr("data-type") == "리스트아이디") listId_index = i;
        })

        var listIdArr = [], listDataArr = [];
        $("#listAdd_table .variableList").each(function(i, e){
            var listId = $(this).find("td:eq("+listId_index+")").text();
            listIdArr.push(listId);

            $(e).find("td").each(function(i2, e2){
                listDataArr.push({"Listid":listId, "listData":$(e2).text(), "listType":diviArr[i2], "listOrder":(i2+1)});
            })
        })


        var formData = new FormData();
        formData.append("listDataArr", JSON.stringify(listDataArr));
        formData.append("listIdArr", listIdArr);
        formData.append("prj_code", parseInt($("#PROJECT_LIST").attr("data-code")));
        formData.append("listAddType", $("input[name=listAddType]:checked").val());

        var flag = true;
        if($("input[name=listAddType]:checked").val() == "change"){
            if(!confirm("진행된 리스트가 있을 시, 삭제됩니다.\n진행하시겠습니까?")) flag = false;
        }

        if(flag){
            $.ajax({
                url: "/ListManagement/ContactListAdd",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function(xmlHttpRequest){
                    $(".loadingPopupWrap").show();
                    xmlHttpRequest.setRequestHeader("AJAX", "true");
                },
                success: function (data) {
                    console.log(data)
                    if(data > 0){
                        currentGetList($("#PROJECT_LIST").attr("data-code"));

                        $("#listAdd_table tbody").html('');
                        $("#listAdd_form .currentList_count").html('');
                    }else{

                    }
                },error: function(xhr, status, error){
                    if(xhr.status=="600"){
                        loginChk();
                    }
                }
            }).done(function (blob, status, xhr) {

                if(status === "success"){
                    $(".loadingPopupWrap").fadeOut();
                    $("#cancelBtn").click();

                    if(formData.get("listAddType") == "add") alert("리스트 추가되었습니다.");
                    else alert("리스트 교체되었습니다.");


                }else{
                    $(".loadingPopupWrap").fadeOut();
                    $("#cancelBtn").click();
                    alert("데이터 솔루션팀에 문의 부탁드립니다.");
                }
            });
        }


    })
    $("#searchListBtn").on("click", function(){
        var prj_code = $("#PROJECT_LIST").attr("data-code");
        var searchOption = $("#SEARCH_TYPE").val();
        var searchText = $("#SEARCHTEXT").val();

        $.ajax({
            url: "/ListManagement/SearchList",
            type: "POST",
            data: {
                "prj_code":prj_code,
                "searchOption":searchOption,
                "searchText":searchText
            },
            beforeSend: function(xmlHttpRequest){
                $(".loadingPopupWrap").show();
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function (data) {
                $(".loadingPopupWrap").fadeOut();
                if(data.length > 0){
                    $("#currentList_table tbody").html('');

                    //리스트 세부정보
                    $.each(data, function(i, e){
                        if(e.list_order == "1") $("#currentList_form table tbody").append("<tr class='variableList'><td title='"+e.list_data+"'>"+e.list_data+"</td></tr>");
                        else $("#currentList_form table tbody tr:last").append("<td title='"+e.list_data+"'>"+e.list_data+"</td>");
                    })


                    //리스트 개수
                    var listCount = data.length / $("#currentList_table thead th").length;
                    $("#currentList_table").closest(".variableForm").prev().find(".currentList_count").text("(" + listCount + "건)");
                }else{

                }
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
        var prj_code = $("#PROJECT_LIST").attr("data-code");

        currentGetList(prj_code);
    })

})