// 구매자산 인쇄 자산정보
function pPrintInfo(data, target) {
	var temp = "";
	
	console.log(data);
	temp = target;
	
	$(".pprint").css('display', 'block');
	$(".rprint").css('display', 'none');
	
	$('#popup5 .img').attr("src", "");
	
	$("#popup5 .hw_gb").empty();	
	$("#popup5 .hw_gb").append(temp);															// 하드웨어 구분
	
	$("#popup5 .asset_code").empty();	
	$("#popup5 .asset_code").append(data.assetCode);	
	$("#popup5 .lbl_asset_code").empty();	
	$("#popup5 .lbl_asset_code").append("자산코드 : " + data.assetCode);			// 자산코드
	
	// 자산등록 구분
	if(data.assetRegGb == 'P') {
		temp = '구매자산';
	} else {
		temp = '렌탈자산';
	}
	
	$("#popup5 .asset_regGb").empty();	
	$("#popup5 .asset_regGb").append(temp);
	
	// 구매처
	if(data.vendor == null || data.vendor == "") {
		$("#popup5 .vendor").empty();	
		$("#popup5 .vendor").append("-");
	} else {
		$("#popup5 .vendor").empty();	
		$("#popup5 .vendor").append(data.vendor);
	}
	
	// 품목
	if(target == '기타장비') {
		if(data.item == null || data.item == "") {
			$(".pprint .item").empty();	
			$(".pprint .item").append("-");
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
			
			$(".pprint .item").empty();	
			$(".pprint .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == 'USB') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/usb.png");
			} else if (temp =='카드리더기') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/cardreader.png");
			} else if (temp =='라즈베리 파이') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/raspberry.png");
			} else {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/etc_etc.png");
			}
		} else {
			$(".pprint .img").attr("src", "/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '네트웍장비') {
		if(data.item == null || data.item == "") {
			$(".pprint .item").empty();	
			$(".pprint .item").append("-");
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
			
			$(".pprint .item").empty();	
			$(".pprint .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '라우터') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/router.png");
			} else if (temp =='스위치') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/switch.png");
			} else if (temp =='방화벽') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/firewall.png");
			} else if (temp =='허브') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/hub.png");
			} else if (temp =='공유기') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/sharing.png");	
			} else {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/etc.png");
			}
		} else {
			$(".pprint .img").attr("src", "/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '사무기기') {
		if(data.item == null || data.item == "") {
			$(".pprint .item").empty();	
			$(".pprint .item").append("-");
		} else {
			if(data.item == 'scaner') {
				temp = '스캐너';
			} else if(data.item == 'multiPrinter') {
				temp = '복합기';
			} else if(data.item == 'fax') {
				temp = '팩스';
			} else if(data.item == 'printer') {
				temp = '프린터';
			} else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$(".pprint .item").empty();	
			$(".pprint .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '스캐너') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/scaner.png");
			} else if (temp =='복합기') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/multiPrinter.png");
			} else if (temp =='팩스') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/fax.png");
			} else if (temp =='프린터') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/printer.png");
			} else {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/of_etc.png");
			}
		} else {
			$(".pprint .img").attr("src", "/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '모바일기기') {
		if(data.item == null || data.item == "") {
			$(".pprint .item").empty();	
			$(".pprint .item").append("-");
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
			
			$(".pprint .item").empty();	
			$(".pprint .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '핸드폰') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/phone.png");
			} else if (temp =='태블릿') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/tablet.png");
			} else if (temp =='워치') {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/watch.png");
			} else {
				$(".pprint .img").attr("src", "/ITAM/resources/images/product/p_etc.png");
			}
		} else {
			$(".pprint .img").attr("src", "/ITAM/images/"+ data.img);
		}
	}
	
	if(target == '노트북') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$(".pprint  .img").attr("src", "/ITAM/resources/images/product/hw_notebook_sub.png");
		} else {
			$(".pprint .img").attr("src", "/ITAM/images/" + data.img);
		}
	}
	
	if(target == '데스크탑') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$(".pprint  .img").attr("src", "/ITAM/resources/images/product/desktop.png");
		} else {
			$(".pprint  .img").attr("src", "/ITAM/images/" + data.img);
		}
	}
	
	if(target == '모니터') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$(".pprint  .img").attr("src", "/ITAM/resources/images/product/monitor.png");
		} else {
			$(".pprint  .img").attr("src", "/ITAM/images/" + data.img);
		}
	}
	
	if(target == '서버') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$(".pprint  .img").attr("src", "/ITAM/resources/images/product/server.png");
		} else {
			$(".pprint  .img").attr("src", "/ITAM/images/" + data.img);
		}
	}
	
	// 제조사
	if(data.maker == null || data.maker == "") {
		$("#popup5 .maker").empty();
		$("#popup5 .maker").append("-");
		$("#popup5 .lbl_maker").empty();
		$("#popup5 .lbl_maker").append("제조사 : - ");
		$("#tab-3 .p_maker").empty();
		$("#tab-3 .p_maker").val("-");
	} else {
		$("#popup5 .maker").empty();
		$("#popup5 .maker").append(data.maker);
		$("#popup5 .lbl_maker").empty();
		$("#popup5 .lbl_maker").append("제조사 : " + data.maker);
		$("#tab-3 .p_maker").empty();
		$("#tab-3 .p_maker").val(data.maker);
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

	$("#popup5 .status").empty();
	$("#popup5 .status").append(temp);
	
	if(data.status == '1') {		
		if(data.checkimg == null || data.checkimg == "") {
			$("#print03").attr("data-tab", "tab-5");	
		} else {
			var check = data.checkimg.split('.').pop().toLowerCase();
			console.log(check);
			
			if(check == "pdf") {
				$("#print03").attr("data-tab", "tab-4");
				
				var de = "/ITAM/images/" + data.checkimg;
				pdf(de);
			} else {
				$("#print03").attr("data-tab", "tab-6");
				$("#tab-6  .p_img").attr("src", "/ITAM/images/" + data.checkimg);
			}
		}		
	} else {
		$("#print03").attr("data-tab", "tab-3");	
	}
	//자산코드
	$("#tab-3 .pAssetCode").empty();
	$("#tab-3 .pAssetCode").text(data.assetCode);
	
	// 모델명
	if(data.moName == null || data.moName == "") {
		$("#popup5 .mo_name").empty();
		$("#popup5 .mo_name").append("-");
		$("#popup5 .lbl_model").empty();
		$("#popup5 .lbl_model").append("모델명 : - ");
		$("#tab-3 .p_model").empty();
		$("#tab-3 .p_model").val("-");
	} else {
		$("#popup5 .mo_name").empty();
		$("#popup5 .mo_name").append(data.moName);
		$("#popup5 .lbl_model").empty();
		$("#popup5 .lbl_model").append("모델명 : " + data.moName);
		$("#tab-3 .p_model").empty();
		$("#tab-3 .p_model").val(data.moName);
	}
	
	// 시리얼
	if(data.serial == null || data.serial == "") {
		$("#popup5 .serial").empty();
		$("#popup5 .serial").append("-");
		$("#popup5 .lbl_serial").empty();
		$("#popup5 .lbl_serial").append("시리얼 : - ");
		$("#tab-3 .p_serial").empty();
		$("#tab-3 .p_serial").val("-");
	} else {
		$("#popup5 .serial").empty();
		$("#popup5 .serial").append(data.serial);
		$("#popup5 .lbl_serial").empty();
		$("#popup5 .lbl_serial").append("시리얼 : " + data.serial);
		$("#tab-3 .p_serial").empty();
		$("#tab-3 .p_serial").val(data.serial);
	}
	
	if(data.telecom == null || data.telecom == "") {
		$("#popup5 .telecom").append("-");
	} else {
		$("#popup5 .telecom").append(data.telecom);
	}
	

	if(data.phnNum == null || data.phnNum == "") {
		$("#popup5 .phone").append("-");
	} else {
		$("#popup5 .phone").append(data.phnNum);
	}
	
	// 스펙
	if(data.spec == null || data.spec == "") {
		$("#popup5 .spec").empty();
		$("#popup5 .spec").append("-");
		$("#tab-3 .p_spec").empty();
		$("#tab-3 .p_spec").val("-");
	} else {
		$("#popup5 .spec").empty();
		$("#popup5 .spec").append(data.spec);
		$("#tab-3 .p_spec").empty();
		$("#tab-3 .p_spec").val(data.spec);
	}
	
	// 구매처 정보
	if(data.vendorInfo == null || data.vendorInfo == "") {
		$("#popup5 .vendor_info").empty();
		$("#popup5 .vendor_info").append("-");
	} else {
		$("#popup5 .vendor_info").empty();
		$("#popup5 .vendor_info").append(data.vendorInfo);
	}
	
	// 이력메모
	if(data.hMemo == null || data.hMemo == "") {
		$("#popup5 .h_memo").empty();
		$("#popup5 .h_memo").append("-");
	} else {
		$("#popup5 .h_memo").empty();
		$("#popup5 .h_memo").append(data.hMemo);
	}
	
	// 기타메모
	if(data.eMemo == null || data.eMemo == "") {
		$("#popup5 .e_memo").empty();
		$("#popup5 .e_memo").append("-");
	} else {
		$("#popup5 .e_memo").empty();
		$("#popup5 .e_memo").append(data.eMemo);
	}
}

