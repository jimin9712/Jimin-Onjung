package com.app.back.controller.notice;


import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.service.notice.NoticeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/help/*")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {
    private final NoticeService noticeService;
    private final HttpSession session;

    @GetMapping("help-notification-list")
    public void getList(Pagination pagination, Search search, Model model, HttpServletRequest request) {
        log.info("조회된 게시물 목록: " + noticeService.getList(pagination, search));

        // 요청에서 "data"라는 속성 값을 로그로 출력
        log.info((String) request.getAttribute("data"));

        // 페이징의 정렬(order)이 설정되지 않았을 경우 기본값을 "recent"로 설정
        if (pagination.getOrder() == null) {
            pagination.setOrder("recent");
        }

        // 페이징 처리 진행 (페이지 번호 및 페이징 관련 설정 업데이트)
        pagination.progress();

        // 검색 조건 및 페이징에 맞는 게시물 목록을 조회하여 모델에 추가
        model.addAttribute("posts", noticeService.getList(pagination, search));
    }


}
