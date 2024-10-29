package com.app.back.repository.inquiry;


import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.mapper.inquiry.InquiryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class InquiryDAO {
    private final InquiryMapper inquiryMapper;
    private final InquiryDTO inquiryDTO;

    //    게시글 작성
    public void save(InquiryVO inquiryVO) {
        inquiryMapper.insert(inquiryVO);
    }

    //    게시글 전체 조회
    public List<InquiryDTO> findAll(Pagination pagination, Search search){
        return inquiryMapper.selectAll(pagination, search);
    }
    //    게시글 전체 개수 조회
    public int getTotal(){
        return inquiryMapper.selectTotal();
    }

    //    검색 결과 개수 조회
    public int getTotalWithSearch(Search search){
        return inquiryMapper.selectTotalWithSearch(search);
    }

    //    게시글 조회
    public Optional<InquiryDTO> findById(Long id){
        return inquiryMapper.selectById(id);
    }

    //    수정
    public void update(InquiryVO inquiryVO) {
        inquiryMapper.updateById(inquiryDTO);
    }

    //    삭제
    public void delete(Long id) {inquiryMapper.deleteById(id);}

}
