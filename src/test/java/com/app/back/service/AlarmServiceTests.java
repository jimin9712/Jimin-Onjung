package com.app.back.service;

import com.app.back.mapper.attachment.AttachmentMapper;
import com.app.back.service.alarm.AlarmService;
import com.app.back.service.attachment.AttachmentService;
import com.app.back.service.vt_application.VtApplicationService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class AlarmServiceTests {


    @Autowired
    private AlarmService alarmService;

    @Test
    public void testVtApplicationStatusChange() {
        alarmService.createVtApplicationAlarm(23L, 2L, "봉사활동 신청이 승인되었습니다.");
    }

    @Test
    public void testDonationGoalReached() {
        alarmService.createDonationAlarm(23L, 200L, "기부 목표가 달성되었습니다!");
    }

    @Test
    public void testSupportGoalReached() {
        alarmService.createSupportAlarm(23L, 300L, "후원 목표가 달성되었습니다.");
    }

    @Test
    public void testNewReply() {
        alarmService.createReplyAlarm(23L, 400L, "새로운 댓글이 달렸습니다.");
    }


}