package com.app.back.controller.alarm;

import com.app.back.domain.alarm.AlarmDTO;
import com.app.back.service.alarm.AlarmService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alarm/*")
public class AlarmController {
    private AlarmService alarmService;

    public AlarmController(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<AlarmDTO>> getAlarmsByMemberId(@PathVariable Long memberId) {
        List<AlarmDTO> alarms = alarmService.getAlarmsByMemberId(memberId);
        return ResponseEntity.ok(alarms);
    }

}