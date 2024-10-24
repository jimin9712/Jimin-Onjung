package com.app.back.domain.Inquiry_answer;

import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.notice.NoticeVO;
import com.app.back.domain.post.PostVO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class Inquiry_answerDTO {
    private Long id;
    private String inquiryAnswer;
    private Long inquiryId;
    private String inquiryStatus;

    public InquiryVO toInquiryVO(){
        return new InquiryVO(id,inquiryStatus);
    }
    public Inquiry_answerVO toVO() {return new Inquiry_answerVO(id,inquiryAnswer,inquiryId);}
}
