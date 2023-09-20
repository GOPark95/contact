document.writeln('<script src=" /resources/js/common/echarts.js"></script>')

function loginChk(){
    alert('로그인 세션이 만료되었습니다.\n로그인 다시 부탁드립니다.');
    location.href='/logout';
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
$(document).on("click", "#section .selectBox > input, .divisionName .selectBox > input", function(){
    $(this).siblings("ul").toggle();
    if($(this).siblings("ul").is(":visible")){
        $(this).siblings('.fa-angle-down').addClass('rotate-angle');
    }else{
        $(this).siblings('.fa-angle-down').removeClass('rotate-angle');
    }
})

//프로젝트 클릭시,
$(document).on("click", "#PROJECT_LIST ~ ul .link-select", function() {
    $(".infoPopupWrap").fadeOut();
    sessionStorage.setItem("select_prjCode", $(this).attr("data-code"));
})

//차트
$(function(){

    //차트1
    var chartDom = document.getElementById('chart1');
    var myChart1 = echarts.init(chartDom);
    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            borderWidth: 5
        },
        legend: {},
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value',
            min: 0,
            boundaryGap: true,
            // max: 5
        },
        series: [
            {
                name: '',
                type: 'line',
                data: [],
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                // markLine: {
                //     data: [{ type: 'average', name: 'Avg' }]
                // }
            }
        ]
    };

    myChart1.setOption(option);
    myChart1.resize({width: 800, height: 250});

    //차트2
    var chartDom = document.getElementById('chart2');
    var myChart2 = echarts.init(chartDom);
    var option;

    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                ]
            }
        ]
    };

    myChart2.setOption(option);
    myChart2.resize({width: 800, height: 250});

    //차트3
    var chartDom = document.getElementById('chart3');
    var myChart3 = echarts.init(chartDom);
    var option;

    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: [
                ]
            }
        ]
    };

    myChart3.setOption(option);
    myChart3.resize({width: 800, height: 250});

    
    //프로젝트 선택 시, 차트 데이터 세팅
    $("#PROJECT_LIST ~ ul .link-select").on("click", function(){
        var prj_code = $(this).attr("data-code");

        $.ajax({
            url: "/contact/Get_ChartData",
            data: {"prj_code":prj_code},
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(result){
                // console.log(result)

                //차트1
                var dateArr = [], countArr = [];
                $.each(result.dclist, function(i, e){
                    dateArr.push(e.name);
                    countArr.push(e.count);
                })

                // console.log(dateArr, countArr)
                option = {
                    xAxis: {
                        data: dateArr
                    },
                    series: [
                        {
                            data: countArr
                        }
                    ]
                };

                myChart1.setOption(option);

                //차트2
                var resultCodeArr = [];
                $.each(result.cslist, function(i, e){
                    var rjson = new Object();
                    rjson.name = e.name;
                    rjson.value = e.count;
                    resultCodeArr.push(rjson);
                })

                option = {
                    series: [
                        {
                            data: resultCodeArr
                        }
                    ]
                };

                myChart2.setOption(option);

                //차트3
                var myunArr = [];
                $.each(result.mlist, function(i, e){
                    var mjson = new Object();
                    mjson.name = e.name;
                    mjson.value = e.count;
                    myunArr.push(mjson);
                })

                option = {
                    series: [
                        {
                            data: myunArr
                        }
                    ]
                };

                myChart3.setOption(option);
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
        
        
        //분류코드 세팅
        $.ajax({
            url: "/contact/GetDivisionCode",
            data: {
                "pcode":prj_code
            },
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(result) {
                console.log(result)
                if(result[0].length > 0){
                    $(".text_flied.h200:first").html('');
                    $.each(result[0], function(i, e){
                        $(".text_flied.h200:first").append("<div class='divisionName'><span>"+e+"</span><div class='selectBox selectBox_2'></div></div>")
                        $(".text_flied.h200:first .divisionName:eq("+i+") .selectBox").append("<input type='text' class='link-selected' value='선택안함' readonly>")
                        $(".text_flied.h200:first .divisionName:eq("+i+") .selectBox").append("<ul></ul>")
                        $(".text_flied.h200:first .divisionName:eq("+i+") .selectBox").append("<i class='fas fa-angle-down searchAngle'></i>")

                        $(".text_flied.h200:first .divisionName:eq("+i+") .selectBox ul").append("<li><a href='#' class='link-select' data-code='' data-title=''>선택안함</a></li>")

                        $.each(result[1][i], function(i2, e2){
                            $(".text_flied.h200:first .divisionName:eq("+i+") .selectBox ul").append("<li><a href='#' class='link-select' data-code='"+(i2+1)+"' data-title='"+e2+"'>"+e2+"</a></li>")
                        })
                    })
                }else{
                    $(".text_flied.h200:first").html("<p>분류코드가 없습니다.</p>");
                }
            },error: function(xhr, status, error){
                // console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })

        $(".text_flied.h200:last").html("<p>리스트 아이디를 검색해주세요.</p>")
    })


    //엔터시 로그인 클릭
    $("#listSearch").on("keyup", function(e){
        if(e.keyCode == 13) $(".search_icon img").click()
    })

    //리스트 검색
    $(".search_icon img").on("click", function(){
        var prj_code = $("#PROJECT_LIST").attr("data-code");
        var listId = $("#listSearch").val();

        if(listId === ''){
            $("#listSearch").focus();
            alert("리스트 아이디를 입력해주세요.");
            return false;
        }

        $.ajax({
            url: "/contact/GetListInfo",
            data: {
                "prjCode":prj_code,
                "listId":listId
            },
            beforeSend: function(xmlHttpRequest){
                xmlHttpRequest.setRequestHeader("AJAX", "true");
            },
            success: function(result) {
                if(result.length < 1){
                    $(".text_flied.h200:last").html("<p>검색결과가 없습니다.</p>");
                    $("#listId").val("N");
                }else{
                    $(".text_flied.h200:last").html("<table><thead><tr><th>항목</th><th>내용</th></tr></thead><tbody></tbody></table>");
                    $.each(result, function(i, e){
                        $(".text_flied.h200:last table tbody").append("<tr><td>"+e.list_header+"</td><td>"+e.list_data+"</td></tr>");
                    })
                    $("#listId").val(listId);
                }
            },error: function(xhr, status, error){
                // console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })

    })
    
    //분류코드 선택 이동
    $("#randomMove").on("click", function(){
        var prjCode = $("#PROJECT_LIST").attr("data-code");
        var listId = $("#listSearch").val();
        var diviArr = [];

        $(".divisionName").each(function(i, e){
            if(!["", undefined].includes($(this).find(".selectBox > input").attr("data-code"))) {
                diviArr.push({"header":$(this).find("span").text(), "dname":$(this).find(".selectBox > input").attr("data-title"), "code":"divi"+(i+1)});
            }
        })

        var formData = new FormData();
        formData.append("prjCode", prjCode);
        formData.append("divi_arr", JSON.stringify(diviArr));

        for (let key of formData.keys()) {
            console.log(key, ":", formData.get(key));
        }

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
                // console.log(result);
                // return false;
                if(result == ""){
                    alert("리스트가 존재하지 않습니다.");
                }else{
                    console.log(result)
                    location.href = "/contact/details/"+prjCode+"/"+result;
                }

            },error: function(xhr, status, error){
                // console.log(xhr, status, error)
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })
    })
    
    //리스트 검색 이동
    $("#listMove").on("click", function(){
        var formData = new FormData();
        var prjCode = $("#PROJECT_LIST").attr("data-code");
        var listId = $("#listSearch").val();

        formData.append("prjCode", prjCode);
        formData.append("listId", listId);

        if(prjCode == "" || listId == ""){
            alert("리스트아이디를 입력해주세요.");
            return false;
        }

        if($(this).closest(".project_box").find(".text_flied.h200 table").length == 0){
            alert("검색된 리스트가 없습니다.");
            return false;
        }

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
                    alert("현재 리스트가 진행중입니다.");
                    return false;
                }else{
                    location.href = "/contact/details/"+prjCode+"/"+listId;
                    // location.href = "/contact/MatchingView?prjCode=" + prjCode + "&listId=" + listId;
                }
            },error: function(xhr, status, error){
                if(xhr.status=="600"){
                    loginChk();
                }
            }
        })

        // location.href = "/contact/details/"+prjCode+"/"+listId;
    })


    //프로젝트 코드 있으면 세팅
    if(![undefined, ""].includes(sessionStorage.getItem("select_prjCode"))){
        $("#PROJECT_LIST ~ ul .link-select[data-code="+sessionStorage.getItem("select_prjCode")+"]").click();
    }
})