// 렌탈자산 인쇄 자산정보
function rPrintInfo(data, target) {
	var temp = "";
	
	temp = target;
	
	$(".pprint").css('display', 'none');
	$(".rprint").css('display', 'block');
	
	$('.rprint .img').attr("src", "");
	
	$(".rprint .r_hw_gb").empty();	
	$(".rprint .r_hw_gb").append(temp);											// 하드웨어 구분
	
	$(".rprint .r_asset_code").empty();	
	$(".rprint .r_asset_code").append(data.assetCode);	
	$("#popup5 .lbl_asset_code").empty();	
	$("#popup5 .lbl_asset_code").append("자산코드 : " + data.assetCode);// 자산코드

	// 자산등록 구분
	if(data.assetRegGb == 'P') {
		temp = '구매자산';
	} else {
		temp = '렌탈자산';
	}
	
	$(".rprint .r_asset_regGb").empty();
	$(".rprint .r_asset_regGb").append(temp);
	
	// 렌탈자산번호
	if(data.rentalCode == null || data.rentalCode == "") {
		$(".rprint .r_rental_code").empty();	
		$(".rprint .r_rental_code").append("-");
	} else {
		$(".rprint .r_rental_code").empty();	
		$(".rprint .r_rental_code").append(data.rentalCode);
	}
	
	// 품목
	if(target == '기타장비') {
		if(data.item == null || data.item == "") {
			$(".rprint .item").empty();	
			$(".rprint .item").append("-");
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
			
			$(".rprint .item").empty();	
			$(".rprint .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == 'USB') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/usb.png");
			} else if (temp =='카드리더기') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/cardreader.png");
			} else if (temp =='라즈베리 파이') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/raspberry.png");
			} else {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/etc_etc.png");
			}
		} else {
			$(".rprint .img").attr("src", "/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '네트웍장비') {
		if(data.item == null || data.item == "") {
			$(".rprint .item").empty();	
			$(".rprint .item").append("-");
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
			
			$(".rprint .item").empty();	
			$(".rprint .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '라우터') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/router.png");
			} else if (temp =='스위치') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/switch.png");
			} else if (temp =='방화벽') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/firewall.png");
			} else if (temp =='허브') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/hub.png");
			} else if (temp =='공유기') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/sharing.png");	
			} else {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/etc.png");
			}
		} else {
			$(".rprint .img").attr("src", "/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '사무기기') {
		if(data.item == null || data.item == "") {
			$(".rprint .item").empty();	
			$(".rprint .item").append("-");
		} else {
			if(data.item == 'scaner') {
				temp = '스캐너';
			} else if(data.item == 'multiPrinter') {
				temp = '복합기';
			} else if(data.item == 'fax') {
				temp = '팩스';
			} else if(data.item == 'printer') {
				temp = '프린터';
			} else if(data.item == 'etc') {
				temp = '기타';
			} else {
				temp = data.item;
			}
			
			$(".rprint .item").empty();	
			$(".rprint .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '스캐너') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/scaner.png");
			} else if (temp =='복합기') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/multiPrinter.png");
			} else if (temp =='팩스') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/fax.png");
			} else if (temp =='프린터') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/printer.png");
			} else {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/of_etc.png");
			}
		} else {
			$(".rprint .img").attr("src", "/ITAM/images/"+ data.img);
		}
	}
	
	// 품목
	if(target == '모바일기기') {
		if(data.item == null || data.item == "") {
			$(".rprint .item").empty();	
			$(".rprint .item").append("-");
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
			
			$(".rprint .item").empty();	
			$(".rprint .item").append(temp);
		}
		
		// 실물이미지
		if(data.img == null || data.img == "") {
			if(temp == '핸드폰') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/phone.png");
			} else if (temp =='태블릿') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/tablet.png");
			} else if (temp =='워치') {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/watch.png");
			} else {
				$(".rprint .img").attr("src", "/ITAM/resources/images/product/p_etc.png");
			}
		} else {
			$(".rprint .img").attr("src", "/ITAM/images/"+ data.img);
		}
	}
	
	if(target == '노트북') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$(".rprint  .img").attr("src", "/ITAM/resources/images/product/hw_notebook_sub.png");
		} else {
			$(".rprint .img").attr("src", "/ITAM/images/" + data.img);
		}
	}
	
	if(target == '데스크탑') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$(".rprint  .img").attr("src", "/ITAM/resources/images/product/desktop.png");
		} else {
			$(".rprint  .img").attr("src", "/ITAM/images/" + data.img);
		}
	}
	
	if(target == '모니터') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$(".rprint  .img").attr("src", "/ITAM/resources/images/product/monitor.png");
		} else {
			$(".rprint  .img").attr("src", "/ITAM/images/" + data.img);
		}
	}
	
	if(target == '서버') {
		// 실물이미지
		if(data.img == null || data.img == "") {
			$(".rprint  .img").attr("src", "/ITAM/resources/images/product/server.png");
		} else {
			$(".rprint  .img").attr("src", "/ITAM/images/" + data.img);
		}
	}
	
	//자산코드
	$("#tab-3 .pAssetCode").empty();
	$("#tab-3 .pAssetCode").text(data.assetCode);
	
	// 제조사
	if(data.maker == null || data.maker == "") {
		$(".rprint .r_maker").empty();	
		$(".rprint .r_maker").append("-");
		$("#popup5 .lbl_maker").empty();
		$("#popup5 .lbl_maker").append("제조사 : - ");
		$("#tab-3 .p_maker").empty();
		$("#tab-3 .p_maker").val("-");
	} else {
		$(".rprint .r_maker").empty();	
		$(".rprint .r_maker").append(data.maker);
		$("#popup5 .lbl_maker").empty();
		$("#popup5 .lbl_maker").append("제조사 : " + data.maker);
		$("#tab-3 .p_maker").empty();
		$("#tab-3 .p_maker").val(data.maker);
	}
	
	if(data.telecom == null || data.telecom == "") {
		$(".rprint .telecom").append("-");
	} else {
		$(".rprint .telecom").append(data.telecom);
	}
	

	if(data.phnNum == null || data.phnNum == "") {
		$(".rprint .phone").append("-");
	} else {
		$(".rprint .phone").append(data.phnNum);
	}
	
	// 입고일자
	if(data.receiveDate == null || data.receiveDate == "") {
		$(".rprint .r_receive_date").empty();	
		$(".rprint .r_receive_date").append("-");
	} else {
		$(".rprint .r_receive_date").empty();	
		$(".rprint .r_receive_date").append(data.receiveDate);
	}
	
	// 모델명
	if(data.moName == null || data.moName == "") {
		$(".rprint .r_mo_name").empty();
		$(".rprint .r_mo_name").append("-");
		$("#popup5 .lbl_model").empty();
		$("#popup5 .lbl_model").append("모델명 : - ");
		$("#tab-3 .p_model").empty();
		$("#tab-3 .p_model").val("-");
	} else {
		$(".rprint .r_mo_name").empty();
		$(".rprint .r_mo_name").append(data.moName);
		$("#popup5 .lbl_model").empty();
		$("#popup5 .lbl_model").append("모델명 : " + data.moName);
		$("#tab-3 .p_model").empty();
		$("#tab-3 .p_model").val(data.moName);
	}
	
	// 렌탈반환일자
	if(data.rentalRtnDate == null || data.rentalRtnDate == "") {
		$(".rprint .r_rental_rtnDate").empty();
		$(".rprint .r_rental_rtnDate").append("-");
	} else {
		$(".rprint .r_rental_rtnDate").empty();
		$(".rprint .r_rental_rtnDate").append(data.rentalRtnDate);
	}
	
	// 시리얼
	if(data.serial == null || data.serial == "") {
		$(".rprint .r_serial").empty();
		$(".rprint .r_serial").append("-");
		$("#popup5 .lbl_serial").empty();
		$("#popup5 .lbl_serial").append("시리얼 : - ");
		$("#tab-3 .p_serial").empty();
		$("#tab-3 .p_serial").val("-");
	} else {
		$(".rprint .r_serial").empty();
		$(".rprint .r_serial").append(data.serial);
		$("#popup5 .lbl_serial").empty();
		$("#popup5 .lbl_serial").append("시리얼 : " + data.serial);
		$("#tab-3 .p_serial").empty();
		$("#tab-3 .p_serial").val(data.serial);
	}
	
	// 렌탈료
	if(data.rentalPrice == null || data.rentalPrice == "") {
		$(".rprint .r_rental_price").empty();
		$(".rprint .r_rental_price").append("-");
	} else {
		$(".rprint .r_rental_price").empty();
		$(".rprint .r_rental_price").append(data.rentalPrice);
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
	
	$(".rprint .r_status").empty();
	$(".rprint .r_status").append(temp);
	
	if(data.status == '1') {		
		if(data.checkimg == null || data.checkimg == "") {
			$("#print03").attr("data-tab", "tab-5");	
		} else {
			var check = data.checkimg.split('.').pop().toLowerCase();
			if(check == "pdf") {
				$("#print03").attr("data-tab", "tab-4");
				
				var de = "/ITAM/images/" + data.checkimg;
				pdf(de);
			} else {
				$("#print03").attr("data-tab", "tab-6");
				$("#tab-6  .p_img").attr("src", "/ITAM/images/" + data.checkimg);
			}			
		}		
	} else {
		$("#print03").attr("data-tab", "tab-3");	
	}
	// 스펙
	if(data.spec == null || data.spec == "") {
		$(".rprint .r_spec").empty();
		$(".rprint .r_spec").append("-");
		$("#tab-3 .p_spec").empty();
		$("#tab-3 .p_spec").val("-");
	} else {
		$(".rprint .r_spec").empty();
		$(".rprint .r_spec").append(data.spec);
		$("#tab-3 .p_spec").empty();
		$("#tab-3 .p_spec").val(data.spec);
	}
	
	// 이력메모
	if(data.hMemo == null || data.hMemo == "") {
		$(".rprint .r_h_memo").empty();
		$(".rprint .r_h_memo").append("-");
	} else {
		$(".rprint .r_h_memo").empty();
		$(".rprint .r_h_memo").append(data.hMemo);
	}
	
	// 기타메모
	if(data.eMemo == null || data.eMemo == "") {
		$(".rprint .r_e_memo").empty();
		$(".rprint .r_e_memo").append("-");
	} else {
		$(".rprint .r_e_memo").empty();
		$(".rprint .r_e_memo").append(data.eMemo);
	}		
}

