package com.preethi.eventease.eventease.dto;

public class RsvpResponseDTO {
    private String name;
    private String email;
    private boolean attending;
    private Long eventId;

    // Constructor
    public RsvpResponseDTO(String name, String email, boolean attending, Long eventId) {
        this.name = name;
        this.email = email;
        this.attending = attending;
        this.eventId = eventId;
    }

    // Getters (no setters needed for response)
    public String getName() { return name; }
    public String getEmail() { return email; }
    public boolean isAttending() { return attending; }
    public Long getEventId() { return eventId; }
}
