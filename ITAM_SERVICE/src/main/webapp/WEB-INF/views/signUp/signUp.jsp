<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>

<!doctype html>
<html lang="ko">
<head>
	<title>ITAM 자산관리</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<link type="text/css" rel="stylesheet" href="/ITAM/resources/css/demo.css" />
	<link type="text/css" rel="stylesheet" href="/ITAM/resources/css/itam.css" />
	
	<script type="text/javascript" src="/ITAM/resources/js/jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery-nav.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery-autoclear.min.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery-select.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery.tablesorter.min.js"></script>

	<script type="text/javascript" src="/ITAM/resources/js/common.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/accodion.js"></script>
	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	
	<script type="text/javascript">
	
		$(function() {
			$('#loading').hide();
			var pattern = /^[a-zA-Z0-9]{8,10}$/;
			
			$('.regMemo').keyup(function() {
		    	checkInputData(500, "regMemo");
		        $('.regMemoCnt').html(bCheck + '/500자');
		    });
		    
			/* 신청하기 */
			$(".signUpReqBtn").click(function(e) {
				e.preventDefault();	 	 
				
				var cpId = document.getElementById("cpId").value;									//아이디
				var cpIdCheckResult = document.getElementById("cpIdCheckResult").innerHTML;			//아이디 검사 결과
				var cpName = document.getElementById("cpName").value;								//회사명
				var cpCeo = document.getElementById("cpCeo").value;									//대표자
				var cpRegNum = document.getElementById("cpRegNum").value;							//사업자등록번호
				var zipCode = document.getElementById("sample2_postcode").value;					//회사주소(우편번호)
				var addr1 = document.getElementById("sample2_address").value;						//회사주소(주소)
				var addr2 = document.getElementById("sample2_detailAddress").value; 				//회사주소(상세주소)
				var addr3 = document.getElementById("sample2_extraAddress").value; 					//회사주소(참고주소)
				var psName = document.getElementById("psName").value;								//담당자이름
				var phNum = document.getElementById("phNum").value;									//연락처
				var emailAddr1 = document.getElementById("emailAddr1").value;						//이메일 주소1
				var emailAddr2 = document.getElementById("emailAddr2").value;						//이메일 주소2
				var pwd = document.getElementById("pwd").value;										//비밀번호
				var chkPwd = document.getElementById("chkPwd").value;								//비밀번호 확인
				var chk1 = document.getElementById("chk1").checked;									//
		        var chk2 = document.getElementById("chk2").checked;									//
		        
		       	if(!chk1){
					alert("서비스 이용약관에 동의해주세요.");
				} else if(!chk2){
					alert("개인정보 수집 및 이용동의에 동의해주세요.");
				} else if(cpId == ""){
					alert("아이디를 입력해 주세요.");
				} else if(cpIdCheckResult != "사용가능한 아이디 입니다."){
					alert("입력하신 아이디는 사용불가 합니다.");
				} else if(cpIdCheckResult == "아이디를 입력해주세요."){
					alert("아이디 중복 체크를 해주세요.");
				} else if (pwd != chkPwd) {
					alert("비밀번호를 확인해주세요.");
				} else if (cpName == "") {
					alert("회사명을 입력해 주세요.");
				} else if (cpCeo == "") {
					alert("대표자명을 입력해 주세요.");
				} else if (cpRegNum == "") {
					alert("사업자등록번호를 입력해주세요.");
				} else if (zipCode == "") {
					alert("우편번호를 입력해주세요.");
				} else if (addr1 == "") {
					alert("주소를 입력해주세요.");
				} else if (addr2 == "") {
					alert("상세주소를 입력해주세요.");
				} else if (psName == "") {
					alert("담당자명을 입력해주세요.");
				} else if (phNum == "") {
					alert("연락처를 입력해주세요.");
				} else if (emailAddr1 == "" || emailAddr2 == "") {
					alert("이메일을 입력해주세요.");
				} else {
					var signUpReq = new FormData($("#signUpReq")[0]); 
					signUpReq.append("addr1", addr1);
					signUpReq.append("addr2", addr2+addr3);
					signUpReq.append("email", emailAddr1+'@'+emailAddr2);
					
					$('#loading').show();
					
					$.ajax({
						url : "/ITAM/signUpRequest",
						enctype : "multipart/form-data",
						processData: false,
						contentType: false,
						type : "POST",
						data : signUpReq,
						dataType : "text",
						success : function(data) {
		 	                if(data=="Success") {
		 	                	$('#loading').hide();
		 	                	window.location ="/ITAM/signUpComplete"
		 	                } else if (data=="File didn't existelse") {
		 	                	$('#loading').hide();
		 	                	alert('사업자등록증을 등록해주세요.');
				 	        } else {
		 	                	$('#loading').hide();
			 	                alert('신청에 실패하였습니다. 관리자에게 문의해주세요.');
								return;
		 	                }
		 	            }
					});
				}
		 	});
			/* 아이디 중복 체크 */
			$(".cpIdCheck").click(function(e) {
				e.preventDefault();	 	 

				var cpId = document.getElementById("cpId").value;		
				
				if (!pattern.test(cpId)) {
					alert("8~10 자리 영문 숫자 조합으로 아이디를 입력해 주세요.");
				} else if (cpId == "") {
					alert("아이디를 입력해주세요.");
				} else {
					var formData = new FormData();
					formData.append("cpId", cpId);
					
					$('#loading').show();
					
					$.ajax({
						url : "/ITAM/cpIdCheck",
						enctype : "multipart/form-data",
						processData: false,
						contentType: false,
						type : "POST",
						data : formData,
						dataType : "text",
						success : function(data) {
		 	                if(data=="Success") {
		 	                	$('#loading').hide();
		 	                	document.getElementById("cpIdCheckResult").innerHTML = "사용가능한 아이디 입니다.";
		 	                } else {
		 	                	$('#loading').hide();
		 	                	document.getElementById("cpIdCheckResult").innerHTML = "입력하신 아이디는 사용불가 합니다.";
		 	                	document.getElementById("cpId").value = "";
		 	                	document.getElementById("cpId").focus();
		 	                }
		 	            }
					});
				}
		 	});
		});
		
		/* 이메일 선택 */
		function selectEmail(){
	        if (document.getElementById("e-adress").value == '' || document.getElementById("e-adress").value == '1') {
	        	document.getElementById("emailAddr2").readOnly = false;
	        	document.getElementById("emailAddr2").value = '';
	        	document.getElementById("emailAddr2").focus();
	        }
	        else {
	        	document.getElementById("emailAddr2").readOnly = true;
	        	document.getElementById("emailAddr2").value = document.getElementById("e-adress").value;
	        }
	    }
	    
	    /* 우편번호 찾기 */
	    function closeDaumPostcode() {
	        // iframe을 넣은 element를 안보이게 한다.
	        document.getElementById('layer_popup').style.display = 'none';
	    }
	
	    function sample2_execDaumPostcode() {
	        new daum.Postcode({
	            oncomplete: function(data) {
	                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
	                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var addr = ''; // 주소 변수
	                var extraAddr = ''; // 참고항목 변수
	
	                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                    addr = data.roadAddress;
	                } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                    addr = data.jibunAddress;
	                }
	
	                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
	                if(data.userSelectedType === 'R') {
	                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
	                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
	                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
	                        extraAddr += data.bname;
	                    }
	                    
	                    // 건물명이 있고, 공동주택일 경우 추가한다.
	                    if(data.buildingName !== '' && data.apartment === 'Y') {
	                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                    }
	                    
	                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
	                    if(extraAddr !== '') {
	                        extraAddr = ' (' + extraAddr + ')';
	                    }
	                    
	                    // 조합된 참고항목을 해당 필드에 넣는다.
	                    document.getElementById("sample2_extraAddress").value = extraAddr;
	                } else {
	                    document.getElementById("sample2_extraAddress").value = '';
	                }
	
	                // 우편번호와 주소 정보를 해당 필드에 넣는다.
	                document.getElementById('sample2_postcode').value = data.zonecode;
	                document.getElementById("sample2_address").value = addr;
	                
	                // 커서를 상세주소 필드로 이동한다.
	                document.getElementById("sample2_detailAddress").focus();
	
	                // iframe을 넣은 element를 안보이게 한다.
	                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
	                document.getElementById('layer_popup').style.display = 'none';
	            },
	            width : '100%',
	            height : '100%',
	            maxSuggestItems : 5
	        }).embed(document.getElementById('layer_popup'));
	
	        // iframe을 넣은 element를 보이게 한다.
	        document.getElementById('layer_popup').style.display = 'block';
	
	        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
	        initLayerPosition();
	    }
	
	    // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
	    // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
	    // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
	    function initLayerPosition() {
	        var width = 300; //우편번호서비스가 들어갈 element의 width
	        var height = 400; //우편번호서비스가 들어갈 element의 height
	        var borderWidth = 5; //샘플에서 사용하는 border의 두께
	
	        // 위에서 선언한 값들을 실제 element에 넣는다.
	        document.getElementById('layer_popup').style.width = width + 'px';
	        document.getElementById('layer_popup').style.height = height + 'px';
	        document.getElementById('layer_popup').style.border = borderWidth + 'px solid';
	        
	        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
	        document.getElementById('layer_popup').style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
	        document.getElementById('layer_popup').style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
	    }
    </script>
