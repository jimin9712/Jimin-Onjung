package com.app.back.service.notice;


import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.notice.NoticeVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.repository.attachment.AttachmentDAO;
import com.app.back.repository.notice.NoticeDAO;
import com.app.back.service.attachment.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class NoticeServiceImpl implements NoticeService{
    private final NoticeDAO noticeDAO;
    private final AttachmentDAO attachmentDAO;
    private final AttachmentService attachmentService;

    @Override
    public void write(NoticeVO noticeVO, List<AttachmentVO> attachments) {
        noticeDAO.save(noticeVO);
        attachments.forEach(attachment -> {
            attachmentDAO.save(attachment);
        });
    }

    @Override
    public List<NoticeDTO> getList(Pagination pagination, Search search) {
        return noticeDAO.findAll(pagination, search);
    }

    @Override
    public Optional<NoticeDTO> getPost(Long id) {
        return noticeDAO.findById(id);
    }
    @Override
    public void update(NoticeDTO noticeDTO) {
        noticeDAO.update(noticeDTO.toVO());
    }

    @Override
    public void delete(Long id) {
        noticeDAO.delete(id);
    }

}
