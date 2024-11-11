package com.app.back.service;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.mapper.volunteer.VolunteerMapper;
import com.app.back.service.volunteer.VolunteerService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@SpringBootTest
@Slf4j
public class VolunteerServiceTests {
    @Autowired
    private VolunteerService volunteerService;

    @Test
    public void testWrite() throws IOException {
        VolunteerDTO volunteerDTO = new VolunteerDTO();
        volunteerDTO.setPostTitle("우리집 강아지 사료 줄까?");
        volunteerDTO.setPostContent("어떤거 같아?");
        volunteerDTO.setMemberId(4L);
        volunteerDTO.setPostType("VOLUNTEER");
        volunteerDTO.setRecruitmentCount(5);
        volunteerDTO.setVtSDate("2024-10-17");
        volunteerDTO.setVtEDate("2024-10-19");
        volunteerService.write(volunteerDTO,null,null,null,null, null);
    }

    @Test
    public void testDelete() {
        volunteerService.delete(3L);
    }

}