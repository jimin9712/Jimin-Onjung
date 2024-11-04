package com.app.back.controller.volunteer;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.service.post.PostService;
import com.app.back.service.volunteer.VolunteerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.List;

@Controller // 이 클래스가 컨트롤러임을 나타냄
@RequestMapping("/volunteer/*") // QA 관련 요청을 처리
@RequiredArgsConstructor // 생성자 자동 생성
@Slf4j // 로깅 기능 추가
public class VolunteerController {
    private final PostService postService;
    private final VolunteerService volunteerService;

    @GetMapping("volunteer-write")
    public String goToWriteForm(VolunteerDTO volunteerDTO) {
        return "volunteer/volunteer-write";
    }

    @PostMapping("volunteer-write")
    public RedirectView volunteerWrite(VolunteerDTO volunteerDTO) throws IOException {
        volunteerDTO.setMemberId(1L);
        volunteerDTO.setPostType("VOLUNTEER");
//        volunteerDTO.setPostTitle(volunteerDTO.getVtGroupName());
        log.info("{}", volunteerDTO);
        if (volunteerDTO.getPostTitle() == null || volunteerDTO.getPostContent() == null) {
            log.error("필수 데이터가 없습니다.");
            return new RedirectView("/review/review-write");
        }
//        // 데이터가 문제없으면 세션에 저장
//        session.setAttribute("review", reviewDTO);

        // 데이터베이스에 게시글 저장
        volunteerService.write(volunteerDTO);

        return new RedirectView("/review/review-list");
    }

    @GetMapping("/volunteer-list")
    public String getList(Pagination pagination, Model model) {

        pagination.setTotal(postService.getTotal("VOLUNTEER"));
        pagination.vtProgress();

        log.info("pagination 객체(Controller): {}", pagination);
        model.addAttribute("lists", volunteerService.getList(pagination));

        return "volunteer/volunteer-list";
    }

    @GetMapping("/volunteer-info")
    @ResponseBody
    public List<VolunteerDTO> getListInfo(
            @RequestParam(value = "order", defaultValue = "recent") String order,
            @RequestParam(value = "page", defaultValue = "1") int page) {

        log.info("받은 page 파라미터: {}", page); // 요청된 페이지 번호 확인

        Pagination pagination = new Pagination();
        pagination.setOrder(order);
        pagination.setPostType("VOLUNTEER");
        pagination.setPage(page); // 페이지 번호 설정
        pagination.setTotal(postService.getTotal("VOLUNTEER"));
        pagination.vtProgress();

        log.info("Pagination 객체: {}", pagination); // Pagination 설정 확인

        List<VolunteerDTO> volunteerList = volunteerService.getList(pagination);

        for (VolunteerDTO volunteer : volunteerList) {
            volunteer.calculateDaysLeft();
            volunteer.setPostType(volunteer.getPostType());
        }

        return volunteerList;
    }






    @GetMapping("/volunteer-inquiry")
    public void read(Long id, Model model){
        VolunteerDTO volunteerDTO = volunteerService.getPost(id).orElseThrow();
        model.addAttribute("list", volunteerDTO);
    }

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




