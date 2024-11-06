package com.app.back.controller.rank;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.profile.ProfileDTO;
import com.app.back.service.member.MemberService;
import com.app.back.service.profile.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Controller
@RequestMapping("/rank")
@RequiredArgsConstructor
@Slf4j
public class RankController {
    private final MemberService memberService;

    @GetMapping("")
    public String goToList(Pagination pagination, Model model, @RequestParam(required = false) String month, @RequestParam(required = false) String filterType) {
        if (filterType == null) {
            pagination.setOrder("member_star_rate"); // 기본 정렬 기준
        } else if (filterType.equals("리뷰순")) {
            pagination.setOrder("count(r.id)");
        } else {
            log.info("오류 : filterType 미 입력");
        }
        pagination.setTotal(100);
        pagination.progressReview();
        model.addAttribute("volunteerGroups", memberService.getTop100VolunteerGroup(pagination));
        log.info("{}", memberService.getTop100VolunteerGroup(pagination));

        return "review/review-list";
    }
}
