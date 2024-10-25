package com.app.back.controller.review;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.service.review.ReviewService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/review/*")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewService reviewService;
    private final HttpSession session;

    @GetMapping("review-write")
    public String goToWriteForm(ReviewDTO reviewDTO) { return "review/review-write"; }

    @PostMapping("review-write")
    public RedirectView reviewWrite(ReviewDTO reviewDTO) {
        reviewDTO.setMemberId(1L);
        reviewDTO.setPostType("REVIEW");
        log.info("Received ReviewDTO: {}", reviewDTO);

        if (reviewDTO.getPostTitle() == null || reviewDTO.getPostContent() == null) {
            log.error("필수 데이터가 없습니다.");
            return new RedirectView("/review/review-write");
        }

        // 데이터가 문제없으면 세션에 저장
        session.setAttribute("review", reviewDTO);

        return new RedirectView("/review/review-list");
    }

    @GetMapping("review-list")
    public String goToList(ReviewDTO reviewDTO) { return "review/review-list"; }

    @GetMapping("review-update")
    public String goToUpdateForm(ReviewDTO reviewDTO) { return "review/review-update"; }
    @PostMapping("review-update")
    public RedirectView reviewUpdate(ReviewDTO reviewDTO) { return new RedirectView("/review/review-list"); }
}
