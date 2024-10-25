package com.app.back.mapper;

import com.app.back.domain.volunteer.Pagination;
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
        volunteerDTO.setId(6L);
        volunteerDTO.setPostType("1");
        volunteerDTO.setPostTitle("봉사활동모집제목5");
        volunteerDTO.setRecruitmentCount(40);
        volunteerDTO.setVtSDate("2024-11-25");
        volunteerDTO.setVtEDate("2025-11-25");
        volunteerDTO.setPostContent("봉사활동전체내용5");
        volunteerDTO.setPostSummary("봉사활동모집요약5");
        volunteerDTO.setMemberId(2L);

        volunteerMapper.insert(volunteerDTO.toVO());
        log.info("봉사활동구인글이 작성 되었습니다: {}", volunteerDTO);
    }

    @Test
    public void testSelectAll(){
        Pagination pagination = new Pagination();
        pagination.setTotal(volunteerMapper.selectTotal());
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        volunteerMapper.selectAll(pagination).stream()
            .map(VolunteerDTO::toString).forEach(log::info);

    }

    @Test
    public void testSelectByViewCount() {
        Pagination pagination = new Pagination();
        pagination.setTotal(volunteerMapper.selectTotal());
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        volunteerMapper.selectByViewCount(pagination).stream()
                .map(VolunteerDTO::toString).forEach(log::info);
    }


}