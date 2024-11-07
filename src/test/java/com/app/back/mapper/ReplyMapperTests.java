package com.app.back.mapper;

import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.reply.ReplyDTO;
import com.app.back.mapper.reply.ReplyMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class ReplyMapperTests {
    @Autowired
    private ReplyMapper replyMapper;

    @Test
    public void testwrite() {
        for (long i = 2; i <= 10; i++) {
            ReplyDTO replyDTO = new ReplyDTO();
            replyDTO.setId(i);
            replyDTO.setReplyContent("야호"+i);
            replyDTO.setReplyStatus(i+"@gmail.com");
            replyDTO.setMemberId(2L);
            replyDTO.setPostId(i);
            replyMapper.insert(replyDTO.toReplyVO());
        }
    }
}
