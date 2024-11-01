package com.app.back.controller.volunteer;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
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

@Controller // 이 클래스가 컨트롤러임을 나타냄
@RequestMapping("/volunteer/*") // QA 관련 요청을 처리
@RequiredArgsConstructor // 생성자 자동 생성
@Slf4j // 로깅 기능 추가
public class VolunteerController {

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
    public List<VolunteerDTO> admin(Pagination pagination, Model model) {
        // volunteerService.getTotal()을 통해 총 데이터 개수를 가져와 pagination에 설정
        pagination.setTotal(volunteerService.getTotal());

        // pagination 객체의 페이지 계산 진행
        pagination.vtProgress();

        // 설정된 pagination 객체를 로그로 출력하여 확인 (선택 사항)
        System.out.println("Pagination after vtProgress: " + pagination);

        // volunteer 리스트를 가져와 반환
        return volunteerService.getList(pagination);
    }




    @GetMapping("/volunteer-info")
    @ResponseBody
    public List<VolunteerDTO> getListInfo(@RequestParam(value = "order", defaultValue = "recent") String order) {
        Pagination pagination = new Pagination();

        pagination.setOrder(order);
        pagination.setTotal(volunteerService.getTotal());
        pagination.vtProgress();
        log.info(pagination.toString());

        List<VolunteerDTO> volunteerList = volunteerService.getList(pagination);

        // 각 VolunteerDTO에 대해 daysLeft와 postTypeDisplayName 설정
        for (VolunteerDTO volunteer : volunteerList) {
            volunteer.calculateDaysLeft(); // daysLeft 계산
            volunteer.setPostType(volunteer.getPostType()); // 기존 postType 값으로 displayName 설정
        }

        return volunteerList;
    }



}


