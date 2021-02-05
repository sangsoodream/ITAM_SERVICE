package com.dreamsecurity.itam.mapper;

import java.util.Map;

import com.dreamsecurity.itam.domain.LoginVo;
import com.dreamsecurity.itam.domain.SignUpVo;


public interface LoginMapper {
	/**************************************************************************
	 * SELECT
	 **************************************************************************/
	public LoginVo getLoginInfo(String cpId);
	public LoginVo findPwdRequest(Map<String, String> paramMap);
	public LoginVo findIdRequest(Map<String, String> paramMap);
	/**************************************************************************/
	
	public int updateFindPwdInfo(Map<String, String> paramMap);
	public int insertLoginInfo(SignUpVo vo);

}
