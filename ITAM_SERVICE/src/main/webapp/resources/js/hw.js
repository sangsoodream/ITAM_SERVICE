var rentalCount = 0;

$(function() {
	$('#loading').hide();	
	
	// 검색조건 '자산정보' option '입고일자' 선택 시 input box 변경
	/*if($(".asset_info_gb").val() == 'receiveDate') {
		$("input.select_info").prop("type", "date");
		
	} else {	
		$("input.select_info").prop("type", "text");
	
	}*/
});


$(function() {
	$("input[type=text]").attr("autocomplete", 'off');
});

// 지급대상 항목이 변경되면 검색어 초기화
$(function() {
	$(".prov_target").change(function() {
		$(".sch_word").val("");
		$(".sch_word").focus();
	});
});

//검색조건 '자산정보' option '입고일자' 선택 시 input box 변경
function asset_selected(obj) {
	if(obj.value == 'receiveDate') {
		$(".select_date").css("display","block");
		$(".select_all").css("display","none");
		$(".date").removeAttr("disabled");
		$(".all").attr("disabled",true);
		//$("input.select_info").prop("type", "date");
//		$("input.select_info").removeClass("input_txt");
//		$("input.select_info").addClass("E_date");
	} else {	
		$(".select_date").css("display","none");
		$(".select_all").css("display","block")
		$(".date").attr("disabled",true);
		$(".all").removeAttr("disabled");
		//$("input.select_info").prop("type", "text");
//		$("input.select_info").removeClass("E_date");
//		$("input.select_info").addClass("input_txt");
	}
}

// 검색조건 조회 시 '자산상태' 체크
function assetStatusCheck() {
	var cnt = 0;
	var chk = $("input[name=chk_status]");
	
	for(i=0; i < chk.length; i++) {
		if(chk[i].checked) cnt++;
	}
	
	if(!$("#chk_all").prop("checked") && cnt <= 0) {
		alert("자산상태를 체크해주세요.");
		return false;
	} else {
		return true;
	}
}

// 하드웨어 자산 삭제
function assetDelete(chk_nm, target, table_nm) {
	var listArray = [];
	var checkbox = $("input[name=" + chk_nm + "]:checked");
   
   	// 체크된 모든 열의 첫번째 값을 배열에 넣음
   	checkbox.each(function(i) {
		var tr = checkbox.parent().parent().eq(i);
		var td = tr.children();

		listArray.push(td.eq(2).text());
	});

    var query = {"assetCode" : listArray, "table" : table_nm};
    
	$.ajax({
		url : "/ITAM/hw/deleteYn",
		type : "POST",
        data : query,
		success : function(data) {
			fadeClose();

			var msg;
			
			if(data == 'Success') {
				msg =  target + ' 자산 <span class="txt_blue">' + listArray.length + '</span>건을 삭제하였습니다.';
				showMsg('자산 삭제', msg);

				if(window.location.pathname.split("/")[4] == "search"){
					afterSearch(1,10,'hw',window.location.pathname.split("/")[3]);
				}else{
					$('a.btn_confirm').attr("href", window.location.pathname + "?cPageNum=1&baseNum=10");
				}
				
			} else {
				msg = '자산 삭제에 실패하였습니다. 다시 시도해주세요.';
				showMsg('자산 삭제', msg);
				
				if(window.location.pathname.split("/")[4] == "search"){
					afterSearch(1,10,'hw',window.location.pathname.split("/")[3]);
				}else{
					$('a.btn_confirm').attr("href", window.location.pathname + "?cPageNum=1&baseNum=10");
				}
			}
		}, error : function(request, status, error) {
		    alert("code : [" + request.status + "]\n" + "message : [" + request.responseText + "]\n" + "error : [" + error + "]");
		}
	});
}

