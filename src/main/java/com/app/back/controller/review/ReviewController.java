package com.app.back.controller.review;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.service.review.ReviewService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
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
    public String goToList(Pagination pagination, Model model) {
        if (pagination.getOrder() == null) {
            pagination.setOrder("created_date desc, n.id desc"); // 기본 정렬 기준
        }

        pagination.progressReview();
        model.addAttribute("reviews", reviewService.getList(pagination));

        return "review/review-list";
    }

    @GetMapping("review-update")
    public String goToUpdateForm(ReviewDTO reviewDTO) { return "review/review-update"; }

    @PostMapping("review-update")
    public RedirectView reviewUpdate(ReviewDTO reviewDTO) {
        reviewService.update(reviewDTO);
        return new RedirectView("/review/review-list");
    }

    @GetMapping("review-delete")
    public RedirectView reviewDelete(ReviewDTO reviewDTO) { return new RedirectView("/review/review-list"); }
}
