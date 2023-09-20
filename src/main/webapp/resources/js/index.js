$("#menuicon").on("click",function(e){
    if($(e.target).prop("checked")){
        $("#dropmenu").fadeIn();
    }else{
        $("#dropmenu").fadeOut();
    }
})