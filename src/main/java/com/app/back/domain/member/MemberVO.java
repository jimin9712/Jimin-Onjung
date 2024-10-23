package com.app.back.domain.member;

import lombok.*;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Getter @ToString @EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class MemberVO implements Serializable {
    @EqualsAndHashCode.Include
    private Long id;
    private String kakaoEmail;
    private String kakaoProfile;
    private String kakaoNickName;
    private String memberEmail;
    private String memberName;
    private String memberPhone;
    private String memberPassword;
    private int memberType;
    private String memberNickName;
    private int memberJung;
    private int memberPoint;
    private int memberLoginType;
    private float memberStarRate;
    private String memberIntroduction;
    private String createdDate;
    private String updatedDate;


    public MemberDTO toDTO() {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(id);
        memberDTO.setKakaoEmail(kakaoEmail);
        memberDTO.setKakaoProfile(kakaoProfile);
        memberDTO.setKakaoNickName(kakaoNickName);
        memberDTO.setMemberEmail(memberEmail);
        memberDTO.setMemberName(memberName);
        memberDTO.setMemberPhone(memberPhone);
        memberDTO.setMemberPassword(memberPassword);
        memberDTO.setMemberType(memberType);
        memberDTO.setMemberNickName(memberNickName);
        memberDTO.setMemberJung(memberJung);
        memberDTO.setMemberPoint(memberPoint);
        memberDTO.setMemberLoginType(memberLoginType);
        memberDTO.setMemberStarRate(memberStarRate);
        memberDTO.setMemberIntroduction(memberIntroduction);
        memberDTO.setCreatedDate(createdDate);
        memberDTO.setUpdatedDate(updatedDate);
        return memberDTO;
    }
}
