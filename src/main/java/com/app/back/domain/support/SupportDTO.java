package com.app.back.domain.support;

import com.app.back.domain.post.PostVO;
import com.app.back.domain.review.ReviewVO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class SupportDTO {
    private Long id;
    private int goal_point;
    private String support_s_date;
    private String support_e_date;

    private String postTitle;
    private String postContent;
    private String postSummary;
    private String postType;
    private String postStatus;
    private Long postViewCount;
    private String memberNickName;
    private Long memberId;
    private String createdDate;
    private String updatedDate;

    private String attachmentFileName;
    private String attachmentFilePath;
    private String attachmentFileSize;
    private String attachmentFileType;

    private String profileFileName;
    private String profileFilePath;
    private Long profileFileSize;
    private String profileFileType;

    private Long postId;

    public PostVO toPostVO(){
        return new PostVO(id, postTitle, postContent, postSummary, postType, postStatus, postViewCount, memberId, createdDate, updatedDate);
    }

    public SupportVO toVO() {
        return new SupportVO(id,goal_point,support_e_date,support_s_date);
    }


}
