package com.app.back.mapper;

import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.mapper.volunteer.VolunteerMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class VolunteerMapperTests {

    @Autowired
    private VolunteerMapper volunteerMapper;

    @Test
    public void testInsert(){
        VolunteerDTO volunteerDTO = new VolunteerDTO();
        volunteerDTO.setPostType("봉사활동");
        volunteerDTO.setPostTitle("봉사활동구인제목1");
        volunteerDTO.setPostSummary("봉사활동축약내용1");
        volunteerDTO.setRecruitmentCount(10);
        volunteerDTO.setVtSDate("2024-10-25");
        volunteerDTO.setVtEDate("2024-11-25");
        volunteerDTO.setPostContent("봉사활동전체내용1");

        volunteerMapper.insert(volunteerDTO.toVO());
        log.info("봉사활동구인글이 작성 되었습니다: " + volunteerDTO);
    }
}