package com.dreamsecurity.itam.util;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.jsoup.Connection;
import org.jsoup.select.*;

public class CrawlingResponseParser {

    public static List<RentalInfo> getRentalInfo(Connection.Response parameter) throws Exception {
        
    	String response = parameter.body();
        JSONParser jsonParser = new JSONParser();
        Object simpleObject = jsonParser.parse(response);
        JSONObject jsonObject = (JSONObject)jsonParser.parse(simpleObject.toString());

        JSONArray array = (JSONArray) jsonObject.get("items");
        List<RentalInfo> result = new ArrayList();
        int count = array.size();
        
        for(int i = 0; i < count; i++){
            RentalInfo item = new RentalInfo((JSONObject) array.get(i));
            //System.out.println(array.get(i));
            result.add(item);
        }

        return result;
    }
}