//function fileUpload(fis) {
//	
////	$(".hd_img_box").css("background", "url(/ITAM/resources/images/print_logo.png) no-repeat center");
////	$(".hd_img_box").css("background-size", "70px");
//}
function fileUpload(fis) {
	//$(".fileUpload").click(function() {
	var fName = $("#ex_filename").val();
	var name = fName.split('.').pop().toLowerCase();
	
	var check = $.inArray(name, ['png', 'jpg', 'jpeg', 'gif']);
	
	if(check == -1) {		
		/*$('#popup2 p.modal_tit').append('로고 등록');
		$('#popup2 div.modal_content').append('실물이미지의 확장자는 jpg, png만 가능합니다.');
		$('#popup2 div.modal_content').append('이미지 크기를 100KB 미만으로 등록 해주세요.');
		fade('popup2');*/
		alert('로고 확장자는 jpg, png, jpeg, gif만 가능합니다.');
		return false;
	} 
	
	var fileSize = document.getElementById("ex_filename").files[0].size;
	fileSize = fileSize/1024;	
	
	if(fileSize > 100){
		/*$('#popup2 p.modal_tit').append('로고 등록');
		$('#popup2 div.modal_content').append('이미지 크기를 100KB 미만으로 등록 해주세요.');
		fade('popup2');*/
		alert('이미지 크기를 100KB 미만으로 등록 해주세요.');
		return false;
	}
	
	var formData = new FormData($("#logoUpload")[0]);
	var frm_data = '';

	$.ajax({
		url : "/ITAM/hw/logoUpload",
		enctype : "multipart/form-data",
		processData: false,
		contentType: false,
		type : "POST",
		data : formData,
		dataType : "text",
		success : function(data) {
			if(data == "Success") {				
				getLogo();		
			} else {
				var msg = '로고등록에 실패하였습니다. 다시 시도해주세요.';
				showMsg('로고 등록', msg);
				return false;
			}
		}, error : function(request, status, error) {
			alert("code : [" + request.status + "]\n" + "message : [" + request.responseText + "]\n" + "error : [" + error + "]");
		}
	});
};

