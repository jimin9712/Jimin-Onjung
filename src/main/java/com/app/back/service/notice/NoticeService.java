package com.app.back.service.notice;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.notice.NoticeVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;

import java.util.List;
import java.util.Optional;

public interface NoticeService {
//    작성
    public void write(NoticeVO noticeVO, List<AttachmentVO> attachments);
//    목록
    public List<NoticeDTO> getList(Pagination pagination, Search search);
//    조회
    public Optional<NoticeDTO> getPost(Long id);
//    수정
    public void update(NoticeDTO noticeDTO);
//    삭제
    public void delete(Long id);


}
