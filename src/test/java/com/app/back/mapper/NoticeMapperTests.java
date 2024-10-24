package com.app.back.mapper;


import com.app.back.domain.notice.NoticeDTO;
import com.app.back.mapper.notice.NoticeMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class NoticeMapperTests {
    @Autowired
    private NoticeMapper noticeMapper;

    @Test
    public void testwrite() {
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setId(1L);
        noticeDTO.setPostTitle("제목1");
        noticeDTO.setPostContent("내용1");
        noticeDTO.setPostSummary("요약1");
        noticeDTO.setPostType("0");
        noticeDTO.setPostStatus("VISIBLE");
        noticeDTO.setMemberId(1L);
        noticeMapper.insert(noticeDTO.toVO());

    }

}
