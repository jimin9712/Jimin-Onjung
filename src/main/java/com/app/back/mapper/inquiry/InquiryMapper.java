package com.app.back.mapper.inquiry;


import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.post.Pagination;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InquiryMapper {

    //    추가
    public void insert(InquiryVO inquiryVO);


    //    조회
    public InquiryDTO selectById(Long id);

    //  전체조회
    public List<InquiryDTO> selectAll(Pagination pagination);

    //    수정
    void updateById(InquiryDTO inquiryDTO);

    //    삭제
    void deleteById(Long id);
}
