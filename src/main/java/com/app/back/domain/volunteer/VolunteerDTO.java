package com.app.back.domain.volunteer;



import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDTO {
    private Long id;
    private int vtRecruitmentCount;
    private String postTitle;
    private String memberNickName;
    private int postViewCount;
    private String postType;
    private String postSummary;
    private String createdDate;
    private String updatedDate;


public VolunteerVO toVO(){return new VolunteerVO(id,vtRecruitmentCount,postTitle,memberNickName,postViewCount,postType,postSummary,createdDate,updatedDate);}}
