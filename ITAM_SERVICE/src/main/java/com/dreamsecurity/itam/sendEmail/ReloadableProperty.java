package com.dreamsecurity.itam.sendEmail;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.util.Properties;

import org.apache.ibatis.io.Resources;

public class ReloadableProperty  {
//	protected final Logger logger = Logger.getLogger(this.getClass());

	Properties prop = null;
	
	static Long lastFileModifiedDate;
	
	public ReloadableProperty() {
		Reader reader;
		
		String fileNmae = "sendEmailConfig.properties";												// config 파일명
		String filePath = "C:/Users/dream/Desktop/ITAM_WorkSpace/ITAM/ITAM/src/main/java/" + fileNmae;						// 로컬 경로
//		String filePath = "/usr/local/tomcat7.0.92/webapps/ITAM/WEB-INF/classes/" + fileNmae;	// 운영 경로
		System.out.println("filePath : " + filePath);
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.config.ReloadableProperty - filePath : [" + filePath + "]");
//		logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.config.ReloadableProperty - fileNmae : [" + fileNmae + "]");
		
		File file = new File(filePath);
		
		if(prop == null) {
			try {
				prop = new Properties();
				
				if(file.exists()) {
//					logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.config.ReloadableProperty - property file is new !!");
					reader = Resources.getResourceAsReader(fileNmae);
					prop.load(reader);
					
					lastFileModifiedDate = file.lastModified();
//					logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.config.ReloadableProperty - lastFileModifiedDate : [" + lastFileModifiedDate + "]");
				} else {
//					logger.info("[" + WorkUtil.getDateTimeLog() + "] There is no property file !!!!");
				}				
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			if(file.exists()) {
				long modifiedDate = file.lastModified();
				
				if(lastFileModifiedDate != modifiedDate) {
//					logger.info("[" + WorkUtil.getDateTimeLog() + "] property file is modified !!!!!!!");
					
//					logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.config.ReloadableProperty - property file is modified !!");
//					logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.config.ReloadableProperty - modifiedDate : [" + modifiedDate + "]");
//					logger.info("[" + WorkUtil.getDateTimeLog() + "] com.dreamsecurity.motp.temp.config.ReloadableProperty - lastFileModifiedDate : [" + lastFileModifiedDate + "]");
					
					try {
						prop.clear();		// 기존 Property 정보 초기화
						
						reader = Resources.getResourceAsReader(fileNmae);
						prop.load(reader);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			} else {
//				logger.info("[" + WorkUtil.getDateTimeLog() + "] There is no property file !!!!");
			}
		}
	}
	
	public Properties getProp() {
		return prop;
	}
}
