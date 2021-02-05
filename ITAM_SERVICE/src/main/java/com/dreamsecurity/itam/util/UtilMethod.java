package com.dreamsecurity.itam.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class UtilMethod {

	public String getCurrentDate() {
		
		SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat ("yyyy-MM-dd", Locale.KOREA);
		Date currentTime = new Date ();
		String cDate = mSimpleDateFormat.format (currentTime);
		
		return cDate;
	}
	
	public Date strToDate(String date) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date result = sdf.parse(date);
		
		return result;
	}
}
