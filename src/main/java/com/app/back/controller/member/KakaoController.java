package com.app.back.controller.member;


import com.app.back.domain.member.MemberDTO;
import com.app.back.service.member.KakaoService;
import com.app.back.service.member.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Optional;

@Controller
@Slf4j
@RequiredArgsConstructor
public class KakaoController {
    private final KakaoService kakaoService;
    private final MemberService memberService;

    @GetMapping("/kakao/login")
    public RedirectView login(String code, HttpSession session){
        String token = kakaoService.getKakaoAccessToken(code);
        Optional<MemberDTO> kakaoInfo = kakaoService.getKakaoInfo(token);

        if(kakaoInfo.isPresent()){
            memberService.join(kakaoInfo.get().toVO());
            session.setAttribute("member", memberService.getKakaoMember(kakaoInfo.get().getKakaoEmail()).get());
        }else{
            log.info("비어있음");
        }


        return new RedirectView("/main/main");
    }
}














