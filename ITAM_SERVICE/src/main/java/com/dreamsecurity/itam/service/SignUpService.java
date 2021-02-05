package com.dreamsecurity.itam.service;

import com.dreamsecurity.itam.domain.SignUpVo;

public interface SignUpService {

	public int insertTempCertNum(String email, String tempCertNum);  // 이메일 발송 번호 임시 저장
	public int insertSignUpRequest(SignUpVo vo);					 // 이용신청 정보 저장
	public SignUpVo cpIdCheck(String cpId);							 // 아이디 체크
	public int insertLoginInfo(SignUpVo vo);
	public int insertSignUpContractInfo(SignUpVo vo);
	public int insertSendEmailResult(SignUpVo vo);
	public SignUpVo getLoginInfo(String cpId);
	
}
