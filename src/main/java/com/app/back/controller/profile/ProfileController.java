package com.app.back.controller.profile;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
import com.app.back.domain.profile.ProfileDTO;
import com.app.back.service.profile.ProfileService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PostMapping("/upload")
    @ResponseBody
    public ProfileDTO upload(@RequestParam("file") MultipartFile file, HttpSession session) throws IOException {
        String rootPath = "C:/upload/" + getPath();
        ProfileDTO profileDTO = new ProfileDTO();
        UUID uuid = UUID.randomUUID();

        File directory = new File(rootPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String originalFilename = file.getOriginalFilename();
        String newFileName = uuid.toString() + "_" + originalFilename;
        File savedFile = new File(rootPath, newFileName);

        file.transferTo(savedFile);

        profileDTO.setProfileFileName(newFileName);
        profileDTO.setProfileFilePath(getPath());
        profileDTO.setProfileFileSize(file.getSize());
        profileDTO.setProfileFileType(file.getContentType());

        if (file.getContentType() != null && file.getContentType().startsWith("image")) {
            String thumbnailFileName = "t_" + newFileName;
            File thumbnailFile = new File(rootPath, thumbnailFileName);
            try (InputStream inputStream = new FileInputStream(savedFile);
                 FileOutputStream fileOutputStream = new FileOutputStream(thumbnailFile)) {
                Thumbnailator.createThumbnail(inputStream, fileOutputStream, 100, 100);
            }
            profileDTO.setProfileFileName(thumbnailFileName);
        }

        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        if (loginMember != null) {
            loginMember.setProfileFileName(profileDTO.getProfileFileName());
            loginMember.setProfileFilePath(profileDTO.getProfileFilePath());

            session.setAttribute("loginMember", loginMember);

        }
        return profileDTO;
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    @GetMapping("/display")
    @ResponseBody
    public byte[] display(@RequestParam("profileFilePath") String profileFilePath,
                          @RequestParam("profileFileName") String profileFileName) throws IOException {
        String displayPath = "C:/upload/" + profileFilePath + "/" + profileFileName;


        File file = new File(displayPath);
        return FileCopyUtils.copyToByteArray(file);
    }

}
