package com.app.back.domain.attachment;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class AttachmentDTO {
    private Long id;
    private String attachmentFileName;
    private String attachmentFilePath;
    private Long attachmentFileSize;
    private String attachmentFileType;
    private Long postId;
    private String createdDate;

    public AttachmentVO toVO(){
        return new AttachmentVO(id, attachmentFileName, attachmentFilePath, attachmentFileSize, attachmentFileType, postId,createdDate);
    }
}
