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
import org.springframework.util.FileCopyUtils;
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

    @PostMapping("/upload")
    @ResponseBody
    public ProfileDTO upload(@RequestParam("file") MultipartFile file, @RequestParam("memberId") Long memberId) throws IOException {
        String rootPath = "C:/upload/" + getPath();
        ProfileDTO profileDTO = new ProfileDTO();
        UUID uuid = UUID.randomUUID();

        profileDTO.setProfileFilePath(getPath());

        File directory = new File(rootPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String originalFilename = file.getOriginalFilename();

        String newFileName = uuid.toString() + "_" + originalFilename;
        File savedFile = new File(rootPath, newFileName);

        file.transferTo(savedFile);
        profileDTO.setProfileFileName(newFileName);

        if (file.getContentType() != null && file.getContentType().startsWith("image")) {
            File thumbnailFile = new File(rootPath, "t_" + newFileName);
            try (InputStream inputStream = new FileInputStream(savedFile);
                 FileOutputStream fileOutputStream = new FileOutputStream(thumbnailFile)) {
                Thumbnailator.createThumbnail(inputStream, fileOutputStream, 100, 100);
                fileOutputStream.close();

            }
        }

        return profileDTO;
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    @GetMapping("display")
    public byte[] display(String profileFileName) throws IOException {
        return FileCopyUtils.copyToByteArray(new File("C:/upload", profileFileName));
    }


}
