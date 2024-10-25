package com.app.back.domain.inquiry_answer;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class InquiryAnswerDTO {
    private Long id;
    private String inquiryAnswer;
    private Long inquiryId;

    public InquiryAnswerVO toVO() {return new InquiryAnswerVO(id,inquiryAnswer, inquiryId);}
}
