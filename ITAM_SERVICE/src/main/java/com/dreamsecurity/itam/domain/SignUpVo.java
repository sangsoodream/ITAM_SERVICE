package com.dreamsecurity.itam.domain;

public class SignUpVo {

	private String cpId;			//고객사 아이디
	private String pwd;				//고객사 비밀번호
	private String cpName;			//고객사 명
	private String cpRegNum;		//고객사 사업자등록번호
	private String cpCeo;			//고객사 대표자 명
	private String phNum;			//고객사 전호번호
	private String fax;				//고객사 팩스번호
	private String email;			//고객사 이메일
	private String psName;			//고객사 담당자 명
	private String zipCode;			//고객사 우편번호
	private String addr1;			//고객사 주소(도/시, 군, 구, 동)
	private String addr2;			//고객사 상세주소
	private String regMemo;			//고객사 요청사항
	private String freePriod;		//무료이용기간
	private String fStartDate;		//무료이용시작일
	private String fEndDate;		//무료이용종료일
	private String freeYn;			//무료이용 가능여부 (Y : 가능, N : 불가능)
	private String initContDate;	//최초계약일시
	private String salt;			//고객사 솔트
	private String regDate;			//등록일시
	private String updateDate;		//수정일시
	
	private String regNum;			//등록번호
	private String cpRegImg;		//사업자등록증 이미지명
	private String orgCpRegImg;		//사업자등록증 이미지 원본명
	
	private String contNum;			//계약번호
	private String contStatus;		//계약상태 (0 : 신청, 1 : 승인(무료이용만료), 2 : 계약, 3 : 계약종료(계약기간만료, 계약해지), 4 : 재계약, 5 : 서비스중지, 6 : 서비스해지)
	
	public SignUpVo() {}

	public SignUpVo(String cpId, String pwd, String cpName, String cpRegNum, String cpCeo, String phNum, String fax,
					String email, String psName, String zipCode, String addr1, String addr2, String regMemo, String freePriod,
					String fStartDate, String fEndDate, String freeYn, String initContDate,
					String salt, String regDate, String updateDate, String regNum, String cpRegImg, String orgCpRegImg,
					String contNum, String contStatus) {
		super();
		this.cpId = cpId;
		this.pwd = pwd;
		this.cpName = cpName;
		this.cpRegNum = cpRegNum;
		this.cpCeo = cpCeo;
		this.phNum = phNum;
		this.fax = fax;
		this.email = email;
		this.psName = psName;
		this.zipCode = zipCode;
		this.addr1 = addr1;
		this.addr2 = addr2;
		this.regMemo = regMemo;
		this.freePriod = freePriod;
		this.fStartDate = fStartDate;
		this.fEndDate = fEndDate;
		this.freeYn = freeYn;
		this.initContDate = initContDate;
		this.salt = salt;
		this.regDate = regDate;
		this.updateDate = updateDate;
		this.regNum = regNum;
		this.cpRegImg = cpRegImg;
		this.orgCpRegImg = orgCpRegImg;
		this.contNum = contNum;
		this.contStatus = contStatus;
	}

	public String getCpId() {
		return cpId;
	}

	public void setCpId(String cpId) {
		this.cpId = cpId;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getCpName() {
		return cpName;
	}

	public void setCpName(String cpName) {
		this.cpName = cpName;
	}

	public String getCpRegNum() {
		return cpRegNum;
	}

	public void setCpRegNum(String cpRegNum) {
		this.cpRegNum = cpRegNum;
	}

	public String getCpCeo() {
		return cpCeo;
	}

	public void setCpCeo(String cpCeo) {
		this.cpCeo = cpCeo;
	}

	public String getPhNum() {
		return phNum;
	}

	public void setPhNum(String phNum) {
		this.phNum = phNum;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPsName() {
		return psName;
	}

	public void setPsName(String psName) {
		this.psName = psName;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getAddr1() {
		return addr1;
	}

	public void setAddr1(String addr1) {
		this.addr1 = addr1;
	}

	public String getAddr2() {
		return addr2;
	}

	public void setAddr2(String addr2) {
		this.addr2 = addr2;
	}

	public String getRegMemo() {
		return regMemo;
	}

	public void setRegMemo(String regMemo) {
		this.regMemo = regMemo;
	}

	public String getFreePriod() {
		return freePriod;
	}

	public void setFreePriod(String freePriod) {
		this.freePriod = freePriod;
	}

	public String getfStartDate() {
		return fStartDate;
	}

	public void setfStartDate(String fStartDate) {
		this.fStartDate = fStartDate;
	}

	public String getfEndDate() {
		return fEndDate;
	}

	public void setfEndDate(String fEndDate) {
		this.fEndDate = fEndDate;
	}

	public String getFreeYn() {
		return freeYn;
	}

	public void setFreeYn(String freeYn) {
		this.freeYn = freeYn;
	}

	public String getInitContDate() {
		return initContDate;
	}

	public void setInitContDate(String initContDate) {
		this.initContDate = initContDate;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getRegNum() {
		return regNum;
	}

	public void setRegNum(String regNum) {
		this.regNum = regNum;
	}

	public String getCpRegImg() {
		return cpRegImg;
	}

	public void setCpRegImg(String cpRegImg) {
		this.cpRegImg = cpRegImg;
	}

	public String getOrgCpRegImg() {
		return orgCpRegImg;
	}

	public void setOrgCpRegImg(String orgCpRegImg) {
		this.orgCpRegImg = orgCpRegImg;
	}

	public String getContNum() {
		return contNum;
	}

	public void setContNum(String contNum) {
		this.contNum = contNum;
	}

	public String getContStatus() {
		return contStatus;
	}

	public void setContStatus(String contStatus) {
		this.contStatus = contStatus;
	}

}
