package com.app.back.controller.inquiry;
import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry_answer.InquiryAnswerDTO;
import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.post.Search;
import com.app.back.service.inquiry.InquiryService;
import com.app.back.service.inquiryAnswer.InquiryAnswerService;
import com.app.back.service.notice.NoticeService;
import com.app.back.service.post.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.*;

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
    private final InquiryAnswerService inquiryAnswerService;
    private final NoticeService noticeService;
    private final PostService postService;

@GetMapping("/admin")   // 관리자 페이지
public List<InquiryDTO> admin(Pagination pagination, Search search) {
    return inquiryService.getList(pagination, search);
}

@GetMapping("/admin/inquiry-page")  // 문의 목록
@ResponseBody
//  MAP : 여러 종류의 데이터를 한번에 담을 수 있는 구조이다.
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

//    result를 사용하면 응답 데이터 구조화, 확장성, 상태와 데이터를 함께 전닿할 수 있다.
    Map<String, Object> result = new HashMap<>();
    result.put("inquiries", inquiries);
    result.put("pagination", pagination);
    return result;
}
//  문의 조회
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
//  문의 조회에서 답변하기
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
//  공지사항 목록
@GetMapping("/admin/notice-list")
@ResponseBody
public Map<String, Object> getNoticeList(Pagination pagination, Search search, @RequestParam(required = false) String query) {
    // 검색어 설정
    search.setKeyword(query);
    pagination.setOrder("created_date desc"); // 기본 정렬 기준 설정

    // 공지사항의 총 개수를 설정 (검색어에 따라 다름)
    if (search.getKeyword() != null) {
        pagination.setTotal(noticeService.getTotalWithSearch(search));
    } else {
        pagination.setTotal(noticeService.getTotal());
    }
    pagination.progress();

    // 공지사항 목록 가져오기 (필터 없이 기본 목록만)
    List<NoticeDTO> notis = noticeService.getList(pagination, search);

    // 결과를 Map에 담아 JSON 형태로 반환
    Map<String, Object> result = new HashMap<>();
    result.put("notis", notis);
    result.put("pagination", pagination);
    log.info("공지사항 목록 반환: {}", notis); // 응답 로그
    return result;
}

//    공지사항 조회
@GetMapping("/admin/notice-detail")
@ResponseBody
public Map<String, Object> getNoticeRead(@RequestParam Long id) {
    Optional<NoticeDTO> notice = noticeService.getPost(id);
    Map<String, Object> result = new HashMap<>();

    if (notice.isPresent()) {
        result.put("success", true);
        result.put("inquiry", notice.get());
    } else {
        result.put("success", false);
        result.put("message", "조회를 못 했어요");
    }
    return result;
}
//  게시글 목록
@GetMapping("/admin/post-list")
@ResponseBody
public Map<String, Object> getPostList(Pagination pagination, Search search, @RequestParam(required = false) String postType) {
    pagination.setOrder("created_date desc"); // 기본 정렬 기준 설정
    // 총 게시글 수 설정
    if (search.getKeyword() != null) {
        pagination.setTotal(postService.getTotalWithSearch(search)); // 검색어가 있는 경우
    } else {
        pagination.setTotal(postService.getPostTotal());
    }
    pagination.progress(); // 페이지네이션 계산

    // 게시글 목록 조회
    List<PostDTO> posts = postService.getList(pagination, search);

    // 결과를 Map에 담아 반환
    Map<String, Object> result = new HashMap<>();
    result.put("posts", posts);
    result.put("pagination", pagination);
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
