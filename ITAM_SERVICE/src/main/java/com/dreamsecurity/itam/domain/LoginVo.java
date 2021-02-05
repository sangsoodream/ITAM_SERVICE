package com.dreamsecurity.itam.domain;

public class LoginVo {

	private String cpId;			//고객사 아이디
	private String pwd;				//고객사 비밀번호
	private String cpName;			//고객사 명
	private String cpRegNum;		//고객사 사업자등록번호
	private String email;			//고객사 이메일
	private String psName;			//담당자 명
	private String salt;			//고객사 솔트
	private String freePriod;		//무료이용기간
	private String fStartDate;		//무료이용시작일
	private String fEndDate;		//무료이용종료일
	private String freeYn;			//무료이용 가능여부 (Y : 가능, N : 불가능)
	
	private String loginId;			//로그인 아이디
	private String loginPwd;		//로그인 패스워드
	
	public LoginVo() {}

	public LoginVo(String cpId, String pwd, String cpName, String cpRegNum, String email, String psName, String salt,
					String freePriod, String fStartDate, String fEndDate, String freeYn,
					String loginId, String loginPwd) {
		super();
		this.cpId = cpId;
		this.pwd = pwd;
		this.cpName = cpName;
		this.cpRegNum = cpRegNum;
		this.email = email;
		this.psName = psName;
		this.salt = salt;
		this.freePriod = freePriod;
		this.fStartDate = fStartDate;
		this.fEndDate = fEndDate;
		this.freeYn = freeYn;
		this.loginId = loginId;
		this.loginPwd = loginPwd;
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

	public String getPsName() {
		return psName;
	}

	public void setPsName(String psName) {
		this.psName = psName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
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

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getLoginPwd() {
		return loginPwd;
	}

	public void setLoginPwd(String loginPwd) {
		this.loginPwd = loginPwd;
	}
	
}
