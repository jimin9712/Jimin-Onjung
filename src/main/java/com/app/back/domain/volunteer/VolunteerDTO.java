package com.app.back.domain.volunteer;



import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.post.PostVO;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

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
    private String attachmentFileType;

    private Long id;
    private int recruitmentCount;
    private int nowRecruitmentCount;
    private String vtSDate;
    private String vtEDate;

    private long daysLeft;

    public PostVO toPostVO() {
        return new PostVO(id,postTitle,postContent,postSummary,postType,postStatus,postViewCount,memberId,createdDate, updatedDate);
    }

    public AttachmentVO toAttachmentVO(){
        return new AttachmentVO(id,attachmentFileName,attachmentFilePath,attachmentFileSize,attachmentFileType,postId,createdDate);
    }

    public VolunteerVO toVO() {return new VolunteerVO(id, recruitmentCount, nowRecruitmentCount, vtSDate, vtEDate);}

    public void calculateDaysLeft() {
        if (vtEDate != null) {
            LocalDate endDate = LocalDate.parse(vtEDate); // 문자열을 LocalDate로 변환
            if (LocalDate.now().isBefore(endDate)) {
                this.daysLeft = ChronoUnit.DAYS.between(LocalDate.now(), endDate);
            } else {
                this.daysLeft = 0; // 종료된 경우 0으로 설정
            }
        } else {
            this.daysLeft = 0;
        }
    }

}


