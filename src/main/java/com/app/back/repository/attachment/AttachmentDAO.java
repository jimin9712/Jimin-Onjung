package com.app.back.repository.attachment;


import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.mapper.attachment.AttachmentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AttachmentDAO {
    private final AttachmentMapper attachmentMapper;

//    파일추가
    public void save(AttachmentVO attachmentVO){attachmentMapper.insert(attachmentVO);}

}
