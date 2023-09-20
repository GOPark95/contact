document.writeln('<script src=" /resources/ckeditor/build/ckeditor.js"></script>')
// document.writeln('<script src="https://ckeditor.com/apps/ckfinder/3.5.0/ckfinder.js"></script>')

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
    $(document).ajaxSend(function(event, request, settings) {
        request.setRequestHeader('AJAX', 'true');
    });

    let emailEditor, smsEditor, tlist;

    ClassicEditor
        .create( document.querySelector( '#emailContent' ), {
            // plugins: [HtmlComment],
            ckfinder: {
                uploadUrl: '/contactCMS/CK_IMAGE_UPLOAD',
            }
        })
        .then( newEditor => {
            emailEditor = newEditor;
        } )
        .catch( error => {
            console.error( error );
        } );

    ClassicEditor
        .create( document.querySelector( '#smsContent' ), {
            toolbar: []
        })
        .then( newEditor => {
            smsEditor = newEditor;
        } )
        .catch( error => {
            console.error( error );
        } );


    // ClassicEditor.create( document.querySelector( '#emailContent' ) );

    //등록되어 있는 타입목록 가져오기
    $(document).on("click", "#PROJECT_LIST ~ ul .link-select", function(){
        $(".infoPopupWrap").fadeOut();
        sessionStorage.setItem("select_prjCode", $(this).attr("data-code"));

        var prj_code = $("#PROJECT_LIST").attr("data-code");
        var data = {
            "prj_code": prj_code,
            "Type": "Email",
            "pcode": prj_code
        }
        
        //초기화
        $(".project_box .selectBox > input").val("타입을 선택해주세요.").attr("data-code", "").attr("data-title", "");
        $("input[name=typeName], input[name=sender], #uploadFile, #deleteFile").val("");
        $(".project_info ul").hide();
        emailEditor.setData('');
        smsEditor.setData('');


        //변수 리스트 불러오기
        $.ajax({
            url: "/contactProject/Get_ProjectDetail",
            data: data,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                $(".variableList").remove();
                tlist = data.tlist;
                if(data.tlist.length > 0){
                    $("#emailBox .variableList, #smsBox .variableList").remove();
                    $.each(data.tlist, function(i, e){
                        var index = i+1;
                        $("#emailBox .variableForm, #smsBox .variableForm").append("<div class='variableList'><p>"+e.header+"<input type='checkbox' name='variable' value='"+index+"'><label>[사용중]</label></p><p>[#"+e.header+"#]</p></div>");
                    })
                }else{
                    $("#emailBox .variableForm, #smsBox .variableForm").append("<div class='variableList none'>등록된 변수가 없습니다.</div>")
                }

            },error: function(xhr, status, error){
                // console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })


        //타입 목록 불러오기
        $.ajax({
            url: "/contactCMS/GetCMSType",
            "data": data,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                $("#CMS_EMAIL_TYPE ~ ul li:gt(0), #CMS_SMS_TYPE ~ ul li:gt(0)").remove();

                $.each(data, function(i, e){
                    if(e.cmsType == "EMAIL"){
                        $("#CMS_EMAIL_TYPE ~ ul").append("<li><a href='#' class='link-select' data-code='"+e.code+"' data-title=''>"+e.name+"</a></li>");
                    }else{
                        $("#CMS_SMS_TYPE ~ ul").append("<li><a href='#' class='link-select' data-code='"+e.code+"' data-title=''>"+e.name+"</a></li>");
                    }
                })

            },error: function(xhr, status, error){
                // console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })

    })


    $(document).on("keyup change", ".ck-content", function(){
        var text = "";
        var type = $(this).closest("div.project_info").attr("id");

        if(type == "emailBox") text = emailEditor.getData();
        else text = smsEditor.getData();

        // console.log(text)
        $.each(tlist, function(i, e){
            var index = i+1;
            if(text.includes("[#"+e.header+"#]")){
                $("#"+type).find("input[name=variable][value="+index+"]").prop("checked", true);
            }else{
                $("#"+type).find("input[name=variable][value="+index+"]").prop("checked", false);
            }
        })

    })

    $(document).on("click", "#CMS_EMAIL_TYPE ~ ul .link-select, #CMS_SMS_TYPE ~ ul .link-select", function(){
        var boxName = $(this).closest("div.project_info").attr("id");

        $("#uploadFile, #deleteFile").val("");

        if($(this).attr("data-code") == "add"){
            if(boxName == "emailBox"){
                $("#emailBox input[name=typeName], #emailBox input[name=sender]").val('');
                $("#emailBox input[name=variable]").prop("checked", false);
                emailEditor.setData('');
                // console.log(emailEditor.getData());
            }else{
                $("#smsBox input[name=typeName], #smsBox input[name=sender]").val('');
                $("#smsBox input[name=variable]").prop("checked", false);
                smsEditor.setData('');
                // console.log(smsEditor.getData());
            }

            $.ajax({
                url: "/contactCMS/CMS_GET_INFO",
                data: {
                    "prj_code": $("#PROJECT_LIST").attr("data-code"),
                    "cms_code": boxName == "emailBox" ? $("#CMS_EMAIL_TYPE").attr("data-code") : $("#CMS_SMS_TYPE").attr("data-code"),
                    "cms_type": boxName == "emailBox" ? "EMAIL" : "SMS"
                },beforeSend: function(xmlHttpRequest){
                    xmlHttpRequest.setRequestHeader("AJAX", "true");
                },
                success: function(data){
                    console.log(data)
                },error: function(xhr, status, error){
                    // console.log(xhr, status, error)
                    if(xhr.status=="600"){
                        loginChk();
                    }
                }
            })
        }else{ //데이터 불러오기!
            $.ajax({
                url: "/contactCMS/CMS_GET_INFO",
                data: {
                    "prj_code": $("#PROJECT_LIST").attr("data-code"),
                    "cms_code": boxName == "emailBox" ? $("#CMS_EMAIL_TYPE").attr("data-code") : $("#CMS_SMS_TYPE").attr("data-code"),
                    "cms_type": boxName == "emailBox" ? "EMAIL" : "SMS"
                },beforeSend: function(xmlHttpRequest){
                    xmlHttpRequest.setRequestHeader("AJAX", "true");
                },
                success: function(data){
                    console.log(data, boxName, $("#CMS_EMAIL_TYPE").attr("data-code"))
                    if(boxName == "emailBox"){
                        $("#emailBox input[name=typeName]").val(data.csList[0].name);
                        $("#emailBox input[name=sender]").val(data.csList[0].sender);
                        $.each(data.csVariList, function(i, e){
                            if(e.chkYN == "Y") $("#emailBox input[name=variable][value="+e.code+"]").prop("checked", true);
                            else $("#emailBox input[name=variable][value="+e.code+"]").prop("checked", false);
                        })
                        //파일리스트
                        $(".fileListTB tbody tr").remove();

                        $.each(data.csFileList, function(i, e){
                            $(".filePopupWrap .popupContent .fileListTB table tbody").append("<tr><td title='"+e.name+"'>"+e.name+"</td><td><button class='fileRemove' value='"+e.code+"'>삭제</button></td></tr>")
                        })
                        emailEditor.setData(data.csList[0].content);
                    }else{
                        $("#smsBox input[name=typeName]").val(data.csList[0].name);
                        $("#smsBox input[name=sender]").val(data.csList[0].sender);
                        $.each(data.csVariList, function(i, e){
                            if(e.chkYN == "Y") $("#smsBox input[name=variable][value="+e.code+"]").prop("checked", true);
                            else $("#smsBox input[name=variable][value="+e.code+"]").prop("checked", false);
                        })
                        smsEditor.setData(data.csList[0].content);
                    }
                },error: function(xhr, status, error){
                    console.log(xhr, status, error)
                    if(xhr.status=="600"){
                        loginChk();
                    }
                }
            })
        }
    })
    //파일 팝업 열기
    $(".add_file").on("click", function(){
        if($("#CMS_EMAIL_TYPE").attr("data-code") == ""){
            alert("타입을 선택해주세요.");
            return false;
        }
        $(".filePopupWrap").fadeIn();
    })

    //파일 팝업 닫기
    $(document).on("click", ".filePopupWrap .popupContent > p .fa-times", function(){
        $(".filePopupWrap").fadeOut();
    })

    //파일 드랍 이벤트
    $(".filePopupWrap .popupContent .drop_box").on("dragenter", function(e){
        e.preventDefault();
        e.stopPropagation();
    }).on("dragover", function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).css("background-color", "#0188ff33");
    }).on("dragleave", function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).css("background-color", "#FFF");
    }).on("drop", function(e){
        e.preventDefault();

        $(".newFile").closest("tr").remove();

        $.each(e.originalEvent.dataTransfer.files, function(i2, e2){
            $(".filePopupWrap .popupContent .fileListTB table tbody").append("<tr><td title='"+e2.name+"'>"+e2.name+"</td><td><button class='fileRemove newFile'>삭제</button></td></tr>")
        })

        $(this).css("background-color", "#FFF");
    });

    //파일추가 - 클릭
    $(".drop_box").off("click").on("click", function(){
        $("#uploadFile").click();
    })
    //파일추가 - 클릭
    $("#uploadFile").on("change", function(){
        $(".newFile").closest("tr").remove();

        $.each($(this)[0].files, function(i2, e2){
            $(".filePopupWrap .popupContent .fileListTB table tbody").append("<tr><td title='"+e2.name+"'>"+e2.name+"</td><td><button class='fileRemove newFile'>삭제</button></td></tr>")
        })
    })

    $(document).on("click", ".fileRemove", function(){
        if($(this).hasClass("newFile")){
            var fileName = $(this).closest("tr").find("td:first").attr("title");
            const dataTransfer = new DataTransfer();
            var fileArray = Array.from($("#uploadFile")[0].files);

            $.each(fileArray, function(i, e){
                if(e.name != fileName) dataTransfer.items.add(e);
            })

            $("#uploadFile")[0].files = dataTransfer.files;
            $(this).closest("tr").remove();
        }else{
            if($("#deleteFile").val() == "") $("#deleteFile").val($(this).val());
            else $("#deleteFile").val($("#deleteFile").val() + "," +$(this).val());
            $(this).closest("tr").remove();
        }
    })
    
    
    
    //추가하기
    $(document).on("click", ".add_btn", function(){
        var formData = new FormData();
        var type = $(this).hasClass("email") ? "emailBox" : "smsBox";

        // console.log(type)
        //데이터 검사
        if($("#"+type+" .selectBox > input").attr("data-code") != "add"){
            alert("타입목록에 추가하기를 선택해주세요.");
            return false;
        }

        if($("#"+type+" input[name=typeName]").val() == ""){
            alert("타입명을 입력해주세요.");
            return false;
        }

        if($("#"+type+" input[name=sender]").val() == ""){
            alert("발신자 이메일을 입력해주세요.");
            return false;
        }
        if(type == "emailBox"){
            if(emailEditor.getData() == ""){
                alert("이메일 내용을 입력해주세요.");
                return false;
            }
        }else{
            if(smsEditor.getData() == ""){
                alert("문자 내용을 입력해주세요.");
                return false;
            }
        }

        //추가
        var select_variable = [];
        $("#"+type+" input[name=variable]").each(function(i, e){
            if($(this).is(":checked")) select_variable.push($(this).val());
        })

        if($("#uploadFile")[0].files.length > 0){
            for(var i=0; i<$("#uploadFile")[0].files.length; i++){
                formData.append("cmsfile", $("#uploadFile")[0].files[i]);
            }
        }else{
            formData.append("cmsfile", null);
        }

        $("figure").each(function(){

            if($(this).hasClass("image-style-side")){
                console.log("1")
                $(this).css("float", "right");
            }else{
                console.log("2")
                $(this).css("margin", "0 auto");
            }
        })

        formData.append("prjcode", $("#PROJECT_LIST").attr("data-code"));
        formData.append("cmstype", (type == "emailBox" ? "EMAIL" : "SMS"));
        formData.append("typename", $("#"+type+" input[name=typeName]").val());
        formData.append("select_variable", select_variable);
        formData.append("sender", $("#"+type+" input[name=sender]").val());
        formData.append("content", (type == "emailBox" ? emailEditor.getData() : smsEditor.getData()));

        $.ajax({
            url: "/contactCMS/CMS_SET_INSERT",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                if(data > 0){
                    alert("추가되었습니다.");
                    $("#PROJECT_LIST ~ ul a[data-code="+$("#PROJECT_LIST").attr("data-code")+"]").click();
                }
            },
            error: function(request, status, error){
                // console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
                alert("오류가 발생했습니다.\n데이터 솔루션팀에 문의 부탁드립니다.");
                return false;
            }
        })
    })

    //수정하기
    $(document).on("click", ".modify_btn", function(){
        var formData = new FormData();
        var type = $(this).hasClass("email") ? "emailBox" : "smsBox";

        // console.log(type)
        //데이터 검사
        if(["add", ""].includes($("#"+type+" .selectBox > input").attr("data-code"))){
            alert("수정할 타입을 선택해주세요.");
            return false;
        }

        if($("#"+type+" input[name=typeName]").val() == ""){
            alert("타입명을 입력해주세요.");
            return false;
        }

        if($("#"+type+" input[name=sender]").val() == ""){
            alert("발신자 이메일을 입력해주세요.");
            return false;
        }
        if(type == "emailBox"){
            if(emailEditor.getData() == ""){
                alert("이메일 내용을 입력해주세요.");
                return false;
            }
        }else{
            if(smsEditor.getData() == ""){
                alert("문자 내용을 입력해주세요.");
                return false;
            }
        }



        //추가
        var select_variable = [];
        $("#"+type+" input[name=variable]").each(function(i, e){
            if($(this).is(":checked")) select_variable.push($(this).val());
        })

        if($("#uploadFile")[0].files.length > 0){
            for(var i=0; i<$("#uploadFile")[0].files.length; i++){
                formData.append("cmsfile", $("#uploadFile")[0].files[i]);
            }
        }else{
            formData.append("cmsfile", null);
        }




        formData.append("prjcode", $("#PROJECT_LIST").attr("data-code"));
        formData.append("cmscode", type == "emailBox" ? $("#CMS_EMAIL_TYPE").attr("data-code") : $("#CMS_SMS_TYPE").attr("data-code"));
        formData.append("cmstype", (type == "emailBox" ? "EMAIL" : "SMS"));
        formData.append("typename", $("#"+type+" input[name=typeName]").val());
        formData.append("select_variable", select_variable);
        formData.append("sender", $("#"+type+" input[name=sender]").val());
        formData.append("content", (type == "emailBox" ? emailEditor.getData() : smsEditor.getData()));
        formData.append("deleteFile", $("#deleteFile").val());


        $.ajax({
            url: "/contactCMS/CMS_SET_MODIFY",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                console.log(data)
                if(data > 0){
                    alert("수정되었습니다.");
                    $("#PROJECT_LIST ~ ul a[data-code="+$("#PROJECT_LIST").attr("data-code")+"]").click();
                }
            },
            error: function(request, status, error){
                // console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
                alert("오류가 발생했습니다.\n데이터 솔루션팀에 문의 부탁드립니다.");
                return false;
            }
        })
    })

    //프로젝트 코드 있으면 세팅
    setTimeout(function(){
        if(![undefined, ""].includes(sessionStorage.getItem("select_prjCode"))){
            $("#PROJECT_LIST ~ ul .link-select[data-code="+sessionStorage.getItem("select_prjCode")+"]").click();
        }
    }, 10)
})
