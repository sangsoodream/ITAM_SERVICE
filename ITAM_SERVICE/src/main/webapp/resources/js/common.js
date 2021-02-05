// 목록 체크박스 전체 체크 시 '전체체크' 체크박스 체크/체크해제 처리 
$(function() {
	$("input:checkbox[name='chk_ast']").change(function() {
		var chk = $("input:checkbox[name='chk_ast']");
		
		if(chk.length == chk.filter(":checked").length) {
			$("input:checkbox[name='chk_ast_all']").prop("checked", true);
		} else {
			$("input:checkbox[name='chk_ast_all']").prop("checked", false);
		}
	});
});

/* layout */
$(function() {
	"use strict";
	
	$('.nav-toggle').click(function(e) {
		e.preventDefault();

		$('#container').toggleClass('closeNav');
		$('.nav-toggle').toggleClass('active');

		$("#lnb ul ul").hide();
	});
});

/* table click checkbox checked */
$(function() {
	$(document).on("click",".tbl_data tr",function() {

		var tr = $(".tbl_data tr").index(this);
		var eventTr = $(".tbl_data tr:eq("+tr+") td:eq(0)").children().first();
		
		if(eventTr.is(":checked") == true) {
			eventTr.prop('checked', false);
		} else {
			eventTr.prop('checked', true);
		}
		
		var chk = $("input:checkbox[name='chk_ast']");
	
		if(chk.length == chk.filter(":checked").length) {
			$("input:checkbox[name='chk_ast_all']").prop("checked", true);
		} else {
			$("input:checkbox[name='chk_ast_all']").prop("checked", false);
		}
	});
});

/* resize_layout */
$(function() {
	"use strict";

	$(window).resize(function () {
		 var width = window.outerWidth;

		 if(width < 1125) {
			$('body').addClass('mobileNav');
			$('#container').removeClass('closeNav');

			$('.nav-toggle').click(function(e) {
			  e.preventDefault();

			  $('.nav-toggle').toggleClass('m_active');
			}); 
		 } else if(width > 1125) {
		 	$('body').removeClass('mobileNav');
		 	
			$('.menu').hover(function() {
				$('.menu').toggleClass('menu_hv');
			});
		 }
	 });
});

/*Side Menu*/
$(function() {
	var sidePath = window.location.pathname.split('/')[3];
	
	if(window.location.pathname.split('/')[2] == 'hw') {
		$('.side_hw').addClass('on');
		sideMenu(sidePath);
	} else if(window.location.pathname.split('/')[2] == 'sw') {
		$('.side_sw').addClass('on');
		sideMenu(sidePath);
	} else if(window.location.pathname.split('/')[2] == 'etc') {
		$('.side_etc').addClass('on');
		sideMenu(sidePath);
	} else if(window.location.pathname.split('/')[2] == 'setting') {
		$('.side_option').addClass('on');
		sideMenu(sidePath);
	} else if(window.location.pathname.split('/')[2] == 'all') {
		$('.side_all').addClass('on');
		sideMenu(sidePath);
	} else {
		$('.side_dash').addClass('on');
		sideMenu(sidePath);
	}
});

/*Datepicker*/
$(function() {
	"use strict";
	
	$(".S_date, .E_date").datepicker();
});

/*$(function() {
	"use strict";
	$(".S_date, .E_date").attr('readOnly' , 'true');
});*/

/* 탭 메뉴*/ 
$(function() {
	"use strict";
	
    $(".tab_content").hide();
    $(".tab_content:first").show();

    $(".tabs ul li").click(function () {
        $(".tabs ul li").removeClass("active");
        $(this).addClass("active");
        $(".tab_content").hide();
        
        var activeTab = $(this).find("a").attr("href"); 
        $(activeTab).fadeIn();
        
		return false;
    });
});

/*alert popup*/
$(function() {
	"use strict";
	
	var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");

	$('a[data-modal-id]').click(function(e) {
		e.preventDefault();

		$("body").append(appendthis);
		$(".modal-overlay").fadeTo(500, 0.7);
		//$(".js-modalbox").fadeIn(500);
		var modalBox = $(this).attr('data-modal-id');
		$('#'+modalBox).fadeIn($(this).data());
	});  

	$(".js-modal-close, .modal-overlay").click(function() {
		$(".modal-box, .modal-box-al, .modal-overlay").fadeOut(500, function() {
			$(".modal-overlay").remove();
		});
	});

	$(window).resize(function() {
		$(".modal-box, .modal-box-al").css({
			top: ($(window).height() - $(".modal-box, .modal-box-al").outerHeight()) / 2,
			left: ($(window).width() - $(".modal-box, .modal-box-al").outerWidth()) / 2
		});
	});

	$(window).resize();
});

