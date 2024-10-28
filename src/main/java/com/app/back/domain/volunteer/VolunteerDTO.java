package com.app.back.domain.volunteer;



import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.post.PostVO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDTO {
    private Long postId;
    private String postTitle;
    private String postContent;
    private String postSummary;
    private String postType;
    private String postStatus;
    private Long postViewCount;
    private String createdDate;
    private String updatedDate;

    private Long memberId;
    private String memberNickName;

    private String attachmentFileName;
    private String attachmentFilePath;
    private String attachmentFileSize;
    private String attachmentFiletype;

    private Long id;
    private int recruitmentCount;
    private int nowRecruitmentCount;
    private String vtSDate;
    private String vtEDate;

    public PostVO toPostVO() {
        return new PostVO(id,postTitle,postContent,postSummary,postType,postStatus,postViewCount,memberId,createdDate, updatedDate);
    }

    public AttachmentVO toAttachmentVO(){
        return new AttachmentVO(id,attachmentFileName,attachmentFilePath,attachmentFileSize,attachmentFiletype,postId,createdDate);
    }

    public VolunteerVO toVO() {return new VolunteerVO(id, recruitmentCount, nowRecruitmentCount, vtSDate, vtEDate);}
}
