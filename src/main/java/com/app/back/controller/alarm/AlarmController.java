package com.app.back.controller.alarm;

import com.app.back.domain.alarm.AlarmDTO;
import com.app.back.domain.member.MemberDTO;
import com.app.back.service.alarm.AlarmService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@Controller
@RequestMapping("/alarm")
@Slf4j
public class AlarmController {
    private AlarmService alarmService;

    public AlarmController(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    @GetMapping("/mypage-member/{memberId}")
    @ResponseBody
    public ResponseEntity<List<AlarmDTO>> getAlarmsByMemberId(@PathVariable Long memberId) {
        List<AlarmDTO> alarms = alarmService.getAlarmsByMemberId(memberId);
        return ResponseEntity.ok(alarms);
    }

    @GetMapping("/member/{memberId}")
    @ResponseBody
    public ResponseEntity<List<AlarmDTO>> getUnreadAlarmsByMemberId7(@PathVariable Long memberId) {
        List<AlarmDTO> latestAlarms = alarmService.getUnreadAlarmsByMemberId(memberId);
        return ResponseEntity.ok(latestAlarms);
    }
    
    @GetMapping("/read/{id}")
    public RedirectView readAlarm(
            @PathVariable Long id,
            @RequestParam String alarmType,
            HttpSession session
    ) {
        MemberDTO member = (MemberDTO) session.getAttribute("loginMember");
        if (member != null) {
            Long memberId = member.getId();
            alarmService.markAlarmAsRead(id, memberId, alarmType);
            log.info("읽음 처리된 알림 아이디: {} 멤버 아이디: {}", id, memberId);
        } else {
            log.warn("로그인 오류");
        }
        // 읽고 나서 => 마이페이지로 이동되게
//        그리고 마이페이지에서 눌렀을 때 각 ALARM ID에 맞게 이동하게 하면된다.
        return new RedirectView("/mypage/mypage");
    }


}