// 구매자산 상세보기
function pDetailInfo(data, target) {
	temp = target;
	
	console.log(data);
	
	$('#popup3 .detail').empty();														// 구매자산 상세보기 양식
	$('#popup3 .img').attr("src","");
	
	$("#popup3 .hw_gb").append(temp);											// 하드웨어 구분
	$("#popup3 .asset_code").append(data.assetCode);						// 자산코드
	
	// 자산등록 구분
	if(data.assetRegGb == 'P') {
		temp = '구매자산';
	} else {
		temp = '렌탈자산';
	}
	
	$("#popup3 .asset_regGb").append(temp);
	
	// 구매처
	if(data.vendor == null || data.vendor == "") {
		$("#popup3 .vendor").append("-");
	} else {
		$("#popup3 .vendor").append(data.vendor);
	}
	
	// 품목
	if(target == '네트웍장비') {
		if(data.item == null || data.item == "") {
			$("#popup3 .item").append("-");
		} else {
			if(data.item == 'router') {
				temp = '라우터';
			} else if(data.item == 'switch') {
				temp = '스위치';
			} else if(data.item == 'firewall') {
				temp = '방화벽';
			} else if(data.item == 'hub') {
				temp = '허브';
			} else if(data.item == 'sharing') {
				temp = '공유기';
			} else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$("#popup3 .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '라우터') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/router.png");
			} else if (temp =='스위치') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/switch.png");
			} else if (temp =='방화벽') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/firewall.png");
			} else if (temp =='허브') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/hub.png");
			} else if (temp =='공유기') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/sharing.png");	
			} else {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/etc.png");
			}
		} else {
			$("#popup3 .img").attr("src","/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '사무기기') {
		if(data.item == null || data.item == "") {
			$("#popup3 .item").append("-");
		} else {
			if(data.item == 'scaner') {
				temp = '스캐너';
			} else if(data.item == 'multiPrinter') {
				temp = '복합기';
			} else if(data.item == 'fax') {
				temp = '팩스';
			} else if(data.item == 'printer') {
				temp = '프린터';
			}else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$("#popup3 .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '스캐너') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/scaner.png");
			} else if (temp =='복합기') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/multiPrinter.png");
			} else if (temp =='팩스') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/fax.png");
			} else if (temp =='프린터') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/printer.png");
			} else {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/of_etc.png");
			}
		} else {
			$("#popup3 .img").attr("src","/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '기타장비') {
		if(data.item == null || data.item == "") {
			$("#popup3 .item").append("-");
		} else {
			if(data.item == 'usb') {
				temp = 'USB';
			} else if(data.item == 'cardreader') {
				temp = '카드리더기';
			} else if(data.item == 'raspberry') {
				temp = '라즈베리 파이';
			} else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$("#popup3 .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == 'USB') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/usb.png");
			} else if (temp =='카드리더기') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/cardreader.png");
			} else if (temp =='라즈베리 파이') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/raspberry.png");
			} else {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/etc_etc.png");
			}
		} else {
			$("#popup3 .img").attr("src","/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '모바일기기') {
		if(data.item == null || data.item == "") {
			$("#popup3 .item").append("-");
		} else {
			if(data.item == 'phone') {
				temp = '핸드폰';
			} else if(data.item == 'tablet') {
				temp = '태블릿';
			} else if(data.item == 'watch') {
				temp = '워치';
			} else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$("#popup3 .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '핸드폰') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/phone.png");
			} else if (temp =='태블릿') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/tablet.png");
			} else if (temp =='워치') {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/watch.png");
			} else {
				$("#popup3 .img").attr("src","/ITAM/resources/images/product/p_etc.png");
			}
		} else {
			$("#popup3 .img").attr("src","/ITAM/images/"+ data.img);
		}
	}
	
	// 제조사
	if(data.maker == null || data.maker == "") {
		$("#popup3 .maker").append("-");
	} else {
		$("#popup3 .maker").append(data.maker);
	}

	// 상태
	if(data.status == '0') {
		temp = '미지급';
	} else if(data.status == '1') {
		temp = '지급'
	} else if(data.status == '2') {
		temp = '렌탈반납'
	} else if(data.status == '3') {
		temp = '고장'
	} else {
		temp = '폐기'
	}

	$("#popup3 .status").append(temp);
	
	// 모델명
	if(data.moName == null || data.moName == "") {
		$("#popup3 .mo_name").append("-");
	} else {
		$("#popup3 .mo_name").append(data.moName);
	}
	
	// 시리얼
	if(data.serial == null || data.serial == "") {
		$("#popup3 .serial").append("-");
	} else {
		$("#popup3 .serial").append(data.serial);
	}
	
	if(target == '노트북') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$("#popup3 .img").attr("src","/ITAM/resources/images/product/hw_notebook_sub.png");
		} else {
			$("#popup3 .img").attr("src","/ITAM/images/" + data.img);
		}
	}
	
	if(target == '데스크탑') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$("#popup3 .img").attr("src","/ITAM/resources/images/product/desktop.png");
		} else {
			$("#popup3 .img").attr("src","/ITAM/images/" + data.img);
		}
	}
	
	if(target == '모니터') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$("#popup3 .img").attr("src","/ITAM/resources/images/product/monitor.png");
		} else {
			$("#popup3 .img").attr("src","/ITAM/images/" + data.img);
		}
	}
	
	if(target == '서버') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$("#popup3 .img").attr("src","/ITAM/resources/images/product/server.png");
		} else {
			$("#popup3 .img").attr("src","/ITAM/images/" + data.img);
		}
	}
	
	// 스펙
	if(data.spec == null || data.spec == "") {
		$("#popup3 .spec").append("-");
	} else {
		$("#popup3 .spec").append(data.spec);
	}
	
	// 구매처 정보
	if(data.vendorInfo == null || data.vendorInfo == "") {
		$("#popup3 .vendor_info").append("-");
	} else {
		$("#popup3 .vendor_info").append(data.vendorInfo);
	}
	
	// 이력메모
	if(data.hMemo == null || data.hMemo == "") {
		$("#popup3 .h_memo").append("-");
	} else {
		$("#popup3 .h_memo").append(data.hMemo);
	}
	
	// 기타메모
	if(data.eMemo == null || data.eMemo == "") {
		$("#popup3 .e_memo").append("-");
	} else {
		$("#popup3 .e_memo").append(data.eMemo);
	}
	
	if(data.telecom == null || data.telecom == "") {
		$("#popup3 .telecom").empty();
		$("#popup3 .telecom").append("-");
	} else if(data.telecom == "no_select") {
		$("#popup3 .telecom").empty();
		$("#popup3 .telecom").append("-");
	} else {
		$("#popup3 .telecom").empty();
		$("#popup3 .telecom").append(data.telecom);
	}
	// 지급/반환확인서
	if(data.originCheckImg == null || data.originCheckImg == "") {
		$("#popup3 .confirm_img").empty();
		$("#popup3 .confirm_img").append("-");
	} else {
		$("#popup3 .confirm_img").empty();
		$("#popup3 .confirm_img").append(data.originCheckImg);
	}
		
	// 지급정보
	// 지급대상
	if(data.uName != null || data.dmNm != null || data.gName != null) {
		if(data.uName != null) {
			temp = data.uName;
		} else if(data.dmNm != null) {
			temp = data.dmNm;
		} else {
			temp = data.gName;
		}
		
		$("#popup3 .p_target").empty();
		$("#popup3 .p_target").append(temp);
	}

	if(data.uName == null && data.dmNm == null && data.gName == null) {
		$("#popup3 .p_target").empty();
		$("#popup3 .p_target").append("-");
	}
	
	// 용도
	if(data.purpose == 'dev') {
		temp = '개발용';
	} else if(data.purpose == 'work') {
		temp = '업무용';
	} else if(data.purpose == 'temp') {
		temp = '업무용';
	} else {
		temp = '기타';
	}
	
	if(data.purpose == null || data.purpose == "") {
		$("#popup3 .purpose").append("-");
	} else {
		$("#popup3 .purpose").append(temp);
	}
	
	// 사번
	if(data.unum == null || data.unum == "") {
		$("#popup3 .u_code").append("-");
	} else {
		$("#popup3 .u_code").append(data.unum);
	}
	
	// 위치
	if(data.location == null || data.location == "") {
		$("#popup3 .location").append("-");
	} else {
		$("#popup3 .location").append(data.location);
	}
	
	// 부서
	if(data.dmNm == null || data.dmNm == "") {
		if(data.gName == null || data.gName == "") {
			$("#popup3 .div_nm").append("-");
		} else {
			$("#popup3 .div_nm").append(data.gName);
		}
	} else {
		$("#popup3 .div_nm").append(data.dmNm);
	}
	
	if(data.phnNum == null || data.phnNum == "") {
		$("#popup3 .phone").empty(); 
		$("#popup3 .phone").append("-");
	} else {
		$("#popup3 .phone").empty();
		$("#popup3 .phone").append(data.phnNum);
	}
	
	
	// 소속
	if(data.subDmNm == null || data.subDmNm == "") {		
		$("#popup3 .div_subDmNm").append("-");		
	} else {
		$("#popup3 .div_subDmNm").append(data.subDmNm);
	}
	
	// 사용 IP
	if(data.ipGroup == null || data.ipGroup == "") {
		$("#popup3 .ip").append("-");
	} else {
		$("#popup3 .ip").append(data.ipGroup + "." + data.ip);
	}
	
	// 반환예정일
	if(data.rtnDate == "" || data.rtnDate == null || data.rtnDate == "9999-12-31") {
		$("#popup3 .rtn_date").append("-");
	} else {
		$("#popup3 .rtn_date").append(data.rtnDate);
	}
	
	// MAC 주소
	if(data.mac == null || data.mac == "") {
		$("#popup3 .mac").append("-");
	} else {
		$("#popup3 .mac").append(data.mac);
	}
	
	fade('popup3');
}

