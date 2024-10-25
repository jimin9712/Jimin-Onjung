package com.app.back.mapper.inquiry;


import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface InquiryMapper {

    //    추가
    public void insert(InquiryVO inquiryVO);

    //    조회
    public InquiryDTO selectById(Long id);

    //  전체조회
    public List<InquiryDTO> selectAll(@Param("pagination") Pagination pagination);

    //    게시글 전체 개수 조회
    public int selectTotal();

    //    검색 결과 개수 조회
    public int selectTotalWithSearch(@Param("search") Search search);

    //    수정
    void updateById(InquiryDTO inquiryDTO);

    //    삭제
    void deleteById(Long id);
}
