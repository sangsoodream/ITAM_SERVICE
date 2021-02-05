//page번호 클릭 시 페이지 이동
function pageMove(pageNum){
    if(pageNum == 0){
        pageNum = 1;
    }

    if($(".p_last").val() < pageNum){
        pageNum = $(".p_last").val();
    }

    var baseNum = $("#pn option:selected").val();

    var frm = document.paging
    frm.cPageNum.value = pageNum;
    frm.baseNum.value = baseNum;
    frm.action = "/ITAM/hw/nw/list";
    frm.method = "GET" ;

    frm.submit();
}
