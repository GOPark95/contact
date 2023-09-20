 $(".smsSend").on("click", function(){
        var fromphone = "0260092750";
        var phones = $("#list_body tr").map(function(i,e){return $(e).find("td:eq(2)").html().replace(/[-]/g,"")}).get();

        if(phones.length == 0){
            alert("조회된 리스트가 없습니다.");
            return false;
        }

        var contents = []; 
        var go_url = "https://kon.kric.com/webProject/aibd/addic/login.asp";

        var text = "";
        text += "안녕하세요, 코리아리서치입니다.\n"
        if($(this).data("send") == "W"){
            text += "Weekly 설문이 시작되었습니다. \n"
            text += "아래의 링크에서 로그인하시어 응답 바랍니다. \n"
            text += "설문 응답은 일요일 오전 8시 ~ 수요일 새벽 4시까지 가능합니다. \n\n"
        }
        else{
            text += "매일기록일지 설문이 시작되었습니다. \n"
            text += "아래의 링크에서 로그인하시어 응답 바랍니다. \n"
            text += "설문 응답은 2시간 동안 가능합니다. \n\n"
        }

        text += go_url
        //contents.push(text);

        sendSMSMulti(fromphone, phones, text, "");
        ajax_returnData("./user-ajax.asp", {"COMMAND": "SEND_DATE_UPDATE"});

        alert("문자 발송완료했습니다.");
    })
    
    $("p[id^=clear]").on("click", function(){
        var clickId = $(this).attr("id").split("_")[1];
        var weekList = [...user_list];
        weekList = weekList.filter(function(item){if(item["WEEK"+clickId] == "O") return item});
        tableDraw(weekList);
    })

    $("#emaCount").on("click", function(){
        var emaList = [...user_list];
        emaList = emaList.filter(function(item){if(item["EMA_PER"] < 50) return item});
        tableDraw(emaList);
    })

    $("#is_attend").on("click", function(){
        var attendList = [...user_list];
        attendList = attendList.filter(function(item){if(item["IS_ATTEND"] == 0) return item});
        tableDraw(attendList);
    })

    $("p[id^=allShow]").on("click", function(){
        var allList = [...user_list];
        tableDraw(allList);
    })

    $(".filter-td").click(function(e){
        $(".filter-option:visible:not([id="+$(this).find("div").attr("id")+"])").hide();
        if($(this).find("div").is(":visible")){
            $(this).find("div").hide();
        }
        else{
            $(this).find("div").show();
        }
    });