package com.preethi.eventease.eventease.model;

import jakarta.persistence.*;

@Entity
public class Rsvp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private boolean attending;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAttending() {
        return attending;
    }

    public void setAttending(boolean attending) {
        this.attending = attending;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