// 렌탈자산 상세보기
function rDetailInfo(data, target) {
	temp = target;
	
	$('#popup4 .detail').empty();													// 렌탈자산 상세보기 양식 초기화
	$('#popup4 .img').attr("src","");	
	
	$("#popup4 .hw_gb").append(temp);										// 하드웨어 구분
	$("#popup4 .asset_code").append(data.assetCode);					// 자산코드

	// 자산등록 구분
	if(data.assetRegGb == 'P') {
		temp = '구매자산';
	} else {
		temp = '렌탈자산';
	}

	$("#popup4 .asset_regGb").append(temp);
	
	// 렌탈자산번호
	if(data.rentalCode == null || data.rentalCode == "") {
		$("#popup4 .rental_code").append("-");
	} else {
		$("#popup4 .rental_code").append(data.rentalCode);
	}
	
	if(target == '노트북') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$("#popup4 .img").attr("src","/ITAM/resources/images/product/hw_notebook_sub.png");
		} else {
			$("#popup4 .img").attr("src","/ITAM/images/" + data.img);
		}
	}
	
	if(target == '데스크탑') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$("#popup4 .img").attr("src","/ITAM/resources/images/product/desktop.png");
		} else {
			$("#popup4 .img").attr("src","/ITAM/images/" + data.img);U
		}
	}
	
	if(target == '모니터') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$("#popup4 .img").attr("src","/ITAM/resources/images/product/monitor.png");
		} else {
			$("#popup4 .img").attr("src","/ITAM/images/" + data.img);
		}
	}
	
	if(target == '서버') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$("#popup4 .img").attr("src","/ITAM/resources/images/product/server.png");
		} else {
			$("#popup4 .img").attr("src","/ITAM/images/" + data.img);
		}
	}
	// 품목
	if(target == '네트웍장비') {
		if(data.item == null || data.item == "") {
			$("#popup4 .item").append("-");
		} else {
			if(data.item == 'router') {
				temp = '라우터';
			} else if(data.item == 'switch') {
				temp = '스위치';
			} else if(data.item == 'firewall') {
				temp = '방화벽';
			} else if(data.item == 'hub') {
				temp = '허브';
			} else if(data.item == 'sharing') {
				temp = '공유기';
			} else if(data.item =='etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$("#popup4 .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '라우터') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/router.png");
			} else if (temp =='스위치') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/switch.png");
			} else if (temp =='방화벽') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/firewall.png");
			} else if (temp =='허브') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/hub.png");
			} else if (temp =='공유기') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/sharing.png");	
			} else {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/etc.png");
			}
		} else {
			$("#popup4 .img").attr("src","/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '사무기기') {
		if(data.item == null || data.item == "") {
			$("#popup4 .item").append("-");
		} else {
			if(data.item == 'scaner') {
				temp = '스캐너';
			} else if(data.item == 'multiPrinter') {
				temp = '복합기';
			} else if(data.item == 'fax') {
				temp = '팩스';
			} else if(data.item == 'printer') {
				temp = '프린터';
			}else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$("#popup4 .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '스캐너') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/scaner.png");
			} else if (temp =='복합기') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/multiPrinter.png");
			} else if (temp =='팩스') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/fax.png");
			} else if (temp =='프린터') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/printer.png");
			} else {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/of_etc.png");
			}
		} else {
			$("#popup4 .img").attr("src","/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '기타장비') {
		if(data.item == null || data.item == "") {
			$("#popup4 .item").append("-");
		} else {
			if(data.item == 'usb') {
				temp = 'USB';
			} else if(data.item == 'cardreader') {
				temp = '카드리더기';
			} else if(data.item == 'raspberry') {
				temp = '라즈베리 파이';
			} else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$("#popup4 .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == 'USB') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/usb.png");
			} else if (temp =='카드리더기') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/cardreader.png");
			} else if (temp =='라즈베리') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/raspberry.png");
			} else {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/etc_etc.png");
			}
		} else {
			$("#popup4 .img").attr("src","/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '모바일기기') {
		if(data.item == null || data.item == "") {
			$("#popup4 .item").append("-");
		} else {
			if(data.item == 'phone') {
				temp = '핸드폰';
			} else if(data.item == 'tablet') {
				temp = '태블릿';
			} else if(data.item == 'watch') {
				temp = '워치';
			} else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$("#popup4 .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '핸드폰') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/phone.png");
			} else if (temp =='태블릿') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/tablet.png");
			} else if (temp =='워치') {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/watch.png");
			} else {
				$("#popup4 .img").attr("src","/ITAM/resources/images/product/p_etc.png");
			}
		} else {
			$("#popup4 .img").attr("src","/ITAM/images/"+ data.img);
		}
	}
	
	// 제조사
	if(data.maker == null || data.maker == "") {
		$("#popup4 .maker").append("-");
	} else {
		$("#popup4 .maker").append(data.maker);
	}
	
	// 입고일자
	if(data.receiveDate == null || data.receiveDate == "") {
		$("#popup4 .receive_date").append("-");
	} else {
		$("#popup4 .receive_date").append(data.receiveDate);
	}
	
	// 모델명
	if(data.moName == null || data.moName == "") {
		$("#popup4 .mo_name").append("-");
	} else {
		$("#popup4 .mo_name").append(data.moName);
	}
	
	// 렌탈반환일자
	if(data.rentalRtnDate == null || data.rentalRtnDate == "") {
		$("#popup4 .rental_rtnDate").append("-");
	} else {
		$("#popup4 .rental_rtnDate").append(data.rentalRtnDate);
	}
	
	// 시리얼
	if(data.serial == null || data.serial == "") {
		$("#popup4 .serial").append("-");
	} else {
		$("#popup4 .serial").append(data.serial);
	}
	
	// 렌탈료
	if(data.rentalPrice == null || data.rentalPrice == "") {
		$("#popup4 .rental_price").append("-");
	} else {
		$("#popup4 .rental_price").append(data.rentalPrice);
	}
	
	if(data.telecom == null || data.telecom == "") {
		$("#popup4 .telecom").empty();
		$("#popup4 .telecom").append("-");
	} else if(data.telecom == "no_select") {
		$("#popup4 .telecom").empty();
		$("#popup4 .telecom").append("-");
	} else {
		$("#popup4 .telecom").empty();
		$("#popup4 .telecom").append(data.telecom);
	}

	if(data.phnNum == null || data.phnNum == "") {
		$("#popup4 .phone").empty(); 
		$("#popup4 .phone").append("-");
	} else {
		$("#popup4 .phone").empty();
		$("#popup4 .phone").append(data.phnNum);
	}
	
	// 상태
	if(data.status == '0') {
		temp = '미지급';
	} else if(data.status == '1') {
		temp = '지급'
	} else if(data.status == '2') {
		temp = '렌탈반납'
	} else if(data.status == '3') {
		temp = '고장'
	} else {
		temp = '폐기'
	}

	$("#popup4 .status").append(temp);
	
	// 스펙
	if(data.spec == null || data.spec == "") {
		$("#popup4 .spec").append("-");
	} else {
		$("#popup4 .spec").append(data.spec);
	}
	
	// 이력메모
	if(data.hMemo == null || data.hMemo == "") {
		$("#popup4 .h_memo").append("-");
	} else {
		$("#popup4 .h_memo").append(data.hMemo);
	}
	
	// 기타메모
	if(data.eMemo == null || data.eMemo == "") {
		$("#popup4 .e_memo").append("-");
	} else {
		$("#popup4 .e_memo").append(data.eMemo);
	}

	// 지급정보
	// 지급대상
	if(data.uName != null || data.dmNm != null || data.gName != null) {
		if(data.uName != null) {
			temp = data.uName;
		} else if(data.uName == null && data.dmNm != null) {
			temp = data.dmNm;
		} else if(data.uName == null && data.gName != null) {
			temp = data.gName;
		}
		
		$("#popup4 .p_target").empty();
		$("#popup4 .p_target").append(temp);
	}
	
	if(data.uName == null && data.dmNm == null && data.gName == null) {
		$("#popup4 .p_target").empty();
		$("#popup4 .p_target").append("-");
	}

	// 용도
	if(data.purpose == 'dev') {
		temp = '개발용';
	} else if(data.purpose == 'work') {
		temp = '업무용';
	} else if(data.purpose == 'temp') {
		temp = '업무용';
	} else {
		temp = '기타';
	}
	
	if(data.purpose == null || data.purpose == "") {
		$("#popup4 .purpose").append("-");
	} else {
		$("#popup4 .purpose").append(temp);
	}
	
	// 사번
	if(data.uNum == null || data.uNum == "") {
		$("#popup4 .u_code").append("-");
	} else {
		$("#popup4 .u_code").append(data.uNum);
	}
	
	// 위치
	if(data.location == null || data.location == "") {
		$("#popup4 .location").append("-");
	} else {
		$("#popup4 .location").append(data.location);
	}
	
	// 부서
	if(data.dmNm == null || data.dmNm == "") {
		if(data.gName == null || data.gName == "") {
			$("#popup4 .div_nm").append("-");
		} else {
			$("#popup4 .div_nm").append(data.gName);
		}
	} else {
		$("#popup4 .div_nm").append(data.dmNm);
	}
	
	// 소속
	if(data.subDmNm == null || data.subDmNm == "") {		
		$("#popup4 .div_subDmNm").append("-");		
	} else {
		$("#popup4 .div_subDmNm").append(data.subDmNm);
	}
	
	// 사용 IP
	if(data.ipGroup == null || data.ipGroup == "") {
		$("#popup4 .ip").append("-");
	} else {
		$("#popup4 .ip").append(data.ipGroup + "." + data.ip);
	}
	
	// 반환예정일
	if(data.rtnDate == "" || data.rtnDate == null || data.rtnDate == "9999-12-31") {
		$("#popup4 .rtn_date").append("-");
	} else {
		$("#popup4 .rtn_date").append(data.rtnDate);
	}
	
	// MAC 주소
	if(data.mac == null || data.mac == "") {
		$("#popup4 .mac").append("-");
	} else {
		$("#popup4 .mac").append(data.mac);
	}
	
	// 지급/반환확인서
	if(data.originCheckImg == null || data.originCheckImg == "") {
		$("#popup4 .confirm_img").empty();
		$("#popup4 .confirm_img").append("-");
	} else {
		$("#popup4 .confirm_img").empty();
		$("#popup4 .confirm_img").append(data.originCheckImg);
	}
			
	fade('popup4');
}

