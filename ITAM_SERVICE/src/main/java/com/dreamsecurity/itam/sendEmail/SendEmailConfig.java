package com.dreamsecurity.itam.sendEmail;

public class SendEmailConfig {
	private static String emailServer = null;						// 이메일 서버
	private static String emailPort = null;						// 이메일 서버 PORT
	private static String emailEncoding = null;					// 이메일 인코딩 방식
	private static String emailContentType = null;			// 이메일 ContentType
	private static String emailAuthId = null;						// 이메일 서버 인증 계정 ID
	private static String emailAuthPwd = null;					// 이메일 서버 인증 계정 비밀번호
	private static String emailSenderEmail = null;			// 발송 이메일 주소
	private static String emailSendName = null;				// 이메일 발송자명
	private static String emailSubject1 = null;					// 이메일 제목(비밀번호 찾기 용)
	private static String emailSubject2 = null;					// 이메일 제목 2(아이디 찾기 용)
	private static String emailSubject3 = null;					// 이메일 제목 3(인증번호 발송 용)
	private static String emailSubject4 = null;					// 이메일 제목 3(인증번호 발송 용)
	private static String emailFormatPath1 = null;				// 이메일 형식 경로(비밀번호 찾기, 아이디 찾기, 인증번호 발송 용)
	private static String emailFormatPath2 = null;				// 이메일 형식 경로2(신청완료 이메일 용)
	private static String emailFormatPath3 = null;				// 이메일 형식 경로(비밀번호 찾기, 아이디 찾기, 인증번호 발송 용)
	private static String emailFormatPath4 = null;				// 이메일 형식 경로2(신청완료 이메일 용)
	
	public SendEmailConfig() {}
	
	public void setEmailServer(String emailServer) {
		SendEmailConfig.emailServer = emailServer;
	}
	
	public static String getEmailServer() {
		return SendEmailConfig.emailServer;
	}
	
	public void setEmailPort(String emailPort) {
		SendEmailConfig.emailPort = emailPort;
	}
	
	public static String getEmailPort() {
		return SendEmailConfig.emailPort;
	}
	
	public String setEmailEncoding(String emailEncoding) {
		return SendEmailConfig.emailEncoding = emailEncoding;
	}
	
	public static String getEmailEncndig() {
		return SendEmailConfig.emailEncoding;
	}
	
	public String setEmailContentType(String emailContentType) {
		return SendEmailConfig.emailContentType = emailContentType;
	}
	
	public static String getEmailContentType() {
		return SendEmailConfig.emailContentType;
	}
	
	public String setEmailAuthId(String emailAuthId) {
		return SendEmailConfig.emailAuthId = emailAuthId;
	}
	
	public static String getEmailAuthId() {
		return SendEmailConfig.emailAuthId;
	}
	
	public String setEmailAuthPwd(String emailAuthPwd) {
		return SendEmailConfig.emailAuthPwd = emailAuthPwd;
	}
	
	public static String getEmailAuthPwd() {
		return SendEmailConfig.emailAuthPwd;
	}
	
	public String setEmailSenderEmail(String emailSenderEmail) {
		return SendEmailConfig.emailSenderEmail = emailSenderEmail;
	}
	
	public static String getEmailSenderEmail() {
		return SendEmailConfig.emailSenderEmail;
	}
	
	public String setEmailSendName(String emailSendName) {
		return SendEmailConfig.emailSendName = emailSendName;
	}
	
	public static String getEmailSendName() {
		return SendEmailConfig.emailSendName;
	}
	
	public String setEmailSubject1(String emailSubject1) {
		return SendEmailConfig.emailSubject1 = emailSubject1;
	}
	
	public static String getEmailSubject1() {
		return SendEmailConfig.emailSubject1;
	}
	
	public String setEmailSubject2(String emailSubject2) {
		return SendEmailConfig.emailSubject2 = emailSubject2;
	}
	
	public static String getEmailSubject2() {
		return SendEmailConfig.emailSubject2;
	}
	
	public String setEmailSubject3(String emailSubject3) {
		return SendEmailConfig.emailSubject3 = emailSubject3;
	}
	
	public static String getEmailSubject3() {
		return SendEmailConfig.emailSubject3;
	}
	
	public String setEmailSubject4(String emailSubject4) {
		return SendEmailConfig.emailSubject4 = emailSubject4;
	}
	
	public static String getEmailSubject4() {
		return SendEmailConfig.emailSubject4;
	}
	
	public String setEmailFormatPath1(String emailFormatPath1) {
		return SendEmailConfig.emailFormatPath1 = emailFormatPath1;
	}
	
	public static String getEmailFormatPath1() {
		return SendEmailConfig.emailFormatPath1;
	}
	
	public String setEmailFormatPath2(String emailFormatPath2) {
		return SendEmailConfig.emailFormatPath2 = emailFormatPath2;
	}
	
	public static String getEmailFormatPath2() {
		return SendEmailConfig.emailFormatPath2;
	}
	
	public String setEmailFormatPath3(String emailFormatPath3) {
		return SendEmailConfig.emailFormatPath3 = emailFormatPath3;
	}
	
	public static String getEmailFormatPath3() {
		return SendEmailConfig.emailFormatPath3;
	}
	
	public String setEmailFormatPath4(String emailFormatPath4) {
		return SendEmailConfig.emailFormatPath4 = emailFormatPath4;
	}
	
	public static String getEmailFormatPath4() {
		return SendEmailConfig.emailFormatPath4;
	}
}
