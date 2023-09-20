$(function () {
    let contactList = ""; // 컨택리스트
    let m_result = "", m_division = "", m_kon = "";


    //면접원 프로젝트 생성 버튼 지움
    if ($("#user_type").val() == "컨택원") {
        $(".list_sh_box .round_btn").hide();
    }
    //인트라넷 프로젝트 검색
    $(".project_box .selectBox input[type=text]").on("keyup", function () {
        var inVal = $(this).val().trim();

        if (inVal == "") {
            $(this).siblings("ul").hide();
            $(this).siblings('.fa-angle-down').removeClass('rotate-angle');
        } else {
            $(this).siblings("ul").show();
            $(this).siblings('.fa-angle-down').addClass('rotate-angle');
        }

        $.ajax({
            url: "/contactProject/SearchIntranetList",
            data: {"inputVal": inVal},
            success: function (data) {
                $(".project_box .selectBox ul").html('');
                $ul = $(".project_box .selectBox ul");

                if (data.length > 0) {
                    for (var i in data) {
                        $li = $("<li><a href='#' class='link-select' data-value='" + data[i].p_child_sn + "'>[" + data[i].p_child_sn + "] " + data[i].p_subject + " </a></li>");
                        $ul.append($li);
                    }
                } else {
                    $li = $("<li><a href='#' class='link-select' data-value='N'>프로젝트가 존재하지 않습니다.</a></li>");
                    $ul.append($li);
                }
            }
        })
    })
    // k-on 연동 프로젝트 검색
    $("#kon_intraProject").on("keyup", function () {
        var inVal = $(this).val().trim();

        if (inVal == "") {
            $(this).siblings("ul").hide();
            $(this).siblings('.fa-angle-down').removeClass('rotate-angle');
        } else {
            $(this).siblings("ul").show();
            $(this).siblings('.fa-angle-down').addClass('rotate-angle');
        }

        $.ajax({
            url: "/contactProject/SearchKonList",
            data: {"inputVal": inVal},
            success: function (data) {
                $("#kon_intraProject").siblings("ul").html('');
                $ul = $("#kon_intraProject").siblings("ul");

                if (data.length > 0) {
                    for (var i in data) {
                        $li = $("<li><a href='#' class='link-select' data-value='" + data[i].pkey + "'>[" + data[i].pkey + "] " + data[i].title + "</a></li>");
                        $ul.append($li);
                    }
                } else {
                    $li = $("<li><a href='#' class='link-select' data-value='N'>프로젝트가 존재하지 않습니다.</a></li>");
                    $ul.append($li);
                }
            }
        })
    })

    //selectbox 목록 클릭 시, 세팅
    $(document).on('click', '.link-select', function () {
        var dv = $(this).attr('data-value');
        var dc = $(this).attr('data-code');
        var dti = $(this).attr('data-title');
        var dt = $(this).text();

        if (dv != "N") {
            $(this).parents('.selectBox').find('input').attr('data-value', dv);
            $(this).parents('.selectBox').find('input').attr('data-code', dc);
            $(this).parents('.selectBox').find('input').attr('data-title', dti);
            $(this).parents('.selectBox').find('input').val(dt);
        } else {
            $(this).parents('.selectBox').find('input').attr('data-value', "");
            $(this).parents('.selectBox').find('input').attr('data-code', "");
            $(this).parents('.selectBox').find('input').attr('data-title', "");
            $(this).parents('.selectBox').find('input').val(dt);
        }

        $(this).parents('ul').siblings('.fa-angle-down').removeClass('rotate-angle');
        $(this).parents('ul').hide();
    })

    //K-ON 연동 selectBox 처리
    $(".tab03 input[name=autoCoding]").on("click", function () {
        $(this).siblings("ul").toggle();
        if ($(this).siblings("ul").is(":visible")) {
            $(this).siblings('.fa-angle-down').addClass('rotate-angle');
        } else {
            $(this).siblings('.fa-angle-down').removeClass('rotate-angle');
        }
    })

    //프로젝트 목록 제거
    $("#PROJECT_LIST").closest(".selectBox").children().hide();

    //프로젝트 등록 버튼 클릭시
    $(".list_sh_box .round_btn").on("click", function (i, e) {
        $("tr").removeClass("list_selected");

        $(".project_info.update").hide();
        $(".project_info.insert").show();

        //상태값 수정
        $(".project_box .option").val("insert");
        $(".tab01 .save, .tab02 .save, .tab03 .save").val('');
        // $(".tab03 .save").val('');

        //초기화
        $(".box01 table").hide();
        $(".tabs li").removeClass("active");
        $("input[name=autoCoding]").val("선택").removeAttr("data-code").removeAttr("data-title");
        $("#kon_intraProject, .project_info.insert #projectName, .project_info.insert #intranetProject").val("").removeAttr("data-value");
        $("#uploadFile").val("");
        $("#fileList").html('');
        $(".tab02 .list_table tbody").html('').append("<tr><td colspan='3'>파일을 업로드해주세요.</td></tr>");
        contactList = "";
    })

    //프로젝트 클릭시
    $(".list").on("click", function (i, e) {
        var project_name = $(this).attr("data-project-name");
        var intranet_name = "[" + $(this).attr("data-intranet-code") + "] " + $(this).attr("data-intranet-name");


        if ($("#user_type").val() == "컨택원") {
            sessionStorage.setItem("select_prjCode", $(this).find("td:first").text());
            location.href = '/contact/MatchingView';
        }
        $(".project_info.insert").hide();
        $(".project_info.update").show();

        //해당 리스트 클래스 추가
        $("tr").removeClass("list_selected");
        $(this).addClass("list_selected");

        $(".project_info.update input[type=text]:eq(0)").val(project_name)
        $(".project_info.update input[type=text]:eq(1)").val(intranet_name).attr("data-value", $(this).attr("data-intranet-code"));

        //상태값 수정
        $(".project_box .option").val("modify");
        $(".tab01 .save, .tab02 .save, .tab03 .save").val('');

    })


    //프로젝트 코드 검색
    $("#text01").on("keyup", function (e) {
        if (e.keyCode == 13) $("label[for=text01] button").click();
    })

    $("label[for=text01] button").on("click", function () {
        if ($("#text01").val() == "") {
            alert("프로젝트 코드를 입력해주세요.");
            return false;
        }
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if (korean.test($("#text01").val())) {
            alert("프로젝트 코드는 숫자만 입력 가능합니다.");
            return false;
        }

        $("#search_form").submit();
    })

    //프로젝트 이름 검색
    $("#text02").on("keyup", function (e) {
        if (e.keyCode == 13) $("label[for=text02] button").click();
    })

    $("label[for=text02] button").on("click", function () {
        if ($("#text02").val() == "") {
            alert("프로젝트 이름을 입력해주세요.");
            return false;
        }

        $("#search_form").submit();
    })

    //초기화
    $("#reset").on("click", function () {
        location.href = "/contactProject/Main";
    })

    //팝업창 표시
    $(".btn_box .option").on("click", function () {
        $(".popup_container").fadeIn();
        $("div[class^=tab0]").hide();
        $(".tabs li").removeClass("active");
        $(".tab01").show();
        $(".tab01").closest("li").addClass("active");
        ResultCode_Setting($(this).val());
        DivisionCode_Setting($(this).val());
    })

    //팝업창 닫기
    $(document).on("click", ".popup_container .popup_title .fa-times", function () {
        $(".popup_container").fadeOut();
    })

    //팝업창 메뉴 선택 시
    $(".tabs a").on("click", function () {
        var className = $(this).attr("class").split(" ")[0];

        if (className == "tab03") {
            if ($(".tab01 .box01 table tbody tr").length == 0) {
                alert("결과코드를 저장해주세요.");
                return false;
            }
            $("div[class^=tab0]").hide();
            $(".tab03").show();
            KonSetting($(".project_box .option:visible").val());
        } else {
            $("div[class^=tab0]").hide();
            $("." + className).show();
        }

        $(".tabs li").removeClass("active");
        $(this).closest("li").addClass("active");

    })

    /******************************* FOCUS 세팅 *******************************/
        //결과코드 빈값 focus
    let focusInput = "";

    function focusInput_interval() {
        if ($(".tab01 .list_table tbody tr input").hasClass("focus_input")) {
            if ($(".focus_input").hasClass("focus_input_none")) {
                $(".focus_input").removeClass("focus_input_none");
            } else {
                $(".focus_input").addClass("focus_input_none");
            }
        }
    }

    //focus setInterval 삭제
    $(document).on("keyup", ".focus_input", function () {
        $(this).removeClass("focus_input focus_input_none");
        clearInterval(focusInput);
    })

    /******************************* FOCUS 세팅 END *******************************/

    /******************************* 결과코드 세팅 *******************************/

    //컨택 결과코드 세팅하기
    function ResultCode_Setting(status) {
        if (["", undefined].includes($(".tab01 .save").val())) {
            $(".tab01 .list_table tbody, .tab01 .box01 table tbody").html('');
            $(".tab01 box01 table").hide();
        }

        if (status == "insert" && ["", undefined].includes($(".tab01 .save").val())) { // 추가
            var defaultCode = ["미사용", "면접예정", "부재중/회의중(타인통화)", "출장", "비수신(전화안받음)", "거절", "전화번호 오류(결번/FAX)", "조사대상 아님", "리스트 중복", "기타(기타 내용 기입)", "성공"];
            $.each(defaultCode, function (i, e) {
                if (i == 0) $(".tab01 .list_table table tbody").append("<tr><td><input type='text' name='code' value='" + i + "' disabled></td><td><input type='text' name='name' value='" + e + "' disabled></td></tr>");
                else $(".tab01 .list_table table tbody").append("<tr><td><input type='text' name='code' value='" + i + "'></td><td><input type='text' name='name' value='" + e + "'> <button class='remove'>삭제</button></td></tr>");
            })
        } else { // 수정
            //프로젝트 데이터
            $.ajax({
                url: "/contactProject/Get_ProjectDetail",
                data: {"pcode": $(".list_selected td:first").text().trim()},
                success: function (data) {
                    $.each(data.rlist, function (i, e) {
                        if (i == 0) $(".tab01 .list_table table tbody").append("<tr><td><input type='text' name='code' value='" + e.rcode + "' disabled></td><td><input type='text' name='name' value='" + e.rname + "' disabled></td></tr>");
                        else $(".tab01 .list_table table tbody").append("<tr><td><input type='text' name='code' value='" + e.rcode + "'></td><td><input type='text' name='name' value='" + e.rname + "'> <button class='remove'>삭제</button></td></tr>");

                        $(".tab01 .box01 table tbody").append("<tr><td>" + e.rcode + "</td><td>" + e.rname + "</td></tr>");
                    })
                }
            })

            $(".tab01 .box01 table").show();
        }
    }


    //결과코드 추가하기
    $(".tab01 .add").on("click", function () {
        $(".tab01 .list_table table tbody").append("<tr><td><input type='text' name='code'></td><td><input type='text' name='name'> <button class='remove'>삭제</button></td></tr>");
        //스크롤 맨 아래로
        $(".tab01 .list_table").scrollTop($(".tab01 .list_table")[0].scrollHeight);
    })

    //결과코드 삭제하기
    $(document).on("click", ".tab01 .list_table .remove", function () {
        $(this).closest("tr").remove();
    })

    //결과코드 저장하기
    $(".tab01 .save").on("click", function () {
        var flag = true, trNum = '', inputNum = '';
        $(".tab01 .box01 table tbody").html('');

        // focusInput = setInterval(focusInput_interval(), 1500);

        //빈값 체크
        $(".tab01 .list_table tbody tr").each(function (i, e) {
            var code = $(this).find("input[name=code]").val();
            var name = $(this).find("input[name=name]").val();

            if (code == '' || name == '') {
                trNum = i;
                if (code == '') inputNum = 0;
                else if (name == '') inputNum = 1;
                flag = false;
                return false;
            }
        })

        if (!flag) {
            $(".tab01 .box01 table").hide();
            $(this).val("");
            $(".tab01 .list_table tbody tr:eq(" + trNum + ") input:eq(" + inputNum + ")").addClass("focus_input");
            $(".tab01 .list_table tbody tr:eq(" + trNum + ") input:eq(" + inputNum + ")").focus();
            focusInput = setInterval(focusInput_interval, 1000);
            alert("결과코드 및 내용을 입력해주세요.");
            return false;
        }

        // //결과코드 저장 후 미리보기 세팅 및 K-ON 연동 세팅
        // $(".tab03 input[name=autoCoding]").siblings("ul").each(function(){
        //     $(this).find("li:gt(0)").remove();
        // })

        $(".tab01 .list_table tbody tr").each(function () {
            var code = $(this).find("input[name=code]").val();
            var name = $(this).find("input[name=name]").val();

            $(".tab01 .box01 table tbody").append("<tr><td>" + code + "</td><td>" + name + "</td></tr>");
        })
        if ($(".project_info:visible .option").val() == "insert") {
            alert("저장 완료했습니다.");
            $(this).val("Y");
            $(".tab01 .box01 table").show();
        } else {
            var result_data = [];

            //결과코드
            $(".tab01 .box01 table tbody tr").each(function () {
                var code = $(this).find("td:first").text();
                var name = $(this).find("td:eq(1)").text();

                result_data.push({"Rcode": code, "Rname": name, "Pcode": $(".list_selected td:first").text().trim()});
            })

            var konType = [];

            $.ajax({
                url: "/contactProject/Get_ProjectDetail",
                data: {"pcode": $(".list_selected td:first").text().trim()},
                success: function (data) {
                    if (data.klist.length > 0) {
                        var useChk = 0, deleteChk = 0;
                        $.each(data.klist, function (i, e) {
                            var original_code = e.code;
                            if (original_code != "") useChk++;

                            $(".tab01 .box01 table tbody tr").each(function () {
                                if (original_code == $(this).find("td:first").text()) deleteChk++;
                            })
                        })

                        if (useChk != deleteChk) {


                            var formData = new FormData();
                            formData.append("pcode", $(".list_selected td:first").text().trim());
                            formData.append("konCode", null);
                            formData.append("description", "K-ON 연동 초기화(결과코드 변경)");
                            formData.append("konType", ["", "", ""]);

                            $.ajax({
                                url: "/contactProject/Modify_KonCode",
                                type: "POST",
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    alert("K-ON 연동에 세팅되어 있는 값이 삭제되었습니다.\nK-ON 연동 다시 세팅 부탁드립니다!");
                                    // alert("수정 완료했습니다.");
                                    // $(".tab01 .box01 table").show();
                                }
                            })

                        }
                    }
                }
            })

            var formData = new FormData();
            formData.append("PCODE", $(".list_selected td:first").text().trim());
            formData.append("result_code", JSON.stringify(result_data));

            $.ajax({
                url: "/contactProject/Modify_ResultCode",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert("결과코드 수정 완료했습니다.");
                }
            })
        }
    })

    /******************************* 결과코드 세팅 END *******************************/


    /******************************* 분류코드 세팅 *******************************/

    // 분류코드 세팅
    $(".tab02 .drop_box").on("dragenter", function (e) {
        e.preventDefault();
        e.stopPropagation();
    }).on("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css("background-color", "#0188ff33");
    }).on("dragleave", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css("background-color", "#FFF");
    }).on("drop", function (e) {
        e.preventDefault();
        if ($("#uploadFile").val() != "") {
            if (!confirm("파일이 이미 존재합니다. 변경하시겠습니까?")) return false;
        }
        $("#uploadFile").prop("files", e.originalEvent.dataTransfer.files);

        Division_fileSetting();

        $(this).css("background-color", "#FFF");
    });

    //추가하기 클릭시
    $(".tab02 .add").on("click", function () {
        if ($("#uploadFile").val() != "") {
            if (!confirm("파일이 이미 존재합니다. 변경하시겠습니까?")) return false;
        }
        $("#uploadFile").click();
    })


    //파일 변경시
    $("#uploadFile").on("change", function () {
        Division_fileSetting();
    })

    function Division_fileSetting() {
        if ($("#uploadFile").val() == "") {
            $(".tab02 .list_table tbody").html('');
            $(".tab02 .list_table tbody").append("<tr><td colspan='3'>파일을 업로드해주세요.</td></tr>");
            return false;
        }
        var ext = $("#uploadFile").val().split(".").pop().toLowerCase();

        if (!["xlsx", "xls"].includes(ext)) {
            alert('등록 할수 없는 파일입니다.');
            $("#uploadFile").val(""); // input file 파일명을 다시 지워준다.
            return false;
        }

        const formData = new FormData();
        formData.append('excel', $("#uploadFile")[0].files[0]);

        $("#fileList").html('');
        $("#fileList").append("<p>파일명 : <label>" + $("#uploadFile")[0].files[0].name + "</label></p>");

        const division_code = ["리스트아이디", "전화번호", "이메일", "일반"];

        $.ajax({
            url: '/contactProject/ContactExcel',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {
                $(".tab02 .list_table tbody").html('');
                if (data.length < 1) {
                    $(".tab02 .list_table tbody").append("<tr><td colspan='3'>리스트가 존재하지 않습니다.</td></tr>");
                } else {
                    contactList = data;

                    $.each(data[0], function (i, e) {
                        $td = $("<td></td>");
                        $select_div = $('<div class="selectBox selectBox_2"></div>');
                        $select_input = $('<input type="text" name="division" className="link-selected" value="일반" data-code="일반" readOnly>');
                        $select_ul = ('<ul></ul>');
                        $select_i = $('<i class="fas fa-angle-down searchAngle"></i>');

                        $td.append($select_div.append($select_input).append($select_ul).append($select_i));

                        $(".tab02 .list_table tbody").append($("<tr>").append("<td>" + e + "</td>").append($td).append("<td class='toggleTD'><input class='tgl tgl-flip' id='divi_" + i + "' type='checkbox'/><label class='tgl-btn' data-tg-off='미분류열' data-tg-on='분류열' for='divi_" + i + "'></label></td>"));

                    })
                    $.each(division_code, function (i2, e2) {
                        $(".tab02 ul").append("<li><a href='#' class='link-select' data-code='" + e2 + "'>" + e2 + "</a></li>");
                    })
                }
            },
            error: function () {
                $(".tab02 .list_table tbody").html('');
                $(".tab02 .list_table tbody").append("<tr><td colspan='3'>파일을 업로드해주세요.</td></tr>");
                $("#uploadFile").val("");
                $("#fileList").html('');
                DivisionCode_Setting("modify");
                alert("파일을 확인해주세요.");
            }
        });
    }

    function DivisionCode_Setting(status) {
        if (status == "insert") {
            if ($(".tab02 .save").val() == "") {
                contactList = "";
                $("#uploadFile").val("");
                $("#fileList").html('');
                $(".tab02 .list_table tbody, .tab02 .box01 table tbody").html('');
                $(".tab02 .list_table tbody").append("<tr><td colspan='3'>파일을 업로드해주세요.</td></tr>");
                $(".tab02 .box01 table").hide();
            }
        } else {
            //프로젝트 데이터
            $.ajax({
                url: "/contactProject/Get_ProjectDetail",
                data: {"pcode": $(".list_selected td:first").text().trim()},
                success: function (data) {
                    // console.log(data)

                    $(".tab02 .list_table tbody, .tab02 .box01 table tbody").html('');

                    $.each(data.tlist, function (i, e) {
                        $td = $("<td></td>");
                        $select_div = $('<div class="selectBox selectBox_2"></div>');
                        $select_input = $('<input type="text" name="division" className="link-selected" value="' + e.type + '" data-code="' + e.type + '" readOnly>');
                        $select_ul = ('<ul></ul>');
                        $select_i = $('<i class="fas fa-angle-down searchAngle"></i>');

                        $td.append($select_div.append($select_input).append($select_ul).append($select_i));

                        if (e.division_status == "Y") $(".tab02 .list_table tbody").append($("<tr>").append("<td>" + e.header + "</td>").append($td).append("<td class='toggleTD'><input class='tgl tgl-flip' id='divi_" + i + "' type='checkbox' checked/><label class='tgl-btn' data-tg-off='미분류열' data-tg-on='분류열' for='divi_" + i + "'></label></td>"));
                        else $(".tab02 .list_table tbody").append($("<tr>").append("<td>" + e.header + "</td>").append($td).append("<td class='toggleTD'><input class='tgl tgl-flip' id='divi_" + i + "' type='checkbox'/><label class='tgl-btn' data-tg-off='미분류열' data-tg-on='분류열' for='divi_" + i + "'></label></td>"));
                    })

                    const division_code = ["리스트아이디", "전화번호", "이메일", "일반"];

                    $.each(division_code, function (i, e) {
                        $(".tab02 ul").append("<li><a href='#' class='link-select' data-code='" + e + "'>" + e + "</a></li>");
                    })

                    $.each(data.dlist, function (i, e) {
                        $(".tab02 .box01 table tbody").append("<tr><td data-code='" + e.dorder + "' data-code2='" + e.dcode + "'>" + e.dorder + " - " + e.dcode + "</td><td data-name='" + e.dheader + "' data-name2='" + e.dname + "'>" + e.dheader + " - " + e.dname + "</td></tr>");
                    })

                    $("input[name=division][data-code=리스트아이디]").on("click", function () {
                        alert("리스트 아이디는 변경불가합니다.");
                        return false;
                    })
                    $("input[name=division][data-code=리스트아이디]").closest("td").next().find("input, label").hide();

                }
            })

            $(".tab02 .box01 table").show();
        }
    }

    $(document).on("click", "input[name=division]", function () {
        $(this).siblings("ul").toggle();
        if ($(this).siblings("ul").is(":visible")) {
            $(this).siblings("svg").addClass('rotate-angle');
        } else {
            $(this).siblings("svg").removeClass('rotate-angle');
        }
    })

    //분류코드 저장
    $(".tab02 .save").on("click", function () {
        var flag = true, flag2 = 0;

        if ($(".tab02 .list_table tbody tr").length == 0) flag = false;

        $(".tab02 .list_table input[name=division]").each(function () {
            if ($(this).val() == "선택") flag2++;
        })


        if (!flag) {
            alert("컨택리스트를 업로드해주세요.");
            return false;
        }

        if (flag2 > 0) {
            alert("분류명을 선택해주세요.");
            return false;
        }

        if ($("input[name=division][data-code=리스트아이디]").length == 0) {
            alert("리스트아이디는 최소 하나를 선택해주세요.");
            return false;
        }

        if ($("input[name=division][data-code=리스트아이디]").length > 1) {
            alert("리스트아이디는 하나만 선택가능합니다.");
            return false;
        }

        var diviChkArr = [];
        $(".tab02 .list_table input[type=checkbox]").each(function (i, e) {
            if ($(this).is(":checked")) diviChkArr.push(i);
        })

        // console.log(flag, flag2, diviChkArr) GetList
        if ($(".project_info:visible .option").val() == "modify" && $("#uploadFile").val() == "") {
            $.ajax({
                url: "/contactProject/GetList",
                async: false,
                data: {"PCODE": $(".list_selected td:first").text().trim()},
                success: function (data) {
                    contactList = data;
                }
            })
        }


        $(".tab02 .box01 table tbody").html('');
        if (diviChkArr.length == 0) {
            $(".tab02 .box01 table tbody").append("<tr><td colspan='2'>분류코드가 세팅되어 있지 않습니다.</td></tr>");
        } else {
            var diviCodeArr = [];
            $.each(diviChkArr, function (i, e) {
                var index = i + 1;
                diviCodeArr = [];

                $.each(contactList, function (i2, e2) {
                    if ($(".project_info:visible .option").val() == "insert") {
                        if (i2 > 0 && diviCodeArr.indexOf(e2[e].trim()) === -1) diviCodeArr.push(e2[e].trim());
                    } else {
                        if ($("#uploadFile").val() != "") {
                            if (i2 > 0 && diviCodeArr.indexOf(e2[e].trim()) === -1) diviCodeArr.push(e2[e].trim());
                        } else {
                            if ((e + 1) == e2.list_order && diviCodeArr.indexOf(e2.list_data.trim()) === -1) diviCodeArr.push(e2.list_data.trim());
                        }
                    }

                })
                // console.log(diviCodeArr)
                $.each(diviCodeArr.sort(), function (i2, e2) {
                    var index2 = i2 + 1;
                    var MainCate = $(".tab02 .list_table table tbody tr:eq(" + e + ") td:first").text();
                    $(".tab02 .box01 table tbody").append("<tr><td data-code='" + index + "' data-code2='" + index2 + "'>" + index + " - " + index2 + "</td><td data-name='" + MainCate + "' data-name2='" + e2 + "'>" + MainCate + " - " + e2 + "</td></tr>");
                })
            })
        }

        if ($(".project_info:visible .option").val() == "insert") {
            alert("저장 완료했습니다.");
            $(this).val("Y");
            $(".tab02 .box01 table").show();
        } else {
            var division_data = [], list_data = [], type_data = [], Listid_arr = [];

            //분류코드
            if ($("input[id^=divi_]:checked").length < 1) {
                division_data = [];
            } else {
                $(".tab02 .box01 table tbody tr").each(function () {
                    var Dorder = $(this).find("td:first").attr("data-code");
                    var Dcode = $(this).find("td:first").attr("data-code2");
                    var Dname = $(this).find("td:last").attr("data-name");
                    var Dheader = $(this).find("td:last").attr("data-name2");

                    division_data.push({"Dorder": Dorder, "Dcode": Dcode, "Dname": Dname, "Dheader": Dheader});
                })
            }

            //분류코드 타입
            $(".tab02 .list_table table tbody tr").each(function () {
                var Header = $(this).find("td:first").text();
                var Type = $(this).find("td:eq(1) input").attr("data-code");
                var Division_status = $(this).find("td:last input").is(":checked") ? "Y" : "N";

                type_data.push({"Header": Header, "Type": Type, "Division_status": Division_status});
            })

            //리스트 데이터
            $.each(contactList, function (i, e) {
                if ($("#uploadFile").val() == "") {
                    var listIndex = $("input[name=division][data-code=리스트아이디]").closest("tr")[0].rowIndex;

                    if (contactList[i].list_order == listIndex) Listid_arr.push(contactList[i].list_data);

                    //리스트 데이터
                    list_data.push({"list_id": e.list_id, "list_data": e.list_data, "list_type": e.list_type});
                } else {
                    var listIndex = $("input[name=division][data-code=리스트아이디]").closest("tr")[0].rowIndex - 1;
                    var listId = contactList[i][listIndex];
                    if (i > 0) {
                        //상태값 아이디키 저장
                        Listid_arr.push(listId);
                        //리스트 데이터
                        $.each(contactList[i], function (i2, e2) {
                            list_data.push({"list_id": listId, "list_data": e2, "list_type": contactList[0][i2]});
                        })
                    }
                }
            })

            var formData = new FormData();
            formData.append("pcode", parseInt($(".list_selected td:first").text().trim()));
            formData.append("description", "분류코드 수정");
            formData.append("division_data", JSON.stringify(division_data));
            formData.append("list_data", JSON.stringify(list_data));
            formData.append("type_data", JSON.stringify(type_data));
            formData.append("Listid_arr", Listid_arr);
            //
            $.ajax({
                url: "/contactProject/Modify_DivisionCode",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert("분류코드 수정완료했습니다.");
                }
            })
        }
    })

    /******************************* 분류코드 세팅 END*******************************/


    /******************************* K-ON연동 세팅 *******************************/

    $(document).on("click", "#kon_intraProject~svg", function () {
        $(this).siblings("ul").toggle();
        if ($(this).siblings("ul").is(":visible")) {
            $(this).addClass('rotate-angle');
        } else {
            $(this).removeClass('rotate-angle');
        }
    })
    //K-ON 연동 selectbox 목록 클릭 시, 세팅
    $(document).on("click", "#kon_intraProject~ul .link-select", function () {
        var pkey = $(this).attr("data-value");
        if (pkey == "N") {
            $("input[name=autoCoding]").each(function (i, e) {
                $(".tab03 .box01 table tbody tr:eq(" + i + ") td:gt(0)").remove();
                $(this).removeAttr("data-code").removeAttr("data-title").val("선택");
            })

            $(".tab03 .box01 table").hide();
        }
    })

    //K-ON 연동 데이터 불러오기
    function KonSetting(status) {
        if (status == "insert") { // 추가
            if (["", undefined].includes($(".tab03 .save").val())) {
                $("#kon_intraProject").attr("data-value", "").val("");

                $(".tab03 input[name=autoCoding]").each(function () {
                    $(this).siblings("ul").find("li:gt(0)").remove();
                    $(this).attr("data-code", "").attr("data-title", "").val("선택");
                })

                $(".tab01 .list_table tbody tr").each(function () {
                    var code = $(this).find("input[name=code]").val();
                    var name = $(this).find("input[name=name]").val();

                    $(".tab03 input[name=autoCoding]").siblings("ul").append("<li><a href='#' class='link-select' data-code='" + code + "' data-title='" + name + "'>[" + code + "] " + name + "</a></li>");
                })
            }
        } else { // 수정
            //프로젝트 데이터
            $("#kon_intraProject").attr("data-value", $(".list_selected").attr("data-kon-code"));
            if ($(".list_selected").attr("data-kon-code") != "") $("#kon_intraProject").val("[" + $(".list_selected").attr("data-kon-code") + "] " + $(".list_selected").attr("data-kon-name"))

            $(".tab03 input[name=autoCoding]").siblings("ul").each(function () {
                $(this).find("li:gt(0)").remove();
            })

            $(".tab01 .list_table tbody tr").each(function () {
                var code = $(this).find("input[name=code]").val();
                var name = $(this).find("input[name=name]").val();

                $(".tab03 input[name=autoCoding]").siblings("ul").append("<li><a href='#' class='link-select' data-code='" + code + "' data-title='" + name + "'>[" + code + "] " + name + "</a></li>");
            })

            $.ajax({
                url: "/contactProject/Get_ProjectDetail",
                data: {"pcode": $(".list_selected td:first").text().trim()},
                success: function (data) {
                    if (data.klist.length > 0) {
                        $.each(data.klist, function (i, e) {
                            $(".tab03 ul:eq(" + (i + 1) + ") a[data-code='" + e.code + "']").click();
                        })

                        $("input[name=autoCoding]").each(function (i, e) {
                            var code = $(this).attr("data-code");
                            var title = $(this).attr("data-title") + " (" + code + ")";

                            $(".tab03 .box01 table tbody tr:eq(" + i + ") td:gt(0)").remove();
                            if (!["", undefined].includes(code)) $(".tab03 .box01 table tbody tr:eq(" + i + ")").append("<td>" + title + "</td>");
                            else $(".tab03 .box01 table tbody tr:eq(" + i + ")").append("<td>미선택 (-)</td>");
                        })
                    }
                }
            })

            $(".tab03 .box01 table").show();
        }
    }


    //K-ON 연동 저장
    $(".tab03 .save").on("click", function () {

        if (["", "N", undefined].includes($("#kon_intraProject").attr("data-value"))) {
            $("input[name=autoCoding]").each(function (i, e) {
                $(".tab03 .box01 table tbody tr:eq(" + i + ") td:gt(0)").remove();
                $(this).removeAttr("data-code").removeAttr("data-title").val("선택");
            })

            $(".tab03 .box01 table").hide();
            $(".tab3 .save").val("");

            alert("K-ON 프로젝트를 선택해주세요.");
            return false;
        }

        var autoFlag = 0;
        $("input[name=autoCoding]").each(function (i, e) {
            if (["", undefined].includes($(this).attr("data-code"))) autoFlag++;
        })

        if (autoFlag == 3) {
            $("input[name=autoCoding]").each(function (i, e) {
                $(".tab03 .box01 table tbody tr:eq(" + i + ") td:gt(0)").remove();
            })

            $(".tab03 .box01 table").hide();
            $(".tab3 .save").val("");

            alert("최소 하나의 AutoCoding을 선택해주세요.");
            return false;
        }

        $(".tab03 .box01 table").show();
        $("input[name=autoCoding]").each(function (i, e) {
            var code = $(this).attr("data-code");
            var title = $(this).attr("data-title") + " (" + code + ")";
            $(".tab03 .box01 table tbody tr:eq(" + i + ") td:gt(0)").remove();
            if (!["", undefined].includes(code)) $(".tab03 .box01 table tbody tr:eq(" + i + ")").append("<td>" + title + "</td>");
            else $(".tab03 .box01 table tbody tr:eq(" + i + ")").append("<td>미선택 (-)</td>");
        })

        if ($(".project_info:visible .option").val() == "insert") {
            alert("저장 완료했습니다.");
            $(".tab03 .save").val("Y");
        } else {

            var konType = [], konCode = null;

            konCode = $("#kon_intraProject").attr("data-value");
            $("input[name=autoCoding]").each(function () {
                konType.push($(this).attr("data-code"));
            })

            var formData = new FormData();
            formData.append("pcode", parseInt($(".list_selected td:first").text().trim()));
            formData.append("description", "K-ON연동 수정");
            formData.append("konCode", konCode);
            formData.append("konType", konType);

            $.ajax({
                url: "/contactProject/Modify_KonCode",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert("K-ON 연동 수정완료했습니다.");
                }
            })
        }
    })

    /******************************* K-ON연동 세팅 END *******************************/


    /******************************* 프로젝트 등록 *******************************/
    $("#section .square_btn:last").on("click", function () {
        if ($(".insert #projectName").val().trim() == "") {
            alert("프로젝트명을 입력해주세요.");
            return false;
        }

        if (["", undefined].includes($(".insert #intranetProject").attr("data-value"))) {
            alert("인트라넷 연동 프로젝트를 입력해주세요.");
            return false;
        }

        if ($(".tab01 .save").val() == "") {
            alert("결과코드를 저장해주세요.");
            return false;
        }

        if ($(".tab02 .save").val() == "") {
            alert("분류코드를 저장해주세요.");
            return false;
        }

        var result_data = [], division_data = [], list_data = [], type_data = [], Listid_arr = [], konType = [],
            konCode = null;

        //결과코드
        $(".tab01 .box01 table tbody tr").each(function () {
            var code = $(this).find("td:first").text();
            var name = $(this).find("td:eq(1)").text();

            result_data.push({"Rcode": code, "Rname": name});
        })

        //분류코드
        if ($("input[id^=divi_]:checked").length < 1) {
            division_data = [];
        } else {
            $(".tab02 .box01 table tbody tr").each(function () {
                var Dorder = $(this).find("td:first").attr("data-code");
                var Dcode = $(this).find("td:first").attr("data-code2");
                var Dname = $(this).find("td:last").attr("data-name");
                var Dheader = $(this).find("td:last").attr("data-name2");

                division_data.push({"Dorder": Dorder, "Dcode": Dcode, "Dname": Dname, "Dheader": Dheader});
            })
        }

        //분류코드 타입
        $(".tab02 .list_table table tbody tr").each(function () {
            var Header = $(this).find("td:first").text();
            var Type = $(this).find("td:eq(1) input").attr("data-code");
            var Division_status = $(this).find("td:last input").is(":checked") ? "Y" : "N";

            type_data.push({"Header": Header, "Type": Type, "Division_status": Division_status});
        })

        //리스트 데이터
        $.each(contactList, function (i, e) {
            var listIndex = $("input[name=division][data-code=리스트아이디]").closest("tr")[0].rowIndex - 1;
            var listId = contactList[i][listIndex];
            if (i > 0) {
                //상태값 아이디키 저장
                Listid_arr.push(listId);
                //리스트 데이터
                $.each(contactList[i], function (i2, e2) {
                    list_data.push({"Listid": listId, "listData": e2, "listType": contactList[0][i2]});
                })
            }
        })

        //k-on 타입
        if ($(".tab03 .save").val() == "") {
            konType = null;
        } else {
            konCode = $("#kon_intraProject").attr("data-value");
            $("input[name=autoCoding]").each(function () {
                konType.push($(this).attr("data-code"));
            })
        }

        // console.log(result_data)
        // console.log(division_data)
        // console.log(type_data)
        // console.log(list_data)
        // console.log(Listid_arr)
        // console.log(konType)
        // return false;
        var formData = new FormData();
        formData.append("prjName", $(".project_info.insert #projectName").val());
        formData.append("intranetCode", $(".project_info.insert #intranetProject").attr("data-value"));
        formData.append("konCode", konCode);
        formData.append("result_data", JSON.stringify(result_data));
        formData.append("division_data", JSON.stringify(division_data));
        formData.append("list_data", JSON.stringify(list_data));
        formData.append("type_data", JSON.stringify(type_data));
        formData.append("Listid_arr", Listid_arr);
        formData.append("konType", konType);

        $.ajax({
            url: "/contactProject/ContactInsert",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data)
                if (data == 1) {
                    alert("프로젝트 등록되었습니다.");
                    location.reload();
                }else{
                    alert("프로젝트 생성중 오류 발생했습니다.\n개발그룹에 문의 부탁드립니다.")
                }
            }
        })
    })
    /******************************* 프로젝트 등록 END*******************************/

    /******************************* 프로젝트 정보 수정*******************************/

    $(".project_modify").on("click", function(){

        if ($(".update input:eq(0)").val().trim() == "") {
            alert("프로젝트명을 입력해주세요.");
            return false;
        }

        if (["", undefined].includes($(".update input:eq(1)").attr("data-value"))) {
            alert("인트라넷 연동 프로젝트를 입력해주세요.");
            return false;
        }

        var formData = new FormData();

        formData.append("projectName", $(".project_info.update input:eq(0)").val());
        formData.append("intranetCode", $(".project_info.update input:eq(1)").attr("data-value"));
        formData.append("pcode", $(".list_selected td:eq(0)").text().trim());

        $.ajax({
            url: "/contactProject/ModifyInfo",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data)
                if (data == 1) {
                    alert("프로젝트 정보 수정되었습니다.");
                    location.reload();
                }else{
                    alert("프로젝트 정보 수정 중 오류 발생했습니다.\n개발그룹에 문의 부탁드립니다.")
                }
            }
        })
    })

    /******************************* 프로젝트 정보 수정 END*******************************/
})