/*select*/
$(function() {
	"use strict";
	
	$("select").styledSelect();
});

/*placeholder*/
$(function() {
	"use strict";
	
    $('.placeholder').autoClear();
});

/* add search box*/
$(function() {
	"use strict";
	
	$(".search_more_btn").click(function () { $(".add_search_info_box").toggle(); });
});

/* add box*/
$(function() {
	"use strict";
	
	$(".view_btn").click(function () { $(".view_info_box").toggle(); });
});

/*LNB Navigation */
(function($) {
	"use strict";

	$(document).ready(function() {
		$('.LNB_navi > ul > li > a').click(function() {
			$('.LNB_navi li').removeClass('active');
			$(this).closest('li').addClass('active');
			
			var checkElement = $(this).next();

			if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
				$('.LNB_navi ul ul:visible').slideUp('normal');
				$(".has_sub_show").attr('id', '0');
				$(".has_sub_show").children('ul').slideUp();
				checkElement.slideDown('normal');
			}
		});
	});
})(jQuery);

/* table */
$(function() {
	"use strict";
	
	$('.tablesorter').tablesorter({
		usNumberFormat : false,
		sortReset  : true,
		sortRestart  : true
	});
});

/* div 높이 같게 */
$(function() {
	"use strict";

	$('.graph_wrap_con_wrap').each(function() {
		var highestBox = 0;

		$('.layout').each(function() {
			if($(this).height() > highestBox)
			highestBox = $(this).height();
		});

		$('.layout').height(highestBox);
	});
});

/* ie8 */
/* check */
$(function() { 
	"use strict";

	$("input:checkbox").on('click', function() { 
		if($(this).prop('checked')) { 
			$(this).parent().addClass("selected"); 
		} else {
			$(this).parent().removeClass("selected"); 
		} 
	}); 
});
		
$(function() {
	"use strict";

	var _designRadio = $('.designRadio');
	var _iLabel = $('.iLabel');

	$(_iLabel).click(function() {
		var _thisRadio = $(this).parent().find('> .designRadio');
		var _value = $(this).parent().find('>input').val();

		$(_designRadio).children().removeClass('checked');
		$(_thisRadio).children().addClass('checked');
		
		//console.log(_value);
	});

	$(_designRadio).click(function() {
		var _value = $(this).parent().find('>input').val();

		$(_designRadio).children().removeClass('checked');
		$(this).children().addClass('checked');
		
		//console.log(_value);
	});
});

/*table add*/
$(function() {
	$(".add").click(function() {
    	$(".addtbl01:first").clone(true).appendTo("#data_tbl").find('input[type="text"]').val('').end()
	});

	$('.delete').click(function() {
		$(this).parents(".addtbl01").remove();
	});
}); 

/*table add*/
$(function() {
	$(".add02").click(function() {
		$(".addtbl02:first").clone(true).appendTo("#data_tbl").find('input[type="text"]').val('').end()
	});

	$('.delete02').click(function() {
		$(this).parents(".addtbl02").remove();
	});
}); 

/*table add*/
$(function() {
	$(".add03").click(function() {
		$(".addtbl03:first").clone(true).appendTo("#data_tbl").find('input[type="text"]').val('').end()
	});
	
	$('.delete03').click(function() {
		$(this).parents(".addtbl03").remove();
	});
}); 

