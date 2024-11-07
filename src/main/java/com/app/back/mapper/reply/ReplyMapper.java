package com.app.back.mapper.reply;


import com.app.back.domain.reply.ReplyVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReplyMapper {
    //    게시글 작성
    public void insert(ReplyVO replyVO);

}
