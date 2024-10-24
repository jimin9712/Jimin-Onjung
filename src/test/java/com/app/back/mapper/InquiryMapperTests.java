package com.app.back.mapper;

import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.mapper.inquiry.InquiryMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Slf4j
public class InquiryMapperTests {
    @Autowired
    private InquiryMapper inquiryMapper;

    @Test
    public void testwrite() {
        InquiryDTO inquiryDTO = new InquiryDTO();
        inquiryDTO.setId(1L);
        inquiryDTO.setPostTitle("제목3");
        inquiryDTO.setPostContent("내용3");
        inquiryDTO.setPostSummary("요약3");
        inquiryDTO.setPostType("Inquiry");
        inquiryDTO.setPostStatus("VISIBLE");
        inquiryDTO.setMemberId(1L);
        inquiryMapper.insert(inquiryDTO.toVO());
    }

}
