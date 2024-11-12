package com.app.back.controller.inquiry;
import com.app.back.domain.admin.AdminDTO;
import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry_answer.InquiryAnswerDTO;
import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.post.Search;
import com.app.back.domain.report.ReportDTO;
import com.app.back.enums.AdminPostStatus;
import com.app.back.enums.AdminPostType;
import com.app.back.enums.AdminReportStatus;
import com.app.back.service.inquiry.InquiryService;
import com.app.back.service.inquiryAnswer.InquiryAnswerService;
import com.app.back.service.notice.NoticeService;
import com.app.back.service.post.PostService;
import com.app.back.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.*;

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
    private final ReportService reportService;

@GetMapping("/admin")   // 관리자 페이지
public List<InquiryDTO> admin(Pagination pagination, Search search) {
    return inquiryService.getList(pagination, search);
}

@GetMapping("/admin/inquiry-page")
@ResponseBody
public AdminDTO getInquiryList(Pagination pagination, Search search, @RequestParam(required = false) String query, @RequestParam(required = false) String filterType) {
    // 검색어 설정
    search.setKeyword(query);

    int total;
    if (filterType == null || filterType.equals("최신순")) {
        total = inquiryService.getTotalWithSearch(search);
    } else {
        total = inquiryService.getTotalWithFilter(search, filterType);
    }

    pagination.setTotal(total);
    pagination.progress();

    List<InquiryDTO> inquiries;
    if (filterType == null || filterType.equals("최신순")) {
        inquiries = inquiryService.getList(pagination, search);
    } else {
        inquiries = inquiryService.getFilterList(pagination, search, filterType);
    }

    AdminDTO adminDTO = new AdminDTO();
    adminDTO.setInquiries(inquiries);
    adminDTO.setPagination(pagination);

    return adminDTO;
}

    //  문의 조회
@GetMapping("/admin/inquiry-answer")
@ResponseBody
public AdminDTO getInquiryAnswer(@RequestParam Long id) {
    Optional<InquiryDTO> inquiry = inquiryService.getPost(id);
    AdminDTO result = new AdminDTO();

    if (inquiry.isPresent()) {
        result.setInquiries(List.of(inquiry.get()));
        result.setPagination(new Pagination());  // 기본 Pagination 객체 설정
    } else {
        result.setInquiries(List.of());
    }

    return result;
}

//  문의 조회에서 답변하기
@PostMapping("/admin/inquiry-answer")
@ResponseBody
public AdminDTO submitAnswer(@RequestBody InquiryAnswerDTO inquiryAnswerDTO) {
    AdminDTO result = new AdminDTO();

    try {
        inquiryAnswerService.write(inquiryAnswerDTO); // 답변 서비스 호출
        inquiryService.updateInquiryStatus(inquiryAnswerDTO.getInquiryId(), "COMPLETE"); // 문의 상태 변경

        result.setInquiries(List.of());  // 성공 시 빈 리스트 반환
        result.setPagination(new Pagination()); // 기본 Pagination 객체 설정
    } catch (Exception e) {
        result.setInquiries(List.of());
    }

    return result;
}


//  공지사항 목록
@GetMapping("/admin/notice-list")
@ResponseBody
public AdminDTO getNoticeList(Pagination pagination, Search search, @RequestParam(required = false) String query) {
    // 검색어 설정
    search.setKeyword(query);
    pagination.setOrder("created_date desc"); // 정렬 기준 설정 (최신순)

    // 검색어가 있을 경우 검색된 총 개수 조회
    if (search.getKeyword() != null) {
        pagination.setTotal(noticeService.getTotalWithSearch(search));
    } else {
        // 검색어가 없을 경우 전체 개수 조회
        pagination.setTotal(noticeService.getTotal());
    }

    // 페이징 처리 진행
    pagination.progress();

    // 공지사항 목록 조회
    List<NoticeDTO> notices = noticeService.getList(pagination, search);
    // 결과를 담을 AdminDTO 객체 생성
    AdminDTO result = new AdminDTO();
    result.setNotices(notices); // 조회된 공지사항 목록을 AdminDTO에 담기
    result.setPagination(pagination); // 페이징 정보도 담기

    return result;
}



