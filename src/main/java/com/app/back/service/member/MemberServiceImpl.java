package com.app.back.service.member;

import com.app.back.domain.member.MemberVO;
import com.app.back.repository.member.MemberDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Primary
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final MemberDAO memberDAO;
    @Override
    public void join(MemberVO memberVO) {
        log.info("가입할 회원 정보: {}", memberVO);
        Optional<MemberVO> foundKakaoMember =
                memberDAO.findByMemberKakaoEmail(memberVO.getKakaoEmail());

        if(foundKakaoMember.isEmpty()){
            memberDAO.save(memberVO);
        }
    }

    @Override
    public Optional<MemberVO> login(MemberVO memberVO) {
        return memberDAO.findByMemberEmailAndMemberPassword(memberVO);
    }

    @Override
    public Optional<MemberVO> getMember(Long id) {
        return memberDAO.findById(id);
    }

    @Override
    public void update(MemberVO memberVO) {
        memberDAO.setMember(memberVO);
    }

    @Override
    public void delete(Long id) {
        memberDAO.delete(id);
    }

    @Override
    public Optional<MemberVO> getKakaoMember(String memberKakaoEmail){
        return memberDAO.findByMemberKakaoEmail(memberKakaoEmail);
    }

}
