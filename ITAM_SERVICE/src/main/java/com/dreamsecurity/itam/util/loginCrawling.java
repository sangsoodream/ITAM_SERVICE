package com.dreamsecurity.itam.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jsoup.Connection;
import org.jsoup.Jsoup;


public class loginCrawling {

	private static final String LOGIN_URL ="https://www.krsmart.com/Login/Login";
	//private static final String NEXT_URL = "https://www.krsmart.com";
	private static final String LIST_URL = "https://www.krsmart.com/RentalEquipStatus/Grid";
	
	public String loginCrawling(String id, String pwd){
		
			System.out.println("login Crawling 시작");
			System.out.println("id : " + id + " pwd : " + pwd );
		
			String cookie = "";
			try {
				cookie = doLogin(id,pwd);
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
			
			return cookie;
	}

	 private static String doLogin(String id, String pwd) throws IOException {
		
		Connection.Response loginPageConnection = getLoginResponse(id, pwd);
	
		return  getLoginCookie(loginPageConnection);
	}
	 
	 // 크롤링으로 로그인해서 로그인 쿠기 얻기
	 private static  Connection.Response getLoginResponse(String id, String pwd) throws IOException{
		 Map<String, String> cookies = new HashMap<>();
		cookies.put("id", id);
		cookies.put("password", pwd);
		
		return Jsoup.connect(LOGIN_URL)
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9")
                .header("Accept-Encoding", "gzip, deflate")
                .header("Accept-Language", "ko")
                .header("Cache-Control", "max-age=0")
                .header("Connection", "keep-alive")
                .header("Content-Length", "40")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Host", "www.krsmart.com")
                .header("Origin", "http://www.krsmart.com")
                .header("Referer", "http://www.krsmart.com/Login/Login")
                .header("Upgrade-Insecure-Requests", "1")
                .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36")
                .method(Connection.Method.POST)
                .data(cookies)
                .execute();
		
	 }
	 
	 private static String getLoginCookie(Connection.Response loginPageConnection){
		 Map<String, String> resCookies = loginPageConnection.cookies();
		
	     String cookie = resCookies.get("ASP.NET_SessionId");
	     System.out.println("cookie => ASP.NET_SessionId : [" + cookie + "]");
	     return cookie;
	 }
	 
	 
	 // rentalCode 크롤링 해서 렌타 정보 들고오기
//	 private static Connection.Response rentalPageInfo(String cookie, String rentalCode) throws IOException{
//		 return Jsoup.connect(LIST_URL)
//			.header("Accept", "*/*")
//            .header("Accept-Encoding", "gzip, deflate")
//            .header("Accept-Language", "ko")
//            .header("Cache-Control", "max-age=0")
//            .header("Connection", "keep-alive")
//            .header("Content-Length", "294")
//            .header("Content-Type", "application/json; charset=utf-8")
//            .header("Host", "www.krsmart.com")
//            .header("Origin", "http://www.krsmart.com")
//            .header("Referer", "http://www.krsmart.com/RentalEquipStatus")
//            .header("X-Requested-With", "XMLHttpRequest")
//            .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36")
//            .header("Cookie", "ASP.NET_SessionId=" + cookie + ";")
//            .method(Connection.Method.POST)
//            .ignoreContentType(true)
//            .requestBody("{\"skip\":0,\"take\":5000,\"출고일자시작일\":\"\",\"출고일자종료일\":\"\",\"반납일자시작일\":\"\",\"반납일자종료일\":\"\",\"계약번호\":\"\",\"자산번호\":\""+rentalCode+"\",\"모델명\":\"\",\"시리얼번호\":\"\",\"소속부서\":\"\",\"사용자\":\"\",\"정렬\":{\"selector\":\"\",\"desc\":false},\"필터\":{}}")
//            .execute();	
//	 }
	 
}
