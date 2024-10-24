package com.app.back.service.attachment;


import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.repository.attachment.AttachmentDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
@RequiredArgsConstructor
public class AttachmentServiceImpl implements AttachmentService{
    private final AttachmentDAO attachmentDAO;

    @Override
    public void register(AttachmentVO attachmentVO){
        attachmentDAO.save(attachmentVO);
    }


}
