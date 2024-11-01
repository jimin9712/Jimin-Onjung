package com.app.back.mapper;

import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.mapper.inquiry.InquiryMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Slf4j
public class InquiryMapperTests {
    @Autowired
    private InquiryMapper inquiryMapper;

    @Test
    public void testwrite() {
        InquiryDTO inquiryDTO = new InquiryDTO();
        inquiryDTO.setId(1L);
        inquiryDTO.setPostStatus("");
        inquiryDTO.setInquiryEmail("4@gmail.com");
        inquiryDTO.setInquiryPhone("4");
        inquiryDTO.setInquiryType("봉사단체 가입 문의");
        inquiryDTO.setPostTitle("4번제목");
        inquiryDTO.setPostContent("4번내용");
        inquiryMapper.insert(inquiryDTO.toVO());
    }
    @Test
    public void testWriteMultiple() {
        for (long i = 5; i <= 101; i++) {
            InquiryDTO inquiryDTO = new InquiryDTO();
            inquiryDTO.setId(i);
            inquiryDTO.setPostStatus("");
            inquiryDTO.setInquiryEmail(i+ "@gmail.com");
            inquiryDTO.setInquiryPhone("i");
            if (i % 2 == 0) {
                inquiryDTO.setInquiryType("일반 문의");
            } else {
                inquiryDTO.setInquiryType("봉사단체 가입 문의");
            }
            inquiryDTO.setPostTitle(i + "번 제목");
            inquiryDTO.setPostContent(i + "번 내용");
            inquiryMapper.insert(inquiryDTO.toVO());
        }
    }

//    @Test
//    public void testSelectAll() {
//        Pagination pagination = new Pagination();
//        pagination.setPage(1);
//        pagination.progress();
//        List<InquiryDTO> posts = inquiryMapper.selectAll(pagination);
//        log.info("{}", posts.size());
//        posts.stream().map(InquiryDTO::toString).forEach(log::info);
//    }

@Test
public void testSelectAll(){
    Pagination pagination = new Pagination();
    pagination.progress();
    log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
    inquiryMapper.selectAll(pagination, new Search()).stream()
            .map(InquiryDTO::toString).forEach(log::info);
}
    @Test
    public void testSelectById() {
        Long id = 1L;
        Optional<InquiryDTO> noticeDTO = inquiryMapper.selectById(id);
        noticeDTO.ifPresent(dto -> log.info("조회된 inquiry: " + dto));
    }

    @Test
    public void testUpdate() {
        InquiryDTO inquiryDTO = new InquiryDTO();
        inquiryDTO.setId(2L);
        inquiryDTO.setPostTitle("제목수정2");
        inquiryDTO.setPostContent("내용수정2");
        inquiryMapper.updateById(inquiryDTO);
        log.info("inquiry가 수정되었습니다: " + inquiryDTO);
    }
    @Test
    public void testDeleteById() {
        Long id = 1L;
        inquiryMapper.deleteById(id);
        log.info("inquiry가 삭제되었습니다. ID: " + id);
    }


}
