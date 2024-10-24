package com.app.back.domain.donation;

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
public class DonationDTO {
    private Long id;
    private String postTitle;
    private String postContent;
    private String postSummary;
    private int postType;
    private String postStatus;
    private Long postViewCount;
    private Long memberId;
    private String createdDate;
    private String updatedDate;
    private int goalPoint;
    private String donationSDate;
    private String donationEDate;

    public PostVO toPostVO(){
        return new PostVO(id, postTitle, postContent, postSummary, postType, postStatus, postViewCount, memberId, createdDate, updatedDate);
    }

    public DonationVO toVO() {
        return new DonationVO(id, goalPoint, donationSDate, donationEDate);
    }
}
