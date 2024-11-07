package com.app.back.controller.volunteer;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.mapper.volunteer.VolunteerMapper;
import com.app.back.service.post.PostService;
import com.app.back.service.volunteer.VolunteerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller // 이 클래스가 컨트롤러임을 나타냄
@RequestMapping("/volunteer/*") // QA 관련 요청을 처리
@RequiredArgsConstructor // 생성자 자동 생성
@Slf4j // 로깅 기능 추가
public class VolunteerController {
    private final PostService postService;
    private final VolunteerService volunteerService;
    private final VolunteerMapper volunteerMapper;

    @GetMapping("volunteer-write")
    public String goToWriteForm(VolunteerDTO volunteerDTO) {
        return "volunteer/volunteer-write";
    }

//    @PostMapping("volunteer-write")
//    public RedirectView volunteerWrite(VolunteerDTO volunteerDTO) throws IOException {
//        volunteerDTO.setMemberId(1L);
//        volunteerDTO.setPostType("VOLUNTEER");
////        volunteerDTO.setPostTitle(volunteerDTO.getVtGroupName());
//        log.info("{}", volunteerDTO);
//        if (volunteerDTO.getPostTitle() == null || volunteerDTO.getPostContent() == null) {
//            log.error("필수 데이터가 없습니다.");
//            return new RedirectView("/review/review-write");
//        }
////        // 데이터가 문제없으면 세션에 저장
////        session.setAttribute("review", reviewDTO);
//
//        // 데이터베이스에 게시글 저장
//        volunteerService.write(volunteerDTO);
//
//        return new RedirectView("/review/review-list");
//    }

//        봉사 모집 게시글 목록
    // VolunteerController.java

    @GetMapping("volunteer-list")
    public String getList(Pagination pagination, Model model,
                          @RequestParam(value = "order", defaultValue = "recent") String order) {
        pagination.setOrder(order);
        pagination.setPostType("VOLUNTEER");
        pagination.setTotal(postService.getTotal(pagination.getPostType()));
        pagination.progress();

        log.info("페이지네이션 설정 - page: {}, startRow: {}, rowCount: {}",
                pagination.getPage(), pagination.getStartRow(), pagination.getRowCount());

        List<VolunteerDTO> volunteers = volunteerService.getList(pagination);
        log.info("현재 받은 데이터 갯수: {}", volunteers.size());

        model.addAttribute("volunteers", volunteers);
        return "volunteer/volunteer-list";
    }

    @GetMapping("volunteer-info")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getListInfo(
            @RequestParam(value = "order", defaultValue = "recent") String order,
            @RequestParam(value = "page", defaultValue = "1") int page) {
        log.info("받은 page 파라미터: {}", page);
        log.info("받은 order 파라미터: {}", order);

        Pagination pagination = new Pagination();
        pagination.setOrder(order);
        pagination.setPostType("VOLUNTEER");
        pagination.setPage(page);
        pagination.setTotal(postService.getTotal(pagination.getPostType()));
        pagination.progress();
        log.info("Pagination 객체: {}", pagination);

        List<VolunteerDTO> volunteerList = volunteerService.getList(pagination);
        for (VolunteerDTO volunteer : volunteerList) {
            volunteer.calculateDaysLeft();
            volunteer.setPostType(volunteer.getPostType());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("lists", volunteerList);
        response.put("pagination", pagination);

        return ResponseEntity.ok(response);
    }



//    @GetMapping("donation-inquiry")
//    public String goToInquiry( @RequestParam("postId") Long postId, Model model) {
//        Optional<DonationDTO> donationDTO = donationService.getById(postId);
//        log.info("{}", donationDTO);
//        if (donationDTO.isPresent()) {
//            model.addAttribute("donation", donationDTO.get());
//        } else {
//            return "redirect:/donation/donation-list";
//        }
//        return "donation/donation-inquiry";
//    }

    @PostMapping("/volunteer-update")
    public RedirectView volunteerUpdate(ReviewDTO reviewDTO) {
        volunteerService.update(reviewDTO);
        return new RedirectView("/volunteer/volunteer-list"); // 게시물 리스트로 리턴
    }

    @GetMapping("/volunteer-delete")
    public RedirectView volunteerDelete(@RequestParam("postId") Long postId) {
        volunteerService.delete(postId);
        return new RedirectView("/volunteer/volunteer-list"); } // 게시물 리스트로 리턴


}




