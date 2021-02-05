function ipPageMove(groupId, num) {
    var query = {ipGroupId : groupId, cPageNum : num};

    $.ajax({
        type : "POST",
        url : "/ITAM/hw/getIpList",
        data : query,
        success : function(data) {
            var html = "";
            
            if(data.ip.length == 0) {
                var msg = '일시적인 오류가 발생했습니다.';
			    showMsg('IP 조회', msg);
			    return false;
             } else {
                $(".tbl_ipList tbody").empty(); 
                $(".pagenation_squar").empty();
                $("input[name=ip_status]").prop("checked", false);

                var ipSplit = data.ip[0].ipGroup.split('.');

                for(var i = 0; i < 3; i++) {
                    $("input[name=ipg"+(i+1)+"]").val(ipSplit[i]);
                }
                $("input[name=ipGroupId]").val(data.ip[0].ipGroupId);
                
                for(var i = 0; i < data.ip.length; i++) {
                    if(data.ip[i].status == "Y") {
                        html = html + "<tr class='pop_list_dis'>";
                    } else {
                        html = html + "<tr>";
                    }

                    html = html + "<td>" + data.ip[i].ipGroup + "." + data.ip[i].ip + "</td>";

                    if(data.ip[i].status == "Y") {
                        html = html + "<td>사용중</td>";
                     } else {
                        html = html + "<td>미사용</td>";
                    }

                    if(data.ip[i].assetCode == null) {
                        html = html + "<td>-</td>";
                     } else {
                        html = html + "<td>" + data.ip[i].assetCode + "</td>";
                    }

                    if(data.ip[i].uName == null) {
                        html = html + "<td>-</td>";
                     } else {
                        html = html + "<td>" + data.ip[i].uName + "</td>";
                    }

                    if(data.ip[i].dmNm == null) {
                        html = html + "<td>-</td>";
                     } else {
                        html = html + "<td>" + data.ip[i].dmNm + "</td>";
                    }

                    if(data.ip[i].gName == null) {
                        html = html + "<td>-</td>";
                     } else {
                        html = html + "<td>" + data.ip[i].gName + "</td>";
                    }
                    
                    html = html + "<td style='display:none;'>" + data.ip[i].ipId + "</td></tr>"
                }

                $(".tbl_ipList").append(html);

                html = "";
                
				var firstNum;
				var endNum;

				if((data.paging.cpageNum-1) == 0) {
					firstNum = 1;
				 } else {
					firstNum = data.paging.cpageNum-1;
				}

				if((data.paging.cpageNum+1) > data.paging.totalPageNum) {
					endNum = data.paging.totalPageNum;
				 } else {
					endNum = data.paging.cpageNum+1
				}
				
                html = html + "<ul class='list_page'>";
                html = html + "<li><a href=\"javascript:ipPageMove('" + data.ip[0].ipGroupId + "',1);\" class='btn_tb_back'><i class='la la-angle-double-left'></i></a></li>";
                html = html + "<li><a href=\"javascript:ipPageMove('" + data.ip[0].ipGroupId + "','" + firstNum + "');\" class='btn_tb_back'><i class='la la-angle-left'></i></a></li>";

                for(var i = data.paging.startPageNum; i <= data.paging.endPageNum; i++) {
                    if(i == data.paging.cpageNum) {
                        html = html + "<li><a href='#' class='active'>" + i + "</a></li>";
                     } else {
                        html = html + "<li><a href=\"javascript:ipSearchPage('" + i + "')\">" + i + "</a></li>";
                    }
                }
                
                html = html + "<li><a href=\"javascript:ipPageMove('" + data.ip[0].ipGroupId + "','" + endNum + "');\" class='btn_tb_next'><i class='la la-angle-right'></i></a></li>";
                html = html + "<li><a href=\"javascript:ipPageMove('" + data.ip[0].ipGroupId + "','" + data.paging.totalPageNum + "');\" class='btn_tb_next'><i class='la la-angle-double-right'></i></a></li>";
                html = html + "</ul>"

                $(".pagenation_squar").append(html);
            }
        }
    });
}

