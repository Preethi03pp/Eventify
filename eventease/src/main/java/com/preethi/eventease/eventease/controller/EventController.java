package com.preethi.eventease.eventease.controller;

import com.preethi.eventease.eventease.dto.RsvpRequest;
import com.preethi.eventease.eventease.model.Event;
import com.preethi.eventease.eventease.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        return eventRepository.findById(id).map(event -> {
            event.setTitle(updatedEvent.getTitle());
            event.setDescription(updatedEvent.getDescription());
            event.setLocation(updatedEvent.getLocation());
            event.setStartTime(updatedEvent.getStartTime());
            event.setEndTime(updatedEvent.getEndTime());
            event.setCreatedBy(updatedEvent.getCreatedBy());
            return eventRepository.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }
    

}

