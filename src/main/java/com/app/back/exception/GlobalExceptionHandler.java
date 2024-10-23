package com.app.back.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@ControllerAdvice(basePackages = "com.app.back.controller.member")
public class GlobalExceptionHandler {
    @ExceptionHandler(LoginFailException.class)
    protected RedirectView handleLoginFailException(LoginFailException e) {
        log.error(e.getMessage());
        return new RedirectView("/member/login?status=false");
    }
}
