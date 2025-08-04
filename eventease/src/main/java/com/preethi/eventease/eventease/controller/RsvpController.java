package com.preethi.eventease.eventease.controller;

import com.preethi.eventease.eventease.dto.RsvpRequest;
import com.preethi.eventease.eventease.dto.RsvpResponseDTO;
import com.preethi.eventease.eventease.model.Event;
import com.preethi.eventease.eventease.model.Rsvp;
import com.preethi.eventease.eventease.repository.EventRepository;
import com.preethi.eventease.eventease.repository.RsvpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class RsvpController {

    @Autowired
    private RsvpRepository rsvpRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private JavaMailSender mailSender;  // Inject mail sender

    @PostMapping("/rsvp")
    public Rsvp submitRSVP(@RequestBody RsvpRequest request) {
        System.out.println("Received RSVP:");
        System.out.println("Event ID: " + request.getEventId());
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());

        // Find the event
        Event event = eventRepository.findById(request.getEventId()).orElse(null);
        if (event == null) {
            throw new RuntimeException("Event not found with ID: " + request.getEventId());
        }

        // Create new RSVP object and set values
        Rsvp rsvp = new Rsvp();
        rsvp.setEvent(event);
        rsvp.setName(request.getName());
        rsvp.setEmail(request.getEmail());
        rsvp.setAttending(true);

        Rsvp savedRsvp = rsvpRepository.save(rsvp);

        // Send confirmation email
        sendConfirmationEmail(savedRsvp);

        return savedRsvp;
    }

    // Method to send confirmation email
    private void sendConfirmationEmail(Rsvp rsvp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(rsvp.getEmail());
        message.setSubject("RSVP Confirmation for " + rsvp.getEvent().getTitle());
        message.setText("Hi " + rsvp.getName() + ",\n\n" +
                "Thank you for your RSVP to the event \"" + rsvp.getEvent().getTitle() + "\".\n" +
                "We look forward to seeing you there!\n\n" +
                "Best regards,\nEventEase Team");

        mailSender.send(message);
    }

    @GetMapping("/{eventId}/rsvps")
    public List<RsvpResponseDTO> getRSVPsByEvent(@PathVariable Long eventId) {
        List<Rsvp> rsvps = rsvpRepository.findByEventId(eventId);
        return rsvps.stream()
                .map(r -> new RsvpResponseDTO(
                        r.getName(),
                        r.getEmail(),
                        r.isAttending(),
                        r.getEvent().getId()))
                .toList();
    }
}