function ipSearchPage(num) {
    var ipGroupId = $("input[name=ipGroupId]").val()
    var ip = $("input[name=ipg4]").val();
    var status = [];

    $("input[name=ip_status]:checked").each(function(i) {
        status[i] = $(this).val();
    });

    if(status[0] == null) {
        status = null;
    }
    query = {ipGroupId : ipGroupId, ip : ip, status : status, cPageNum : num};

    $.ajax({
        type : "POST",
        url : "/ITAM/hw/searchIpList",
        traditional : true,
        data : query,
        success : function(data) {
            var html = "";
            
            if(data.ip.length == 0) {
                var msg = '일시적인 오류가 발생했습니다.';
			    showMsg('IP 조회', msg);
			    return false;
             } else {
                $(".tbl_ipList tbody").empty(); 
                $(".pagenation_squar").empty();

                for(var i = 0; i < data.ip.length; i++) {
                    if(data.ip[i].status == "Y") {
                        html = html + "<tr class='pop_list_dis'>";
                     } else {
                        html = html + "<tr>";
                    }

                    html = html + "<td>" + data.ip[i].ipGroup + "." + data.ip[i].ip + "</td>";

                    if(data.ip[i].status == "Y") {
                        html = html + "<td>사용중</td>";
                     } else {
                        html = html + "<td>미사용</td>";
                    }

                    if(data.ip[i].assetCode == null) {
                        html = html + "<td>-</td>";
                     } else {
                        html = html + "<td>" + data.ip[i].assetCode + "</td>";
                    }

                    if(data.ip[i].uName == null) {
                        html = html + "<td>-</td>";
                     } else {
                        html = html + "<td>" + data.ip[i].uName + "</td>";
                    }

                    if(data.ip[i].dmNm == null) {
                        html = html + "<td>-</td>";
                     } else {
                        html = html + "<td>" + data.ip[i].dmNm + "</td>";
                    }

                    if(data.ip[i].gName == null) {
                        html = html + "<td>-</td>";
                     } else {
                        html = html + "<td>" + data.ip[i].gName + "</td>";
                    }
                    
                    html = html + "<td style='display:none;'>" + data.ip[i].ipId + "</td></tr>"
                }

                $(".tbl_ipList").append(html);

                html = "";
                
				var firstNum;
				var endNum;

				if((data.paging.cpageNum-1) == 0) {
					firstNum = 1;
				 } else {
					firstNum = data.paging.cpageNum-1;
				}

				if((data.paging.cpageNum+1) > data.paging.totalPageNum) {
					endNum = data.paging.totalPageNum;
				 } else {
					endNum = data.paging.cpageNum+1
				}

                html = html + "<ul class='list_page'>";
                html = html + "<li><a href=\"javascript:ipSearchPage(1);\" class='btn_tb_back'><i class='la la-angle-double-left'></i></a></li>";
                html = html + "<li><a href=\"javascript:ipSearchPage('" + firstNum + "');\" class='btn_tb_back'><i class='la la-angle-left'></i></a></li>";
                
                for(var i = data.paging.startPageNum; i <= data.paging.endPageNum; i++) {
					if(i == data.paging.cpageNum) {
						html = html + "<li><a href='#' class='active'>" + i + "</a></li>";
					} else {
						html = html + "<li><a href=\"javascript:ipSearchPage('" + i + "')\">" + i + "</a></li>";
                    }
                }
                
                html = html + "<li><a href=\"javascript:ipSearchPage('" + endNum + "');\" class='btn_tb_next'><i class='la la-angle-right'></i></a></li>";
                html = html + "<li><a href=\"javascript:ipSearchPage('" + data.paging.totalPageNum + "');\" class='btn_tb_next'><i class='la la-angle-double-right'></i></a></li>";
                html = html + "</ul>"

                $(".pagenation_squar").append(html);
            }
        }
    });
}

