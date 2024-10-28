package com.app.back.repository.member;

import com.app.back.domain.member.MemberVO;
import com.app.back.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberDAO {
    private final MemberMapper memberMapper;

    //    회원가입
    public void save(MemberVO memberVO){
        memberMapper.insert(memberVO);
    }

    //    로그인
    public Optional<MemberVO> findByMemberEmailAndMemberPassword(MemberVO memberVO){
        return memberMapper.selectByMemberEmailAndMemberPassword(memberVO);
    }
    //    회원 정보 조회
    public Optional<MemberVO> findById(Long id){
        return memberMapper.selectById(id);
    }
    //    회원 정보 수정
    public void setMember(MemberVO memberVO){
        memberMapper.update(memberVO);
    }
    //    회원 삭제
    public void delete(Long id){
        memberMapper.delete(id);
    }
    // 카카오 회원 조회
    public Optional<MemberVO> findByMemberKakaoEmail(String memberKakaoEmail){
        return memberMapper.selectByMemberKakaoEmail(memberKakaoEmail);
    }
    // 회원 전체 조회 메서드 구현
    public List<MemberVO> findAll() {
        return memberMapper.selectAll();
    }

    public Optional<MemberVO> findByResetUuid(String uuid) {
        return memberMapper.selectByResetUuid(uuid);
    }
    public Optional<MemberVO> findByMemberEmail(String email) {
        return memberMapper.selectByMemberEmail(email);
    }
    // 비밀번호 업데이트 메서드 추가
    public void updatePassword(MemberVO memberVO) {
        memberMapper.updatePassword(memberVO);
    }

    public int getTotalVtTime(Long memberId) {
        return memberMapper.getTotalVtTimeByMemberId(memberId);
    }
    public int getVtCountByMemberId(Long memberId) {
        return memberMapper.getVtCountByMemberId(memberId);
    }

    public void updateProfile(MemberVO memberVO) {
        memberMapper.updateProfile(memberVO);
    }
}
