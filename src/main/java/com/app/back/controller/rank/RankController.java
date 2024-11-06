package com.app.back.controller.rank;

import com.app.back.domain.post.Pagination;
import com.app.back.service.member.MemberService;
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
    private final MemberService memberService;

    @GetMapping("/rank")
    @ResponseBody
    public String goToList(Pagination pagination, Model model, @RequestParam(required = false) String month, @RequestParam(required = false) String filterType) {
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
        model.addAttribute("volunteerGroups", memberService.getTop100VolunteerGroup(pagination));
        log.info("봉사활동 단체 회원 랭킹 목록 : {}", memberService.getTop100VolunteerGroup(pagination));

        if(month != null) {

        }


        return "review/review-list";
    }
}