// 상세보기
function showDetailInfo(menu_gb, asset_gb, asset_code, target) {
	$.ajax({
		url : "/ITAM/" + menu_gb + "/" + asset_gb + "/getOne",
		type : "POST",
		cache : false,
		data : {
			assetCode : asset_code
		}, success : function(data) {
			//console.log(data);
			
			if(data.assetRegGb == 'P') {
				pDetailInfo(data, target);
			} else {
				rDetailInfo(data, target);
			}
		}
	});
}

// 인쇄
function showPrintInfo(menu_gb, asset_gb, asset_code, target) {
	$.ajax({
		url : "/ITAM/" + menu_gb + "/" + asset_gb + "/getOne",
		type : "POST",
		cache : false,
		data : {
			assetCode: asset_code
		}, success : function(data) {
			if(data.assetRegGb == 'P') {
				pPrintInfo(data, target);
			} else {
				rPrintInfo(data, target);
			}
		}
	});
}

// 처리 전 레이어 팝업 띄우기(체크박스 한개만 유효). 2020-09-05. kws.
// 상세보기, 수정, 인쇄
function popLayerOne(nm_chkbox, target, action, menu_gb, asset_gb) {
	var asset_code;
	var listArray = [];
	var checkbox = $("input[name=" + nm_chkbox + "]:checked");
	
	// 체크된 모든 열의 첫번째 값을 배열에 넣음
	checkbox.each(function(i) {
		var tr = checkbox.parent().parent().eq(i);
		var td = tr.children();

		listArray.push(td.eq(2).text());
		asset_code = td.eq(2).text(); 		// 체크된 열의 1번째 데이터(자산코드) 가져오기 
	});

	$('#popup2 p.modal_tit').empty();
	$('#popup2 p.modal_tit').append('자산 ' + action);
	$('#popup2 div.modal_content').empty();

	var pop_action;
	
	if(listArray == '' || listArray.length < 1) {							// 선택한 체크박스 없음
		if(action == '상세보기') {
			action = '정보를 확인';
		}

		$('#popup2 div.modal_content').append(action + '할 ' + target + ' 자산을 선택해주세요.');

		showHide('popup2', 'none', 'block');
		fade('popup2');
	} else if(listArray.length > 1) {										// 다중 체크박스 선택
		$('#popup2 div.modal_content').append('<span class="txt_blue">1개</span>의 ' + target + ' 자산만 선택해주세요.');

		showHide('popup2', 'none', 'block');
		fade('popup2');
	} else {																		// 체크박스 1개 선택
		if(action == '상세보기') {										// 자산 정보 상세보기 (구매자산)
			showDetailInfo(menu_gb, asset_gb, asset_code, target);
		} else if(action == '인쇄') {										// 자산 정보 인쇄
			$("input:radio[name=ast_print]:input[value=ast_info]").prop("checked", true);

			$('.pop_srh_sub span').removeClass('on');
			$('.tab_con_box').removeClass('on');

			$("#tab-1").addClass('on');
			
			// 2020-11-08. kws.
			showPrintInfo(menu_gb, asset_gb, asset_code, target);
			fade('popup5');
		} else {
			$('#popup2 div.modal_content').append('선택하신 ' + target + ' 자산<span class="txt_blue">' + listArray.pop(0) + '</span> 를 ' + action + '하시겠습니까?');
			$('#popup2 div.select_pop1 a.btn_action').empty();
			$('#popup2 div.select_pop1 a.btn_action').append(pop_action);

			showHide('popup2', 'block', 'none');
			fade('popup2');
		}
	}
}

// 처리 전 메시지 레이어 띄우기(삭제). 2020-09-05. kws.
function popLayer(chk_nm, target, table_nm) {
	var listArray = [];
	var statusArray = [];
	var checkbox = $("input[name=" + chk_nm + "]:checked");
	
	// 체크된 모든 열의 첫번째 값을 배열에 넣음
	checkbox.each(function(i) {
		var tr = checkbox.parent().parent().eq(i);
		var td = tr.children();
		var temp;

		listArray.push(td.eq(2).text());
		
		if(table_nm == 'OF' || table_nm == 'ETC' || table_nm == 'MN') {
			if(td.eq(6).text().trim()=="지급") {
				temp = "1";
			} else {
				temp = td.eq(6).text().trim();
			}
		} else {
			if(td.eq(7).text().trim()=="지급") {
				temp = "1";
			} else {
				temp = td.eq(7).text().trim();
			}
		}

		statusArray.push(temp);
	});
	
	$('#popup2 p.modal_tit').empty();
	$('#popup2 p.modal_tit').append('자산 삭제');
	$('#popup2 div.modal_content').empty();
	
	if(statusArray.length >= 1) {
		for(var i = 0; i < statusArray.length; i++) {		
			if(statusArray[i]=="1") {
				$('#popup2 div.modal_content').append('지급된 자산은 삭제할 수 없습니다');

				showHide('popup2', 'none', 'block');
				fade('popup2');
				return;
			}
		}
	}

	if(listArray == '' || listArray.length < 1) {
		$('#popup2 div.modal_content').append('삭제할 ' + target + ' 자산을 선택해주세요.');

		showHide('popup2', 'none', 'block');
		fade('popup2');
	} else if(listArray.length >= 1) {
		$('#popup2 div.select_pop1 a.btn_action').empty();
		$('#popup2 div.select_pop1 a.btn_action').append('삭제');
		$('#popup2 div.select_pop1 a.btn_action').addClass("action_delete");

		if(listArray.length == 1) {
			$('#popup2 div.modal_content').append('선택하신 ' + target + ' 자산 <span class="txt_blue">' + listArray.pop(0) + '</span>를 삭제하시겠습니까?');
		} else {	
			$('#popup2 div.modal_content').append('선택하신 ' + target + ' 자산 <span class="txt_blue">' + listArray.length + '</span>건을 삭제하시겠습니까?');
		}
		
		showHide('popup2', 'block', 'none');
		fade('popup2');
		
		$(".action_delete").click(function() {
			assetDelete('chk_ast', target, table_nm);
		});
	}
}

