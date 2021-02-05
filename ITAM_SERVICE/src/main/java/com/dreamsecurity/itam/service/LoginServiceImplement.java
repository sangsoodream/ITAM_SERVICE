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
public class LoginServiceImplement implements LoginService{
	
	@Autowired 
	private LoginMapper loginMapper;
	
	@Autowired 
	private ServiceMapper serviceMapper;
	
	@Override
	public LoginVo getLoginInfo(String cpId) {
		System.out.println("getLoginInfo implement cpId :" + cpId);
		return loginMapper.getLoginInfo(cpId);
	}
	
	@Override
	public LoginVo findPwdRequest(String cpId, String cpRegNum) {
		System.out.println("findPwdRequest implement cpId :" + cpId);
		System.out.println("findPwdRequest implement cpRegNum :" + cpRegNum);
		
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("cpId", cpId);
		paramMap.put("cpRegNum", cpRegNum);
		
		return serviceMapper.findPwdRequest(paramMap);
	}
	
	@Override
	public LoginVo findIdRequest(String psName, String email) {
		System.out.println("findIdRequest implement psName :" + psName);
		System.out.println("findIdRequest implement email :" + email);
		
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("psName", psName);
		paramMap.put("email", email);
		
		return serviceMapper.findIdRequest(paramMap);
	}
	
	@Override
	public int updateFindPwdInfo(String cpId, String pwd, String salt) {
		System.out.println("updateFindPwdInfo implement cpId :" + cpId);
		System.out.println("updateFindPwdInfo implement pwd :" + pwd);
		System.out.println("updateFindPwdInfo implement salt :" + salt);
		
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("cpId", cpId);
		paramMap.put("pwd", pwd);
		paramMap.put("salt", salt);
		
		return loginMapper.updateFindPwdInfo(paramMap);
	}
	
}
