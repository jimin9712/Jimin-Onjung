package com.app.back.controller.member;

import com.app.back.domain.Util.EmailUtil;
import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
import com.app.back.enums.MemberLoginType;
import com.app.back.service.member.MemberService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final EmailUtil emailUtil;


    @GetMapping("/member/signup")
    public String goToSignup() {
        return "member/signup";
    }

    @GetMapping("/member/email")
    public String goToEmailSignup() {
        return "member/email";
    }

    @PostMapping("/member/email")
    public RedirectView signup(MemberDTO memberDTO) {
        log.info("회원가입 정보: {}", memberDTO);
        memberService.join(memberDTO.toVO());
        return new RedirectView("/member/login");
    }
    @GetMapping("/member/login")
    public void goToLoginForm(MemberDTO memberDTO){;}

    @PostMapping("/member/login")
    @ResponseBody
    public ResponseEntity<String> login(
            @RequestBody MemberDTO loginDTO,
            HttpSession session) {

        // 로그인 시도
        Optional<MemberVO> member = memberService.login(loginDTO.toVO());

        if (member.isPresent()) {
            session.setAttribute("loginMember", member.get());
            session.setAttribute("loginType", MemberLoginType.NORMAL);
            log.info("로그인 성공: {}", member.get()); // 로그 추가
            return ResponseEntity.ok("로그인 성공");
        } else {
            log.warn("로그인 실패: {}", loginDTO);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }

    @GetMapping("/main/main")
    public String goToMain(HttpSession session, Model model) {
        MemberVO loginMember = (MemberVO) session.getAttribute("loginMember");
        MemberLoginType loginType = (MemberLoginType) session.getAttribute("loginType");

        if (loginMember != null) {
            model.addAttribute("member", loginMember);
            model.addAttribute("loginType", loginType);
        } else {
            return "redirect:/member/login";
        }

        return "main/main";
    }

    // SMS 인증번호 전송 API
    @PostMapping("/send-auth-code")
    @ResponseBody
    public String sendAuthCode(@RequestParam String phoneNumber) {
        log.info("요청한 번호: {}", phoneNumber);
        memberService.sendAuthCode(phoneNumber);
        return "인증번호가 전송되었습니다.";
    }

    // SMS 인증번호 검증 API
    @PostMapping("/verify-auth-code")
    @ResponseBody
    public String verifyAuthCode(
            @RequestParam String phoneNumber,
            @RequestParam String authCode) {
        boolean isValid = memberService.verifyAuthCode(phoneNumber, authCode);
        return isValid ? "인증 성공" : "인증 실패";
    }
    // 이메일 인증번호 전송 API
    @PostMapping("/send-email-auth-code")
    @ResponseBody
    public String sendEmailAuthCode(@RequestParam String email) {
        log.info("요청한 이메일: {}", email);
        memberService.sendEmailAuthCode(email);
        return "인증번호가 이메일로 전송되었습니다.";
    }
    // 이메일 인증번호 검증 API
    @PostMapping("/verify-email-auth-code")
    @ResponseBody
    public String verifyEmailAuthCode(
            @RequestParam String email,
            @RequestParam String authCode) {
        boolean isValid = memberService.verifyEmailAuthCode(email, authCode);
        return isValid ? "인증 성공" : "인증 실패";
    }

    @GetMapping("/member/password")
    public void goToFindPassword(MemberDTO memberDTO){;}

    @GetMapping("/member/password-reset")
    public void goToFindPasswordReset(MemberDTO memberDTO){;}

    @PostMapping("/password-reset/send-email")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> sendResetEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<MemberVO> memberOptional = memberService.findByMemberEmail(email);

        Map<String, Object> response = new HashMap<>();
        if (memberOptional.isPresent()) {
            // VO를 DTO로 변환
            MemberVO memberVO = memberOptional.get();
            MemberDTO memberDTO = memberVO.toDTO();

            // UUID 생성 및 DTO에 설정
            String uuid = UUID.randomUUID().toString();
            memberDTO.setResetUuid(uuid);

            // DTO를 VO로 변환하여 업데이트
            memberService.update(memberDTO.toVO());

            try {
                String resetLink = "http://localhost:10000/member/password-reset?uuid=" + uuid;
                emailUtil.sendHtmlEmail(email, resetLink);
                response.put("success", true);
            } catch (MessagingException | UnsupportedEncodingException e) {
                e.printStackTrace();
                response.put("success", false);
            }
        } else {
            response.put("success", false);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/member/password-reset")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> request) {
        String uuid = request.get("uuid");
        String newPassword = request.get("password");

        log.info("Password reset request received for UUID: {}", uuid);

        Map<String, Object> response = new HashMap<>();
        Optional<MemberVO> memberOptional = memberService.findByResetUuid(uuid);

        if (memberOptional.isPresent()) {
            MemberVO memberVO = memberOptional.get();
            MemberDTO memberDTO = memberVO.toDTO();  // VO를 DTO로 변환

            memberDTO.setMemberPassword(newPassword);  // 새 비밀번호 설정
            memberDTO.setResetUuid(null);  // UUID 초기화

            // DTO를 VO로 변환 후 업데이트 수행
            memberService.passwordUpdate(memberDTO.toVO());

            response.put("success", true);
        } else {
            response.put("success", false);
            response.put("message", "유효하지 않은 UUID입니다.");
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/mypage/mypage")
    public void goToMypage(MemberDTO memberDTO){;}

    @GetMapping("/member/info")
    @ResponseBody
    public ResponseEntity<MemberDTO> getMemberInfo(HttpSession session) {
        MemberVO loginMember = (MemberVO) session.getAttribute("loginMember");

        if (loginMember != null) {
            MemberDTO memberDTO = loginMember.toDTO();
            log.info("세션에서 가져온 회원 정보: {}", memberDTO);
            return ResponseEntity.ok(memberDTO);
        } else {
            log.warn("세션에 로그인 정보가 없습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}

