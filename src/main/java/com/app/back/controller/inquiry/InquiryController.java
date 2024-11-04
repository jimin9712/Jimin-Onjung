package com.app.back.controller.inquiry;


import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.service.inquiry.InquiryService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class InquiryController {
private final InquiryService inquiryService;
private final InquiryDTO inquiryDTO;
private final HttpSession session;

@GetMapping("/admin")   //관리자 페이지
public List<InquiryDTO> admin(Pagination pagination, Search search) {
    return inquiryService.getList(pagination,search);
}
@GetMapping("/admin/inquiry-page")  //문의 목록
@ResponseBody
 public Map<String, Object> getInquiryList(Pagination pagination, Search search, @RequestParam(required = false) String query, @RequestParam(required = false) String filterType){
    log.info("Controller - getList() 호출됨");
    log.info("검색어: {}", query);
    search.setKeyword(query);
    log.info("검색 키워드: {}", search.getKeyword());
    pagination.setOrder(filterType); // 기본 정렬 기준
    if (search.getKeyword() != null) {
        pagination.setTotal(inquiryService.getTotalWithSearch(search));
    } else {
        pagination.setTotal(inquiryService.getTotal());
    }
    pagination.progress();
    log.info("Pagination 시작 행: {}", pagination.getStartRow());
    log.info("Pagination 행 개수: {}", pagination.getRowCount());

    List<InquiryDTO> inquiries = null;
    if(filterType == null) {
        inquiries = inquiryService.getList(pagination, search);
    } else if(filterType.equals("최신순")) {

        inquiries = inquiryService.getList(pagination, search);
    } else {
        inquiries = inquiryService.getFilterList(pagination, search);
    }

    Map<String, Object> result = new HashMap<>();
    result.put("inquiries", inquiries);
    result.put("pagination", pagination);
    return result;

}

@GetMapping("/admin/inquiry-answer")
@ResponseBody
public Map<String, Object> getInquiryAnswer(@RequestParam Long id) {
    Optional<InquiryDTO> inquiry = inquiryService.getPost(id);
    Map<String, Object> result = new HashMap<>();
    if (inquiry.isPresent()) {
        result.put("success", true);
        result.put("inquiry", inquiry.get());
    } else {
        result.put("success", false);
        result.put("message", "Inquiry not found");
    }
    return result;
}



}

