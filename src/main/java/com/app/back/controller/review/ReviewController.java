package com.app.back.controller.review;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.service.review.ReviewService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    public RedirectView reviewWrite(@RequestParam("file") List<MultipartFile> files,  ReviewDTO reviewDTO) throws IOException {
        reviewDTO.setMemberId(1L);
        reviewDTO.setPostType("REVIEW");
        reviewDTO.setPostTitle(reviewDTO.getVtGroupName());
        reviewDTO.setAttachmentFilePath(getPath());
//        if (reviewDTO.getPostTitle() == null || reviewDTO.getPostContent() == null) {
//            log.error("필수 데이터가 없습니다.");
//            return new RedirectView("/review/review-write");
//        }

//        String rootPath = "D:/dev/OnjungSpring/back/src/main/resources/static/files" + getPath();
        String rootPath = "C:/upload" + getPath();
        UUID uuid = UUID.randomUUID();

        File directory = new File(rootPath);
        if(!directory.exists()){
            directory.mkdirs();
        }

//        for(int i=0; i<files.size(); i++){
//            files.get(i).transferTo(new File(rootPath, files.get(i).getOriginalFilename()));
//            reviewDTO.setAttachmentFileName(uuid.toString() + "_" + files.get(i).getOriginalFilename());
//
//            if(files.get(i).getContentType().startsWith("image")){
//                FileOutputStream fileOutputStream = new FileOutputStream(new File(rootPath, "t_" + uuid.toString() + "_" + files.get(i).getOriginalFilename()));
//                Thumbnailator.createThumbnail(files.get(i).getInputStream(), fileOutputStream, 100, 100);
//                fileOutputStream.close();
//            }
//        }

//        // 데이터가 문제없으면 세션에 저장
//        session.setAttribute("review", reviewDTO);

        // 데이터베이스에 게시글 저장
        reviewService.write(reviewDTO);

        return new RedirectView("/review/review-list");
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    @GetMapping("review-list")
    public String goToList(ReviewDTO reviewDTO) { return "review/review-list"; }

    // 리뷰 업데이트 폼 표시
    @GetMapping("review-update/{id}")
    public ModelAndView goToUpdateForm(@PathVariable Long id) {
        Optional<ReviewDTO> optionalReview = reviewService.getById(id);
        if (optionalReview.isPresent()) {
            log.info("리뷰 데이터 로드 성공: {}", optionalReview.get());
            ModelAndView mav = new ModelAndView("review/review-update");
            mav.addObject("review", optionalReview.get());
            return mav;
        } else {
            log.error("리뷰를 찾을 수 없습니다. ID: {}", id);
            return new ModelAndView(new RedirectView("/review/review-list?error=notfound"));
        }
    }

    // 리뷰 업데이트 처리
    @PostMapping("review-update")
    public ModelAndView reviewUpdate(@ModelAttribute ReviewDTO reviewDTO) {
        // 필수 데이터 수동 검증
        if (reviewDTO.getVtGroupName() == null || reviewDTO.getVtGroupName().isEmpty() ||
                reviewDTO.getPostContent() == null || reviewDTO.getPostContent().isEmpty()) {
            log.error("필수 데이터가 없습니다.");
            return new ModelAndView(new RedirectView("/review/review-update/" + reviewDTO.getId() + "?error=missingFields"));
        }
            reviewService.update(reviewDTO);
        return new ModelAndView(new RedirectView("/review/review-list"));
    }

    @DeleteMapping("review-delete/{id}")
    @ResponseBody
    public ResponseEntity<?> reviewDelete(@PathVariable Long id) {
        try {
            reviewService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("못지운 id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Delete failed");
        }
    }

    @GetMapping("/my-reviews/{memberId}")
    @ResponseBody
    public List<ReviewDTO> getMyReviews(
            @PathVariable Long memberId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        log.info("받은 회원 ID: {}, 시작 날짜: {}, 끝 날짜: {}", memberId, startDate, endDate);

        if (startDate != null && endDate != null) {
            return reviewService.findByMemberIdAndDateRange(memberId, startDate, endDate);
        } else {
            return reviewService.findByMemberId(memberId);
        }
    }
}

