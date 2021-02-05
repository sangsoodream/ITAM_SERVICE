function memberListSearch1(productCode, num, getStatus){
	var memberList = "";
	
	// 리스트 및 페이징 값 초기화
	var cell1 = document.getElementById("memberList"); 
	var cell2 = document.getElementById("memberPaging"); 
	var cell3 = document.getElementById("getStatus"); 
	var cell4 = document.getElementById("btn_select_status");
	
	memberList = {productCode : productCode, CPageNum : num, status : getStatus};
	
	$.ajax({
        url : "/ITAM/sw/SWMemberListSearch",
        data : memberList,
		type : "POST",
		success : function(data){
				
			while ( cell1.hasChildNodes() ) { 
				cell1.removeChild( cell1.firstChild ); 
			}
		
			while ( cell2.hasChildNodes() ) { 
				cell2.removeChild( cell2.firstChild ); 
			}
			
			while ( cell3.hasChildNodes() ) { 
				cell3.removeChild( cell3.firstChild ); 
			}
			
			while ( cell4.hasChildNodes() ) { 
				cell4.removeChild( cell4.firstChild ); 
			}
		
			var html = "";
			memberList = data.memberList;
			memberPaging = data.memberPaging;
			console.log(memberList);
			memberPaging
			
			if (memberList.length == 0) {
				html = html
				+ '<tr><td colspan="10" class="txt_center">등록된 자산이 없습니다.</td></tr>'
			} else {
				
               	for(var i = 0; i < memberList.length; i++) {
                  	
                   	html = html
                   	+ '<tr style="cursor: pointer">'
					+ '<td><input type="checkbox" id="' + memberList[i].mAssetCode + '" name="chk_sw_user" value="' + memberList[i].mAssetCode + '"><label for="' + memberList[i].mAssetCode + '"><span></span></label></td>'
					
					if(memberList[i].mProductVer == null) {
						html = html + '<td>-</td>'
					} else {
						html = html + '<td>' + memberList[i].mProductVer + '</td>'
					}
					
					if(memberList[i].mSerial == null) {
						html = html + '<td colspan="3">-</td>'
					} else {
						html = html + '<td colspan="3">' + memberList[i].mSerial + '</td>'
					}
					
					if(memberList[i].mStatus == 0) {
						html = html + '<td>지급</td>'
					} else if(memberList[i].mStatus == 1) {
						html = html + '<td>미사용</td>'
					}
					
					if(memberList[i].uName != null) {
						html = html + '<td colspan="2">' + memberList[i].uName + '</td>'
					} else if (memberList[i].dmNm != null && memberList[i].subDmNm != null) {
						html = html + '<td colspan="2">' + memberList[i].dmNm + ' ' + memberList[i].subDmNm + '</td>'
					} else if (memberList[i].dmNm != null && memberList[i].subDmNm == null) {
						html = html + '<td colspan="2">' + memberList[i].dmNm + '</td>'
					} else if (memberList[i].gName != null) {
						html = html + '<td colspan="2">' + memberList[i].gName + '</td>'
					} else {
						html = html + '<td colspan="2">-</td>'
					}
					
					if(memberList[i].uNum == null && memberList[i].dmNm == null && memberList[i].subDmNm == null && memberList[i].provideDate == null) {
						html = html + '<td>-</td>'
					} else if (memberList[i].uNum == null && memberList[i].dmNm != null && memberList[i].subDmNm == null && memberList[i].provideDate != null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="지급대상:부서\n부서:' + memberList[i].dmNm + ' \n소속:-\n등록일자:-"><i class="la la-comment"></i></span></a></td>'
					} else if (memberList[i].uNum == null && memberList[i].dmNm != null && memberList[i].subDmNm != null && memberList[i].provideDate != null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="지급대상:부서\n부서:' + memberList[i].dmNm + ' \n소속:' + memberList[i].subDmNm + '\n등록일자:-"><i class="la la-comment"></i></span></a></td>'
					} else if (memberList[i].uNum == null && memberList[i].dmNm == null && memberList[i].subDmNm == null && memberList[i].provideDate != null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="지급대상:그룹\n부서:- \n소속:-\n등록일자:' + memberList[i].provideDate + '"><i class="la la-comment"></i></span></a></td>'
					} else {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="사번:' + memberList[i].uNum + '\n지급대상:사용자\n부서:' + memberList[i].dmNm + '\n소속:' + memberList[i].subDmNm + '\n등록일자:' + memberList[i].provideDate + '"><i class="la la-comment"></i></span></a></td>'
					}
					
					if(memberList[i].hMemo == null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="메모 없음">	<i class="la la-comment"></i></span></a></td>'
					} else {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="' + memberList[i].hMemo + '"><i class="la la-comment"></i></span></a></td>'
					}
					
					if(memberList[i].eMemo == null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="메모 없음">	<i class="la la-comment"></i></span></a></td>'
					} else {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="' + memberList[i].eMemo + '"><i class="la la-comment"></i></span></a></td>'
					}
					+ '</tr>'

					if (i == memberList.length) {
						break;
					}
                }
			} 
			
            $("#memberList").append(html);

			html = "";
            
			var firstNum;
			var endNum;

			if((memberPaging.cpageNum-1) == 0) {
				firstNum = 1;
			} else {
				firstNum = memberPaging.cpageNum-1;
			}
			
			if((memberPaging.cpageNum+1) > memberPaging.totalPageNum) {
				endNum = memberPaging.totalPageNum;
			} else {
				endNum = memberPaging.cpageNum+1
			}
			
            html = html + '<ul class="list_page">';
            html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +', 1, getStatus),0);" class="btn_tb_back"><i class="la la-angle-double-left"></i></a></li>';
            html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +','+ firstNum +', getStatus),0);" class="btn_tb_back"><i class="la la-angle-left"></i></a></li>';

            for(var j = memberPaging.startPageNum; j <= memberPaging.endPageNum; j++) {
                if(j == memberPaging.cpageNum) {
                    html = html + '<li><a href="#" class="active">' + j + '</a></li>';
                } else {
                    html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +','+ j +', getStatus),0);">' + j + '</a></li>';
                }
            }
            
            html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +','+ endNum +', getStatus),0);" class="btn_tb_next"><i class="la la-angle-right"></i></a></li>';
            html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +',' + memberPaging.totalPageNum + ', getStatus),0);" class="btn_tb_next"><i class="la la-angle-double-right"></i></a></li>';
            html = html + '</ul>'
            
            html = html + '<form name="ExcelDownForm" method="POST" onsubmit="return false">'
            html = html + '<input type="hidden" name="productCode" value="'+ productCode +'" />'
            html = html + '<input type="hidden" name="status" value="'+ getStatus +'" />'
			html = html + '<input type="hidden" name="cPageNum" value="'+ firstNum +'" />'
			html = html + '</form>'

            $("#memberPaging").append(html);

            html = "";
            
            html = html + '<span class="productCode" style="display:none">' + productCode + '</span>';
            
            if(getStatus == 3) {
            	html = html + '<option value="3" selected>전체</option>';
           		html = html + '<option value="0">지급</option>';
            	html = html + '<option value="1">미사용</option>';
            } else if (getStatus == 0) {
            	html = html + '<option value="3">전체</option>';
           		html = html + '<option value="0"selected>지급</option>';
            	html = html + '<option value="1">미사용</option>';
            } else {
            	html = html + '<option value="3">전체</option>';
           		html = html + '<option value="0">지급</option>';
            	html = html + '<option value="1" selected>미사용</option>';
            }
            
            $("#getStatus").append(html);
            
            html = "";
            html = html + '<span class="con_sch_btn02 btn_select_status"><a href="javascript:setTimeout(memberListSearch2('+ productCode +', 1, getStatus),0)"><span class="width_80 btn_blu h_30">조회</span></a></span>'
           	
           	$("#btn_select_status").append(html);
            
            showHide('popup5', 'none', 'block');
			fade('popup5');
			
        },error:function(request, error) {
  			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

  		}
	});	
}

