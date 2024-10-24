package com.app.back.mapper;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
import com.app.back.mapper.member.MemberMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class MemberMapperTests {

    @Autowired
    private MemberMapper memberMapper;

    @Test
    public void testInsertMember() {
        // 테스트용 DTO 생성
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setMemberEmail("example@test.com");
        memberDTO.setMemberName("테스트 유저2");
        memberDTO.setMemberPhone("01012345678");
        memberDTO.setMemberPassword("password123");
        memberDTO.setMemberType("NORMAL");
        memberDTO.setMemberLoginType("NORMAL");


        // 회원 삽입 테스트
        memberMapper.insert(memberDTO.toVO());
        log.info("회원 정보 삽입 성공: {}", memberDTO.toVO());
    }
}
