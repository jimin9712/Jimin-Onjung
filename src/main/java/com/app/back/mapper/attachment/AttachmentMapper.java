package com.app.back.mapper.attachment;


import com.app.back.domain.attachment.AttachmentVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AttachmentMapper {

//  첨부파일 추가
    public void insert(AttachmentVO attachmentVO);

////  파일 삭제
//    public void delete(Long id);
//
////  게시글 삭제 시, 해당 파일 전체 삭제
//    public void deleteByPostId(Long postId);

}