$(function() {
	// 'IP 조회' 버튼 클릭 시
	$(".btn_select_ip").click(function(e) {
		e.preventDefault();
		
		$.ajax({
            type : "POST",
            url : "/ITAM/hw/getIpGlist",
            success : function(data) {
                var html = "";
                
                $(".tbl_ipGroup tbody").empty();

                if(data.ipGroup.length == 0) {
					var msg = 'IP 대역대가 존재하지 않습니다.<br/>IP 대역대 등록 후 다시 시도해주세요.';
				    showMsg('IP 대역 선택', msg);
				    return false;
                } else {
                    for(var i = 0; i < data.ipGroup.length; i++) {
                        html = html + "<tr><td>" + data.ipGroup[i].ipGroup + "</td>";
                        
                        if(data.ipGroup[i].purpose == null || data.ipGroup[i].purpose == ""){
                        	html = html + "<td> - </td>";
                        }else{
                        	html = html + "<td>" + data.ipGroup[i].purpose + "</td>";
                        }
                        
		                html = html + "<td style='display:none;'>" + data.ipGroup[i].ipGroupId + "</td></tr>"
                    }
                    
                    $(".tbl_ipGroup tbody").append(html);
                    
                    fade('popup8');
                }
            }
        });
	});
	
	// 'IP 대역 선택' 레이어의 row 클릭 시 (ip address 선택)
	$(document).on('click', '.tbl_ipGroup tbody tr', function() {
		var tr = $(".tbl_ipGroup tbody tr").index(this);
		var ip_group = $(".tbl_ipGroup tbody tr:eq(" + tr + ") td:eq(2)").text();
	
		var query = {ipGroupId : ip_group, cPageNum : 1};

		 $.ajax({
	        type : "POST",
	        url : "/ITAM/hw/getIpList",
	        data : query,
	        success : function(data) {
	        	
	        	fadeClose();
	        	
	            var html = "";
	
	            if(data.ip.length == 0) {
	                var msg = '일시적인 오류가 발생했습니다.';
				    showMsg('IP 조회', msg);
				    return false;
	            } else {
	                $(".tbl_ipList tbody").empty(); 
	                $(".pagenation_squar").empty();
	                $("input[name=ip_status]").prop("checked", false);
	
	                var ipSplit = data.ip[0].ipGroup.split('.');
	
	                for(var i = 0; i < 3; i++) {
	                    $("input[name=ipg" + (i + 1) + "]").val(ipSplit[i]);
	                }
	                
	                $("input[name=ipGroupId]").val(data.ip[0].ipGroupId);
	
	                for(var i = 0; i < data.ip.length; i++) {
	                    if(data.ip[i].status == "Y") {
	                        html = html + "<tr class='pop_list_dis'>";
	                    } else {
	                        html = html + "<tr>";
	                    }
	
	                    html = html + "<td>" + data.ip[i].ipGroup + "." + data.ip[i].ip + "</td>";
	
	                    if(data.ip[i].status == "Y") {
	                        html = html + "<td>사용중</td>";
	                    } else {
	                        html = html + "<td>미사용</td>";
	                    }
	
	                    if(data.ip[i].assetCode == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].assetCode + "</td>";
	                    }
	
	                    if(data.ip[i].uName == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].uName + "</td>";
	                    }
	                    
	                   if(data.ip[i].uNum == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].uNum + "</td>";
	                    }
	
	                    if(data.ip[i].dmNm == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].dmNm + "</td>";
	                    }
	
	                    if(data.ip[i].gName == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].gName + "</td>";
	                    }
		
	                    html = html + "<td style='display:none;'>" + data.ip[i].ipId + "</td></tr>"
	                }
	
	                $(".tbl_ipList tbody").append(html);
	                
	                // 페이징
	                html = "";
	                
					var firstNum;
					var endNum;
	
					if((data.paging.cpageNum-1) == 0) {
						firstNum = 1;
					} else {
						firstNum = data.paging.cpageNum-1;
					}
	
					if((data.paging.cpageNum+1) > data.paging.totalPageNum) {
						endNum = data.paging.totalPageNum;
					} else {
						endNum = data.paging.cpageNum+1
					}
					
	                html = html + "<ul class='list_page'>";
	                html = html + "<li><a href=\"javascript:ipPageMove('" + data.ip[0].ipGroupId + "', 1);\" class='btn_tb_back'><i class='la la-angle-double-left'></i></a></li>";
	                html = html + "<li><a href=\"javascript:ipPageMove('" + data.ip[0].ipGroupId + "', '" + firstNum + "');\" class='btn_tb_back'><i class='la la-angle-left'></i></a></li>";
	
	                for(var i = data.paging.startPageNum; i <= data.paging.endPageNum; i++) {
	                    if(i == data.paging.cpageNum) {
	                        html = html + "<li><a href='#' class='active'>" + i + "</a></li>";
	                    } else {
	                        html = html + "<li><a href=\"javascript:ipSearchPage('" + i + "')\">" + i + "</a></li>";
	                    }
	                }
	                
	                html = html + "<li><a href=\"javascript:ipPageMove('" + data.ip[0].ipGroupId + "', '" + endNum + "');\" class='btn_tb_next'><i class='la la-angle-right'></i></a></li>";
	                html = html + "<li><a href=\"javascript:ipPageMove('" + data.ip[0].ipGroupId + "', '" + data.paging.totalPageNum + "');\" class='btn_tb_next'><i class='la la-angle-double-right'></i></a></li>";
	                html = html + "</ul>"
	
	                $(".pagenation_squar").append(html);
	                
	                fade('popup9');
	            }
	        }
	    });
	});
	
	// 'IP 선택' 레이어의 '조회' 버튼 클릭 시
	$(".btn_sch_ipg").click(function(e) {
		e.preventDefault();
		
		var ip_groupId = $("input[name=ipGroupId]").val();
	    var ip = $("input[name=ipg4]").val();
	    
	    var status = [];
	
		$("input[name=ip_status]:checked").each(function(i) {
	        status[i] = $(this).val();
	    });
	
	    if(status[0] == null) {
	        status = null;
	    }
	
	   query = {ipGroupId : ip_groupId, ip : ip, status : status, cPageNum : 1};
	   
	   $.ajax({
	        type : "POST",
	        url : "/ITAM/hw/searchIpList",
	        traditional : true,
	        data : query,
	        success : function(data) {
	            var html = "";
	            console.log(data)
	            if(data.ip.length == 0) {
					var msg = '일시적인 오류가 발생했습니다. 다시 시도해주세요.';
				    showMsg('IP 조회', msg);
				    return false;
	            } else {
	                $(".tbl_ipList tbody").empty(); 
	                $(".pagenation_squar").empty();
	                
	                for(var i = 0; i < data.ip.length; i++) {
	                    if(data.ip[i].status == "Y") {
	                        html = html + "<tr class='pop_list_dis'>";
	                    } else {
	                        html = html + "<tr>";
	                    }
	
	                    html = html + "<td>" + data.ip[i].ipGroup + "." + data.ip[i].ip + "</td>";
	
	                    if(data.ip[i].status == "Y") {
	                        html = html + "<td>사용중</td>";
	                    } else {
	                        html = html + "<td>미사용</td>";
	                    }
	
	                    if(data.ip[i].assetCode == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].assetCode + "</td>";
	                    }
	
	                    if(data.ip[i].uName == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].uName + "</td>";
	                    }
	
	                    if(data.ip[i].dmNm == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].dmNm + "</td>";
	                    }
	
	                    if(data.ip[i].gName == null) {
	                        html = html + "<td>-</td>";
	                    } else {
	                        html = html + "<td>" + data.ip[i].gName + "</td>";
	                    }
		
	                    html = html + "<td style='display:none;'>" + data.ip[i].ipId + "</td></tr>"
	                }
	
	                $(".tbl_ipList").append(html);
	
	                html = "";
	                
					var firstNum;
					var endNum;
	
					if((data.paging.cpageNum-1) == 0) {
						firstNum = 1;
					} else {
						firstNum = data.paging.cpageNum-1;
					}
	
					if((data.paging.cpageNum+1) > data.paging.totalPageNum) {
						endNum = data.paging.totalPageNum;
					} else {
						endNum = data.paging.cpageNum+1
					}
	
	                html = html + "<ul class='list_page'>";
	                html = html + "<li><a href=\"javascript:ipSearchPage(1);\" class='btn_tb_back'><i class='la la-angle-double-left'></i></a></li>";
	                html = html + "<li><a href=\"javascript:ipSearchPage('" + firstNum + "');\" class='btn_tb_back'><i class='la la-angle-left'></i></a></li>";
	                
	                for(var i = data.paging.startPageNum; i <= data.paging.endPageNum; i++) {
	                    if(i == data.paging.cpageNum) {
							html = html + "<li><a href='#' class='active'>" + i + "</a></li>";
	                    } else {
							html = html + "<li><a href=\"javascript:ipSearchPage('" + i + "')\">" + i + "</a></li>";
	                    }
	                }
	                
	                html = html + "<li><a href=\"javascript:ipSearchPage('" + endNum + "');\" class='btn_tb_next'><i class='la la-angle-right'></i></a></li>";
	                html = html + "<li><a href=\"javascript:ipSearchPage('" + data.paging.totalPageNum + "');\" class='btn_tb_next'><i class='la la-angle-double-right'></i></a></li>";
	                html = html + "</ul>"
	
	                $(".pagenation_squar").append(html);
	            }
	        } 
	    });
	});
	
	// 'IP 선택' 레이어에서 IP 선택 시 지급 화면 내 IP 자동 입력.
	$(document).on('click', '.tbl_ipList tr',function() {
	    var tr = $(".tbl_ipList tr").index(this);
	    var ip = $(".tbl_ipList tr:eq(" + tr + ") td:eq(0)").text();
	
	    if($(".tbl_ipList tr:eq(" + tr + ")").attr("class") == 'pop_list_dis') {
			alert("이미 사용중인 IP입니다.");
			return;
	    }
	    
	    var ipId = $(".tbl_ipList tr:eq(" + tr + ") td:eq(7)").text();
	
	    $(".use_ip").val(ip);
	    $(".ip_id").val(ipId);
	
	    fadeClose();
	});
});