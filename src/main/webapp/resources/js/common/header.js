$('#projectList .selectBox').on('click',function(){
    $(this).children('ul').toggle();
    $(this).children('.fa-angle-down').toggleClass('rotate-angle');
})

$(document).on('click', '#projectList .link-select', function(){
    var dv = $(this).attr('data-value');
    var dt = $(this).text();

    $(this).parents('.selectBox').find('.link-selected').text(dt);
    $(this).parents('.selectBox').find('input').attr('data-value',dv);
    $(this).parents('.selectBox').find('input').val(dv);

    $(this).parents('ul').siblings('.fa-angle-down').removeClass('rotate-angle');
})
/*
$('#intra-prjlist .selectBox').on('click',function(){
    $(this).children('ul').toggle();
    $(this).children('.fa-angle-down').toggleClass('rotate-angle');
})

$(document).on('click', '#intra-prjlist .link-select', function(){
    var dv = $(this).attr('data-value');
    var dt = $(this).text();

    $(this).parents('.selectBox').find('.link-selected').text(dt);
    $(this).parents('.selectBox').find('input').attr('data-value',dv);
    $(this).parents('.selectBox').find('input').val(dv);

    $(this).parents('ul').siblings('.fa-angle-down').removeClass('rotate-angle');
})
*/

// selectBox 모듈
window.kon = window.kon || {}

kon.contact = (function(){

    function intraSearch(url, v){
        $.ajax({
            url: url,
            data:{
                "name": v
            },
            type: 'POST',
            success: function(data){
                location.reload();
            },
            error: function(err){
                console.log(err)
            }
        })

    }

    function refreash(url, va){
        $.ajax({
            url: url,
            data:{
                "endYn": va,
                "pjcode": 0
            },
            type: 'POST',
            success: function(data){
                location.reload();
            },
            error: function(err){
                console.log(err)
            }
        })

    }

    function pjSelect(url, va, va2){
        $.ajax({
            url: url,
            data:{
                "endYn": va,
                "pjcode":va2
            },
            type: 'POST',
            success: function(data){
                location.reload();
            },
            error: function(err){
                console.log(err)
            }
        })
    }

    return {
        pjSelect: pjSelect,
        refreash: refreash,
        intraSearch:intraSearch
    };

})();