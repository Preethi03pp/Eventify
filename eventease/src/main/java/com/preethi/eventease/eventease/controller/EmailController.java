package com.preethi.eventease.eventease.controller;

import com.preethi.eventease.eventease.dto.EmailRequest;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send")
public String sendEmail(@RequestBody EmailRequest request) {
    String eventId = request.getEventId(); // Add this in DTO
    String email = request.getTo();

    String rsvpLink = "https://eventifyfront.netlify.app/rsvpform/" + eventId + "?email=" + email;

    String body = request.getBody() + "\n\nPlease RSVP here: " + rsvpLink;

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject(request.getSubject());
    message.setText(body);

    mailSender.send(message);
    return "Email sent successfully";
}
}
