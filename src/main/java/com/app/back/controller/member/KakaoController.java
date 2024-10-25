package com.app.back.controller.member;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
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
    public RedirectView login(String code, HttpSession session) {
        try {
            // 1. 카카오 액세스 토큰 가져오기
            String token = kakaoService.getKakaoAccessToken(code);
            Optional<MemberDTO> kakaoInfo = kakaoService.getKakaoInfo(token);

            // 2. 카카오 회원 정보가 있을 경우 처리
            if (kakaoInfo.isPresent()) {
                MemberDTO kakaoMember = kakaoInfo.get();

                // 3. 이미 가입된 회원인지 체크
                Optional<MemberVO> existingMember = memberService.getKakaoMember(kakaoMember.getKakaoEmail());

                if (existingMember.isEmpty()) {
                    // 새 회원일 경우 회원가입 처리
                    memberService.join(kakaoMember.toVO());
                    session.setAttribute("member", kakaoMember);
                } else {
                    // 이미 존재하는 회원일 경우 해당 회원 정보 세션에 저장
                    session.setAttribute("member", existingMember.get());
                }

                log.info("카카오 로그인 성공: {}", kakaoMember.getKakaoEmail());
                return new RedirectView("/main/main");
            } else {
                log.warn("카카오 로그인 실패: 사용자 정보 없음");
                return new RedirectView("/member/login?error=invalid_user");
            }

        } catch (Exception e) {
            log.error("카카오 로그인 중 오류 발생: ", e);
            return new RedirectView("/member/login?error=login_failed");
        }
    }
}
