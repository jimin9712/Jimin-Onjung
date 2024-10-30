package com.app.back.domain.profile;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class ProfileVO {
    private Long id;
    private String profileFileName;
    private String profileFilePath;
    private Long profileFileSize;
    private String profileFileType;
    private Long memberId;
    private String createdDate;
}
