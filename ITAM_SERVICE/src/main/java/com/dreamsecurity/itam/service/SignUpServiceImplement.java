package com.dreamsecurity.itam.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dreamsecurity.itam.domain.LoginVo;
import com.dreamsecurity.itam.domain.SignUpVo;
import com.dreamsecurity.itam.mapper.LoginMapper;
import com.dreamsecurity.itam.serviceMapper.ServiceMapper;


@Service
public class SignUpServiceImplement implements SignUpService{
	@Autowired 
	private ServiceMapper serviceMapper;
	
	@Autowired 
	private LoginMapper loginMapper;
	
	@Override
	public SignUpVo cpIdCheck(String cpId) {
		System.out.println("cpIdCheck implement cpId :" + cpId);
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("cpId", cpId);
		return serviceMapper.cpIdCheck(paramMap);
	}
	
	@Override
	public SignUpVo getLoginInfo(String cpId) {
		System.out.println("getLoginInfo implement cpId :" + cpId);
		return serviceMapper.getLoginInfo(cpId);
	}
	
	@Override
	public int insertTempCertNum(String email, String tempCertNum) {
		
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("email", email);
		paramMap.put("tempCertNum", tempCertNum);
		
		return serviceMapper.insertTempCertNum(paramMap);
	}
	
	@Override
	public int insertSignUpRequest(SignUpVo vo) {
		int result = -1;
		
		result = serviceMapper.insertSignUpRequest(vo);
		return result;
	}
	
	@Override
	public int insertSignUpContractInfo(SignUpVo vo) {
		int result = -1;
		
		result = serviceMapper.insertSignUpContractInfo(vo);
		return result;
	}
	
	@Override
	public int insertLoginInfo(SignUpVo vo) {
		int result = -1;
		
		result = loginMapper.insertLoginInfo(vo);
		return result;
	}
	
	@Override
	public int insertSendEmailResult(SignUpVo vo) {
		int result = -1;
		
		result = serviceMapper.insertSendEmailResult(vo);
		return result;
	}
	
}