/*input file*/
$(function() {
	var fileTarget = $('.filebox .upload-hidden');

	fileTarget.on('change', function() {
        if(window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('.upload-name').val(filename);
    });
});

// '검색조건' 영역 열기/닫기
$(function() {
	$(".btn_schCond").click(function() {
		if($("#sch_Wrap").is(":visible")) {
			$(".btn_schCond").toggleClass("sch_ex_icon sch_reduce_icon");
			$("#sch_Wrap").slideUp();
		} else {
			$(".btn_schCond").toggleClass("sch_reduce_icon sch_ex_icon");
			$("#sch_Wrap").slideDown();
		}
	});
});

//레이어 중 버튼 그룹 영역 보여주기/숨기기 설정. 2020-09-05. kws.
function showHide(target_id, stat1, stat2) {
	$('#' + target_id + ' div.select_pop1').css("display", stat1);
	$('#' + target_id + ' div.select_pop2').css("display", stat2);
}

// 검색
function afterSearch(cPage_num, base_num, menu_gb, asset_gb) {
	//var baseNum = $("#pn option:selected").val();
	
	var frm = document.frm_sch
    frm.action = "/ITAM/" + menu_gb + "/" + asset_gb + "/search?cPageNum=" + cPage_num + "&baseNum=" + base_num;
    frm.method = "POST" ;
    frm.submit();
}

// 목록 전체 체크박스 선택
function allChk() {
	if($("#chk_ast_all").is(':checked')) {
		$("input[name=chk_ast]").prop("checked", true);
	} else {
		$("input[name=chk_ast]").prop("checked", false);
	}
}

// 페이징
function pageMove(pageNum) {
    if(pageNum == 0) {
        pageNum = 1;
    }

    if($(".p_last").val() < pageNum) {
        pageNum = $(".p_last").val();
    }
    
	var path = new Array();
	path = window.location.pathname.split("/");
	
    var baseNum = $("#pn option:selected").val();
    var menu_gb = path[2];
    var asset_gb = path[3];
    
    if(window.location.pathname.split("/")[4] == "search") {
    	afterSearch(pageNum, baseNum, menu_gb, asset_gb);
	} else {
        var frm = document.paging
        frm.cPageNum.value = pageNum;
        frm.baseNum.value = baseNum;
        frm.action = window.location.pathname;
        frm.method = "GET" ;
        frm.submit();
    }
}

function cutByLen(str, maxByte) {
    for (b = i = 0; c = str.charCodeAt(i);) {
        b += c >> 7 ? 2 : 1;

        if(b > maxByte) {
            break;
        }

        i++;
    }
    
    return str.substring(0, i);
}

// 가격 입력 시 콤마 추가
function getNumber(obj) {
    var num01;
    var num02;
    num01 = obj.value;
    num02 = num01.replace(/\D/g,"");

    num01 = setComma(num02);
    obj.value =  num01;
}

function setComma(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';

    while (reg.test(n)) {
        n = n.replace(reg, '$1' + ',' + '$2');
    }

    return n;
}

// 엑셀 다운로드
function exportExcel(menu_gb, asset_gb) {
	if($("#totalNum").text() == '0') {
		$('#popup2 p.modal_tit').empty();
		$('#popup2 p.modal_tit').append('엑셀 다운로드');
		$('#popup2 div.modal_content').empty();
		$('#popup2 div.modal_content').append('다운로드할 데이터가 없습니다.');
		showHide('popup2', 'none', 'block');
   		fade('popup2');
   		
		return false;
	}
	
	var path = window.location.pathname.split("/")[4]; 	// 목록 전체 다운로드 또는 검색 목록 다운을 위한 구분값
    var frm = document.frm_sch;
    
	frm.path.value = path;
	frm.action = "/ITAM/" + asset_gb + "/excelDown";
    frm.method = "POST";
    frm.submit();
}

// 사이드 메뉴 설정
function sideMenu(sidePath) {
	if(sidePath == 'nb') {
		$('.hw_nb').addClass('on');
	} else if(sidePath == 'dt') {
		$('.hw_dt').addClass('on');
	} else if(sidePath == 'mn') {
		$('.hw_mn').addClass('on');
	} else if(sidePath == 'sv') {
		$('.hw_sv').addClass('on');
	} else if(sidePath == 'nw') {
		$('.hw_nw').addClass('on');
	} else if(sidePath == 'mo') {
		$('.hw_mo').addClass('on');
	} else if(sidePath == 'of') {
		$('.hw_of').addClass('on');
	} else if(sidePath == 'etc') {
		$('.hw_etc').addClass('on');
	} else if(sidePath == 'ipAddress') {
		$('.etc_ipAddress').addClass('on');
	} else if(sidePath == 'domain') {
		$('.etc_domain').addClass('on');
	} else if(sidePath == 'division') {
		$('.set_division').addClass('on');
	} else if(sidePath == 'group') {
		$('.set_group').addClass('on');
	} else if(sidePath == 'user') {
		$('.set_user').addClass('on');
	} else if(sidePath == 'ipGroup') {
		$('.set_ipGroup').addClass('on');
	} else if(sidePath == 'batchAssets') {
		$('.regist_total').addClass('on');
	} else if(sidePath == 'rup') {		// rup URL 나오면 수정
		$('.modify_rupInfo').addClass('on');
	}
}

// 레이어 중 버튼 그룹 영역 보여주기/숨기기 설정. 2020-09-05. kws.
function showHide(target_id, stat1, stat2) {
	$('#' + target_id + ' div.select_pop1').css("display", stat1);
	$('#' + target_id + ' div.select_pop2').css("display", stat2);
}

// 검색
function afterSearch(cPage_num, base_num, menu_gb, asset_gb) {
	//var baseNum = $("#pn option:selected").val();
	
	var frm = document.frm_sch
    frm.action = "/ITAM/" + menu_gb + "/" + asset_gb + "/search?cPageNum=" + cPage_num + "&baseNum=" + base_num;
    frm.method = "POST" ;
    frm.submit();
}

// 목록 전체 체크박스 선택
function allChk() {
	if($("#chk_ast_all").is(':checked')) {
		$("input[name=chk_ast]").prop("checked", true);
	} else {
		$("input[name=chk_ast]").prop("checked", false);
	}
}

// 페이징
function pageMove(pageNum) {
    if(pageNum == 0) {
        pageNum = 1;
    }

    if($(".p_last").val() < pageNum) {
        pageNum = $(".p_last").val();
    }
    
	var path = new Array();
	path = window.location.pathname.split("/");
	
    var baseNum = $("#pn option:selected").val();
    var menu_gb = path[2];
    var asset_gb = path[3];
    
    if(window.location.pathname.split("/")[4] == "search") {
    	afterSearch(pageNum, baseNum, menu_gb, asset_gb);
	} else {
        var frm = document.paging
        frm.cPageNum.value = pageNum;
        frm.baseNum.value = baseNum;
        frm.action = window.location.pathname;
        frm.method = "GET" ;
        frm.submit();
    }
}

// 메시지 띄우기 (일반). 2020-11-08. kws.
function showMsg(action, msg) {
	$('#popup2 p.modal_tit').empty();
	$('#popup2 p.modal_tit').append(action);
	$('#popup2 div.modal_content').empty();
	$('#popup2 div.modal_content').append(msg);
	
	showHide('popup2', 'none', 'block');
	fade('popup2');
}

// 바이트 수 체크
function byteCheck(data) {
    var codeByte = 0;
    if(data != undefined){
	    for (var idx = 0; idx < data.length; idx++) {
	        var oneChar = escape(data.charAt(idx));
	
	        if(oneChar.indexOf("%u") != -1) {
	            codeByte += 2;
	        } else {
	            codeByte++;
	        }
	    }
	    return codeByte;
    } else {
    	return 0;
    }
}

function cutByLen(str, maxByte) {
    for (b = i = 0; c = str.charCodeAt(i);) {
        b += c >> 7 ? 2 : 1;

        if(b > maxByte) {
            break;
        }

        i++;
    }
    
    return str.substring(0, i);
}

// 가격 입력 시 콤마 추가
function getNumber(obj) {
    var num01;
    var num02;
    num01 = obj.value;
    num02 = num01.replace(/\D/g,"");

    num01 = setComma(num02);
    obj.value =  num01;
}

function setComma(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';

    while (reg.test(n)) {
        n = n.replace(reg, '$1' + ',' + '$2');
    }

    return n;
}

function checkInputData(textSize, name) {
	var text = "";
    var textlen = "";

    var content = $("."+ name).val();
    bCheck = byteCheck(content);

    if(bCheck > textSize) {
        text = cutByLen(content, textSize)
        $("."+ name).val(text);
        bCheck = textSize;
    }
}

/*layer print*/
function fade(modal) {
    var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");
    
    $("body").append(appendthis);
    $(".modal-overlay").fadeTo(100, 0.7);

    $('#'+ modal).fadeIn(100);
    $('#'+ modal + ' .popup_focus').focus();
}

function fadeClose() {
	$(".modal-overlay").remove();
	$(".modal-box, .modal-box-al, .modal-overlay").fadeOut(100);
}

// 엑셀 다운로드
function exportExcel(menu_gb, asset_gb) {
	if($("#totalNum").text() == '0') {
		$('#popup2 p.modal_tit').empty();
		$('#popup2 p.modal_tit').append('엑셀 다운로드');
		$('#popup2 div.modal_content').empty();
		$('#popup2 div.modal_content').append('다운로드할 데이터가 없습니다.');
		showHide('popup2', 'none', 'block');
   		fade('popup2');
   		
		return false;
	}
	
	var path = window.location.pathname.split("/")[4]; 	// 목록 전체 다운로드 또는 검색 목록 다운을 위한 구분값
    var frm = document.frm_sch;
    
	frm.path.value = path;
	frm.action = "/ITAM/" + asset_gb + "/excelDown";
    frm.method = "POST";
    frm.submit();
}

// input값 입력수 제한
function lengthCheck(obj) {
    if(obj.value.length > obj.maxLength) { 
    	obj.value = obj.value.slice(0, obj.maxLength);
        return false; 
    }
}