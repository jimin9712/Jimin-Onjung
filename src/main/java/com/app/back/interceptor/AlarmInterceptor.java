package com.app.back.interceptor;

import com.app.back.service.alarm.AlarmService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
public class AlarmInterceptor implements HandlerInterceptor {
    private final AlarmService alarmService;

    public AlarmInterceptor(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        Long memberId = (Long) request.getSession().getAttribute("loginMember");
//
//        request.setAttribute("alarm", "테스트");
//        return true;
//    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.info("AlarmInterceptor 종료");
    }

}
