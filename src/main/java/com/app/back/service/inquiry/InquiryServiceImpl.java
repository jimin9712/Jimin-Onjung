package com.app.back.service.inquiry;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostVO;
import com.app.back.domain.post.Search;
import com.app.back.repository.attachment.AttachmentDAO;
import com.app.back.repository.inquiry.InquiryDAO;
import com.app.back.repository.post.PostDAO;
import com.app.back.service.attachment.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class InquiryServiceImpl implements InquiryService {
    private final InquiryDAO inquiryDAO;
    private final AttachmentDAO attachmentDAO;
    private final PostDAO postDAO; // 게시글 DAO
    private final AttachmentService attachmentService;

    @Override
    public void write(InquiryDTO inquiryDTO) {
        postDAO.save(inquiryDTO.toPostVO());
        Long id = postDAO.selectCurrentId();
        inquiryDTO.setId(id);
        if(inquiryDTO.getAttachmentFileName() != null && inquiryDTO.getAttachmentFilePath() != null && inquiryDTO.getAttachmentFileType() != null && inquiryDTO.getAttachmentFileSize() != null) {
            attachmentDAO.save(inquiryDTO.toAttachmentVO());
        }
        inquiryDAO.save(inquiryDTO.toVO());
    }

    @Override
    public List<InquiryDTO> getList(Pagination pagination, Search search) {
        return inquiryDAO.findAll(pagination, search);
    }
    @Override
    public List<InquiryDTO> getFilterList(Pagination pagination, Search search) {
        return inquiryDAO.findFilterAll(pagination, search);
    }

    @Override
    public Optional<InquiryDTO> getPost(Long id) {
        return inquiryDAO.findById(id);
    }
    @Override
    public void update(InquiryDTO inquiryDTO) {
        inquiryDAO.update(inquiryDTO.toVO());
    }

    @Override
    public void updateInquiryStatus(Long id, String status) {
        inquiryDAO.updateStatus(id, status);
    }

    @Override
    public void delete(Long id) {
        inquiryDAO.delete(id);
    }

    @Override
    public int getTotal() {
        return inquiryDAO.getTotal();
    }

    @Override
    public int getTotalWithSearch(Search search) {
        return inquiryDAO.getTotalWithSearch(search);
    }

    @Override
    public List<InquiryDTO> findByMemberId(Long memberId) {
        return inquiryDAO.findByMemberId(memberId);
    }

    @Override
    public List<InquiryDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return inquiryDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }


}