function getLogo(){
	$.ajax({
		url : "/ITAM/hw/getLogo",
		type : "POST",
		dataType : "text",
		success : function(data) {
			$(".txt_logo").text("사진 수정");
			$('#fileimg').attr('src',"/ITAM/images/"+data).width(50).height(50);			
			$(".txt_logo").css("margin", "0px 0px 0px 0px");
			return data;
		}, error : function(request, status, error) {
			alert("code : [" + request.status + "]\n" + "message : [" + request.responseText + "]\n" + "error : [" + error + "]");
		}
	});
	
}
	
// '라벨' 엑셀 다운로드
function excelDown() {
	var lb_excel = document.lb_excel;
	var lb_asset_code = $(".lbl_asset_code").text();
	var lb_model = "";
	var lb_seral = "";
	var lb_maker = "";
	var lb_barcode = $(".hd_code_box>img").attr("src");
	var lb_logo = "";
	
	$("#lbl_asset_code").val(lb_asset_code);
	$("#lbl_barcode").val(lb_barcode);
	
	if($(".lbl_model").css("display") == "block") {
		lb_model = $(".lbl_model").text();
		$("#lbl_model").val(lb_model);
	} else {
		$("#lbl_model").val("");
	}

	if($(".lbl_serial").css("display") == "block") {
		lb_seral = $(".lbl_serial").text();
		$("#lbl_serial").val(lb_seral);
	} else {
		$("#lbl_serial").val("");
	}
	
	if($(".lbl_maker").css("display") == "block") {
		lb_maker = $(".lbl_maker").text();
		$("#lbl_maker").val(lb_maker);				
	} else {
		$("#lbl_maker").val("");	
	}

	if($(".hd_img_box").css("display") == "inline-block") {
		lb_logo = $("#fileimg").attr("src");
		$("#lbl_logo").val(lb_logo);				
	} else {
		$("#lbl_logo").val("");	
	}
	
	console.log(lb_asset_code);
	console.log(lb_model);
	console.log(lb_seral);
	console.log(lb_maker);
	console.log(lb_barcode);
	console.log(lb_logo);

	lb_excel.submit();
}
	
