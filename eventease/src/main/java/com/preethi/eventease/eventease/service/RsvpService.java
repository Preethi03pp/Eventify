package com.preethi.eventease.eventease.service;

import com.preethi.eventease.eventease.model.Event;
import com.preethi.eventease.eventease.model.Rsvp;
import com.preethi.eventease.eventease.repository.EventRepository;
import com.preethi.eventease.eventease.repository.RsvpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RsvpService {

    @Autowired
    private RsvpRepository rsvpRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<Rsvp> getRsvpsByEventId(Long eventId) {
        return rsvpRepository.findByEventId(eventId);
    }

    public Rsvp saveRsvp(Long eventId, Rsvp rsvp) {
        Event event = eventRepository.findById(eventId).orElseThrow();
        rsvp.setEvent(event);
        return rsvpRepository.save(rsvp);
    }
}
