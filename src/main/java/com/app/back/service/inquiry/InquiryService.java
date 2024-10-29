package com.app.back.service.inquiry;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;

import java.util.List;
import java.util.Optional;

public interface InquiryService {
    //    작성
    public void write(InquiryVO inquiryVO, List<AttachmentVO> attachments);
    //    목록
    public List<InquiryDTO> getList(Pagination pagination, Search search);
    //    조회
    public Optional<InquiryDTO> getPost(Long id);
    //    수정
    public void update(InquiryDTO inquiryDTO);
    //    삭제
    public void delete(Long id);
    //    전체 게시물 수
    public int getTotal();
    //    검색 조건에 맞는 게시물 수
    public int getTotalWithSearch(Search search);

}