// 레이어 인쇄
function layerPrint() {
	var area;

	// 인쇄 영역 설정
	if($(":input:radio[name=ast_print]:checked").val() == "ast_info") {
		area = $("#tab-1").html();
	} else if($(":input:radio[name=ast_print]:checked").val() == "ast_label") {
		area = $("#tab-2 .label_result_box").html();
	} else if($(":input:radio[name=ast_print]:checked").val() == "ast_chkDoc") {
		for(var i=3; i<=6; i++) {
			//console.log("#tab-" + i + " : [" + $("#tab-" + i).hasClass("on") + "]");
			
			if($("#tab-" + i).hasClass("on")) {
				var html = "";
				
				if(i == 3) {
					html = "<div style='padding:20px;'>";
					html += $("#tab-" + i).html();
					html += "</div>";
				} else {
					html = $("#tab-" + i).html();
				}
				
				area = html;
			}
		}
		
		//area = $("#tab-3").html();
	}
	
	var initHead = document.head.innerHTML;
	var initBody = area;

	// popup 크기 및 위치 지정
	var sWidth = window.screen.width;
	var sHeight = window.screen.height;

	var pWidth = 800;
	var pHeight = 600;

	var popupX = (sWidth / 2) - (pWidth / 2);
	var popupY = (sHeight / 2) - (pHeight / 2);

	var win = window.open("", "_blank", "status=no, height=" + pHeight  + ", width=" + pWidth  + ", left="+ popupX + ", top="+ popupY);
	
	self.focus();
	win.document.open();

	win.document.write(initHead);
	win.document.write(initBody);
	win.document.close();

	// 1초 지연
	setTimeout(() => {
		win.print();
		win.close();
	}, 500)
}