</head>

<body>
	<div id="loading">
		<img id="loading-image" src="/ITAM/resources/images/loading.gif" alt="Loading..." />
	</div>
	<div class="wrap">
	    <div class="header_wrap">
	        <div class="con_wrap">
	            <div class="contents_box">
	                <div class="register_box">
	                    <div class="top_tit">IT 자산관리 서비스 신청</div>
	                    <div class="input_area">
	                        <div class="regis_input_box02">
	                            <div class="input_tit">약관동의</div>
	                            <div class="input_wrap">
	                                <div class="agr_tit">서비스 이용약관</div>
	                                <div class="agr_box">
	                                    <div class="sub_text">
	                                        <span class="agree_content">
	                                        	<span>본 약관에 동의하는 경우 ‘서비스 이용약관 및 이메일 수신에 동의합니다’ 에 체크하십시오. </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제1조(약관의 효력)</span></span>
	                                        <span class="agree_content">
	                                            <span class="frt_top">
	                                                <ul class="num_txt_box">
	                                                    <li><span class="frt_num">1.</span>본 약관은 고객이 ㈜드림시큐리티가 제공하는 IT자산관리서비스(이하 ‘서비스’)에 서비스 신청을 완료하면 효력이 발생합니다.</li>
	                                                    <li><span class="frt_num">2.</span>고객이 대리인(가족, 고용인을 포함하되, 이에 한하지 않음)을 통하여 약관에 동의하고 가입신청 하는 경우에도 대리인은 계약상, 법률상 고객을 대리할 정당한 권한을 보유하였음을 보증하고, 고객은 약관에 동의하고 준수할 것임을 보증합니다.</li>
	                                                    <li><span class="frt_num">3.</span>고객이 약관에 동의하는 것은 고객의 고용인들과 지점, 관계사, 협력사, 거래처 등 고객으로 인해 본 서비스를 이용하는 모든 사용자로 하여금 본 약관을 준수하게 할 책임이 있다는 것을 의미합니다.</li>
	                                                </ul>
	                                            </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제2조(약관의 변경)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>서비스는 약관을 수시로 변경할 수 있으며, 웹 사이트에 게재한 때로부터 변경된 약관이 적용됩니다.</li>
		                                                <li><span class="frt_num">2.</span>고객은 서비스를 계속 이용함으로써 변경된 약관에 동의하는 것으로 간주합니다. 다만, 고객에게 현저히 불리하게 변경된 약관의 내용은 고객에게 전자쪽지 등의 전자적 수단으로 개별 통지하며, 통지한 날로부터 3일 이내에 고객이 이의를 제기하지 않거나 통지한 이후에도 서비스를 계속 이용하면 상기 기간이 도과한 때 또는 계속 이용한 때부터 변경된 약관에 동의한 것으로 간주합니다.</li>
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제3조(Free Trial(무료체험 90일))</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>고객이 Free Trial 을 신청하는 경우에도 본 약관은 동일하게 적용되며, 기술상 정책상 일부 기능이 제한될 수 있습니다.</li>
		                                                <li><span class="frt_num">2.</span>서비스는 Free Trial 일체에 대한 서비스 제공을 언제든지 중단할 수 있습니다.</li>
		                                                <li><span class="frt_num">3.</span>고객이 Free Trial 사용 기간 종료 시점에 유료 고객으로 전환하지 않을 경우, 서비스는 고객에게 Free Trial 서비스를 더 이상 제공하지 않습니다. 또한, 고객은 Free Trial 기간 중 입력한 데이터 및 생성한 설정 일체에 접속하거나 회수, 재사용할 수 없습니다.</li>
		                                                <li><span class="frt_num">4.</span>데이터와 설정을 계속 사용하고자 한다면 Free Trial 기간이 종료되기 전에 유료 고객으로 전환하여야 합니다.</li>
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제4조(서비스)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>서비스가 운용하는 인터넷 상의 서비스 웹사이트를 기반으로 제공되며, 또한 공중망(인터넷을 통한 네트워크 서비스)을 통해서만 제공합니다.</li>
		                                                <li><span class="frt_num">2.</span>서비스는 특정 인터넷 브라우저와 버전을 기준으로 제공되며 브라우저와 버전은 기술 상 필요에 따라 변경될 수 있습니다. 기준 외의 브라우저나 버전에서는 서비스의 일부 또는 전체가 구동하지 않을 수 있습니다.</li>
		                                                <li><span class="frt_num">3.</span>서비스는 기술적 정책적 판단에 의해 언제든지 서비스를 수정(신규 기능과 절차의 추가, 기존 기능과 절차의 변경과 삭제를 포함하되, 이에 한하지 않음)할 수 있습니다. 다만, 서비스의 중요한 수정이라고 판단할 경우, 서비스 웹사이트 메인화면에 수정 내역을 게시함으로써 고객에게 공지할 수 있습니다.</li>
		                                                <li><span class="frt_num">4.</span>서비스의 수정은 정기적 또는 비정기적으로 발생할 수 있습니다.</li>
		                                                <li><span class="frt_num">5.</span>고객은 고객에게 필요한 기능과 절차에 대해 언제라도 서비스에 제안하거나 아이디어를 제공할 수 있으나, 서비스는 고객들의 해당 기능 개발 요청 빈도, 개발의 가능성, 방향성, 그리고 적합성 등을 기준으로 개발여부를 재량으로 판단합니다.</li>
		                                                <li><span class="frt_num">6.</span>서비스는 법률, 재무, 회계, 세무 또는 기타 전문 영역에 관한 자문을 제공하지 않습니다. 상기 종류의 도움이 필요할 경우 고객은 해당 전문가를 통해 자문을 구해야 합니다. 고객이 서비스로부터 어떠한 방법, 절차, 경위를 통하여서 자문을 얻었다고 하더라도, 서비스는 고객이 취득한 자문의 진실성, 합법성, 적합성 등에 대해 어떠한 책임도 부담하지 않습니다.</li>
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제5조(PC 기기에서의 서비스 사용)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>서비스는 인터넷을 통해 사용하는 호환성 있는 PC 기기에서 사용이 가능합니다. 고객은 고객의 PC 기기 및 통신사의 약관 조항과 일반 사용법, 서비스의 업데이트 등 모든 변경 사항에 대해 스스로 책임을 집니다.</li>
		                                                <li><span class="frt_num">2.</span>서비스의 귀책 사유가 없는 서비스 장애 상황 등(다음 사항을 포함하되, 이에 한하지 않음)에 대해 어떠한 책임도 지지 않습니다. • 고객 통신서비스 제공사의 서비스 제공 가능 여부
		                                                    <ul>    
		                                                        <li><span class="frt_num">·</span>시간 및 장소를 불문한 서비스 접속 가능 여부</li>
		                                                        <li><span class="frt_num">·</span>통신서비스 관련 서비스 일체의 누락, 손상 또는 보안 침해</li>
		                                                        <li><span class="frt_num">·</span>데이터 정보 전송 실패 또는 서비스 연결 설정 실패</li>
		                                                        <li><span class="frt_num">·</span>제 3자의 정보 누설</li>
		                                                    </ul>
		                                                </li>
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제6조(데이터 보호 및 관리)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>데이터란 고객이 입력하여 물리적인 서버 내에 저장된 자료(기초자료, 입력전표, 게시글, 소프트웨어, 음악, 소리, 사진, 그래픽, 비디오, 메시지를 포함하되, 이에 한하지 않음) 및 그 자료들의 결합, 변형 또는 재연산을 통해 생성되는 부가 자료 일체를 말하며, 고객이 제공, 노출하였거나 서비스에 의해 파악된 고객의 자료(고객 자신, 서비스 사용 경험, 고객의 비즈니스, 기타)를 포함합니다.</li>
		                                                <li><span class="frt_num">2.</span>서비스는 고객 데이터를 보호하며 고객 데이터에 대한 허락 받지 않은 접근을 방지하기 위해 최소 업계 표준 시스템 및 절차를 구현했습니다.</li> 
		                                                <li><span class="frt_num">3.</span>고객의 데이터는 서비스 또는 서비스 대리인이 시설을 유지 관리하는 지역 또는 국가에 저장하고 연산 처리할 수 있습니다.</li> 
		                                                <li><span class="frt_num">4.</span>서비스는 해당 국가 수사기관의 영장, 법원의 판결 또는 결정 또는 정당한 법률에 의거한 경우에는 고객의 데이터를 요청기관에 고객에 대한 사전 통지 없이 제공하거나 공개할 수 있습니다.</li> 
		                                                <li><span class="frt_num">5.</span>서비스가 제공하는 데이터 삭제 기능을 통해 고객이 데이터를 삭제하면 일반적으로 데이터는 모두 삭제되지만, 서비스가 백업 서버 등에 보관한 백업본에는 데이터가 남아있을 수 있습니다. 이 백업본 데이터는 서비스 자체의 백업본 데이터 운용정책에 따라 일정 기간(통상 영업일 기준 7일 정도이나, 항상 그렇지는 않음)이 경과한 후 자동적으로 소멸됩니다.</li> 
		                                                <li><span class="frt_num">6.</span>데이터가 유실된 경우 • 저장된 전체 고객의 데이터 중 어느 고객의 데이터가 덜 중요한지, 또는 특정 고객의 데이터 중에서도 어떤 데이터가 더 중요한지 서비스는 알 수 없습니다.
		                                                    <br/>서비스는 저장된 데이터의 중요성 또는 우선순위에 관계없이 모든 고객 데이터에 대해 동일한 수준의 주의와 절차로써 관리합니다.
		                                                    <ul>    
		                                                        <li><span class="frt_num">·</span>통상적인 서비스 유지 활동의 일환으로 기능 업그레이드, 시스템 점검 및 교체, 데이터 마이그레이션, 기타 일상적인 서비스 제공과 관련한 행위 도중에, 비록 서비스의 귀책사유로 데이터의 유실 또는 변형이 발생하였다 하더라도 서비스는 고객 입장에서의 데이터의 중요성 또는 우선순위에 관계없이 최근 12개월 동안 고객이 서비스에 지불한 금액보다 더 많은 배상금액을 지불하지 않습니다.</li>
		                                                        <li><span class="frt_num">·</span>고객의 실수나 관리소홀로 인해 분실되거나 복구 불가능한 데이터 일체에 대한 책임은 고객에게 있습니다.</li>
		                                                    </ul>
		                                                </li> 
		                                                <li><span class="frt_num">7.</span>서비스의 오류 가능성 • 컴퓨터 소프트웨어는 사람의 손으로 이루어지는 프로그램 코딩의 결과물이라는 특성으로 인하여 오류 가능성이 존재하고, 서비스가 제공하는 서비스도 입력, 저장, 계산처리, 출력 등에서 오류가 발생할 가능성을 포함하고 있습니다.
		                                                    <ul>    
		                                                        <li><span class="frt_num">·</span>고객이 상기와 같은 입력, 저장, 계산처리, 출력 등에서 발생한 오류을 인지하게 된 경우, 서비스에게 이를 즉시 통지하고, 오류를 인지하거나 통지 받은 서비스는 오류를 시정하도록 최선을 다할 것입니다. </li>
		                                                        <li><span class="frt_num">·</span>만에 하나, 상기와 같은 입력, 저장, 계산처리, 출력 등에서 발생한 오류를 서비스가 인지하거나 통지 받지 못 한 상황에서, 또는 인지하거나 통지 받았다고 하더라도 오류의 시정 절차 중에 있거나 시정 우선순위에 밀려서 미처 시정되지 않은 상황에서, 해당 오류로 인해 고객에 손해가 발생했을 때, 서비스는 최근 12개월 동안 고객이 서비스에 지불한 금액 한도 내에서 고객에게 발생한 손해를 배상 할 수 있습니다. 또한 고객이 오류를 인지하였음에도 이를 즉시 서비스에게 통지 하지 않은 경우, 서비스는 손해배상 책임을 부담하지 않습니다.</li>
		                                                    </ul>
		                                                </li> 
		                                                <li><span class="frt_num">8.</span>고객은 다음 사항에 포함되는 데이터를 업로드, 게시, 배포, 링크, 출판, 재생산 또는 전송하지 않을 것이며, 제 3자에게 이를 허용하지 않을 것임을 동의하며, 다음 사항의 데이터가 게재될 경우 서비스는 판단에 따라 해당 데이터를 즉시 삭제할 수 있습니다. • 불법, 사기, 명예 훼손, 외설, 포르노, 비속어, 협박, 증오, 희롱, 모욕 및 부적절하거나 불쾌한 정보 또는 통신 일체를 포함하며, 꼭 언급한 내용이 아니더라도 타인을 격분하게 만들 수 있는 내용 일체 및 법적 형사 또는 민사책임이 적용되는 내용 일체
		                                                    <ul>    
		                                                        <li><span class="frt_num">·</span>타인을 사칭하거나 고객의 신분 또는 자격을 거짓 증명하는 내용 및 개인 사생활 일체를 침해할 수 있는 내용</li>
		                                                        <li><span class="frt_num">·</span>호객 행위, 투자 기회, 다단계 판매, 단체 문자(SMS), 스팸메일 등 제 3자가 원치 않는 상업적 자료</li>
		                                                        <li><span class="frt_num">·</span>바이러스, 트로이 목마, 웜 또는 기타 파괴성 있는 악성 소프트웨어와 자료</li>
		                                                        <li><span class="frt_num">·</span>고객이 법적인 권리를 지니지 않거나 저작권자 또는 지적재산권자의 허가를 받지 않은 정보 및 소프트웨어 일체</li>
		                                                        <li><span class="frt_num">·</span>기타 데이터 작성의 취지와 내용 등에 비추어 삭제하는 것이 객관적으로 적절한 데이터</li>
		                                                    </ul>
		                                                </li>  
		                                                <li><span class="frt_num">9.</span>서비스는 서비스와 고객을 보호하거나 서비스를 정상적으로 운영하기 위해 데이터 일체를 감시 또는 수집할 수 있습니다.</li> 
		                                                <li><span class="frt_num">10.</span>서비스는 자사 재량에 의해 허용되지 않거나 바람직하지 않은 데이터, 또는 부적절하거나 본 약관을 위반하는 데이터 일체의 게시 및 저장을 거부하거나 삭제, 또는 삭제를 거부할 수 있습니다.</li>                                               
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제7조(서비스의 데이터 활용)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>서비스가 서비스 홍보나 서비스 개선을 위하여 데이터를 활용하는 것에 대해 고객은 동의합니다.</li>
		                                                <li><span class="frt_num">2.</span>서비스는 고객에게 서비스의 다른 부가서비스, 제품 또는 광고를 제공할 수 있으며, 이때 다른 서비스의 종류에 따라서 추가적인 약관 및 요금이 적용될 수 있습니다.</li>
		                                                <li><span class="frt_num">3.</span>서비스는 서비스 사용에 도움을 줄 수 있는 부가 서비스 또는 제 3자 제품에 관한 내용을 고객에게 전달할 수 있습니다. 고객은 서비스가 상기 내용들을 이메일로 전송하거나 서비스 웹사이트에 게시하는 것에 동의합니다.</li>
		                                                <li><span class="frt_num">4.</span>데이터 중에서도 고객이 작성한 서비스에 대한 제안사항, 상담문의내역 및 상담요청 시 수집된 고객정보, 업그레이드 아이디어 등은, 서비스가 서비스 개선을 위해 어떠한 형태로든 자유롭게 사용(서비스 개선 아이디어 및 광고 마케팅 자료 활용 등을 포함하며, 이에 한하지 않음)할 수 있으며, 서비스는 고객이 제공한 제안사항, 상담문의내역 및 상담요청 시 수집된 고객정보, 업그레이드 아이디어 등에 관해 영구적이고 전세계적으로 사용할 수 있고, 전면 양도 및 2차 인가가 가능하며, 고객은 서비스에 제공한 제안사항, 상담문의 및 내역, 업그레이드 아이디어 등에 대하여 로열티 등의 일체 비용을 요구할 수 없습니다.</li>
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제8조(개인정보의 보호)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>개인정보란, 서비스를 사용하는 고객을 구분할 수 있는 주민번호, 계좌번호 등 기타 서비스가 판단하기에 민감한 정보를 말합니다.</li>
		                                                <li><span class="frt_num">2.</span>고객이 서비스에 입력한 민감한 개인정보에 대해 서비스는 제3자에게 배포, 누설되지 않도록 보호하기 위해 노력합니다.</li>
		                                                <li><span class="frt_num">3.</span>고객이 자신의 거래처나 기타 제 3자에 대한 개인정보(예: 거래처 담당자의 핸드폰이나 이메일주소)를 서비스에 저장할 때, 서비스로서는 저마다의 고객이 어떤 형식으로, 어떤 위치 또는 어떤 컬럼을 생성하여 저장할 지 예측할 수 없으므로 기본적으로 개인정보가 아닌 일반 데이터로 인식합니다.</li>
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제9조(결제 및 지불)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>결제: 고객은 매월 서비스를 결제해야 합니다.</li>
		                                                <li><span class="frt_num">2.</span>사용기간의 적용: 서비스 사용기간은 최초 가입일을 기준으로 고객이 납부한 결제방식에 따라 서비스만료일이 산정되며, 결제일에 관계없이 직전 서비스만료일을 기준으로 다음 서비스만료일이 설정됩니다.</li>
		                                                <li><span class="frt_num">3.</span>환불: 매월 납부 고객의 경우, 서비스 시작 익월부터 비용을 납부하여야 하고 서비스 시작 월의 잔여기간에 대해 비용납부 의무가 없으며, 해지 월의 잔여기간에 대해서도 환불을 요청하지 않는다는데 동의합니다.</li>
		                                                <li><span class="frt_num">4.</span>결제방법: 별도로 합의하지 않는 한 고객은 서비스가 지정한 결제수단으로 결제합니다.</li>
		                                                <li><span class="frt_num">5.</span>세금포함: 고객이 서비스 이용과 관련된 세금(부가가치세를 포함하되, 이에 한하지 않음)에 대해 책임을 지므로, 고객은 서비스에 대해 세금까지 포함하여 서비스에 지불해야 합니다.</li>
		                                                <li><span class="frt_num">6.</span>원천징수: 결제금액은 은행, 카드사, 결제대행사(Payment Gateway), 페이팔 등 서비스가 지정한 방법을 통해 서비스에 최종 도달한 금액을 기준으로 하며 해당 결제를 위해 고객 국가의 세무 당국에 지급하여야 할 금액은 고객이 부담합니다.</li>                                               
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제10조(해지 및 종료)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>종료: 고객이 매월 해당 사용료를 납부하는 행위를 통해 계약을 연장하지 않으면 서비스 이용 만료일에 자동으로 고객의 서비스 이용이 종료됩니다.</li>
		                                                <li><span class="frt_num">2.</span>고객의 의사로 인한 해지: 고객은 서비스 이용 중 언제든지 서비스를 해지할 수 있습니다.</li>
		                                                <li><span class="frt_num">3.</span>서비스의 의사로 인한 해지: 이카운트는 언제든지 어떠한 이유에서든 서비스를 해지할 수 있습니다. 이 경우 최소 30일 전에 고객에게 안내합니다. 안내는 이메일 또는 메인화면에 내용을 게시하는 방식으로 합니다. 다만, 고객이 약관을 위반한 경우에 즉시 해지할 수 있습니다.</li>
		                                                <li><span class="frt_num">4.</span>고객 데이터 백업: 고객은 종료나 해지 전에 데이터를 백업할 수 있습니다. 서비스가 제공하는 백업 수단은 기술 상 혹은 정책 상 고객의 모든 데이터에 대한 완전한 백업을 의미하지는 않습니다.</li>
		                                                <li><span class="frt_num">5.</span>해지 이후 데이터: 서비스는 해지한 고객이나 이용이 종료된 고객의 데이터를 보관할 의무가 없으며, 계약 해지나 이용을 종료하면서도 고객이 삭제하지 않은 데이터는 통상적으로 해지나 종료한 날로부터 3개월이 지나면 삭제하는 것을 내부방침으로 합니다.</li>                                            
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제11조(일시 중지)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>고객이 약관을 위반하거나, 자료의 소유권을 두고 고객 내부의 분쟁이 있을 경우 서비스는 고객에게 전자쪽지 등 전자적 수단으로 개별 통지한 후 서비스의 제공을 일시 중지할 수 있습니다.</li>
		                                                <li><span class="frt_num">2.</span>서비스는 정기적 혹은 비정기적 시스템의 점검, 긴급한 보안 상의 필요, 기타 서비스 제공에 필요하다고 생각할 경우 언제든지 서비스를 일시 중지할 수 있습니다. 일시 중지로 인해 발생한 고객의 어떠한 피해에 대해서도 서비스는 배상의무가 없습니다. 다만, 서비스의 귀책사유로 서비스가 사전 공지 없이 영업일 기준 3시간 이상 중지되는 서비스 정전이 발생한 경우에는 배상합니다.</li>                                         
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제12조(면책 및 제한)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>불가항력: 고객과 서비스 양 당사자는 자연재해, 전쟁 또는 테러, 폭동, 노사문제, 정부 조치, 인터넷 장애 및 서비스 거부(DoS) 공격 등과 같은 당사자의 통제력을 벗어난 조건으로 인해 발생한 약관 불이행에 대해서는 책임을 지지 않습니다.</li>
		                                                <li><span class="frt_num">2.</span>배상금액의 제한: 본 약관 제12조를 제외하고, 서비스의 귀책사유로 고객에게 별도 손해가 발생한 경우에도 서비스는 고객이 서비스의 책임을 묻는 사건이 발생하기 전 12개월 동안 고객이 지불한 금액보다 많은 금액을 배상하지 않습니다.</li>
		                                                <li><span class="frt_num">3.</span>서비스 이용을 위한 가입 신청은 고객 스스로 서비스의 적합성과 유용성을 판단하여 스스로 결정한 진정한 의사 표시로서, 서비스가 고객에게 적합하다거나 고객이 거주하는 모든 지역 및 국가의 상황에도 유용하다고 선언한 사실이 없음을 확인합니다.</li>
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">제13조(기타)</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">1.</span>적용법 및 분쟁해결방법:
		                                                    <ul>    
		                                                        <li><span class="frt_num">①</span>본 계약은 [대한민국] 법의 적용 • 해석을 받습니다.</li>
		                                                        <li><span class="frt_num">②</span>본 계약 및 그 불이행과 관련하여 발생되는 모든 분쟁은 대한민국 서울에서 대한상사중재원의 중재규칙에 따라 중재로 해결합니다. 중재인이 내린 판정은 최종적인 것으로 관련 당사자 쌍방을 구속합니다. 중재인의 수는 3인, 중재에 사용할 언어는 한국어로 합니다. </li>
		                                                    </ul>
		                                                </li>
		                                                <li><span class="frt_num">2.</span>동의: 고객은 가입 신청함으로써, 본 약관을 구성하는 모든 문서에 완전히 동의한 것입니다.</li>
		                                                <li><span class="frt_num">3.</span>상충하는 조건에 대한 해석: 서비스 웹사이트와 본 약관을 구성하는 문서 간에 상충하는 부분이 있을 경우, 우선순위는 ① 가격정책이 기재된 웹 페이지, ② 업무처리규칙 ③ 온라인 이용약관 순으로 합니다.</li>
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	
	                                    <div class="sub_text">
	                                        <span class="agree_title_box"><span class="agree_title">업무 처리 규칙</span></span>
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <span>서비스를 이용하는 고객은 본 서비스 업무처리 규칙(이하 “규칙”)을 준수해야 합니다. 고객이 규칙을 위반한 것으로 판단될 경우, 서비스는 언제라도 고객의 서비스 이용을 중지하거나 계약을 해지할 수 있습니다.서비스는 언제든지 어떤 이유에서든 규칙을 변경할 수 있으며 규칙에 게재된 최신 내용을 숙지하고 준수할 책임은 고객에게 있습니다.용어의 정의• 서비스: IT자산관리가 고객에게 제공하는 제품, 소프트웨어, 인적 서비스, 기능 등을 의미합니다.</span>
		                                            <ul class="num_txt_box">
		                                                <li><span class="frt_num">·</span>ID: 고객이 서비스 이용 시 서비스의 이용권한 있는 자를 제한지정하기 위하여 고객이 신청하고 서비스가 승인하는 영문자, 숫자 등으로 서비스 신청함을 의미합니다.</li>
		                                                <li><span class="frt_num">·</span>대표자: 사업자등록증, 법인등기부등본 등의 공적 증명서에 고객의 대표자로 등재된 사람을 의미합니다.<br/>지적재산권서비스는 저작권, 영업 비밀 및 기타 지적재산권의 보호를 받습니다. 서비스 관련 모든 지적 재산권은 서비스에 귀속되고, 고객은 서비스를 사용할 권한만 부여 받으며, 
		                                                    서비스가 명시한 목적에 국한되어서만 서비스를 사용할 수 있습니다. 고객은 계약기간 동안 서비스 사용료의 지불 의무 일체를 이행해야 합니다. 서비스 이용 중 금지된 행위고객은 서비스 이용 중 다음의 금지된 행위를 하는 경우 서비스는 즉시 서비스 중지 및 계약해지를 할 수 있습니다. • 서비스가 허용한 경우를 제외하고 서비스의 전부 또는 일부를 제3자에게 판매, 재판매, 임대 또는 그와 유사한 시도를 하는 경우
		                                                </li>
		                                                <li><span class="frt_num">·</span>서비스의 대체품이나 그와 유사한 서비스를 만들려고 시도하는 경우</li>
		                                                <li><span class="frt_num">·</span>불법, 명예 훼손, 희롱, 남용, 사기, 권리 침해, 외설 등의 소지가 있거나 용인하기 어려운 콘텐츠를 전송, 업로드, 배포하거나 이와 같은 행동을 권하는 경우</li>
		                                                <li><span class="frt_num">·</span>바이러스, 웜, 결함, 트로이 목마, 손상된 파일, 거짓 바이러스 정보 또는 기타 유해하거나 사기성이 있는 항목을 배포하는 경우</li>
		                                                <li><span class="frt_num">·</span>사용자 ID, 이메일 주소 등 기타 수단을 통해 다른 사람인 것처럼 가장하거나 자신의 신원 또는 이메일의 출처를 속이는 경우</li>
		                                                <li><span class="frt_num">·</span>본 서비스를 사용하여 다른 사람의 법적 권리를 침해하는 경우.</li>
		                                                <li><span class="frt_num">·</span>불법활동을 조장 또는 장려하는 경우</li>
		                                                <li><span class="frt_num">·</span>다른 서비스 이용자의 원활한 서비스 이용에 방해가 되는 경우</li>
		                                                <li><span class="frt_num">·</span>본 서비스의 일부를 수정, 개조, 변환하거나 리버스 엔지니어링 하는 경우</li>
		                                                <li><span class="frt_num">·</span>본 서비스에 포함된 저작권, 상표 또는 기타 독점권 표시를 제거하는 경우</li>
		                                                <li><span class="frt_num">·</span>본 서비스에 속하는 웹 페이지의 일부 형식을 바꾸거나 조작하는 경우</li>
		                                                <li><span class="frt_num">·</span>서비스 로고나 기타 서비스 상표 표시를 수정하는 경우</li>
		                                                <li><span class="frt_num">·</span>제공 서비스를 이용하여 얻은 정보를 서비스의 사전 서면승낙 없이 복제, 유통시키거나 상업적으로 사용하는 경우</li>
		                                                <li><span class="frt_num">·</span>이 계약의 체결 또는 이행과정에 인지득한 서비스의 정보를 누설, 배포하거나 상업적 목적으로 사용하는 경우</li>
		                                                <li><span class="frt_num">·</span>이용요금을 미납하는 경우</li>
		                                                <li><span class="frt_num">·</span>고객이 자발적으로 요청한 서비스 중지 기간 3개월을 초과한 경우</li>
		                                                <li><span class="frt_num">·</span>서비스와 경쟁관계에 있는 이용자가 이용하는 경우</li>
		                                                <li><span class="frt_num">·</span>서비스를 모니터링 하거나 벤치마킹 하거나 기타 경쟁의 목적으로 이용하는 경우</li>
		                                                <li><span class="frt_num">·</span>전화, 게시판, 이메일, 인터넷 등 기타 수단을 통해 서비스에 욕설, 비속어, 고성, 반말, 허위주장, 기타 모욕적인 언사 등을 하는 경우</li>
		                                                <li><span class="frt_num">·</span>서비스 이용 신청 시 허위 내용을 등록한 경우</li>
		                                                <li><span class="frt_num">·</span>기타 이용약관 등 서비스 관련 제반 규정을 위반하여 사용하는 경우</li>
		                                                <li><span class="frt_num">·</span>서비스가 명시적으로 허용하지 않은 자동화된 도구(아래의 예시를 포함하되 이에 한하지는 않음)를 사용하는 경우 서비스는 해당 고객의 사용을 제한하거나 시스템 접근을 차단할 수 있습니다. 
		                                                    <ul>    
		                                                        <li><span class="frt_num">-</span>프로그래밍화된 엑셀을 이용한 데이터 수/발신</li>
		                                                        <li><span class="frt_num">-</span>스크래핑 기술을 이용한 데이터 수/발신 등</li>
		                                                    </ul>
		                                                </li>
		                                                <li><span class="frt_num">·</span>특정 고객이 시스템 자원(네트워크 트래픽, CPU, 메모리, DB 등)을 과도하게 사용해서 나머지 다수 고객의 사용에 불편을 초래하거나 초래할 것이 예상될 경우 서비스는 해당 고객의 사용을 제한할 수 있습니다.<br/>비밀번호의 관리 : 고객 비밀번호에 관한 관리 책임은 고객에게 있으며, 이를 제 3자가 이용하도록 하여서는 안 됩니다. 고객 비밀번호가 도용되거나 제 3자가 사용하고 있음을 인지하였을 경우 서비스에 제보할 책임이 있으며, 서비스의 안내에 따라야 합니다. 서비스에 위 사실을 제보하지 않거나, 제보한 경우에도 서비스의 안내에 따르지 않아 발생한 불이익에 대하여 서비스는 책임지지 않습니다. </li>
		                                                <li><span class="frt_num">·</span>서비스가 위의 이메일을 발송하고 3일이 경과할 때까지 기존 고객사의 아무런 의사표명이 없을 경우, 기존 고객사는 자료에 대한 권리를 상실하고 하게 됩니다. </li>
		                                                <li><span class="frt_num">·</span>예외적으로, 서비스와 거래한 고객의 법인등기부나 사업자등록증 상의 대표자와 자료권리자 간의 분쟁이 발생한 경우, 서비스는 법인등기부나 사업자등록증 상의 대표자를 우선적인 권리자로 간주할 수 있습니다. 법인등기부나 사업자등록증 상의 대표자는 자신이 대표자 본인임을 증명하기 위하여 서비스 주사무실로 내방하는 등 서비스가 지정하는 방법에 따라야 합니다. 대표자의 사정으로 서비스가 지정한 방법으로 대표자 본인임을 증명하지 못하여 손해나 문제가 발생한 경우, 서비스는 이에 대한 책임을 부담하지 않습니다.</li>
		                                                <li><span class="frt_num">·</span>위의 최종결정이나 합의가 법적으로 정당한 효력을 갖고 있는지에 대해, 서비스가 확인하는 과정에서 전문가에게 위임하면서 수수료 등이 발생하면, 발생한 수수료 등 제반 비용은 고객이 부담합니다.</li>                                               
		                                            </ul>
		                                        </span>
	                                        </span>
	                                    </div>
	                                </div>                      
	                            </div>
	                            <div class="noti_wrap txt_right">
	                                <input type="checkbox" name="chk1" id="chk1" value="02" /><label for="chk1"><span></span></label> (필수) 위 서비스 이용약관에 동의합니다.
	                            </div>
	
	                            <div class="input_wrap">
	                                <div class="agr_tit">개인정보 수집 및 이용동의</div>
	                                <div class="agr_box">
	                                    <div class="sub_text">
	                                        <span class="agree_content">
		                                        <span class="frt_top">
		                                            <span>'(주)드림시큐리티’는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법, 통신비밀보호법, 전기통신사업법에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.</span>
		                                            <ul>    
		                                                <li><span class="frt_num">*</span>수집항목 - 신청자 이름, 전화번호, 아이디, 비밀번호, 이메일, 핸드폰번호, 이메일, 언어, 서비스를 알게 된 경로, 회사명, 대표자, 사업자등록번호, 업태, 종목, 회사주소, 전화번호, 업종, 가입여부, 설립일자, 요청사항</li>
		                                                <li><span class="frt_num">*</span>수집목적 - 서비스 사용을 위한 서비스 신청, 서비스 이용안내 전화 연락, 가입신청 확인 안내메일/SMS 발송</li>
		                                                <li><span class="frt_num">*</span>보유 및 이용기간 - 가입 약관에 명시한 기간까지 보유</li>
		                                            </ul>
		                                            <span>위 사항에 대한 동의가 없는 경우 회사에서 제공하는 서비스를 신청하거나 가입하는 것이 불가능 할 수 있습니다.</span>
		                                        </span>
	                                        </span>
	                                    </div>
	                                </div>
	                            </div>
	                            <div class="noti_wrap txt_right">
	                                <input type="checkbox" name="chk2" id="chk2" value="02" /><label for="chk2"><span></span></label> (필수) 위 서비스 이용약관에 동의합니다.
	                            </div>
	
	                        </div>
	                        <div class="regis_input_box02">
	                        <form name="signUpReq" id="signUpReq" enctype="multipart/form-data">
	                            <div class="input_tit">서비스 신청정보<span class="input_sub"><span class="txt_red">*</span>항목은 필수 입력 사항입니다.</span></div>
	                            <div class="input_wrap">
	                                <div class="ser_tbl_wrap">
	                                    <table>
	                                        <colgroup>
	                                            <col style="width:20%;" />
	                                            <col style="width:30%;" />
	                                            <col style="width:20%;" />
	                                            <col style="width:30%;" />
	                                        </colgroup>
	                                        <tbody>
	                                            <tr class="top_col">
	                                                <td class="thead_box">아이디 <span class="txt_red">*</span></td>
	                                                <td><input type="text" name="cpId" id="cpId" class="input_box width_100p" placeholder="8~10자리 영문/숫자 조합"  maxlength="10" value=""/></td>
	                                                <td colspan="2">
	                                                    <button class="reg_btn cpIdCheck">아이디 중복확인</button>
	                                                    <span class="txt_red">※ </span><span id="cpIdCheckResult" class="txt_red">아이디를 입력해주세요.</span>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <td class="thead_box">비밀번호 <span class="txt_red">*</span></td>
	                                                <td><input type="password" name="pwd" id="pwd" class="input_box width_100p" placeholder="8~10자리 영문/숫자 조합"  maxlength="10" value="" /></td>
	                                                <td class="thead_box">비밀번호 확인 <span class="txt_red">*</span></td>
	                                                <td><input type="password" name="chkPwd" id="chkPwd" class="input_box width_100p" value="" /></td>
	                                            </tr>
	                                            <tr>
	                                                <td class="thead_box">회사명 <span class="txt_red">*</span></td>
	                                                <td><input type="text" name="cpName" id="cpName" class="input_box width_100p" value="" /></td>
	                                                <td class="thead_box">대표자 <span class="txt_red">*</span></td>
	                                                <td><input type="text" name="cpCeo" id="cpCeo" class="input_box width_100p" value="" /></td>
	                                            </tr>
	                                            <tr>
	                                                <td class="thead_box">사업자등록번호 <span class="txt_red">*</span></td>
	                                                <td><input type="number" name="cpRegNum" id="cpRegNum" class="input_box width_100p" placeholder="-없이 입력해 주시기 바랍니다." min="0" max="9999999999" value="" /></td>
	                                                <td colspan="2"><span class="txt_red">※ 입력하신 사업자등록번호는 이미 등록되어 있는 번호 입니다.</span></td>
	                                            </tr>
	                                            <tr>
	                                                <td class="thead_box">팩스번호</td>
	                                                <td><input type="number" name="fax" id="fax" class="input_box width_100p" placeholder="-없이 입력해 주시기 바랍니다." min="0" value="" /></td>
	                                                <td></td>
	                                                <td></td>
	                                            </tr>
	                                            <tr>
	                                                <td class="thead_box">파일첨부<span class="txt_red">*</span></td>
	                                                <td colspan="3">
	                                                    <div class="filebox">
	                                                        <input type="text" name="fileName" class="upload-name upload_width" placeholder="사업자등록증" value="" disabled="disabled" />
	                                                        <label for="ex_filename" class="reg_btn">업로드</label>
	                                                        <input type="file" name="file" id="ex_filename" class="upload-hidden" value="" />
	                                                    </div>
	                                                </td>
	                                            </tr>
	                                            <tr class="top_col">
	                                                <td class="thead_box">회사주소 <span class="txt_red">*</span></td>
	                                                <td colspan="3" class="adress_st">
	                                                    <input type="text" id="sample2_postcode" class="input_box width_35p" name="zipCode" value="" /><button type="button" class="reg_btn" onclick="sample2_execDaumPostcode()">우편번호 찾기</button>
	                                                    <input type="text" id="sample2_address" class="input_box width_100p" name="" placeholder="주소" value=""/>
	                                                    <input type="text" id="sample2_detailAddress" class="input_box width_50p" name="" placeholder="상세주소" value="" />
	                                                    <input type="text" id="sample2_extraAddress" class="input_box width_cus1" name="" placeholder="참고항목 (ex. 성수동)" value="" />
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <td class="thead_box">담당자 이름 <span class="txt_red">*</span></td>
	                                                <td><input type="text" name="psName" id="psName" class="input_box width_100p" value="" /></td>
	                                                <td class="thead_box">연락처 <span class="txt_red">*</span></td>
	                                                <td><input type="number" name="phNum" id="phNum" class="input_box width_100p" placeholder="-없이 입력해 주시기 바랍니다." value="" /></td>
	                                            </tr>
	                                            <tr>
	                                                <td class="thead_box">이메일 <span class="txt_red">*</span></td>
	                                                <td><input type="text" name="emailAddr1" id="emailAddr1" class="input_box width_100p" value="" /></td>
	                                                <td colspan="2">
	                                                    <span class="width_30 ver_middle">@</span>
	                                                    <input type="text" name="emailAddr2" id="emailAddr2" class="input_box adress_input" value="" readOnly/>
	                                                    <span class="width_40p ver_middle">
	                                                        <select name="e-adress" id="e-adress" class="select" onchange="selectEmail();">
	                                                            <option value="">선택하세요</option>
	                                                            <option value="naver.com">naver.com</option>								
	                                                            <option value="daum.net">daum.net</option>
	                                                            <option value="gmail.com">gmail.com</option>								
	                                                            <option value="nate.com">nate.com</option>	
	                                                            <option value="1">직접입력</option>										
	                                                        </select>
	                                                    </span>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <td class="thead_box">요청사항</td>
	                                                <td colspan="3">
	                                                    <textarea name="regMemo" id="regMemo" class="agr_box mt_0 regMemo"></textarea>
	                                                    <div id="counter01" class="tarea_count regMemoCnt">0 /500자</div>		
	                                                </td>
	                                            </tr>
	                                        </tbody>
	                                    </table>
	                                </div>
	                            </div>
	                            </form>
	                        </div>
	                    </div>
	                    
	                    <div class="btn_area">
	                        <button class="blue_btn02 width_160 signUpReqBtn">신청하기</button><span class="width_30"></span>
	                        <button class="blue_btn_line width_160">취소</button>
	                    </div>
	                    
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	
	<!-- layer start -->
	<!--
		popup 1 : 아이디 중복확인 레이어
		popup 2 : 메시지 레이어
	-->
	<!-- alert01 : S -->
	<div id="popup1" class="modal-box-al">
		<div class="modal_header">
	        <p class="modal_tit">비밀번호 찾기</p>
	        <p class="modal_sub">고객사 정보가 확인되면 가입된 이메일로 비밀번호가 발송됩니다.</p>
		</div>
		<div class="modal_body">
			<div class="modal_col_tr">
	            <span class="modal_con_tit width_80">아이디</span><input type="text" class="input_box width_40p"/><span class="width_10"></span>
	        </div>
	        <div class="modal_col_tr">
	            <span class="modal_con_tit width_80">사업자 번호</span><input type="number" class="input_box width_40p" placeholder="-없이 입력해 주시기 바랍니다."/><span class="width_10"></span>
			</div>
		</div>
		<div class="modal_footer">
			   <div class="modal_footer_box">
			   <!--버튼-->
					<span class="pop_btn blue_btn_line width_160 "><a class="js-modal-close">취소</a></span><span class="width_30"></span>
					<span class="pop_btn blue_btn02 width_160 "><a class="js-modal-close">비밀번호 확인 요청</a></span>
		 	   <!--//버튼-->
			   </div>
		</div>
	</div>
	<!-- alert01 : E -->
	
	<!-- alert02 : S -->
	<div id="popup2" class="modal-box-al">
		<div class="modal_header"><a class="js-modal-close pop_close"><i class="la la-close"></i></a>
			<p class="modal_tit"></p>
		</div>
		<div class="modal_body">
			<div style="padding:1.2em 0;">
				<div class="modal_content" style="padding:1.2em 0;"></div>
			</div>
		</div>
		<div class="modal_footer">
			<div class="modal_footer_box">
				<!-- 버튼 -->
				<div class="pop_btn_wrap select_pop1">
					<span class="pop_btn_two">
						<a class="pop_btn_blu width_100 btn_action"></a>
						<a class="pop_btn_grey width_100 js-modal-close">취소</a>
					</span>
				</div>
				<div class="pop_btn_wrap select_pop2">
					<span>
						<a href="#" class="pop_btn_grey width_100 js-modal-close popup_focus">확인</a>
					</span>
				</div>
				<!-- //버튼 -->
			</div>
		</div>
	</div>
	<!-- alert02 : E -->
	
	<!-- 우편번호 찾기 팝업  -->
    <div id="layer_popup" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;">
		<img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼" />
	</div>
    
	<!-- layer end -->
</body>
</html>