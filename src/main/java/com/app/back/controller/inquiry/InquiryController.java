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

    @GetMapping
    public String getList(Pagination pagination, Search search, Model model, HttpServletRequest request) {
        List<InquiryDTO> inquiries = inquiryService.getList(pagination, search);
        model.addAttribute("inquiries", inquiries);

        return "admin";
    }


}
