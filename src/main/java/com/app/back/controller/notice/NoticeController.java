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
@RequestMapping("/notice/*")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {
    private final NoticeService noticeService;
    private final HttpSession session;

    @GetMapping("list")
    public void getList(Pagination pagination, Search search, Model model, HttpServletRequest request){
        log.info((String)request.getAttribute("data"));
        if(pagination.getOrder() == null){
            pagination.setOrder("recent");
        }
        if(search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(noticeService.getTotalWithSearch(search));
        }else{
            pagination.setTotal(postService.getTotal());
        }
        pagination.progress();
        model.addAttribute("posts", postService.getList(pagination, search));
    }

}
