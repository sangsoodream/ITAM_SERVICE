package com.dreamsecurity.itam.util;

import org.json.simple.JSONObject;


public class RentalInfo {
    Long id;
    String assetType;  			//자산구분
    String contractNum; 		//계약번호
    String assetNumber; 		//자산번호
    String objectName;			//제품명
    String modelName;			//모델명
    String productName;			//품명
    String serialNum;			//시리얼번호
    String contractStatus; 		//계약상태
    String startday;			//출고일자
    String endday;				//반납예정일
    String rentalMoney;			//렌탈료
    String makeCompany;			//제조사명
    
    public RentalInfo(JSONObject parameter){
    	 this.id = Long.parseLong("" + (parameter.get("행번호") == null?0:parameter.get("행번호")));
         this.assetType = parameter.get("자산구분") != null? "" + parameter.get("자산구분") : null;
         this.contractNum = parameter.get("계약번호") != null? "" + parameter.get("계약번호") : null;
         this.assetNumber = parameter.get("자산번호") != null? "" + parameter.get("자산번호") : null;
         this.objectName = parameter.get("제품명") != null? "" + parameter.get("제품명") : null;
         this.modelName = parameter.get("모델명") != null? "" + parameter.get("모델명") : null;
         this.productName = parameter.get("품명") != null? "" + parameter.get("품명") : null;
         this.serialNum = parameter.get("시리얼번호") != null? "" + parameter.get("시리얼번호") : null;
         this.contractStatus = parameter.get("계약상태") != null? "" + parameter.get("계약상태") : null;
         this.startday = parameter.get("출고일자") != null? "" + parameter.get("출고일자") : null;
         this.endday = parameter.get("반납예정일") != null? "" + parameter.get("반납예정일") : null;
         this.rentalMoney = parameter.get("렌탈료") != null? "" + parameter.get("렌탈료") : null;
         this.makeCompany = parameter.get("제조사명") != null? "" + parameter.get("제조사명") : null;
         
    }
    
    public Long getId() {
		return id;
	}
    
	public void setId(Long id) {
		this.id = id;
	}

	public String getAssetType() {
		return assetType;
	}

	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}

	public String getContractNum() {
		return contractNum;
	}

	public void setContractNum(String contractNum) {
		this.contractNum = contractNum;
	}

	public String getAssetNumber() {
		return assetNumber;
	}

	public void setAssetNumber(String assetNumber) {
		this.assetNumber = assetNumber;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getSerialNum() {
		return serialNum;
	}

	public void setSerialNum(String serialNum) {
		this.serialNum = serialNum;
	}

	public String getContractStatus() {
		return contractStatus;
	}

	public void setContractStatus(String contractStatus) {
		this.contractStatus = contractStatus;
	}

	public String getStartday() {
		return startday;
	}

	public void setStartday(String startday) {
		this.startday = startday;
	}

	public String getEndday() {
		return endday;
	}

	public void setEndday(String endday) {
		this.endday = endday;
	}

	public String getRentalMoney() {
		return rentalMoney;
	}

	public void setRentalMoney(String rentalMoney) {
		this.rentalMoney = rentalMoney;
	}

	public String getMakeCompany() {
		return makeCompany;
	}

	public void setMakeCompany(String makeCompany) {
		this.makeCompany = makeCompany;
	}

//	public String toString(){
//    	
//    	return "행번호" + this.id + " 자산구분" + this.assetType + " 계약번호" + this.contractNum + " 자산번호" + this.assetNumber + " 제품명"
//    			+ this.objectName + " 모델명" + this.modelName +  " 품명" + this.productName +  " 시리얼번호" + this.serialNum + " 계약상태"  + this.contractStatus; 
//    }
 
    public String toString(){
    	return "행번호" + this.id + "렌탈 자산번호  : " + "[" + this.assetNumber +"]" + "출고일자"   + "[" + this.startday +"]" + "반납예정일" + "[" + this.endday +"]" + "렌탈료" + "[" + this.rentalMoney +"]" 
    			+ "제조사명" + "[" + this.makeCompany + "]"  + "모델명" + "[" + this.modelName + "]" + "시리얼번호" + "[" + this.serialNum + "]"; 
    } 
}
