package com.app.back.domain.attachment;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentVO {
    private long id;
    private String attachmentFileName;
    private String attachmentFilePath;
    private String attachmentType;
    private String attachmentFileType;
    private long postId;
    private String createdDate;


}
