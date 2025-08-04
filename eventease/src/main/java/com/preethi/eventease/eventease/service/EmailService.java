package com.preethi.eventease.eventease.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendInvite(String recipientEmail, String eventTitle) {
        String subject = "You're Invited to " + eventTitle;
        String body = "Hi,\n\nYou've been invited to the event: " + eventTitle +
                      ".\n\nPlease RSVP via the EventEase platform.\n\n- EventEase Team";

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(recipientEmail);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("preetippalankar@gmail.com");

            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + recipientEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
        }
    }
}
