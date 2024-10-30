package com.app.back.controller.profile;

import com.app.back.domain.member.MemberVO;
import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.profile.ProfileVO;
import com.app.back.service.profile.ProfileService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final ProfileDTO profileDTO;

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<String> uploadProfile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("memberId") Long memberId) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("업로드할 파일이 비어 있습니다.");
        }

        try {
            // 업로드 경로 설정
            String rootPath = "C:/upload/" + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
            File directory = new File(rootPath);
            if (!directory.exists() && !directory.mkdirs()) {
                throw new IOException("디렉터리 생성 실패: " + rootPath);
            }

            // 원본 파일 저장
            String newFileName = UUID.randomUUID() + "_" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.]", "_");
            File savedFile = new File(rootPath, newFileName);
            file.transferTo(savedFile);  // 파일 저장

            // 썸네일 생성
            if (file.getContentType() != null && file.getContentType().startsWith("image")) {
                File thumbnailFile = new File(rootPath, "t_" + newFileName);
                try (InputStream inputStream = new FileInputStream(savedFile);
                     FileOutputStream thumbnailStream = new FileOutputStream(thumbnailFile)) {
                    Thumbnailator.createThumbnail(inputStream, thumbnailStream, 100, 100);
                }
            }

            return ResponseEntity.ok("파일 업로드 및 썸네일 생성 성공");
        } catch (IOException e) {
            e.printStackTrace();  // 서버 로그에 에러 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ProfileVO getProfile(@PathVariable Long id) {
        return profileService.selectById(id);
    }

    @GetMapping("/all")
    public List<ProfileVO> getAllProfiles() {
        return profileService.selectAll();
    }
}
