$(function() {
    $('.nw_submit').click(function(e) {
        var fName = $("#upload_img").val();	
        if(fName.length != 0){
            fName = fName.split('.').pop().toLowerCase();
            var check = $.inArray(fName, [ 'png','jpg' ]);
            
            if (check == -1) {
                alert("확장자 jpg, png만 가능합니다.");
            }
        }

        var form = document.nw_regist
        form.action = "/ITAM/hw/nw/regist";
        form.method = "POST" ;
        form.submit();
    });
});