package com.app.back.controller.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.donation.DonationVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.service.donation.DonationService;
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
import java.util.Optional;
import java.util.UUID;

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
    public RedirectView donationWrite(@RequestParam("file") List<MultipartFile> files, DonationDTO donationDTO) throws IOException {
        donationDTO.setMemberId(1L);
        donationDTO.setPostType("DONATION");
        log.info("Received donationDTO: {}", donationDTO);
        donationDTO.setAttachmentFilePath(getPath());

        if (donationDTO.getPostTitle() == null || donationDTO.getPostContent() == null) {
            log.error("필수 데이터가 없습니다.");
            return new RedirectView("/donation/donation-write");
        }

        String rootPath = "C:/upload/" + getPath();
        UUID uuid = UUID.randomUUID();

        File directory = new File(rootPath);
        if(!directory.exists()){
            directory.mkdirs();
        }

        for(int i=0; i<files.size(); i++){
            files.get(i).transferTo(new File(rootPath, files.get(i).getOriginalFilename()));
            donationDTO.setAttachmentFileName(uuid.toString() + "_" + files.get(i).getOriginalFilename());

            if(files.get(i).getContentType().startsWith("image")){
                FileOutputStream fileOutputStream = new FileOutputStream(new File(rootPath, "t_" + uuid.toString() + "_" + files.get(i).getOriginalFilename()));
                Thumbnailator.createThumbnail(files.get(i).getInputStream(), fileOutputStream, 100, 100);
                fileOutputStream.close();
            }
        }

        // 데이터가 문제없으면 세션에 저장
//        session.setAttribute("donation", donationDTO);

        donationService.write(donationDTO);

        return new RedirectView("/donation/donation-list");
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    @GetMapping("donation-list")
    public String goToList(Pagination pagination, Model model) {
        if (pagination.getOrder() == null) {
            pagination.setOrder("created_date desc, n.id desc"); // 기본 정렬 기준
        }

        pagination.progressReview();
        model.addAttribute("donations", donationService.getList(pagination));
        return "donation/donation-list";
    }

    @GetMapping("donation-update")
    public String goToUpdateForm(@RequestParam("postId") Long postId, Model model) {
        Optional<DonationDTO> donationDTO =donationService.getById(postId);

        if (donationDTO.isPresent()) {
            model.addAttribute("donation", donationDTO.get());
        } else {
            return "redirect:/donation/donation-list";
        }
        return "donation/donation-update";
    }

    @PostMapping("donation-update")
    public RedirectView donationUpdate(DonationDTO donationDTO) {
        donationService.update(donationDTO);
        return new RedirectView("/donation/donation-list");
    }

    @GetMapping("review-delete")
    public RedirectView reviewDelete(@RequestParam("postId") Long postId) {
        donationService.delete(postId);
        return new RedirectView("/review/review-list");
    }
}
