package com.app.back.domain.attachment;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentVO {
    private Long id;
    private String attachmentFileName;
    private String attachmentFilePath;
    private Long attachmentFileSize;
    private String attachmentFileType;
    private Long postId;
    private String createdDate;


}
