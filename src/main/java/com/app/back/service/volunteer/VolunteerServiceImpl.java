package com.app.back.service.volunteer;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.post.PostVO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.mapper.attachment.AttachmentMapper;
import com.app.back.mapper.post.PostMapper;
import com.app.back.mapper.volunteer.VolunteerMapper;
import com.app.back.repository.post.PostDAO;
import com.app.back.repository.volunteer.VolunteerDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class VolunteerServiceImpl implements VolunteerService {
    private final PostMapper postMapper;
    private final VolunteerMapper volunteerMapper;
    private final AttachmentMapper attachmentMapper;
    private final VolunteerDAO volunteerDAO;
    private final PostDAO postDAO;


    @Override
    public void write(VolunteerDTO volunteerDTO) {
        PostVO postVO = volunteerDTO.toPostVO();
        AttachmentVO attachmentVO = volunteerDTO.toAttachmentVO();
        log.info("{첨부파일:}", attachmentVO);

        // 2. PostVO 객체 삽입 (게시물 정보 저장)
        postDAO.save(postVO);
        Long id = postDAO.selectCurrentId();
        // 3. AttachmentVO가 null이 아닐 때만 삽입
        if (attachmentVO != null && attachmentVO.getAttachmentFileName() != null && attachmentVO.getAttachmentFilePath() != null && attachmentVO.getAttachmentFileSize() != null && attachmentVO.getAttachmentFileType() != null && attachmentVO.getAttachmentFileRealName() != null) {
            attachmentMapper.insert(attachmentVO);
        }
        // 4. 삽입 후 생성된 postVO의 ID를 VolunteerDTO에 설정
        volunteerDTO.setId(id);
        // 5. VolunteerVO 객체로 변환 후 삽입
        volunteerMapper.insert(volunteerDTO.toVO());
    }

    @Override
    public List<VolunteerDTO> getList(Pagination pagination) {
        return volunteerDAO.findAll(pagination); // 페이징된 Q&A 게시글 목록 조회
    }

    @Override
    public int getTotal() {
        return volunteerDAO.findCount();
    }

    @Override
    public Optional<VolunteerDTO> getPost(Long id) {
        volunteerDAO.updatePostReadCount(id);
        return volunteerDAO.findById(id);
    }

    @Override
    public void update(ReviewDTO reviewDTO) {
        volunteerDAO.update(reviewDTO); // Q&A 게시글 수정
    }

    @Override
    public void delete(Long id) {

        volunteerDAO.delete(id);
        volunteerDAO.delete(id);
        // ID로 Q&A 게시글 삭제
    }

}




