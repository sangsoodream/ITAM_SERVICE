package com.dreamsecurity.itam.serviceMapper;

import java.util.Map;

import com.dreamsecurity.itam.domain.LoginVo;
import com.dreamsecurity.itam.domain.SignUpVo;

public interface ServiceMapper {
	public LoginVo findPwdRequest(Map<String, String> paramMap);
	public LoginVo findIdRequest(Map<String, String> paramMap);

	public SignUpVo cpIdCheck(Map<String, String> paramMap);
	
	public int insertTempCertNum(Map<String, String> paramMap);

	public int insertSignUpRequest(SignUpVo vo);
	public int insertSignUpContractInfo(SignUpVo vo);
	public int insertSendEmailResult(SignUpVo vo);
	public SignUpVo getLoginInfo(String cpId);

}