function assetStatusCheckbox(chk_status)  {
	if(window.location.pathname.split("/")[4] == "list") {
		$("#chk_all").prop("checked", true);
	}
	
	// 검색 후 자산상태 체크박스 유지
	if(window.location.pathname.split("/")[4] == "search") {
		if(chk_status == null) {
			$("#chk_all").prop("checked", true);
		} else {
			for(i=0; i<chk_status.length; i++) {
				var temp = chk_status[i];
				
	 			if(temp == '0') {
					$("#chk_unprov").prop("checked", true);
				} else if(temp == '1') {
					$("#chk_prov").prop("checked", true);
				} else if(temp == '2') {
					$("#chk_return").prop("checked", true);
				} else if(temp == '3') {
					$("#chk_broken").prop("checked", true);
				} else if(temp == '4') {
					$("#chk_disp").prop("checked", true);
				} 
			}
		}
	}
}

// 하드웨어 자산 등록 화면에서 '하드웨어 구분' 값 변경 시 페이지 이동
$(function() {
	$(".hw_gb").change(function() {
		var hd = this.value;
        var toLhd = hd.toLowerCase();
        var frm_chPg = document.frm_changePg;

        $(".hd_gb").val(hd);

        frm_chPg.action = "/ITAM/hw/registPage";
        frm_chPg.submit();
	});
});

// 검색조건 '자산상태' 체크박스 중 '전체' 를 제외한 체크박스 선택값이 없으면 '전체' 체크박스 자동 선택.
$(function() {
	$("input[name=chk_status]").click(function() {
		if($("input:checkbox[name=chk_status]:checked").length == 0) {
			$("input[name=chk_allStatus]").prop("checked", true);
		} else {
			$("input[name=chk_allStatus]").prop("checked", false);
		}
	});
	
	$("input[name=chk_allStatus]").click(function() {
    	$("input[name=chk_status]").prop("checked", false);
	});
});

// 자산등록 구분 '구매자산/렌탈자산' 라디오 버튼 선택 시 영역 변경. 2020-07-27. kws.
$(function() {
	$("#ast_rental").click(function() {
		$(".tbl_purchase").addClass("tbl_hide");
		$(".tbl_rental").removeClass("tbl_hide");

		if($("#status_p").is(":checked") == true) {			// 자산등록 구분 '구매자산' 클릭 시
			$("#status_r").prop("checked", true);
			$(".div_prov").removeClass("div_hide");
		} else {															// 자산등록 구분 '렌탈자산' 클릭 시
			$("#status_r").prop("checked", false);
			$(".div_prov").addClass("div_hide");
		}
	});

	$("#ast_purchase").click(function() {
		$(".tbl_purchase").removeClass("tbl_hide");
		$(".tbl_rental").addClass("tbl_hide");

		if($("#status_r").is(":checked") == true) {			// 렌탈 자산 '지급' 체크 시
			$("#status_p").prop("checked", true);
			$(".div_prov").removeClass("div_hide");
		} else {															// 구매 자산 '지급' 체크 시
			$("#status_p").prop("checked", false);
			$(".div_prov").addClass("div_hide");
		}
	});
});

// 메모입력 글자수 체크
$(function() {
	if (byteCheck($('.h_memo').val()) > 2000) {
    	$('.ast_hm_p').html(2000 + '/2000자');
	} else {
		checkInputData(2000 , "h_memo");
        $('.ast_hm_p').html(bCheck + '/2000자');
	}
		
	if (byteCheck($('.hMemo_r').val()) > 2000) {
    	$('.ast_hm_r').html(2000 + '/2000자');
	} else {
		checkInputData(2000 , "hMemo_r");
        $('.ast_hm_r').html(bCheck + '/2000자');
	}
	 
	if (byteCheck($('.e_memo').val()) > 2000) {
    	$('.ast_em_p').html(2000 + '/2000자');
	} else {
		checkInputData(2000 , "e_memo");
        $('.ast_em_p').html(bCheck + '/2000자');
	}
	 
	if (byteCheck($('.eMemo_r').val()) > 2000) {
    	$('.ast_em_r').html(2000 + '/2000자');
	} else {
		checkInputData(2000 , "eMemo_r");
        $('.ast_em_r').html(bCheck + '/2000자');
	}
	 
	if (byteCheck($('.spec').val()) > 2000) {
    	$('.ast_spec').html(2000 + '/2000자');
	} else {
		checkInputData(2000 , "spec");
        $('.ast_spec').html(bCheck + '/2000자');
	}
	 
	if (byteCheck($('.spec_r').val()) > 2000) {
    	$('.ast_spec_r').html(2000 + '/2000자');
	} else {
		checkInputData(2000 , "spec_r");
        $('.ast_spec_r').html(bCheck + '/2000자');
	}
	
	if (byteCheck($('.vendor_info').val()) > 2000) {
    	$('.ast_vd_info').html(2000 + '/2000자');
	} else {
		checkInputData(2000 , "vendor_info");
        $('.ast_vd_info').html(bCheck + '/2000자');
	}
 
	/*checkInputData(2000, "h_memo");
    $('.ast_hm_p').html(bCheck + '/2000자');
    checkInputData(2000, "hMemo_r");
    $('.ast_hm_r').html(bCheck + '/2000자');
    checkInputData(2000 , "e_memo");
    $('.ast_em_p').html(bCheck + '/2000자');
    checkInputData(2000, "eMemo_r");
    $('.ast_em_r').html(bCheck + '/2000자');
    checkInputData(300, "spec");
    $('.ast_spec').html(bCheck + '/300자');
    checkInputData(300, "spec_r");
    $('.ast_spec_r').html(bCheck + '/300자');
    checkInputData(300 ,"vendor_info");
    $('.ast_vd_info').html(bCheck + '/300자');*/
    
    $('.spec').keyup(function() {
    	checkInputData(300, "spec");

        $('.ast_spec').html(bCheck + '/300자');
    });

    $('.spec_r').keyup(function() {
    	checkInputData(300, "spec_r");

        $('.ast_spec_r').html(bCheck + '/300자');
    });

    $(".vendor_info").keyup(function() {
    	checkInputData(300 ,"vendor_info");

        $('.ast_vd_info').html(bCheck + '/300자');
    });

    $('.h_memo').keyup(function() {
    	checkInputData(2000, "h_memo");

        $('.ast_hm_p').html(bCheck + '/2000자');
    });

    $('.hMemo_r').keyup(function() {
    	checkInputData(2000, "hMemo_r");

        $('.ast_hm_r').html(bCheck + '/2000자');
    });

    $('.e_memo').keyup(function() {
    	checkInputData(2000 , "e_memo");

        $('.ast_em_p').html(bCheck + '/2000자');
    });

    $('.eMemo_r').keyup(function() {
    	checkInputData(2000, "eMemo_r");

        $('.ast_em_r').html(bCheck + '/2000자');
    });
    
    $('.requestMsg').keyup(function() {
    	checkInputData(500);

        $('.tarea_count').html(bCheck + '/500자');
    });
});

