package com.app.back.mapper.inquiryAnswer;

import com.app.back.domain.Inquiry_answer.Inquiry_answerVO;
import com.app.back.domain.post.Pagination;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InquiryAnswerMapper {


    //    답변 추가
    public void insertAnswer(Inquiry_answerVO inquiry_answerVO);

}
