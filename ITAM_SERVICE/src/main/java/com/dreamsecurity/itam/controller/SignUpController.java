package com.dreamsecurity.itam.controller;

import java.io.File;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Properties;
import java.util.Random;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.dreamsecurity.itam.domain.SignUpVo;
import com.dreamsecurity.itam.sendEmail.ReloadableProperty;
import com.dreamsecurity.itam.sendEmail.SendEmailAbst;
import com.dreamsecurity.itam.sendEmail.SendEmailConfig;
import com.dreamsecurity.itam.service.SignUpService;

@Controller
public class SignUpController {
	private static Logger logger = LoggerFactory.getLogger(SignUpController.class);
	
	@Autowired
	private SignUpService SS;
	
	@Resource(name="uploadPath")
    String uploadPath;
	
	@RequestMapping(value = "signUpService")
	public String signUpService() {
		return "/signUp/signUp";
	}
	
	@RequestMapping(value = "signUpComplete")
	public String signUpComplete() {
		return "/signUp/complete";
	}
    
    @ResponseBody
    @RequestMapping(value = "signUpRequest", method = RequestMethod.POST)
	public String signUpRequest(SignUpVo vo, MultipartFile [] file) throws Exception {
    	System.out.println("signUpRequest getCpId : " +  vo.getCpId());
    	System.out.println("signUpRequest getPwd : " +  vo.getPwd());
    	System.out.println("signUpRequest getCpName : " +  vo.getCpName());
    	System.out.println("signUpRequest getCpCeo : " +  vo.getCpCeo());
    	System.out.println("signUpRequest getCpRegNum : " +  vo.getCpRegNum());
    	System.out.println("signUpRequest getFax : " +  vo.getFax());
    	System.out.println("signUpRequest getZipCode : " +  vo.getZipCode());
    	System.out.println("signUpRequest getAddr1 : " +  vo.getAddr1());
    	System.out.println("signUpRequest getAddr2 : " +  vo.getAddr2());
    	System.out.println("signUpRequest getPsName : " +  vo.getPsName());
    	
    	String returnMsg = "";
    	int sendType = 3;			// 이메일 발송 타입 (0 : 비밀번호 찾기, 1: 아이디 찾기, 2: 인증번호 발송, 3: 신청완료 메일 발송)
		int sendEmailResult = -1;   // 결과 초기화
    	
    	if(file != null) {
			for(int i=0; i<file.length; i++) {
				System.out.println("File 파일 크기 :" +  file[i].getSize());
				System.out.println("File 파일 이름: " + file[i].getOriginalFilename());
			}
		} else {
			System.out.println("File이 존재하지 않습니다.");
		}
    	
    	String saveName = "";
		
		if(file != null) {
			for(int i=0; i<file.length; i++) {
				if(file[i].getSize() != 0) {
					saveName = file[i].getOriginalFilename();
					System.out.println(saveName);
					
					vo.setCpRegImg(saveName);
					vo.setOrgCpRegImg(saveName);
					
					System.out.println("사업자등록증 이미지명 : " +  saveName);
					
					File chFile = new File(uploadPath + "/" + saveName);
					
					if (chFile.isFile()) {
						System.out.println("중복된 사업자등록증 이미지명 존재 파일 명 변경");
						
						String lastFileName = saveName.substring(saveName.lastIndexOf("."));
						String uuidFileName = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 13);
						String changeFileName = uuidFileName + lastFileName;
						
						File target = new File(uploadPath, changeFileName);
						
						FileCopyUtils.copy(file[i].getBytes(), target);
						
						vo.setOrgCpRegImg(saveName);
						vo.setCpRegImg(changeFileName);
						
						System.out.println("사업자등록증 이미지명 중복 변경 : " +  changeFileName);		 					  
					} else {
						System.out.println("중복된 사업자등록증 이미지명 없음 정상 등록");
						
						File target = new File(uploadPath, saveName);
						FileCopyUtils.copy(file[i].getBytes(), target);					  
					} 
				}
			}
			
			// 솔트 값 생성
			String salt = getSalt();
			// 전달 받은 데이터 해시 처리
			String pwdSHA256 = getSHA256(vo.getPwd(), salt);
						
			vo.setSalt(salt);
			vo.setPwd(pwdSHA256);
			//계약 번호 생성
			String contNum = makeContNum();
	    	System.out.println("makeContNum : " + contNum);
			vo.setContNum(contNum);
			vo.setContStatus("0"); //계약상태 (0 : 신청, 1 : 승인(무료이용만료), 2 : 계약, 3 : 계약종료(계약기간만료, 계약해지), 4 : 재계약, 5 : 서비스중지, 6 : 서비스해지)
			
			int result = SS.insertSignUpRequest(vo);
			result = SS.insertSignUpContractInfo(vo);
			
			System.out.println("insertLoginInfo Info (cpID): " + vo.getCpId());
	 		System.out.println("insertLoginInfo Info (pwd): " + vo.getPwd());
	 		System.out.println("insertLoginInfo Info (salt): " + vo.getSalt());
	 		result = SS.insertLoginInfo(vo);
			
	        if(result == 1) {
	        	returnMsg = "Success";
	        	ReloadableProperty rp = new ReloadableProperty();
				Properties prop = rp.getProp();
				setProperty(prop);
				
				// 이메일 발송 클래스 호출
		 		SendEmailAbst sendEmail = new SendEmailAbst();
		 		
		 		System.out.println("Send Email Info (cpID): " + vo.getCpId());
		 		System.out.println("Send Email Info (cpName): " + vo.getCpName());
		 		System.out.println("Send Email Info (psName): " + vo.getPsName());
		 		System.out.println("Send Email Info (email): " + vo.getEmail());
		 		
				sendEmailResult = sendEmail.sendEmail(vo.getCpId(), vo.getCpName(), vo.getPsName(), vo.getEmail(), "", sendType);
				
				if(sendEmailResult < 0) {
					//returnMsg = "Failure sending email";
					//SS.insertSendEmailResult(vo);
					System.out.println("이메일 발송 실패했습니다.");
				} else {		
					//SS.insertSendEmailResult(vo);
			 		System.out.println("이메일 발송 성공했습니다. 이메일을 확인해 주세요.");
				}
	        	
	        } else {
	        	returnMsg = "Fail";
	        }
			
		} else { 
			returnMsg = "File didn't exist";
			System.out.println("등록할 파일이 없습니다.");
		}
		
    	
    	return returnMsg;
    }
    
    @ResponseBody
    @RequestMapping(value = "cpIdCheck")
	public String cpIdCheck(SignUpVo vo){
    	String returnMsg = "";
    	String cpId = "";
    	cpId = vo.getCpId();
    	vo = SS.cpIdCheck(cpId);
    	
    	if (vo == null) {
    		returnMsg = "Success";
    	} else {
    		returnMsg = "Fail";
    	}
        return returnMsg;
    }

    @ResponseBody
    @RequestMapping(value = "emailCert")
	public String emailCert(SignUpVo vo){
    	String returnMsg = "";
    	String email = "";
    	String tempCertNum = "";
    	int sendType = 2;			// 이메일 발송 타입 (0 : 비밀번호 찾기, 1: 아이디 찾기, 2: 인증번호 발송)
		int sendEmailResult = -1;   // 결과 초기화
    	int result ;
    	
    	Random rand = new Random();
        
    	for(int i=0;i<4;i++) {
            String ran = Integer.toString(rand.nextInt(10));
            tempCertNum += ran;
    	}
    	
    	System.out.println("tempCertNumm" + tempCertNum);
    	
    	ReloadableProperty rp = new ReloadableProperty();
		Properties prop = rp.getProp();
		setProperty(prop);
		
		// 이메일 발송 클래스 호출
 		SendEmailAbst sendEmail = new SendEmailAbst();
 		
		sendEmailResult = sendEmail.sendEmail("", "", "", vo.getEmail(), tempCertNum, sendType);
		
		if(sendEmailResult < 0) {
			returnMsg = "fail";
		} else {					
			// 임시 인증번호 저장
			result = SS.insertTempCertNum(email, tempCertNum);
	 		returnMsg = "success";
		}
		
        return returnMsg;
    }
    
    @ResponseBody
    @RequestMapping(value = "emailCertCheck")
	public String emailCertCheck(SignUpVo vo){
    	String msg = "";
		
        return msg;
    }
    
    /**
	 * 해시 데이터로 변환
	 * @param sData : 변환할 데이터
	 * @return sRtnSHA : sha-256 해시 처리 결과
	 */
	private static String getSHA256(String sData, String salt) {
		String sRtnSHA = "";
		
        try {

			System.out.println("salt" + salt);
			
        	MessageDigest md = MessageDigest.getInstance("SHA-256");
        	md.update(salt.getBytes());
        	md.update(sData.getBytes());
        	sRtnSHA = String.format("%064x", new BigInteger(1, md.digest()));

			System.out.println("pwdSHA256 : " + sRtnSHA);
			
        } catch (NoSuchAlgorithmException e) {
        	sRtnSHA = null;
        }

        return sRtnSHA;
	}
	
	/**
	 * 솔트 생성
	 * @return salt : 반환
	 */
	public static String getSalt() throws NoSuchAlgorithmException{

    	SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
    	byte[] bytes = new byte[16];
    	random.nextBytes(bytes);
    	return new String(Base64.getEncoder().encode(bytes));

	}
    
    /**
	 * config 파일에서 읽어온 설정값들 SET
	 */
	public void setProperty(Properties prop) {
		// EMAIL CONFIG
		SendEmailConfig config = new SendEmailConfig();
		config.setEmailServer(prop.getProperty("email.server"));
		config.setEmailPort(prop.getProperty("email.port"));
		config.setEmailEncoding(prop.getProperty("email.encoding"));
		config.setEmailContentType(prop.getProperty("email.contentType"));
		config.setEmailAuthId(prop.getProperty("email.authId"));
		config.setEmailAuthPwd(prop.getProperty("email.authPwd"));
		config.setEmailSenderEmail(prop.getProperty("email.senderEmail"));
		config.setEmailSendName(prop.getProperty("email.senderName"));
		config.setEmailSubject1(prop.getProperty("email.subject1"));
		config.setEmailSubject2(prop.getProperty("email.subject2"));
		config.setEmailSubject3(prop.getProperty("email.subject3"));
		config.setEmailSubject4(prop.getProperty("email.subject4"));
		config.setEmailFormatPath1(prop.getProperty("email.format.path1"));
		config.setEmailFormatPath2(prop.getProperty("email.format.path2"));
		config.setEmailFormatPath3(prop.getProperty("email.format.path3"));
		config.setEmailFormatPath4(prop.getProperty("email.format.path4"));
	}
	
	/**
	 * 계약번호 생성
	 * @return 계약번호 반환
	 */
	public static String makeContNum() {
		String contNum = "";
		
		contNum = "yyyyMMddHHmmss" + makeRanNumber(4);
		System.out.println("");

		DateFormat dateFormat = new SimpleDateFormat(contNum);
		Date date = new Date();
		return "CN"+dateFormat.format(date);
	}
	
	/**
	 * 랜덤번호 생성
	 * @return 랜덤번호 반환
	 */
	public static String makeRanNumber(int len) {
		
		String[] strRandTab = new String[30];
		Random rnd = new Random();
		String rtnVal = "";
		
		try {
			for (int j = 0; j < 30; j++) {
				int i = rnd.nextInt(9);
				strRandTab[j] = String.valueOf(i);
			}
			for (int j = 0; j < len; j++) {
				int i = rnd.nextInt(29);
				rtnVal += strRandTab[i];
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rtnVal;
	}

}
