$(document).ready(function () {
	$("#lnb ul li").click(function() {
		//$(this).siblings().removeClass("on");
		$(this).toggleClass("on");
	});
});

function loadSideMenuSub(page_nm) {
	$("#lnb ul li ul li").removeClass("on");
	$("#lnb ul li ul li." + page_nm).parent().parent().siblings().removeClass("on");
	
	$("#lnb ul li ul li." + page_nm).addClass("on");
	$("#lnb ul li ul li." + page_nm).parent().parent().addClass("on");
}

function loadSideMenuHwRegist(page_nm) {
	$("#lnb ul li>span").parent().removeClass("on");
	$("#lnb ul li>span" + page_nm).parent().siblings().removeClass("on");
	
	$("#lnb ul li>span." + page_nm).parent().addClass("on");
	$("#lnb ul li>span." + page_nm).parent().find("ul li." + page_nm).addClass("on");
}