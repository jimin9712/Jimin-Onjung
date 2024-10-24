package com.app.back.mapper;


import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.mapper.notice.NoticeMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Slf4j
public class NoticeMapperTests {
    @Autowired
    private NoticeMapper noticeMapper;

    @Test
    public void testwrite() {
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setId(2L);
        noticeDTO.setPostTitle("제목2");
        noticeDTO.setPostContent("내용2");
        noticeDTO.setPostSummary("요약2");
        noticeDTO.setPostType("NOTICE");
        noticeDTO.setPostStatus("VISIBLE");
        noticeDTO.setMemberId(1L);
        noticeMapper.insert(noticeDTO.toVO());

    }
    @Test
    public void testSelectById() {
        Long id = 1L;
        NoticeDTO noticeDTO = noticeMapper.selectById(id);

        log.info("조회된 notice : " + noticeDTO);
    }
    @Test
    public void testSelectAll() {
        Pagination pagination = new Pagination();
        pagination.setPage(1);
        pagination.progress();
        List<NoticeDTO> posts = noticeMapper.selectAll(pagination);
        log.info("{}", posts.size());
        posts.stream().map(NoticeDTO::toString).forEach(log::info);
    }
    @Test
    public void testUpdate() {
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setId(1L);
        noticeDTO.setPostTitle("제목수정1");
        noticeDTO.setPostContent("내용수정1");
        noticeMapper.updateById(noticeDTO);
        log.info("noice가 수정되었습니다: " + noticeDTO);
    }
    @Test
    public void testDeleteById() {
        Long id = 1L;
        noticeMapper.deleteById(id);
        log.info("notice가 삭제되었습니다. ID: " + id);
    }

}
