package com.app.back.controller.notice;


import com.app.back.domain.notice.NoticeDTO;
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
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/help/*")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {
    private final NoticeService noticeService;
    private final HttpSession session;

    @GetMapping("help-notification-list")
    public void getList(Pagination pagination, Search search, Model model, HttpServletRequest request) {
        // 기본 페이지 설정
        if (pagination.getPage() == null) {
            pagination.setPage(1);
        }
        // 전체 게시글 수 조회 및 설정
        int total = noticeService.getTotalWithSearch(search);
        pagination.setTotal(total);

        // 페이징 진행 설정
        pagination.progress();

        // 게시글 목록 조회 및 로그 출력
        List<NoticeDTO> posts = noticeService.getList(pagination, search);
        log.info("조회된 게시물 목록: " + posts);
        log.info("검색 조건: " + search);
        log.info("페이징 정보: " + pagination);

        // 모델에 게시물 추가
        model.addAttribute("posts", posts);
        model.addAttribute("pagination", pagination);
    }

    @GetMapping("/help/help-notification-inquiry")
    public String getNoticeDetail(@RequestParam("id") Long id, Model model) {
        Optional<NoticeDTO> notice = noticeService.getPost(id);
        if (notice.isPresent()) {
            model.addAttribute("notice", notice.get());
            return "help/help-notification-inquiry"; // 조회 페이지로 이동
        } else {
            return "redirect:/help/help-notification-list"; // 없는 경우 목록 페이지로 리다이렉트
        }
    }


}



