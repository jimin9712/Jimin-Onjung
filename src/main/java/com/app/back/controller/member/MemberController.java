package com.app.back.controller.member;

import com.app.back.domain.member.MemberDTO;
import com.app.back.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/member/*")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;


    @GetMapping("signup")
    public String goToSignup() {
        return "member/signup";
    }

    // email.html로 이동
    @GetMapping("email")
    public String goToEmailSignup() {
        return "member/email";
    }


    @PostMapping("email")
    public RedirectView signup(MemberDTO memberDTO) {
        log.info("회원가입 요청: {}", memberDTO);
        memberService.join(memberDTO.toVO());
        return new RedirectView("/member/login");
    }
}
