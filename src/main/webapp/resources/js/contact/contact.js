function loginChk(){
    alert('로그인 세션이 만료되었습니다.\n로그인 다시 부탁드립니다.');
    location.href='/logout';
}

function dataSetting(prjCode, listId, alertText){
    $.ajax({
        url: "/contact/getDetails",
        data: {
            "projectCode": prjCode,
            "listid": listId
        },
        beforeSend: function(xmlHttpRequest){
            xmlHttpRequest.setRequestHeader("AJAX", "true");
        },
        success: function(result2) {
            // console.log(result2)
            alert(alertText);
            $("#infoModifyBtn").show();
            $("#modifySave, #modifyCancel").hide();

            //정보 리스트
            $("#infoTable tbody").html('');
            $.each(result2.dList, function(i, e){
                if(e.list_type == "리스트아이디") $("#infoTable table tbody").append("<tr><td>"+e.list_header+"</td><td><span>"+e.list_data+"</span><input type='hidden' id='listId' value='"+e.list_data+"'></td></tr>");
                else $("#infoTable table tbody").append("<tr><td>"+e.list_header+"</td><td><span>"+e.list_data+"</span><input type='text' class='modifyInput' data-before='"+e.list_data+"' data-order='"+e.list_order+"' value='"+e.list_data+"'></td></tr>");
            })

            //수정 로그
            $("#infoModify_logTable table tbody").html('');
            $.each(result2.cmList, function(i, e){
                $("#infoModify_logTable table tbody").append("<tr><td>"+e.modify_date+"</td><td>"+e.list_type+"</td><td>"+e.before_data+"</td><td>"+e.after_data+"</td></tr>")
            })
            
            //결과로그
            $("#RESULT_LIST").val('결과코드를 선택해주세요.').attr("data-code", "").attr("data-title", "");
            $("textarea[name=resultText]").val('');
            $("#resultCode_logTable table tbody").html('');
            $.each(result2.rlList, function(i, e){
                $("#resultCode_logTable table tbody").append("<tr><td>"+e.result_date+"</td><td>"+e.name+"</td><td>"+e.resultCode+"</td><td>"+e.content+"</td></tr>")
            })
            
            //이메일 수정
            $("#emailList ~ ul").html('');
            $.each(result2.dList, function(i, e){
                if(e.list_type == "이메일") $("#emailList ~ ul").append("<li class='link-select' data-code='"+e.list_data+"' data-title='"+e.list_data+"'>"+e.list_data+"</li>");
            })
            
            //이메일 발송 로그
            $("#email_logTable table tbody").html('');
            if(result2.selList.length > 0){
                $.each(result2.selList, function(i, e){
                    $("#email_logTable table tbody").append("<tr><td>"+e.send_date+"</td><td>"+e.receiver+"</td><td>"+e.name+" ("+e.sender+")</td></tr>");
                })
            }else{
                $("#email_logTable table tbody").append("<tr><td colspan='3'>이메일 발송기록이 존재하지 않습니다.</td></tr>");
            }

            //전화번호 수정
            $("#phoneList ~ ul").html('');
            $.each(result2.dList, function(i, e){
                if(e.list_type == "전화번호") $("#phoneList ~ ul").append("<li><a class='link-select' data-code='"+e.list_data+"' data-title='"+e.list_data+"'>"+e.list_data+"</a></li>");
            })
            
            //전화 로그
            $("#call_logTable table tbody").html('');
            if(result2.clList.length > 0){
                $.each(result2.clList, function(i, e){
                    $("#call_logTable table tbody").append("<tr><td>"+e.call_date+"</td><td>"+e.callTime+"</td><td>"+e.name+" ("+e.callNumber+")</td></tr>");
                })
            }else{
                $("#call_logTable table tbody").append("<tr><td colspan='3'>통화기록이 존재하지 않습니다.</td></tr>");
            }

        },error: function(xhr, status, error){
            if(xhr.status=="600"){
                loginChk();
            }
        }
    })
}

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
$(document).on("click", ".selectBox > input", function(){
    $(this).siblings("ul").toggle();
    if($(this).siblings("ul").is(":visible")){
        $(this).siblings('.fa-angle-down').addClass('rotate-angle');
    }else{
        $(this).siblings('.fa-angle-down').removeClass('rotate-angle');
    }
})

