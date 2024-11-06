package com.app.back.domain.alarm;


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
public class AlarmVO {
    private Long id;
    private String alarmContent;
    private String memberId;
    private String createdDate;

    public AlarmDTO toDTO() {
        AlarmDTO alarmDTO = new AlarmDTO();
        alarmDTO.setId(id);
        alarmDTO.setAlarmContent(alarmContent);
        alarmDTO.setMemberId(memberId);
        alarmDTO.setCreatedDate(createdDate);
        return alarmDTO;
    }
}
