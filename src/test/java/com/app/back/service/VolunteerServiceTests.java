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

@SpringBootTest
@Slf4j
public class VolunteerServiceTests {
    @Autowired
    private VolunteerService volunteerService;

    @Test
    public void testWrite() {
        VolunteerDTO volunteerDTO = new VolunteerDTO();
        volunteerDTO.setPostTitle("dsfsdf3");
        volunteerDTO.setPostContent("s3dsfsd");
        volunteerDTO.setMemberId(22L);
        volunteerDTO.setPostType("VOLUNTEER");
        volunteerDTO.setRecruitmentCount(5);
        volunteerDTO.setVtSDate("2024-10-17");
        volunteerDTO.setVtEDate("2024-10-19");
        volunteerService.write(volunteerDTO);
    }

}