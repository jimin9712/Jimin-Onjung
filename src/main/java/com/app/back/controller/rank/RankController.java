package com.app.back.controller.rank;

import com.app.back.domain.post.Pagination;
import com.app.back.service.member.MemberService;
import com.app.back.service.rank.RankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class RankController {
    private final RankService rankService;

    @GetMapping("/rank")
    @ResponseBody
    public String goToList(Pagination pagination, Model model, @RequestParam(required = false) String month, @RequestParam(required = false) String filterType) {
        if(month == null) {
            log.info("오류 : month 미 입력");
        }

        if(Integer.parseInt(month) > 0 && Integer.parseInt(month) <= 12) {
            model.addAttribute("vtRankMembers", rankService.selectTop5ByVt(Integer.parseInt(month)));
            model.addAttribute("supportRankMembers", rankService.selectTop5BySupport(Integer.parseInt(month)));
            model.addAttribute("donationRankMembers", rankService.selectTop5ByDonation(Integer.parseInt(month)));
        } else {
            log.info("오류 : month 범위 오류");
        }
        log.info("회원 봉사 랭킹 : {}", model.getAttribute("vtRankMembers"));
        log.info("회원 후원 랭킹 : {}", model.getAttribute("supportRankMembers"));
        log.info("회원 기부 랭킹 : {}", model.getAttribute("donationRankMembers"));

        pagination.setOrder(filterType);
        if (pagination.getOrder() == null || pagination.getOrder().equals("별점순")) {
            pagination.setOrder("별점순"); // 기본 정렬 기준
        } else if (pagination.getOrder().equals("리뷰순")) {
            pagination.setOrder("리뷰순");
        } else {
            log.info("오류 : filterType 미 입력");
        }
        pagination.setTotal(100);
        pagination.progressReview();
        model.addAttribute("volunteerGroups", rankService.getTop100VolunteerGroup(pagination));
        log.info("봉사활동 단체 회원 랭킹 목록 : {}", model.getAttribute("volunteerGroups"));

        return "review/review-list";
    }
}