// 공지사항 조회
@GetMapping("/admin/notice-detail")
@ResponseBody
public AdminDTO getNoticeRead(@RequestParam Long id) {
    Optional<NoticeDTO> notice = noticeService.getPost(id);

    AdminDTO result = new AdminDTO();

    if (notice.isPresent()) {
        result.setSuccess(true); // success 필드 설정
        result.setNotice(notice.get()); // 조회된 notice를 AdminDTO의 필드에 담기
    } else {
        result.setSuccess(false); // 실패 처리
        result.setMessage("조회를 못 했어요"); // 실패 메시지
    }

    return result;
}



@GetMapping("/admin/post-list")
@ResponseBody
public AdminDTO getPostList(Pagination pagination, Search search, @RequestParam(required = false) String query, @RequestParam(required = false) String filterType) {
    search.setKeyword(query);
    int total;

    if (filterType == null || filterType.equals("작성일 순")) {
        pagination.setOrder("작성일 순");
        total = postService.getTotalWithSearch(search);
    } else if (filterType.equals("조회수 순") || filterType.equals("댓글수 순")) {
        pagination.setOrder(filterType);
        total = postService.getTotalWithSearch(search);
    } else {
        try {
            AdminPostType postTypeEnum = AdminPostType.fromDisplayName(filterType); // displayName으로 변환
            total = postService.getTotalWithFilter(search, postTypeEnum);
        } catch (IllegalArgumentException e) {
            total = 0;
        }
    }

    pagination.setTotal(total);
    pagination.progress();

    List<PostDTO> posts;
    if (pagination.getOrder() != null && (pagination.getOrder().equals("작성일 순") || pagination.getOrder().equals("조회수 순") || pagination.getOrder().equals("댓글수 순"))) {
        posts = postService.getList(pagination, search);
    } else {
        try {
            AdminPostType postTypeEnum = AdminPostType.fromDisplayName(filterType); // displayName으로 변환
            posts = postService.getFilterList(pagination, search, postTypeEnum);
        } catch (IllegalArgumentException e) {
            posts = List.of();
        }
    }

    AdminDTO result = new AdminDTO();
    result.setPosts(posts);
    result.setPagination(pagination);

    return result;
}


@GetMapping("/admin/post-detail")
@ResponseBody
public AdminDTO getPostDetail(@RequestParam Long id) {
    Optional<PostDTO> post = postService.getPost(id);

    AdminDTO result = new AdminDTO();

    if (post.isPresent()) {
        result.setSuccess(true); // success 필드 설정
        result.setPost(post.get()); // 조회된 post를 AdminDTO의 필드에 담기
    } else {
        result.setSuccess(false); // 실패 처리
        result.setMessage("Post not found"); // 실패 메시지
    }

    return result;
}

// 게시글 삭제 (논리 삭제)
@PatchMapping("/admin/delete-posts")
public void deletePosts(@RequestBody List<Long> postIds) {
    postIds.forEach(postId -> postService.updateStatus(postId, AdminPostStatus.DELETED));
}

// 게시글 상태 업데이트
@PatchMapping("/admin/update-post-status")
public void updatePostStatus(@RequestParam Long id, @RequestParam AdminPostStatus status) {
    postService.updateStatus(id, status);
}

@GetMapping("admin/report-list")
@ResponseBody
public AdminDTO getReportList(Pagination pagination, Search search, @RequestParam(required = false) String query, @RequestParam(required = false) String filterType) {
    search.setKeyword(query);

    int total;
    if (filterType == null || filterType.equals("신고일 순")) {
        total = reportService.getTotalReportsWithSearch(search);
    } else {
        total = reportService.getTotalReportsWithFilter(search, filterType);
    }

    pagination.setTotal(total);
    pagination.progress();

    List<ReportDTO> reports;
    if (filterType == null || filterType.equals("신고일 순")) {
        reports = reportService.getAllReports(pagination, search);
    } else {
        reports = reportService.getFilteredReports(pagination, search, filterType);
    }

    AdminDTO result = new AdminDTO();
    result.setReports(reports);
    result.setPagination(pagination);

    return result;
}

// 신고 삭제 (softdelete)
@PatchMapping("/admin/delete-reports")
public void deleteReports(@RequestBody List<Long> reportIds) {
    reportIds.forEach(reportService::deleteReport);
}

// 게시글 상태 업데이트
@PatchMapping("/admin/update-report-statu")
public void updateReportStatus(@RequestParam Long id, @RequestParam AdminPostStatus status) {
    postService.updateStatus(id, status);
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