$(function(){
    //컨택매칭 이동
    $("#contactMatchingBtn").on("click", function(){
        var formData = new FormData();
        var prjCode = window.location.href.split("/")[window.location.href.split("/").length-2];
        var listId = $("#listId").val();

        formData.append("prjCode", prjCode);
        formData.append("listId", listId);


        $.ajax({
            url: "/contact/ListStatusChk",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(result) {
                if(result == 999){
                    location.href = "/contact/MatchingView?prjCode=" + prjCode + "&listId=" + listId;
                }else{
                    location.href = "/contact/MatchingView"
                }
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
        // location.href = "/contact/MatchingView";
    })

    //개인정보 수정모드 변경
    $("#infoModifyBtn").on("click", function(){
        $("#infoModifyBtn").hide();
        $("#modifySave, #modifyCancel").show();
        $("#infoTable td span:gt(0)").hide();
        $("#infoTable td .modifyInput").show();
    })

    //수정하기
    $("#modifySave").on("click", function(){
        var formData = new FormData();
        var prjCode = window.location.href.split("/")[window.location.href.split("/").length-2];
        var listId = $("#listId").val();
        var data_arr = [];

        $(".modifyInput").each(function(){
            var listType = $(this).closest("td").prev().text();
            var listorder = $(this).attr("data-order");
            var beforeData = $(this).attr("data-before");
            var afterData = $(this).val().trim();

            if(beforeData != afterData){
                data_arr.push({"type":listType, "before":beforeData, "after":afterData, "order":listorder});
            }
        })

        formData.append("prjCode", prjCode);
        formData.append("listId", listId);
        formData.append("data_arr", JSON.stringify(data_arr));

        if(data_arr.length == 0){
            alert("수정된 데이터가 없습니다.\n확인 부탁드립니다.");
            return false;
        }

        $.ajax({
            url: "/contact/ContactListModify",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(result) {
                if(result > 0) dataSetting(prjCode, listId, "개인정보 수정되었습니다.");
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })

    //수정 취소
    $("#modifyCancel").on("click", function(){
        $("#infoModifyBtn").show();
        $("#infoTable td span").show();
        $("#modifySave, #modifyCancel").hide();
        $("#infoTable td .modifyInput").hide();

        $("#infoTable td .modifyInput").each(function(i, e){
            var beforeData = $(e).attr("attr-before");
            $(e).val(befosreData);
        })
    })
    
    //수정로그/결과코드 탭 클릭
    $(".leftTab .tab01").on("click", function(){
        $(".tab01").removeClass("tab_selected");
        $(this).addClass("tab_selected");
        var tabOrder = $(this).attr("data-tab");

        $(".leftTab_tableForm .list_table").hide();
        $(".leftTab_tableForm .list_table:eq("+(tabOrder-1)+")").show();
    })
    
    //결과코드 추가
    $("#resultSave").on("click", function(){
        var formData = new FormData();
        var prjCode = window.location.href.split("/")[window.location.href.split("/").length-2];
        var listId = $("#listId").val();
        var chkResult = $("#RESULT_LIST").attr("data-code");
        var textResult = $("textarea[name=resultText]").val();

        if(chkResult == "" || chkResult == undefined){
            alert("결과코드를 선택해주세요.");
            return false;
        }

        if(textResult == ""){
            alert("메모사항을 입력해주세요.");
            return false;
        }

        formData.append("prjCode", prjCode);
        formData.append("listId", listId);
        formData.append("chk_result", chkResult);
        formData.append("text_result", textResult);

        $.ajax({
            url: "/contact/ContactResult_Add",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(result) {
                if(result > 0) {
                    dataSetting(prjCode, listId, "결과코드가 저장되었습니다.");
                    $(".leftTab .tab01[data-tab=1]").click();
                }
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })

    //이메일/문자/전화 탭 클릭
    $(".rightTab .tab02").on("click", function(){
        $(".tab02").removeClass("tab_selected");
        $(this).addClass("tab_selected");
        var tabOrder = $(this).attr("data-tab");

        // if(tabOrder == 3  ){
        //     alert("문자발송은 작업중입니다.");
        //     return false;
        // }

        $(".rightTab_tableForm .list_table").hide();
        $(".rightTab_tableForm .list_table:eq("+(tabOrder-1)+")").show();
    })


    //이메일 팝업 열기
    $("#emailSendBtn").on("click", function(){
        if($("#emailList ~ ul li").length == 0){
            alert("등록된 이메일이 없습니다.");
            return false;
        }

        $("#email_popup").fadeIn();
    })

    //이메일 팝업 닫기
    $(document).on("click", "#email_popup .closeBtn svg, #emailCancel", function(){
        $("#email_popup").fadeOut();
    })
    
    //이메일 불러오기
    $(document).on("click", "#email_popup #emailType ~ ul .link-select", function(){
        var prjCode = window.location.href.split("/")[window.location.href.split("/").length-2];
        var listId = $("#listId").val();

        $.ajax({
            url: "/contactCMS/CMS_GET_INFO",
            data: {
                "prj_code": prjCode,
                "cms_code": $(this).attr("data-code"),
                "cms_type": "EMAIL"
            },beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                console.log(data)
                if(data.csList.length > 0){
                    var content = data.csList[0].content;
                    $.ajax({
                        url: "/contact/getDetails",
                        data: {
                            "projectCode": prjCode,
                            "listid": listId
                        },
                        beforeSend: function (xmlHttpRequest) {
                            xmlHttpRequest.setRequestHeader("AJAX", "true");
                        },
                        success: function (data2) {
                            console.log(data2)
                            $.each(data2.dList, function(i, e){
                                if(content.includes("[#"+e.list_header+"#]")) {
                                    content = content.replace("[#"+e.list_header+"#]", e.list_data);
                                }
                            })

                            $(".emailContent").html(content);
                            $("#emailsubject").val(data.csList[0].name);
                            $("#emailsender").val(data.csList[0].sender);

                            var fileText = "";
                            $.each(data.csFileList, function(i, e){
                                if(i == 0) fileText = e.name;
                                else fileText += "||" + e.name;
                            })

                            $("#emailmailfile").val(fileText);

                        }, error: function (xhr, status, error) {
                            console.log(xhr, status, error)
                            if (xhr.status == "600") {
                                loginChk();
                            }
                        }
                    })


                }
            },error: function(xhr, status, error){
                console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })

    $("#emailSend").on("click", function(){
        var prjCode = window.location.href.split("/")[window.location.href.split("/").length-2];

        if(["", undefined].includes($("#emailType").attr("data-code"))){
            alert("이메일 타입을 선택해주세요.");
            return false;
        }

        if(["", undefined].includes($("#emailList").attr("data-code"))){
            alert("보내실 이메일을 선택해주세요.");
            return false;
        }

        var imgStyle = "<style>figure{margin: 0.9em auto;} figure img {width: 100%;} figure.image-style-side{float: right;}</style>"

        $.ajax({
            url: "/contact/emailSend",
            data: {
                "prjCode": prjCode,
                "listid": $("#listId").val(),
                "sender": $("#emailsender").val(),
                "subject": $("#emailsubject").val(),
                "receiver": $("#emailList").attr("data-code"),
                "content": imgStyle + $(".emailContent").html(),
                "fileName": $("#emailmailfile").val()
            },beforeSend: function(xmlHttpRequest){
                $(".loadingForm").fadeIn();
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                if(data == "success"){
                    $(".loadingForm").fadeOut();
                    $("#email_popup").fadeOut();
                    $("#emailType").val("이메일 타입을 선택해주세요.").attr("data-code", "").attr("data-title", "");
                    $("#emailList").val("보내실 이메일을 선택해주세요.").attr("data-code", "").attr("data-title", "");
                    $(".emailContent").html("<p class='empty'>보내실 이메일과 타입을 선택해주세요.</p>")
                    // alert("메일 발송완료하였습니다.");
                    dataSetting(prjCode, $("#listId").val(), "메일 발송완료하였습니다.");
                }else{

                }
            },error: function(xhr, status, error){
                console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })


    //이메일 팝업 열기
    $("#smsSendBtn").on("click", function(){
        if($("#smsList ~ ul li").length == 0){
            alert("등록된 이메일이 없습니다.");
            return false;
        }

        $("#sms_popup").fadeIn();
    })

    //이메일 팝업 닫기
    $(document).on("click", "#sms_popup .closeBtn svg, #smsCancel", function(){
        $("#sms_popup").fadeOut();
    })

    //문자 불러오기
    $(document).on("click", "#sms_popup #smsType ~ ul .link-select", function(){
        var prjCode = window.location.href.split("/")[window.location.href.split("/").length-2];
        var listId = $("#listId").val();

        $.ajax({
            url: "/contactCMS/CMS_GET_INFO",
            data: {
                "prj_code": prjCode,
                "cms_code": $(this).attr("data-code"),
                "cms_type": "SMS"
            },beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                console.log(data)
                if(data.csList.length > 0){
                    var content = data.csList[0].content;
                    $.ajax({
                        url: "/contact/getDetails",
                        data: {
                            "projectCode": prjCode,
                            "listid": listId
                        },
                        beforeSend: function (xmlHttpRequest) {
                            xmlHttpRequest.setRequestHeader("AJAX", "true");
                        },
                        success: function (data2) {
                            console.log(data2)
                            $.each(data2.dList, function(i, e){
                                if(content.includes("[#"+e.list_header+"#]")) {
                                    content = content.replace("[#"+e.list_header+"#]", e.list_data);
                                }
                            })

                            $(".smsContent").html(content);
                            $("#smssubject").val(data.csList[0].name);
                            $("#smssender").val(data.csList[0].sender);

                        }, error: function (xhr, status, error) {
                            console.log(xhr, status, error)
                            if (xhr.status == "600") {
                                loginChk();
                            }
                        }
                    })


                }
            },error: function(xhr, status, error){
                console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })

    
    //문자 보내기
    $("#smsSend").on("click", function(){
        var prjCode = window.location.href.split("/")[window.location.href.split("/").length-2];

        if(["", undefined].includes($("#smsType").attr("data-code"))){
            alert("문자 타입을 선택해주세요.");
            return false;
        }

        if(["", undefined].includes($("#smsList").attr("data-code"))){
            alert("보내실 핸드폰 번호를 선택해주세요.");
            return false;
        }

        // var imgStyle = "<style>figure{margin: 0.9em auto;} figure img {width: 100%;} figure.image-style-side{float: right;}</style>"

        $.ajax({
            url: "/contact/smsSend",
            data: {
                "prjCode": prjCode,
                "listid": $("#listId").val(),
                // "sender": $("#smssender").val(),
                "receiver": $("#smsList").attr("data-code"),
                "content": $(".smsContent").text(),
            },beforeSend: function(xmlHttpRequest){
                $(".loadingForm").fadeIn();
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(data){
                if(data == "success"){
                    $(".loadingForm").fadeOut();
                    $("#sms_popup").fadeOut();
                    $("#smsType").val("문자 타입을 선택해주세요.").attr("data-code", "").attr("data-title", "");
                    $("#smsList").val("보내실 번호를 선택해주세요.").attr("data-code", "").attr("data-title", "");
                    $(".smsContent").html("<p class='empty'>보내실 이메일과 타입을 선택해주세요.</p>")
                    // alert("메일 발송완료하였습니다.");
                    dataSetting(prjCode, $("#listId").val(), "문자 발송완료하였습니다.");
                }else{
                //
                }
            },error: function(xhr, status, error){
                console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })


    //전화 메소드

    var wsocket;
    var login_id;
    var login_pnum;
    var login_name;
    var ani;

    var min = 0, sec = 0, time = 0, timer;

    window.addEventListener('message', function (event) {
        if (event.data.command == "Connect") {
            Connect();
        }
        else if (event.data.command == "Login") {
            Login(event.data.loginid, event.data.loginpnum, event.data.loginname);
        }
        else if (event.data.command == "Logout") {
            Logout(event.data.loginid);
        }
        else if (event.data.command == "MakeCall") {
            MakeCall(event.data.loginid, event.data.dn, event.data.ani);
        }
        else if (event.data.command == "Hangup") {
            Hangup(event.data.loginid);
        }
        else if (event.data.command == "Ready") {
            Ready(event.data.loginid);
        }
        else if (event.data.command == "Break") {
            Break(event.data.loginid);
        }
        else if (event.data.command == "SetRecordStamp") {
            SetRecordStamp(event.data.loginid);
        }
    }, false);

    function Connect() {
        var prjCode = window.location.href.split("/")[window.location.href.split("/").length-2];
        wsocket = new WebSocket("ws://1.235.195.3:2302");

        wsocket.onopen = function () {
            console.log("wsocket connected !");
            ChildLogin();
        };

        wsocket.onmessage = function (evt) {
            var received_msg = JSON.parse(evt.data);
            var n = "\n";
            // received_msg = replaceAll(received_msg, ",", "," + n);
            console.log(received_msg)
            if(received_msg.ZCommand == "Talking"){
                timer = setInterval(function(){
                    time++;

                    min = Math.floor(time/60);
                    sec = time%60;
                    min = min%60;

                    var tm = min;
                    var ts = sec;

                    if(tm < 10){
                        tm = "0" + min;
                    }
                    if(ts < 10){
                        ts = "0" + sec;
                    }

                    $("#callTime").html(tm + ":" + ts);
                }, 1000);

            }

            if(received_msg.ZCommand == "CallClosed"){
                var startDate = new Date(received_msg.StartTime);
                var endDate = new Date(received_msg.StartTime);

                endDate.setSeconds(endDate.getSeconds() + received_msg.TalkTime);


                $.ajax({
                    url: "/contact/Calling_Log",
                    data: {
                        "prj_code": prjCode,
                        "list_id": $("#listId").val(),
                        "callNumber": $("#phoneList").attr("data-code"),
                        "start_time": received_msg.StartTime,
                        "end_time": $("#callTime").html(),
                    },beforeSend: function(xmlHttpRequest){
                        xmlHttpRequest.setRequestHeader("AJAX", "true");
                    },
                    success: function(data){
                        console.log(data)
                        if(data > 0){
                            alert("통화 종료되었습니다.");
                            $("#phoneList").val("통화하실 전화번호를 선택해주세요.").attr("data-code", "").attr("data-title", "")
                        }
                    },error: function(xhr, status, error){
                        console.log(xhr, status, error)
                        if(xhr.status=="600"){
                            loginChk();
                        }
                    }
                })


                clearInterval(timer);
                $("#callTime").html("00:00");
                // $("#phoneList").val("통화하실 전화번호를 선택해주세요.").attr("data-code", "").attr("data-title", "");
            }
        };

        wsocket.onclose = function () {
            console.log("connection is closed...");
        };
    }

    function Login(id, pnum, lname) {
        login_id = id;
        login_phone_number = pnum;
        login_name = lname;

        var data = {
            "ZCommand": "Login",
            "AgentLoginID": login_id,
            "AgentName": login_name,
            "AgentGroup": "1417",
            "ANINumber": "12345678",
            "AgentPhone": login_phone_number
        }

        console.log(login_id + ", " + login_phone_number + ", " + login_name);
        wsocket.send(JSON.stringify(data));

    }

    function Logout(id) {
        login_id = id;
        var data = {
            "ZCommand": "Logout",
            "AgentLoginID": login_id
        }
        wsocket.send(JSON.stringify(data));
    }
    //전화 걸기
    function MakeCall(id, dn, ani) {
        login_id = id;
        dial_number = dn;
        ani_number = ani;

        if(login_id == ""){
            alert("로그인 정보가 확인되지 않습니다.\nDS 팀에 문의 부탁드립니다.");
            return false;
        }

        var data = {
            "ZCommand": "MakeCall",
            "AgentLoginID": login_id,
            "DialNumber": dial_number,
            "ANINumber": ani_number
        }
        console.log(data, "전화 걸기")
        wsocket.send(JSON.stringify(data));
    }
    //전화 끊기
    function Hangup(id) {
        login_id = id;
        var data = {
            "ZCommand": "HangUp",
            "AgentLoginID": login_id
        }
        console.log(data, "전화끊기")
        wsocket.send(JSON.stringify(data));
    }

    function Ready(id) {
        login_id = id;
        var data = {
            "ZCommand": "SetAgentStatus",
            "AgentLoginID": login_id,
            "CTIAgentStatus": "1"
        }
        console.log(data)
        wsocket.send(JSON.stringify(data));
    }

    function Break(id) {
        login_id = id;
        var data = {
            "ZCommand": "SetAgentStatus",
            "AgentLoginID": login_id,
            "CTIAgentStatus": "11"
        }
        console.log(data)
        wsocket.send(JSON.stringify(data));
    }

    function SetRecordStamp(id) {
        login_id = id;
        var data = {
            "ZCommand": "SetRecordStamp",
            "AgentLoginID": login_id,
            "Tag": "테스트데이터"
        }
        console.log(data, "SET_RECORD 타임")
        wsocket.send(JSON.stringify(data));
    }

    // 로그
    function if_log(val) {
        /*
        var frame = document.getElementById("logdata");
        //frame.contentWindow.postMessage({
        frame.contentWindow.postMessage({
            'command': 'Log',
            'message': val
        }, "*");
        */
    }

    function replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }



    function ChildConnect() {
        window.postMessage({
            'command': 'Connect'
        }, "*");
    }

    function ChildLogin() {
        var p1 = $("#loginid").val();
        var p2 = $("#extension").val();
        window.postMessage({
            'command': 'Login',
            'loginid': p1,
            'loginpnum' : p2,
            'loginname' : 'contactor',
        }, "*");
    }

    function ChildLogout() {
        var p1 = $("#loginid").val();
        window.postMessage({
            'command': 'Logout',
            'loginid': p1
        }, "*");
    }

    function ChildMakeCall() {
        var p1 = $("#loginid").val();
        var dn = $("#phoneList").attr("data-code").replace(/\-/gi, "");
        var ani_num = $("#ani_num").val();

        window.postMessage({
            'command': 'MakeCall',
            'loginid': p1,
            'dn': dn,
            'ani': ani_num
        }, "*");
    }

    function ChildHangup() {
        var p1 = $("#loginid").val();

        window.postMessage({
            'command': 'Hangup',
            'loginid': p1
        }, "*");
    }

    function ChildReady() {
        var p1 = $("#loginid").val();
        window.postMessage({
            'command': 'Ready',
            'loginid': p1
        }, "*");
    }

    function ChildBreak() {
        var p1 = $("#loginid").val();
        window.postMessage({
            'command': 'Break',
            'loginid': p1
        }, "*");
    }

    function ChildSetRecordStamp() {
        var p1 = $("#loginid").val();
        window.postMessage({
            'command': 'SetRecordStamp',
            'loginid': p1
        }, "*");
    }

    //전화 연결


    //통화걸기 팝업 열기
    $("#callSendBtn").on("click", function(){
        if($("#phoneList ~ ul li").length == 0){
            alert("등록된 전화번호가 없습니다.");
            return false;
        }
        Connect();
        $("#call_popup").fadeIn();
    })

    //통화걸기 팝업 닫기
    $(document).on("click", "#call_popup .closeBtn svg", function(){
        $("#call_popup").fadeOut();
    })

    //통화걸기
    $("#callSend").on("click", function(){
        if(["",undefined].includes($("#phoneList").attr("data-code"))){
            alert("전화번호를 선택해주세요.");
            return false;
        }
        ChildMakeCall();
    })

    //통화끊기
    $("#callCancel").on("click", function(){
        ChildHangup();

    })

    // dataSetting(38, 7, "개인정보 수정되었습니다.");

    //분류코드 선택 이동
    $("#contactRestart").on("click", function(){
        var prjCode = +window.location.href.split("/")[window.location.href.split("/").length-2];
        var listId = $("#listId").val();

        var formData = new FormData();
        formData.append("prjCode", prjCode);
        formData.append("listId", listId);

        $.ajax({
            url: "/contact/GetRandomList",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(result) {
                if(result == ""){
                    alert("리스트가 존재하지 않습니다.");
                }else{

                    $.ajax({
                        url: "/contact/resultCodeReset",
                        type: "POST",
                        processData: false,
                        contentType: false,
                        data: formData,
                        beforeSend: function(xmlHttpRequest){
                            xmlHttpRequest.setRequestHeader("AJAX", "true");
                        },
                        success: function(result2) {
                            alert("새 리스트로 이동합니다.");
                            location.href = "/contact/details/"+prjCode+"/"+result;
                        }
                    })
                }
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })



})