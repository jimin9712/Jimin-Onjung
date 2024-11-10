package com.app.back.domain.report;


import com.app.back.domain.post.PostVO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class ReportDTO {
    private Long id;
    private String reportReason;
    private String reportStatus;
    private Long postId;
    private Long memberId;

    private String postTitle;
    private String postContent;

    private String memberNickname;


    public ReportVO toVO(){
        return new ReportVO(id,reportReason,reportStatus,postId,memberId);
    }

}
