package com.app.back.service;

import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.mapper.volunteer.VolunteerMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Slf4j
public class VolunteerServiceTests {

    @Autowired
    private VolunteerMapper volunteerMapper;

    @Transactional // 테스트 시 데이터가 자동으로 롤백되도록 합니다.
    public void testUpdatePostAndVt() {
        // DTO 객체 생성 및 값 설정
        VtApplicationDTO vtApplicationDTO = new VtApplicationDTO();
        vtApplicationDTO.setId(1L);  // tbl_post의 ID
        vtApplicationDTO.setPostTitle("Updated Title");
        vtApplicationDTO.setPostSummary("Updated Summary");
        vtApplicationDTO.setPostContent("Updated Content");
        vtApplicationDTO.setUpdatedDate("2024-10-25");
        vtApplicationDTO.setVtId(1L);  // tbl_vt의 ID
        vtApplicationDTO.setVtRecruitmentCount(100L);  // 업데이트할 모집 인원 수

        // tbl_post 업데이트
        postMapper.updatePost(vtApplicationDTO);

        // tbl_vt 업데이트
        postMapper.updateVt(vtApplicationDTO);

        // 업데이트된 데이터 검증 (직접 select 쿼리를 작성하거나, 테스트에 필요한 적절한 조회 메서드 사용)
        VtApplicationDTO updatedPost = postMapper.selectPostById(1L);
        assertEquals("Updated Title", updatedPost.getPostTitle());
        assertEquals("Updated Summary", updatedPost.getPostSummary());
        assertEquals("Updated Content", updatedPost.getPostContent());

        VtApplicationDTO updatedVt = postMapper.selectVtById(1L);
        assertEquals(100L, updatedVt.getVtRecruitmentCount());
    }
}