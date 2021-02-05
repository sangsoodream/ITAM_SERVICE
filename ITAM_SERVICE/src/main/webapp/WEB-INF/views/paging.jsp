<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="pagenation_area_squar">
    <span class="con_btn_area_float_l">
        <span class="total_view_list">Total <span class="txt_blue" id="totalNum">${paging.totalListNum}</span> items</span> 
    </span>
    <div class="pagenation_squar">
        <ul class="list_page">
            <li><a href="javascript:pageMove('1');" class="btn_tb_back"><i class="la la-angle-double-left"></i></a></li>
            <li><a href="javascript:pageMove('${paging.CPageNum-1}');" class="btn_tb_back"><i class="la la-angle-left"></i></a></li>
            <c:set target="${paging}" property="startNum" value="${paging.startPageNum}"/>
            <c:forEach begin="${paging.startNum}" end="${paging.endPageNum}" var="i" step="1">
                <c:choose>
                <c:when test="${paging.CPageNum == i}">

                    <li class="now"><a href="#" class="active"><span>${i}</span></a></li>
                </c:when>
                <c:otherwise>
                    <li><a href="javascript:pageMove('${i}');"><span>${i}</span></a></li>
                </c:otherwise>
            </c:choose>
            </c:forEach>
            <li><a href="javascript:pageMove('${paging.CPageNum+1}');" class="btn_tb_next"><i class="la la-angle-right"></i></a></li>
            <li class="p_last" value="${paging.totalPageNum}"><a href="javascript:pageMove('${paging.totalPageNum}');" class="btn_tb_next"><i class="la la-angle-double-right"></i></a></li>
        </ul>
    </div>
    <span class="con_btn_area_float_r">
        <span class="tb_num_view">
                <select name="pn_list" onchange="javascript:pageMove('1');" id="pn" class="select">
                    <option value="10" <c:if test="${paging.baseNum eq '10'}">selected</c:if>>10</option>
                    <option value="20" <c:if test="${paging.baseNum eq '20'}">selected</c:if>>20</option>
                    <option value="30" <c:if test="${paging.baseNum eq '30'}">selected</c:if>>30</option>								
                </select>
        </span>
    </span>

    <form name="paging">
        <input type="hidden" name="cPageNum" value="">
        <input type="hidden" name="baseNum" value="">
    </form>
</div>