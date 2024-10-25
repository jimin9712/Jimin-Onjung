package com.app.back.domain.Util;

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
        Properties props = getMailProperties();

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

        // 인증번호 포함 본문 작성
        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(
                "<h3>[Onjung] 인증번호는 <strong>" + authCode + "</strong>입니다.</h3>",
                "text/html; charset=UTF-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);
        message.setContent(multipart);

        // 이메일 발송
        Transport.send(message);
    }

    // HTML 템플릿 이메일 발송 메서드
    public void sendHtmlEmail(String toEmail) throws MessagingException, UnsupportedEncodingException {
        Properties props = getMailProperties();

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(username, "Onjung"));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
        message.setSubject("HTML 템플릿 발송");
        message.setSentDate(new Date());

        // HTML 템플릿 본문 작성
        String htmlContent = """
            <table style="WIDTH:100%; BORDER-COLLAPSE: collapse !important; BACKGROUND-COLOR:#FFF;">
                <tbody>
                    <tr>
                        <td style="PADDING:60px 0;">
                            <table style="WIDTH:100%; MAX-WIDTH:500px; MARGIN:0 auto;">
                                <tr>
                                    <td style="TEXT-ALIGN:center; PADDING:30px;">
                                        <a href="">
                                            <img src="https://accounts-front.stunning.kr/assets/img/email/img-stunning-logo.png" alt="Logo" style="width:147px; height:20px;">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="TEXT-ALIGN:left; PADDING:30px;">
                                        <h1 style="FONT-SIZE:24px; COLOR:#272727;">비밀번호 변경하기</h1>
                                        <p>ljm21252@naver.com 계정의 비밀번호를 재설정하려면,<br>
                                        아래 ‘비밀번호 재설정’ 버튼을 클릭해주세요.</p>
                                        <a href="" style="display:inline-block; PADDING:15px; BACKGROUND-COLOR:#000; COLOR:#FFF; TEXT-DECORATION:none; FONT-WEIGHT:bold;">비밀번호 재설정</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="FONT-SIZE:12px; COLOR:#666; PADDING:10px;">
                                        인증 시간이 만료되면 인증번호 재발송을 진행해 주세요.<br> 유효 시간: 2024-10-25T12:24:49+09:00
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        """;

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(htmlContent, "text/html; charset=UTF-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);
        message.setContent(multipart);

        // 이메일 발송
        Transport.send(message);
    }

    // 공통 메일 설정 메서드
    private Properties getMailProperties() {
        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");
        return props;
    }
}