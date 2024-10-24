package com.app.back.domain.Inquiry_answer;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class Inquiry_answerVO {
    private Long id;
    private String inquiryAnswer;
    private Long inquiryId;
}
