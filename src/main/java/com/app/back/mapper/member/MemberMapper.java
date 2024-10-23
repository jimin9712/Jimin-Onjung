package com.app.back.mapper.member;

import com.app.back.domain.member.MemberVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {
    //    회원가입
    public void insert(MemberVO memberVO);

    //    로그인
    public Optional<MemberVO> selectByMemberEmailAndMemberPassword(MemberVO memberVO);

    //    회원 정보 조회
    public Optional<MemberVO> selectById(Long id);

    //    회원 정보 수정
    public void update(MemberVO memberVO);

    //    회원 삭제
    public void delete(Long id);

    //    회원 전체 정보 조회
    public List<MemberVO> selectAll();

    //    카카오 회원 정보 조회
    public Optional<MemberVO> selectByMemberKakaoEmail(String memberKakaoEmail);
}

