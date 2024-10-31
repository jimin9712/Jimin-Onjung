package com.app.back.domain.donation;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.post.PostVO;
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
    private String postType;
    private String postStatus;
    private Long postViewCount;
    private Long memberId;
    private String createdDate;
    private String updatedDate;
    private int goalPoint;
    private String donationSDate;
    private String donationEDate;
    private String attachmentFileName;
    private String attachmentFilePath;
    private Long attachmentFileSize;
    private String attachmentFileType;
    private Long postId;

    public PostVO toPostVO() {
        return new PostVO(id, postTitle, postContent, postSummary, postType, postStatus, postViewCount, memberId, createdDate, updatedDate);
    }

    public DonationVO toVO() {
        return new DonationVO(id, goalPoint, donationSDate, donationEDate);
    }

//    public AttachmentVO toAttachmentVO(){
//        return new AttachmentVO(id, attachmentFileName, attachmentFilePath, attachmentFileSize, attachmentFileType, postId,createdDate);
//    }
}
