package com.app.back.controller.member;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
import com.app.back.service.member.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;

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
            return ResponseEntity.ok("로그인 성공");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }

    @GetMapping("/main/main")
    public String goToMain(HttpSession session, Model model) {
        // 세션에서 회원 정보 가져오기
        MemberVO loginMember = (MemberVO) session.getAttribute("loginMember");

        if (loginMember != null) {
            // 회원 정보를 모델에 추가하여 뷰로 전달
            model.addAttribute("member", loginMember);
        } else {
            // 로그인 정보가 없으면 로그인 페이지로 리다이렉트
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

}