function memberListSearch2(productCode, num, getStatus){
	var memberList = "";
	
	var getStatus = $(".getStatus option:selected").val();
	var productCode = productCode.value;
	
	// 리스트 및 페이징 값 초기화
	var cell1 = document.getElementById("memberList"); 
	var cell2 = document.getElementById("memberPaging"); 
	var cell3 = document.getElementById("getStatus"); 
	var cell4 = document.getElementById("btn_select_status");

	$.post("/ITAM/sw/SWMemberListSearch",
        {productCode : productCode, CPageNum : num, status : getStatus},
		function(data){
			var html = "";
			memberList = data.memberList;
			memberPaging = data.memberPaging;
			
			while ( cell1.hasChildNodes() ) { 
				cell1.removeChild( cell1.firstChild ); 
			}
		
			while ( cell2.hasChildNodes() ) { 
				cell2.removeChild( cell2.firstChild ); 
			}
			
			while ( cell3.hasChildNodes() ) { 
				cell3.removeChild( cell3.firstChild ); 
			}
			
			while ( cell4.hasChildNodes() ) { 
				cell4.removeChild( cell4.firstChild ); 
			}
			
			if (memberList.length == 0) {
			
				html = html
				+ '<tr><td colspan="10" class="txt_center">등록된 자산이 없습니다.</td></tr>'

			} else {
			
               	for(var i = 0; i < memberList.length; i++) {
                  	//console.log("mAssetCode : " + memberList[i].mAssetCode);
                   	html = html
                   	+ '<tr style="cursor: pointer">'
					+ '<td><input type="checkbox" id="' + memberList[i].mAssetCode + '" name="chk_sw_user" value="' + memberList[i].mAssetCode + '"><label for="' + memberList[i].mAssetCode + '"><span></span></label></td>'
					
					if(memberList[i].mProductVer == null) {
						html = html + '<td>-</td>'
					} else {
						html = html + '<td>' + memberList[i].mProductVer + '</td>'
					}
					
					if(memberList[i].mSerial == null) {
						html = html + '<td colspan="3">-</td>'
					} else {
						html = html + '<td colspan="3">' + memberList[i].mSerial + '</td>'
					}
					
					if(memberList[i].mStatus == 0) {
						html = html + '<td>지급</td>'
					} else if(memberList[i].mStatus == 1) {
						html = html + '<td>미사용</td>'
					}
					
					if(memberList[i].uName != null) {
						html = html + '<td colspan="2">' + memberList[i].uName + '</td>'
					} else if (memberList[i].dmNm != null && memberList[i].subDmNm != null) {
						html = html + '<td colspan="2">' + memberList[i].dmNm + ' ' + memberList[i].subDmNm + '</td>'
					} else if (memberList[i].dmNm != null && memberList[i].subDmNm == null) {
						html = html + '<td colspan="2">' + memberList[i].dmNm + '</td>'
					} else if (memberList[i].gName != null) {
						html = html + '<td colspan="2">' + memberList[i].gName + '</td>'
					} else {
						html = html + '<td colspan="2">-</td>'
					}
					
					if(memberList[i].uNum == null && memberList[i].dmNm == null && memberList[i].subDmNm == null && memberList[i].provideDate == null) {
						html = html + '<td>-</td>'
					} else if (memberList[i].uNum == null && memberList[i].dmNm != null && memberList[i].subDmNm == null && memberList[i].provideDate != null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="지급대상:부서\n부서:' + memberList[i].dmNm + ' \n소속:-\n등록일자:-"><i class="la la-comment"></i></span></a></td>'
					} else if (memberList[i].uNum == null && memberList[i].dmNm != null && memberList[i].subDmNm != null && memberList[i].provideDate != null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="지급대상:부서\n부서:' + memberList[i].dmNm + ' \n소속:' + memberList[i].subDmNm + '\n등록일자:-"><i class="la la-comment"></i></span></a></td>'
					} else if (memberList[i].uNum == null && memberList[i].dmNm == null && memberList[i].subDmNm == null && memberList[i].provideDate != null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="지급대상:그룹\n부서:- \n소속:-\n등록일자:' + memberList[i].provideDate + '"><i class="la la-comment"></i></span></a></td>'
					} else {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="사번:' + memberList[i].uNum + '\n지급대상:사용자\n부서:' + memberList[i].dmNm + '\n소속:' + memberList[i].subDmNm + '\n등록일자:' + memberList[i].provideDate + '"><i class="la la-comment"></i></span></a></td>'
					}
					
					if(memberList[i].hMemo == null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="메모 없음">	<i class="la la-comment"></i></span></a></td>'
					} else {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="' + memberList[i].hMemo + '"><i class="la la-comment"></i></span></a></td>'
					}
					
					if(memberList[i].eMemo == null) {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="메모 없음">	<i class="la la-comment"></i></span></a></td>'
					} else {
						html = html + '<td><a href="#"><span class="btn_action" data-tooltip-text="' + memberList[i].eMemo + '"><i class="la la-comment"></i></span></a></td>'
					}
					+ '</tr>'

					if (i == memberList.length) {
						break;
					}
                }
			} 
			
            $("#memberList").append(html);

			html = "";
            
			var firstNum;
			var endNum;

			if((memberPaging.cpageNum-1) == 0) {
				firstNum = 1;
			} else {
				firstNum = memberPaging.cpageNum-1;
			}
			
			if((memberPaging.cpageNum+1) > memberPaging.totalPageNum) {
				endNum = memberPaging.totalPageNum;
			} else {
				endNum = memberPaging.cpageNum+1
			}
			
            html = html + '<ul class="list_page">';
            html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +', 1, getStatus),0);" class="btn_tb_back"><i class="la la-angle-double-left"></i></a></li>';
            html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +','+ firstNum +', getStatus),0);" class="btn_tb_back"><i class="la la-angle-left"></i></a></li>';

            for(var j = memberPaging.startPageNum; j <= memberPaging.endPageNum; j++) {
                if(j == memberPaging.cpageNum) {
                    html = html + '<li><a href="#" class="active">' + j + '</a></li>';
                } else {
                    html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +','+ j +', getStatus),0);">' + j + '</a></li>';
                }
            }
            
            html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +','+ endNum +', getStatus),0);" class="btn_tb_next"><i class="la la-angle-right"></i></a></li>';
            html = html + '<li><a href="javascript:setTimeout(memberListSearch2('+ productCode +',' + memberPaging.totalPageNum  + ', getStatus),0);" class="btn_tb_next"><i class="la la-angle-double-right"></i></a></li>';
            html = html + '</ul>'
            
            html = html + '<form name="ExcelDownForm" method="POST" onsubmit="return false">'
            html = html + '<input type="hidden" name="productCode" value="'+ productCode +'" />'
            html = html + '<input type="hidden" name="status" value="'+ getStatus +'" />'
			html = html + '<input type="hidden" name="cPageNum" value="'+ memberPaging.cpageNum +'" />'
			html = html + '</form>'

            $("#memberPaging").append(html);
            
            html = "";
            
            html = html + '<span class="productCode" style="display:none">' + productCode + '</span>';
            
            if(getStatus == 3) {
            	html = html + '<option value="3" selected>전체</option>';
           		html = html + '<option value="0">지급</option>';
            	html = html + '<option value="1">미사용</option>';
            } else if (getStatus == 0) {
            	html = html + '<option value="3">전체</option>';
           		html = html + '<option value="0"selected>지급</option>';
            	html = html + '<option value="1">미사용</option>';
            } else {
            	html = html + '<option value="3">전체</option>';
           		html = html + '<option value="0">지급</option>';
            	html = html + '<option value="1" selected>미사용</option>';
            }
            
            $("#getStatus").append(html);
            
            html = "";
            html = html + '<span class="con_sch_btn02 btn_select_status"><a href="javascript:setTimeout(memberListSearch2('+ productCode +', 1, getStatus),0)"><span class="width_80 btn_blu h_30">조회</span></a></span>'
           	
           	$("#btn_select_status").append(html);
           	
			$(".modal-overlay").remove();
            showHide('popup5', 'none', 'block');
			fade('popup5');
		}
	);
}