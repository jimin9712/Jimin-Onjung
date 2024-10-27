package com.app.back.controller.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.service.donation.DonationService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/donation/*")
@RequiredArgsConstructor
@Slf4j
public class DonationController {
    private final DonationService donationService;
    private final HttpSession session;

    @GetMapping("donation-write")
    public String goToWriteForm(DonationDTO donationDTO) { return "donation/donation-write"; }

    @PostMapping("donation-write")
    public RedirectView donationWrite(DonationDTO donationDTO) {
        donationDTO.setMemberId(1L);
        donationDTO.setPostType("DONATION");
        log.info("Received donationDTO: {}", donationDTO);

        if (donationDTO.getPostTitle() == null || donationDTO.getPostContent() == null) {
            log.error("필수 데이터가 없습니다.");
            return new RedirectView("/donation/donation-write");
        }

        // 데이터가 문제없으면 세션에 저장
        session.setAttribute("donation", donationDTO);

        return new RedirectView("/donation/donation-list");
    }

    @GetMapping("donation-list")
    public String goToList(DonationDTO donationDTO) { return "donation/donation-list"; }

    @GetMapping("donation-update")
    public String goToUpdateForm(DonationDTO donationDTO) { return "donation/donation-update"; }

    @PostMapping("donation-update")
    public RedirectView donationUpdate(DonationDTO donationDTO) { return new RedirectView("/donation/donation-list"); }

    @GetMapping("review-delete")
    public RedirectView reviewDelete(ReviewDTO reviewDTO) { return new RedirectView("/review/review-list"); }
}
