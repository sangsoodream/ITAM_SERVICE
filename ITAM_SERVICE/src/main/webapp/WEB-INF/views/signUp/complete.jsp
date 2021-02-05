<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!doctype html>
<html lang="ko">
<head>
	<title>ITAM 자산관리</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<link type="text/css" rel="stylesheet" href="/ITAM/resources/css/demo.css" />
	<link type="text/css" rel="stylesheet" href="/ITAM/resources/css/itam.css" />
	
	<script type="text/javascript" src="/ITAM/resources/js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery-nav.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery-autoclear.min.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery-select.js"></script>
	<script type="text/javascript" src="/ITAM/resources/js/jquery.tablesorter.min.js"></script>
	
	<script type="text/javascript" src="/ITAM/resources/js/common.js"></script>
	
	<script type="text/javascript">
		$(function() {
			$(".btn_login").click(function(){
				document.loginPage.submit();
			});
		});
	</script>
</head>

<body>
	<div class="wrap">
		<div class="header_wrap">
			<!-- <div class="top_box">
				<div class="top_txt">
					<a href="service_login.html">IT 자산관리 서비스 로그인</a><span class="side_bar" style="display:none;"></span>
				</div>
			</div> -->
			
			<div class="con_wrap">
				<div class="contents_box">
					<div class="register_box">
						<div class="icon_box"><i class="la la-check-circle-o"></i></div>
						<div class="top_noti">
							IT 자산관리 서비스 신청이 완료되었습니다.
							<p class="top_sub txt_red">계약을 진행하셔야 무료 이용 기간(90일)이 만료된 이후에도 계속 이용하실 수 있습니다.</p>
						</div>                   
						<div class="input_area">                                             
							<div class="regis_input_box03">
								<div class="process_tit">계약진행과정</div>
								<div class="process_box">
									<div class="step_box">
										<img src="resources/images/process01_icon@2x.png" />
										<div class="step_txt_box">
											<p class="txt_blue">1. 서류접수</p>
											<span>사업자등록증사본,<br/>법인인감증명서</span>
										</div>
									</div>
									<div class="arrow_box"><i class="la la-angle-right txt_blue"></i></div>
									<div class="step_box">
										<img src="resources/images/process02_icon@2x.png" />
										<div class="step_txt_box">
											<p class="txt_blue">2. 서류검토</p>
											<span>추가서류<br/>(담당자 요청 시)</span>
										</div>
									</div>
									<div class="arrow_box"><i class="la la-angle-right txt_blue"></i></div>
									<div class="step_box">
										<img src="resources/images/process03_icon@2x.png" />
										<div class="step_txt_box">
											<p class="txt_blue">3. 계약서 작성</p>
											<span>계약서,<br/>CMS계좌동의서</span>
										</div>
									</div>
									<div class="arrow_box"><i class="la la-angle-right txt_blue"></i></div>
									<div class="step_box">
										<img src="resources/images/process04_icon@2x.png" />
										<div class="step_txt_box">
											<p class="txt_blue">4. 계약체결</p>
											<span>계약서 날인</span>
										</div>
									</div>
									<div class="arrow_box"><i class="la la-angle-right txt_blue"></i></div>
									<div class="step_box">
										<img src="resources/images/process05_icon@2x.png" />
										<div class="step_txt_box">
											<p class="txt_blue">5. 서비스 이용</p>
											<span>Rental User Portal 계좌정보 (ID/PW)</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="btn_area">
							<button name="login" class="blue_btn02 width_300 btn_login" >IT 자산관리 서비스 로그인</button>    
							<form name ="loginPage" action="byPassLogin" method="post"></form>
						</div>
						<div class="contact_noti txt_black">
							<span>[서비스 문의] Tel : 02-000-0000</span>
							<span>E-mail : rental@rental.com</span>
							<span>Fax : 02-0000-0000</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>