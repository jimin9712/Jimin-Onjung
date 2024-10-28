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

    @GetMapping("help")
    public String showHelpPage() {
        return "help/help";
    }
    @GetMapping("write")
    public String showWriteForm() {
        return "help/help-write"; // 문의 작성 페이지로 이동
    }

    @GetMapping("help-notification-list")
    public void getList(Pagination pagination, Search search, Model model, HttpServletRequest request) {
        log.info((String)request.getAttribute("data"));
        log.info("검색어: " + search.getKeyword());

        if (pagination.getOrder() == null) {
            pagination.setOrder("created_date desc, n.id desc"); // 기본 정렬 기준
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(noticeService.getTotalWithSearch(search));
        } else {
            pagination.setTotal(noticeService.getTotal());
        }
        pagination.progress();
        model.addAttribute("posts", noticeService.getList(pagination, search));
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