// 인쇄 레이어에서 '인쇄유형'에 따라 엑셀다운로드 버튼 보이기/숨기기 
$(function() {
	$("#print02").click(function() {
		$(".btn_info_excel").removeClass("btn_hide");
	});

	$("#print01, #print03").click(function() {
		$(".btn_info_excel").addClass("btn_hide");
	});
});

// '인쇄' 레이어에서 인쇄 유형 선택 시
$(function() {
	$('.pop_srh_sub input').click(function() {
		var tab_id = $(this).attr('data-tab');

		$('.pop_srh_sub span').removeClass('on');
		$('.tab_con_box').removeClass('on');

		$(this).addClass('on');
		$("#" + tab_id).addClass('on');
	});
});

$(function() {
	// '인쇄' 레이어 > 인쇄 유형 '라벨' > '로고' 버튼 클릭 시
	$('#chk_logo').click(function() {
		$("div.hd_code_box").css("padding-top", "4px");

		if($('#chk_logo').is(':checked')) {
			$("div.hd_info_box").css("display", "inline-block");
			$("div.hd_img_box").css("display", "inline-block");
		} else {
			$("div.hd_info_box").css("display", "block");
			$("div.hd_img_box").css("display", "none");
		}
	});
	
	// '인쇄' 레이어 > 인쇄 유형 '라벨' > '모델명' 버튼 클릭 시
	$('#chk_model').click(function() {
		$("div.hd_code_box").css("padding-top", "4px");

		if($('#chk_model').is(':checked')) {
			$("li.lbl_model").css("display", "block");		
		} else {
			$("li.lbl_model").css("display", "none");	
		}
	});

	// '인쇄' 레이어 > 인쇄 유형 '라벨' > '시리얼' 버튼 클릭 시
	$('#chk_serial').click(function() {
		$("div.hd_code_box").css("padding-top", "4px");

		if($('#chk_serial').is(':checked')) {
			$("li.lbl_serial").css("display", "block");		
		} else {
			$("li.lbl_serial").css("display", "none");	
		}
	});

	// '인쇄' 레이어 > 인쇄 유형 '라벨' > '제조사' 버튼 클릭 시
	$('#chk_maker').click(function() {
		$("div.hd_code_box").css("padding-top", "4px");

		if($('#chk_maker').is(':checked')) {
			$("li.lbl_maker").css("display", "block");		
		} else {
			$("li.lbl_maker").css("display", "none");	
		}
	});
});