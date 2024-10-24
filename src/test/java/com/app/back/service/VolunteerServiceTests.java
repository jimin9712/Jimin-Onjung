package com.app.back.service;

import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.mapper.volunteer.VolunteerMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class VolunteerServiceTests {

    @Autowired
    private VolunteerMapper volunteerMapper;

    @Test
    public void testWrite(){
        VolunteerDTO volunteerDTO = new VolunteerDTO();
        volunteerDTO.setPostType("1");
        volunteerDTO.setPostTitle("봉사활동구인제목1");
        volunteerDTO.setRecruitmentCount(10);
        volunteerDTO.setVtSDate("2024-11-25");
        volunteerDTO.setVtEDate("2025-11-25");
        volunteerDTO.setPostContent("봉사활동전체내용1");
        volunteerDTO.setMemberId(2L);

        volunteerMapper.insert(volunteerDTO.toVO());
        log.info("봉사활동구인글이 작성 되었습니다: " + volunteerDTO);
    }
}