// 렌탈자산 조회 관련
$(function() {
	// 렌탈자산번호 '조회' 버튼 클릭 (지급 대상 조회)
	$(".btn_sch_rental").click(function(e) {
		e.preventDefault();
		
		if($(".rental_code").val() == "") {
		    var msg = '렌탈자산번호를 입력해주세요.';
		    showMsg('렌탈자산 조회', msg);
		    return false;
		}

		var dataCk = $(".rental_code").val();

		var data = {
		    check : dataCk
		};
		
		var tableCk = $(".hw_gb").val();
		
		if (tableCk =='노트북'|| tableCk =='NB') {
			tableCk = 'NB';
		} else if (tableCk == '네트웍장비'|| tableCk =='NW') {
			tableCk = 'NW';
		} else if (tableCk == '데스크탑'|| tableCk =='DT') {
			tableCk = 'DT';
		} else if (tableCk == '모니터'|| tableCk =='MN') {
			tableCk = 'MN';
		} else if (tableCk == '서버'|| tableCk =='SV') {
			tableCk = 'SV';
		} else if (tableCk == '모바일기기'|| tableCk =='MO') {
			tableCk = 'MO';
		} else if (tableCk == '사무기기'|| tableCk =='OF') {
			tableCk ='OF'
		} else {
			tableCk ='ETC'
		}

		var codeCk = {
		    table : tableCk,
		    check : dataCk
		};
		
		$('#loading').show();	
		// rentalCode >> getRentalInfo 와 같은 명칭으로 변경해야할듯
		
		$.ajax({
			url : "/ITAM/hw/rentalCode",
			type : "POST",
			cache : false,
			data : codeCk,
			dataType : "text",
			success : function(ck) {
			    if(ck == "true") {			    	
			        if(dataCk.length != 0) {
			            $.ajax({
			                url : "/ITAM/hw/crawling",
			                type : "POST",
			                cache : false,
			                data : data,
			                success : function(data) {	
			                	$('#loading').hide();	
			                	//console.log(data);
			                    if(data.rentalInfo.length == 0) {
			                    	var text;
			                    	
			                    	text += "<tr>";
	                                text += "<td colspan='7'>조회된 데이터가 없습니다.</td>";
	                                text += "</tr>";
	                                
	                                $(".rental_info").append(text);
	                                
	                                fade('popup6');
			                    } else {
			                        if(data.rentalInfo.length > 1) {
			                            $(".rental_cnt").empty();
			                            $(".rental_cnt").append("<p>총 " + data.rentalInfo.length + "개</p>");
			                            $(".rental_info").empty();

			                            var text = "";
			                           
			                            for (i = 0; i < data.rentalInfo.length; i++) {
			                                text += "<tr>";
			                                text += "<td>" + data.rentalInfo[i].assetNumber + "</td>";
			                                text += "<td>" + data.rentalInfo[i].objectName + "</td>";
			                                text += "<td>" + data.rentalInfo[i].makeCompany + "</td>";
			                                text += "<td>" + data.rentalInfo[i].modelName + "</td>";
			                                text += "<td>" + data.rentalInfo[i].serialNum + "</td>";
			                                text += "<td>" + data.rentalInfo[i].startday + "</td>";
			                                text += "<td>" + data.rentalInfo[i].endday + "</td>";
			                                text += "<td style=" + "visibility:hidden;position:absolute;" + ">" + data.rentalInfo[i].productName + "</td>";
			                                text += "<td style=" + "visibility:hidden;position:absolute;" + ">" + data.rentalInfo[i].rentalMoney + "</td>"; 
			                                text += "<td style=" + "visibility:hidden;position:absolute;" + ">" + data.rentalInfo[i].contractStatus + "</td>"; 
			                                text += "</tr>";
			                            }
			                            
			                            $(".rental_info").append(text);
			                           
			                            fade('popup6');

			                            rentalCount ++;
			                        } else if(data.rentalInfo.length == 1) {
			                            // 렌탈자산 하나일 경우 자동입력
			                            $(".mo_nm_r").attr("value", data.rentalInfo[0].modelName);
			                            $(".serial_r").attr("value", data.rentalInfo[0].serialNum);
			                            $(".maker_r").attr("value", data.rentalInfo[0].makeCompany);
			                            $(".rental_price").attr("value", data.rentalInfo[0].rentalMoney);
			                            $(".rental_rtn_date").attr("value", data.rentalInfo[0].endday);
			                            $(".receiveDate_r").attr("value", data.rentalInfo[0].startday);			                        
			                            $(".item_r").attr("value",data.rentalInfo[0].objectName);      // 렌탈쪽에 품목이 있는 항목때문에 추가한거  나중에 물어봐야함 
			    						
//			        					$(".hMemo_r").empty();
//			        					$(".hMemo_r").append("["+today+"][신규등록]"+data.rentalInfo[0].objectName);

										rentalCount ++;
			                        }
			                    }
			                }, error : function(request, status, error) {
							    alert("code : [" + request.status + "]\n" + "message : [" + request.responseText + "]\n" + "error : [" + error + "]");
							}
			            });
			        } else {
			            var msg = '등록된 렌탈 자산번호가 있습니다.';
					    showMsg('렌탈자산 조회', msg);
					    return false;
			        }
			    } else {
			    	$('#loading').hide();	
			        var msg = '등록된 렌탈 자산번호가 있습니다.';
				    showMsg('렌탈자산 조회', msg);
				    return false;			
			    }
		    }, error : function(request, status, error) {
		    	$('#loading').hide();	
			    alert("code : [" + request.status + "]\n" + "message : [" + request.responseText + "]\n" + "error : [" + error + "]");
			}
		});
	});
	
	// '렌탈자산번호 조회' 레이어의 row 클릭 시 (렌탈정보 선택)
	$(document).on('click', '.tbl_rental_info tbody.rental_info tr', function() {
		var tr = $(".tbl_rental_info tr").index(this) - 1;
		var rental_num = $(".tbl_rental_info tbody.rental_info tr:eq(" + tr + ") td:eq(0)").text();			// 렌탈자산번호
		var objectName = $(".tbl_rental_info tbody.rental_info tr:eq(" + tr + ") td:eq(1)").text();
		var maker = $(".tbl_rental_info tbody.rental_info tr:eq(" + tr + ") td:eq(2)").text();					// 제조사
		var model = $(".tbl_rental_info tbody.rental_info tr:eq(" + tr + ") td:eq(3)").text();					// 모델명
		var serial = $(".tbl_rental_info tbody.rental_info tr:eq(" + tr + ") td:eq(4)").text();					// 시리얼번호
		var start_date = $(".tbl_rental_info tbody.rental_info tr:eq(" + tr + ") td:eq(5)").text();			// 렌탈 시작일(입고일)
		var end_date = $(".tbl_rental_info tbody.rental_info tr:eq(" + tr + ") td:eq(6)").text();				// 렌탈 종료일(렌탈반환일)
		var rentalMoney = $(".tbl_rental_info tbody.rental_info tr:eq(" + tr + ") td:eq(8)").text();
		
		var tableCk = $(".hw_gb").val();
		
		if (tableCk =='노트북'|| tableCk =='NB') {
			tableCk = 'NB';
		} else if (tableCk == '네트웍장비'|| tableCk =='NW') {
			tableCk = 'NW';
		} else if (tableCk == '데스크탑'|| tableCk =='DT') {
			tableCk = 'DT';
		} else if (tableCk == '모니터'|| tableCk =='MN') {
			tableCk = 'MN';
		} else if (tableCk == '서버'|| tableCk =='SV') {
			tableCk = 'SV';
		} else if (tableCk == '모바일기기'|| tableCk =='MO') {
			tableCk = 'MO';
		} else if (tableCk == '사무기기'|| tableCk =='OF') {
			tableCk ='OF'
		} else {
			tableCk ='ETC'
		}

		var data = {
			table : tableCk,
			check : rental_num
		};

		$.ajax({
			url : "/ITAM/hw/rentalCode",		// ->> getRentalInfo 와 같이 이름만으로 알 수 있게 변경할 것.
			type : "POST",
			cache : false,
			data : data,
			dataType : "text",
			success : function(data) {
				if(data == "true") {
					$(".rental_code").val(rental_num);
					$(".mo_nm_r").val(model);
					$(".maker_r").val(maker);
					$(".serial_r").val(serial);
					$(".receiveDate_r").val(start_date);
					$(".rental_rtn_date").val(end_date);
					$(".rental_price").val(rentalMoney);
					$(".item_r").val(objectName);      // 렌탈쪽에 품목이 있는 항목때문에 추가한거  나중에 물어봐야함 
						
//					if(today != null || today =='') {
//						$(".hMemo_r").empty();
//						$(".hMemo_r").append("["+today+"][신규등록]"+objectName);
//					}
					
					$(".modal-overlay").remove();
					$("#popup6").css("display", "none");	
				} else {
					alert("이미 등록된 렌탈자산번호 입니다.");
				}
			}, error : function(request, status, error) {
				alert("code : [" + request.status + "]\n" + "message : [" + request.responseText + "]\n" + "error : [" + error + "]");
			}
		});
	});
});

