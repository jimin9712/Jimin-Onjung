package com.app.back.util;

import jakarta.mail.*;
import jakarta.mail.internet.*;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;
import java.util.Random;

@Component
public class EmailUtil {

    private final String username = "ljm21000@gmail.com";
    private final String password = "okrw hhxj chga wglt";

    // 6자리 랜덤 인증번호 생성
    public String generateAuthCode() {
        Random random = new Random();
        StringBuilder authCode = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            authCode.append(random.nextInt(10)); // 0~9 사이의 숫자 생성
        }
        return authCode.toString();
    }

    // 인증번호 이메일 발송 메서드
    public void sendAuthEmail(String toEmail, String authCode) throws MessagingException, UnsupportedEncodingException {
        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(username, "Onjung"));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
        message.setSubject("인증번호 발송");
        message.setSentDate(new Date());

        // 이메일 본문 작성
        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(
                "<h3>[Onjung]인증번호는 <strong>" + authCode + "</strong>입니다.</h3>",
                "text/html; charset=UTF-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);
        message.setContent(multipart);

        // 이메일 발송
        Transport.send(message);
    }
}
