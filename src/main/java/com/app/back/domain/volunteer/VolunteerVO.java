package com.app.back.domain.volunteer;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerVO {
    private Long id;
    private int vtRecruitmentCount;
    private String postTitle;
    private String memberNickName;
    private int postViewCount;
    private String postType;
    private String postSummary;
    private String createdDate;
    private String updatedDate;


}