// 상태('자산지급') 체크 시 '지급(인사) 정보' 레이어 표시/감추기. 2020-07-31. kws.
$(function() {
	// 구매자산 상태('자산지급') 체크 시
	$("#status_p").on('click', function() {
		if($("#status_p").is(":checked")) {
			$(".div_prov").removeClass("div_hide");
		} else {
			$(".h_memo").empty();           
			$(".h_memo").append(startMemoSave);
			$(".div_prov").addClass("div_hide");
		}
	});

	// 렌탈자산 상태('자산지급') 체크 시
	$("#status_r").on('click', function() {
		if($("#status_r").is(":checked")) {
			$(".div_prov").removeClass("div_hide");
		} else {
			$(".hMemo_r").empty();           
			$(".hMemo_r").append(startMemoSave);
			$(".div_prov").addClass("div_hide");
		}
	});
});

$(function() {
	//구매자산 상태('자산지급') 체크 시
	$("#status_p").on('click', function() {
		if($("#status_p").is(":checked")) {
			$(".div_prov").removeClass("div_hide");
		} else {
			$(".div_prov").addClass("div_hide");
		}
	});
	
	// 렌탈자산 상태('자산지급') 체크 시
	$("#status_r").on('click', function() {
		if($("#status_r").is(":checked")) {
			$(".div_prov").removeClass("div_hide");
		} else {
			$(".div_prov").addClass("div_hide");
		}
	});
});

$(function() {
	//반환예정일 없음 선택시 반환예정일 readonly 전환 
	$(".no_rtnDate").click(function() {	
		if($(".no_rtnDate").is(':checked')) {
			$(".rtn_date").attr("disabled",true);
			$('.rtn_date').val(''); 							// 날짜 초기화
		} else {
			$(".rtn_date").removeAttr("disabled");
		}
	});
});

