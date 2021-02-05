package com.dreamsecurity.itam.sendEmail;

import com.dreamsecurity.itam.sendEmail.SendEmailConfig;

public abstract class SendEmail {
	public String emailServer = SendEmailConfig.getEmailServer();								// 이메일 서버
	public String emailPort = SendEmailConfig.getEmailPort();									// 이메일 서버 PORT
	public String emailEncType = SendEmailConfig.getEmailEncndig();								// 이메일 인코딩 방식
	public String emailConType = SendEmailConfig.getEmailContentType();							// 이메일 Content Type
	public String authId = SendEmailConfig.getEmailAuthId();									// 이메일 서버 인증 계정 ID
	public String authPwd = SendEmailConfig.getEmailAuthPwd();									// 이메일 서버 인증 계정 비밀번호
	public String senderEmail = SendEmailConfig.getEmailSenderEmail();							// 발송 이메일 주소
	public String emailSenderName = SendEmailConfig.getEmailSendName();							// 이메일 발송자명
	public String emailSubject1 = SendEmailConfig.getEmailSubject1();								// 이메일 제목
	public String emailSubject2 = SendEmailConfig.getEmailSubject2();							// 이메일 제목
	public String emailSubject3 = SendEmailConfig.getEmailSubject3();							// 이메일 제목
	public String emailSubject4 = SendEmailConfig.getEmailSubject4();							// 이메일 제목
	public String emailFormatPath1 = SendEmailConfig.getEmailFormatPath1();						// 이메일 형식 경로
	public String emailFormatPath2 = SendEmailConfig.getEmailFormatPath2();						// 이메일 형식 경로
	public String emailFormatPath3 = SendEmailConfig.getEmailFormatPath3();						// 이메일 형식 경로
	public String emailFormatPath4 = SendEmailConfig.getEmailFormatPath4();						// 이메일 형식 경로
	public abstract int sendEmail(String id, String cpName, String psName, String email, String tempInfo, int sendType);
}
