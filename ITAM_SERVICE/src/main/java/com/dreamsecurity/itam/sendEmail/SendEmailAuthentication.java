package com.dreamsecurity.itam.sendEmail;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class SendEmailAuthentication extends Authenticator {
//protected final Logger logger = Logger.getLogger(this.getClass());
	
	private static String id = null;
	private static String password = null;
	
	public SendEmailAuthentication(String authId, String authPw) {
		id = authId;
		password = authPw;
	}
	
	@Override
	protected PasswordAuthentication getPasswordAuthentication() {
		if (id == null || password == null) {
			//logger.info("[" + WorkUtil.getDateTimeLog() + "] ID or Password Iincorrect");
		}
		
		return new PasswordAuthentication(id, password);
	}
}