// 지급대상 조회 관련
$(function() {
	// 지급대상 '조회' 버튼 클릭 시
	$(".btn_sch_prov").click(function(e) {
		e.preventDefault();
		
		if($('.sch_word').val() == "") {
			var msg = '지급대상을 입력해주세요.';
		    showMsg('지급대상 조회', msg);
		    
		    excepVar = 1;
		    return false;
		}
		
		var data = $(".prov_target option:selected").val();
        var temp = $(".sch_word").val();

        var prov_target = {tableGb : data, temp : temp};

        $.ajax({
            type : "POST",
            url : "/ITAM/hw/getUser",
            data : prov_target,
            success : function(data) {
                $('.tbl_tgInfo').empty();

                if(data.proInfo == "fail") {
                	var msg = '조회한 사용자가 존재하지 않습니다.<br/>사용자 등록 후 조회해주세요.';
				    showMsg('지급대상 조회', msg);
				    return false;
                } else {
                    var html = "";
                    
                    if(data.proInfo[0].uCode != null) {
                        html = html 
	                        + "<colgroup><col style='width:15%;'><col style='width:25%;'><col style='width:30%;'><col style='width:30%;'></colgroup>"
	                        + "<thead class='fixed_scroll_thead'><tr class='fixed_scroll_tr'><th>사번</th>"
	                        + "<th>이름</th>"
	                        + "<th>부서</th>"
	                        + "<th>소속</th>"
	                        + "<th style='width:1px;'></th></tr></thead><tbody class='fixed_scroll_tbody'>";

                        for(var i = 0; i < data.proInfo.length; i++) {
	                        html = html 
	                        	+ "<tr><td>" + data.proInfo[i].uNum + "</td>"
	                            + "<td>" + data.proInfo[i].uName + "</td>"
	                            + "<td>" + data.proInfo[i].dmNm + "</td>";
	                            
	                            if(data.proInfo[i].subDmNm == null) {
	                            	html = html + "<td> - </td>";
	                           	} else {
	                           		html = html + "<td>" + data.proInfo[i].subDmNm + "</td>";
	                           	}

							html = html	                            
	                            + "<td style='display:none;'>" + data.proInfo[i].uCode + "</td>"
	                            + "<td style='display:none;'>" + data.proInfo[i].divSeq + "</td></tr>";
	                        }
	                         html = html + "</tbody>"
                    } else {
                        if(data.proInfo[0].divSeq != null) {
                            html = html 
		                            + "<colgroup><col style='width:50%;'><col style='width:50%;'></colgroup>"
		                            + "<thead><tr><th>부서</th>"
		                            + "<th>소속</th></tr></thead>";

                            for(var i = 0; i < data.proInfo.length; i++) {
                                html = html + "<tr><td>" + data.proInfo[i].dmNm + "</td>";
		                                
									if(data.proInfo[i].subDmNm == null) {
		                            	html = html + "<td> - </td>";
		                           	} else {
		                           		html = html + "<td>" + data.proInfo[i].subDmNm + "</td>";
		                           	}
		                        html = html + "<td style='visibility:hidden;position:absolute;'>" + data.proInfo[i].divSeq + "</td></tr>";
                            }
                        } else {
                            html = html 
		                            + "<colgroup><col style='width:100%;'></colgroup>"
		                            + "<thead><tr><th>그룹명</th></tr></thead>";

                            for(var i = 0; i < data.proInfo.length; i++) {
                                html = html 
		                                + "<tr><td>" + data.proInfo[i].gName + "</td>"
		                                + "<td style='visibility:hidden;position:absolute;'>" + data.proInfo[i].gCode + "</td></tr>"
                            }
                        }
                    }

                    $(".tbl_tgInfo").append(html);
                    fade('popup7');
                }
            }
        });
	});
	
	// '지급대상 조회' 레이어의 row 클릭 시 (지급대상 선택)
	$(document).on('click', '.tbl_tgInfo tr', function() {
		var select = $(".prov_target option:selected").val();
		var tr = $(".tbl_tgInfo tr").index(this);
		var memo = $(".h_memo").val();
		var h_m = "";
		var date = toDay();
		var assetRegGb = $("input[name='assetRegGb']:checked").val();
		var text ="";
		
		console.log(assetRegGb);
		if(numCnt == 0) {
			memoSave = memo;
			numCnt ++;
		}
		
		if (byteCheck($('.h_memo').val()) > 2000) {
			var listArray = [];
    		var testArray = [];
   	 		
    		listArray = memoSave.split("\n");
    		
    		for(i=0; i<(listArray.length -2); i++) {
    			testArray += listArray[i]+ "\n";
    		}
    		
    		for(i=0; i<(testArray.length -1); i++) {
    			text += testArray[i];
    		}
		}
		
		$(".ps_num").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text());
		$(".ps_name").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text());
		$(".ps_dept").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(2)").text() + " " + $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(3)").text());

		if(select == "uName") {
            $(".ps_num").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text());
            $(".sch_word").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text());
            $(".ps_dept").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(2)").text() + " " + $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(3)").text());
            $(".u_code").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(4)").text());
            $(".divSeq").val("");
            $(".g_code").val("");
            
            if(assetRegGb == 'P') {
            	if(text != "") {
            		$(".h_memo").empty();           
         			$(".h_memo").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text()+"("+$(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text()+")" +'\n');
         			$(".h_memo").append(text);           		
            	}  else {
            		$(".h_memo").empty();           
         			$(".h_memo").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text()+"("+$(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text()+")" +'\n');
         			$(".h_memo").append(memoSave);
            	}
            } else {
            	if(text != "") {
            		$(".hMemo_r").empty();           
         			$(".hMemo_r").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text()+"("+$(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text()+")" +'\n');
         			$(".hMemo_r").append(text);          		
            	}  else {
            		$(".hMemo_r").empty();           
         			$(".hMemo_r").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text()+"("+$(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text()+")" +'\n');
         			$(".hMemo_r").append(memoSave);
            	}           	
            }
        } else if(select == "dmNm") {
            $(".ps_num").val("-");
            $(".ps_dept").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text() + " " + $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text());
            $(".divSeq").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(2)").text());
            $(".u_code").val("");
            $(".g_code").val("");
            
            if(assetRegGb == 'P') {
            	if(text != "") {
            		$(".h_memo").empty();                
      				$(".h_memo").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text() + " " + $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text()+'\n');
      				$(".h_memo").append(text);     		
            	}  else {
            		  $(".h_memo").empty();                
      				$(".h_memo").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text() + " " + $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text()+'\n');
      				$(".h_memo").append(memoSave);
            	}
            } else {
            	if(text != "") {
            		$(".hMemo_r").empty();                
         			$(".hMemo_r").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text() + " " + $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text()+'\n');
         			$(".hMemo_r").append(text);     		
            	}  else {
            		$(".hMemo_r").empty();                
         			$(".hMemo_r").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text() + " " + $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text()+'\n');
         			$(".hMemo_r").append(memoSave);
            	}
            }
        } else {
            $(".ps_num").val("-");
            $(".ps_dept").val("-");
            $(".sch_word").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text());
            $(".g_code").val($(".tbl_tgInfo tr:eq(" + tr + ") td:eq(1)").text());
            $(".u_code").val("");
            $(".divSeq").val("");
            
            if(assetRegGb == 'P') {
            	if(text != "") {
            		$(".h_memo").empty();           
     				$(".h_memo").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text()+'\n');
     				$(".h_memo").append(text);   		
            	}  else {
            		 $(".h_memo").empty();           
     				$(".h_memo").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text()+'\n');
     				$(".h_memo").append(memoSave);
            	}
            } else {
            	if(text != "") {
            		$(".hMemo_r").empty();           
     				$(".hMemo_r").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text()+'\n');
     				$(".hMemo_r").append(text); 		
            	}  else {
            		$(".hMemo_r").empty();           
     				$(".hMemo_r").append("["+date+"][자산지급]"+ $(".tbl_tgInfo tr:eq(" + tr + ") td:eq(0)").text()+'\n');
     				$(".hMemo_r").append(memoSave);
            	}
            }
        }
			
		joinCnt = 999;
		
		checkInputData(2000, "h_memo");
	    $('.ast_hm_p').html(bCheck + '/2000자');
	    
	    checkInputData(2000, "hMemo_r");
	    $('.ast_hm_r').html(bCheck + '/2000자');
	    
		fadeClose();
	});
});

$(function() {
	// 반환예정일 없음 선택 시 반환예정일 readonly 전환 
	$("#no_rtnDate").click(function() {
		if($("#no_rtnDate").is(':checked')) {
			$(".rtn_date").attr('readonly', true);
			$('.rtn_date').val(''); 								// 날짜 초기화
		} else {
			$(".rtn_date").attr('readonly', false);
		}
	});
	
	/*// 입고일자 한글 숫자 막기
	$(".receive_date").on("blur keyup", function() {
		if (window.event.keyCode == 13) {
    
       } else {
    	   $(this).val($(this).val().replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9|-]/g, '' ) );
       }
	});*/
});

$(function() {
	
	$('.receive_date').on("blur keyup", function() {
    	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 

		if (!date_pattern.test($(this).val())) {
			$(this).val('');
			return false;
		} 
		$(".vendor").focus();
	});

	$('.receiveDate_r').on("blur keyup", function() {
    	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 

		if (!date_pattern.test($(this).val())) {
			$(this).val('');
			return false;
		} 		
		
		/*$(".rental_rtn_date").focus();
		$(".rental_rtnDate").focus();*/
	});
	
	$('.rental_rtn_date').on("blur keyup", function() {
    	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 

		if (!date_pattern.test($(this).val())) {
			$(this).val('');
			return false;
		} 
		
		$(".rental_price").focus();		
	});
	
	$('.rtn_date').on("blur keyup", function() {
    	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 
    	/*$("input:checkbox[id='no_rtnDate']").attr("checked", false);
    	$(".rtn_date").removeAttr("readonly");*/
		if (!date_pattern.test($(this).val())) {
			$(this).val('');	
			return false;
		} 		
		$(".location").focus();
	});
	
	$('.rental_rtnDate').on("blur keyup", function() {
    	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 

		if (!date_pattern.test($(this).val())) {
			$(this).val('');
			return false;
		} 
		$(".rental_price").focus();
	});
	
	$('.date').on("blur keyup", function() {
    	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 
   
		if (!date_pattern.test($(this).val())) {
			$(this).val('');
			return false;
		} 
		$(".ps_info").focus();
	});
	
});


//예외처리용 함수
function excepCatch(excepVar){
	if(excepVar == 1){
        //지급대상으로 포커스 이동
		return $('.sch_word').focus();
	}
	
	if(excepVar == 2){
        //지급대상으로 포커스 이동
		return $('.item').focus();
	}
}

//모바일 전화번호
function enterkey6() { 
	   $(".phn_num").val($(".phn_num").val().replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\[\]{}()<>?|`~!@#$%^&*_+=,.;:\"'\\|]/g, '' ) );
	   $(".phn_num_r").val($(".phn_num_r").val().replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\[\]{}()<>?|`~!@#$%^&*_+=,.;:\"'\\|]/g, '' ) );
}