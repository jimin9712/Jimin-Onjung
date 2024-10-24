package com.app.back.domain.inquiry;

import com.app.back.domain.member.MemberVO;
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
public class InquiryDTO {
    private Long id;
    private String inquiryStatus;
    private String inquiryEmail;
    private String inquiryPhone;

    private String postTitle;
    private String postContent;
    private String postSummary;
    private String postType;
    private String postStatus;
    private Long postViewCount;
    private Long memberId;
    private String createdDate;
    private String updatedDate;

    public PostVO toPostVO() {
        return new PostVO(id, postTitle, postContent, postSummary, postType, postStatus, postViewCount, memberId, createdDate, updatedDate);
    }

    public InquiryVO toVO() {
        return new InquiryVO(id, inquiryStatus, inquiryEmail, inquiryPhone); // 수정
    }
}
