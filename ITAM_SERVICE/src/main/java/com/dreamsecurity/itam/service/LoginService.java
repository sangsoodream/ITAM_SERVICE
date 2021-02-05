package com.dreamsecurity.itam.service;

import com.dreamsecurity.itam.domain.LoginVo;

public interface LoginService {
	public LoginVo getLoginInfo(String cpId);							// 로그인 정보 
	public LoginVo findPwdRequest(String cpId, String cpRegNum);		// 비밀번호 찾기
	public LoginVo findIdRequest(String psName, String email);			// 아이디 찾기
	
	public int updateFindPwdInfo(String cpId, String pwd, String salt);	// 임시 비밀번호 정보 저장

}
