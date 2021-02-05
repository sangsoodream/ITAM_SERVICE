package com.dreamsecurity.itam.sendEmail;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class SendEmailAbst extends SendEmail {

	
	@Override
	public int sendEmail(String id, String cpName, String psName, String email, String info, int sendType) {
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - emailServer : [" + emailServer + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - emailPort : [" + emailPort + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - emailEncType : [" + emailEncType + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - emailConType : [" + emailConType + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - authId : [" + authId + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - authPwd : [" + authPwd + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - senderEmail : [" + senderEmail + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - emailSenderName : [" + emailSenderName + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - emailSubject : [" + emailSubject + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.send.abst.TempOtpSendEmailAbst - emailFormatPath : [" + emailFormatPath + "]");
		
		int result = 0;
		
		String htmlCon = createHtmlContents(id, cpName, psName, info, sendType);

		Properties properties = new Properties();
		
		// 접속 환경 설정
		properties.setProperty("mail.transport.protocol", "smtp");
		properties.put("mail.smtp.host", emailServer);
		properties.put("mail.smtp.port", emailPort);
		
		// SMTP 인증이 필요한 경우 반드시 Properties에 SMTP 인증을 사용한다고 설정해야 한다. 그렇지 않으면 인증을 시도조차 않는다.
		properties.put("mail.smtp.auth", "true");
//		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.debug", "true");
		
		// 인증 환경 설정
		SendEmailAuthentication auth = new SendEmailAuthentication(authId, authPwd);
		
		// 보낼 서버와 연결한 세션 얻어오기
		Session session = Session.getDefaultInstance(properties, auth);
		session.setDebug(false);														// debug
		
		// 보낼 메세지 객체 생성
		MimeMessage message = new MimeMessage(session);			// 각 항목별(보낸사람이름, 제목, 본문, 본문헤더)로 인코딩이 깨질 수 있으므로, 세밀한 제어를 위해서 Message가 아니라 MimeMessage로 받는 것이 좋다.
		
		try {
			Address senderAddress = new InternetAddress(senderEmail, MimeUtility.encodeText(emailSenderName, emailEncType, "B"));
			Address[] receiverAddress = null;										// 수신자 이메일 주소 (String[] -> Address 변환)
			
			
			receiverAddress = new Address[1];
			
			if(email.length() > 0) {
				receiverAddress[0] = new InternetAddress(email);
			}
			//String subject = MimeUtility.encodeText(emailSubject, emailEncType, "B");
			
			String subject = "";
			// 이메일 발송 타입 (0 : 비밀번호 찾기, 1: 아이디 찾기, 2: 인증번호 발송, 3: 신청완료 발송)
			if (sendType == 0) {
				subject = MimeUtility.encodeText(emailSubject1, emailEncType, "B");			// B는 BASE64를 뜻함. Q는 Quoted-printable.
			} else if (sendType == 1) {
				subject = MimeUtility.encodeText(emailSubject2, emailEncType, "B");			// B는 BASE64를 뜻함. Q는 Quoted-printable.
			} else if (sendType == 2) {
				subject = MimeUtility.encodeText(emailSubject3, emailEncType, "B");			// B는 BASE64를 뜻함. Q는 Quoted-printable.
			} else {
				subject = MimeUtility.encodeText(emailSubject4, emailEncType, "B");			// B는 BASE64를 뜻함. Q는 Quoted-printable.
			}
//			
			// 값 설정
			message.setHeader("Content-Type", emailConType);
			message.setHeader("X-Mailer", "DreamSecurity Mail Client");
			message.setHeader("X-MSMail-Priority", "Normal");
			message.setHeader("X-Priority", "3");
			message.setHeader("Importance", "normal");												// 메일 중요도 표시 (low : 낮음, normal : 보통, high : 높음)
			message.setHeader("Return-Path", senderEmail);
			message.setFrom(senderAddress);															// 발신자
			message.addRecipients(Message.RecipientType.TO, receiverAddress);						// 수신자
			message.setSubject(subject);															// 제목
			message.setContent(htmlCon, emailConType);												// 내용
			message.setSentDate(new java.util.Date());												// 발신 시간
			message.saveChanges();
			
//			logger.info("[" + WorkUtil.getDateTimeLog() + "] ** try to connect host : [" + emailServer + "] with ID : [" + authId + "]");
			
			// 메일 보내기
			Transport.send(message);	// 이 시점에서 mail 서버 접속 및 발송이 수행. 이 전 단계는 준비과정.
			
//			logger.info("[" + WorkUtil.getDateTimeLog() + "] SUCCESS SEND EMAIL !!");
		} catch (MessagingException mex) {
			result = -1;
			
//			logger.error("\n    ** Exception handling in SendEmail.java");
			mex.printStackTrace();
			
			Exception ex = mex;
			
			do {
				if (ex instanceof SendFailedException) {
					SendFailedException sfex = (SendFailedException) ex;
					Address[] invalid = sfex.getInvalidAddresses();
					
					if (invalid != null) {
//						logger.error("[" + WorkUtil.getDateTimeLog() + "] ** Invalid Addresses");
						
						if (invalid != null) {
							for (int i = 0; i < invalid.length; i++)
								System.out.println(invalid[i]);
//								logger.error("         " + invalid[i]);
						}
					}
					
					Address[] validUnsent = sfex.getValidUnsentAddresses();
					
					if (validUnsent != null) {
//						logger.error("[" + WorkUtil.getDateTimeLog() + "] ** ValidUnsent Addresses");
						
						if (validUnsent != null) {
							for (int i = 0; i < validUnsent.length; i++)
								System.out.println(validUnsent[i]);
//								logger.error("[" + WorkUtil.getDateTimeLog() + "] validUnsent : " + validUnsent[i]);
						}
					}
					
					Address[] validSent = sfex.getValidSentAddresses();
					
					if (validSent != null) {
//						logger.error("[" + WorkUtil.getDateTimeLog() + "] ** ValidSent Addresses");
						
						if (validSent != null) {
							for (int i = 0; i < validSent.length; i++)
								System.out.println(validSent[i]);
//								logger.error(" [" + WorkUtil.getDateTimeLog() + "] validSent : " + validSent[i]);
						}
					}
				}
				
				if (ex instanceof MessagingException) {
					ex = ((MessagingException) ex).getNextException();
				} else {
					ex = null;
				}
			} while (ex != null);
		} catch (Exception e) {
			result = -1;
			e.printStackTrace(); 
		}
		
		return result;
	}
	
	/**
	 * 이메일 내용 변경
	 * @param id : 사용자 ID
	 * @param name : 사용자 이름
	 * @param tempCertNum : 요청정보
	 * @return html : 변경된 html
	 */
	private String createHtmlContents(String id, String cpName, String psName, String info, int sendType) {
		String html = null;
		File htmlFile = null;
		try {
			if (sendType == 0) {
				htmlFile = new File(emailFormatPath1);
			} else if (sendType == 1) {
				htmlFile = new File(emailFormatPath2);
			} else if (sendType == 2) {
				htmlFile = new File(emailFormatPath3);
			} else if (sendType == 3) {
				htmlFile = new File(emailFormatPath4);
			}
			
			Document doc = Jsoup.parse(htmlFile, "UTF-8");
			
			Elements userId = doc.select("span.user_id");
			userId.get(0).appendText(id);
			
			if(cpName != null && !"".equals(cpName)) {
				Elements userNm = doc.select("span.user_nm");
				userNm.get(0).appendText("(" + cpName + ")");
			}
			
			if(sendType != 3) {
				Elements tempInfo= doc.select("div.tempInfo");
				tempInfo.get(0).appendText(info);
			} else {
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				Date time = new Date();
				String today = format.format(time);
				
				Elements psNameInfo = doc.select("span.psName");
				psNameInfo.get(0).appendText(psName);
				
				Elements signUpDate= doc.select("span.signUpDate");
				signUpDate.get(0).appendText(today);
			}
			
			html = doc.toString();
		} catch (IOException ioe) {
			//ioe.printStackTrace();
//			LogUtil.printErr(ioe);
		} catch (Exception e) {
			//e.printStackTrace();
//			LogUtil.printErr(e);
		}
		
		return html;
	}
}
