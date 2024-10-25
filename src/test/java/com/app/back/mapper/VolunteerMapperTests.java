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


//    봉사 모집 게시글 작성
    @Test
    public void testInsert(){
        VolunteerDTO volunteerDTO = new VolunteerDTO();
        volunteerDTO.setId(11L);
        volunteerDTO.setRecruitmentCount(7);
        volunteerDTO.setVtSDate("2024-09-25");
        volunteerDTO.setVtEDate("2024-10-15");

        volunteerMapper.insert(volunteerDTO.toVO());
        log.info("봉사활동구인글이 작성 되었습니다: {}", volunteerDTO);
    }


//    봉사 모집 게시글 최신순 조회
    @Test
    public void testSelectAll(){
        Pagination pagination = new Pagination();
        pagination.setTotal(volunteerMapper.selectTotal());
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        volunteerMapper.selectAll(pagination).stream()
            .map(VolunteerDTO::toString).forEach(log::info);

    }

////  봉사 모집 게시글 조회수 순 조회
//    @Test
//    public void testSelectByViewCount() {
//        Pagination pagination = new Pagination();
//        pagination.setTotal(volunteerMapper.selectTotal());
//        pagination.progress();
//        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
//        volunteerMapper.selectByViewCount(pagination).stream()
//                .map(VolunteerDTO::toString).forEach(log::info);
//    }
//
////    봉사모집 게시글 마감 임박 순 조회
//@Test
//public void testSelectByDeadline() {
//    Pagination pagination = new Pagination();
//    pagination.setTotal(volunteerMapper.selectTotal());
//    pagination.progress();
//    log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
//    volunteerMapper.selectByDeadline(pagination).stream()
//            .map(VolunteerDTO::toString).forEach(log::info);
//}


}