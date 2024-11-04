package com.app.back.controller.inquiry;

import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry_answer.InquiryAnswerDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.service.inquiry.InquiryService;
import com.app.back.service.inquiryAnswer.InquiryAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class InquiryController {
    private final InquiryService inquiryService;
    private final InquiryAnswerService inquiryAnswerService;

@GetMapping("/admin")   // 관리자 페이지
public List<InquiryDTO> admin(Pagination pagination, Search search) {
    return inquiryService.getList(pagination, search);
}

@GetMapping("/admin/inquiry-page")  // 문의 목록
@ResponseBody
public Map<String, Object> getInquiryList(Pagination pagination, Search search, @RequestParam(required = false) String query, @RequestParam(required = false) String filterType) {
    search.setKeyword(query);
    pagination.setOrder(filterType); // 기본 정렬 기준

    if (search.getKeyword() != null) {
        pagination.setTotal(inquiryService.getTotalWithSearch(search));
    } else {
        pagination.setTotal(inquiryService.getTotal());
    }
    pagination.progress();

    List<InquiryDTO> inquiries;
    if (filterType == null) {
        inquiries = inquiryService.getList(pagination, search);
    } else if (filterType.equals("최신순")) {
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

@PostMapping("/admin/inquiry-answer")
@ResponseBody
public Map<String, Object> submitAnswer(@RequestBody InquiryAnswerDTO inquiryAnswerDTO) {
    Map<String, Object> result = new HashMap<>();

    try {
        inquiryAnswerService.write(inquiryAnswerDTO); // 답변 서비스 호출
        inquiryService.updateInquiryStatus(inquiryAnswerDTO.getInquiryId(), "COMPLETE"); // 문의 상태 변경

        result.put("success", true);
    } catch (Exception e) {
        // 오류 메시지를 담아서 반환
        result.put("success", false);
        result.put("message", "답변 삽입 중 오류 발생");
    }
    return result;
}

    @GetMapping("/my-inquirys/{memberId}")
    @ResponseBody
    public List<InquiryDTO> getMyInquirys(
            @PathVariable Long memberId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate){

        log.info("받은 회원 ID: {}, 시작 날짜: {}, 끝 날짜: {}",
                memberId, startDate, endDate);

        if (startDate != null && endDate != null) {
            return inquiryService.findByMemberIdAndDateRange(memberId, startDate, endDate);
        } else {
            return inquiryService.findByMemberId(memberId);
        }
    }


}
