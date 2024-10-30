package com.app.back.controller.inquiry;


import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.service.inquiry.InquiryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class InquiryController {
    private final InquiryService inquiryService;
    private final HttpSession session;


    @GetMapping("/inquiry-list")
    public String getList(Pagination pagination, Search search, Model model, HttpServletRequest request) {
        log.info("Controller - getList() 호출됨");
        log.info("페이지네이션 정보: {}", pagination);
        log.info("검색 조건: {}", search);

        if (pagination.getOrder() == null) {
            pagination.setOrder("created_date desc, n.id desc"); // 기본 정렬 기준
        }

        if (search.getKeyword() != null) {
            pagination.setTotal(inquiryService.getTotalWithSearch(search));
        } else {
            pagination.setTotal(inquiryService.getTotal());
        }
        log.info("총 데이터 개수 설정됨: {}", pagination.getTotal());

        pagination.progress();
        log.info("페이지네이션 정보 (progress 후): {}", pagination);
        List<InquiryDTO> inquiries = inquiryService.getList(pagination, search);
        System.out.println("조회된 데이터: " + inquiries);


        model.addAttribute("inquiries", inquiries);
        model.addAttribute("pagination", pagination);
        model.addAttribute("search", search);


        return "admin";
    }


}

