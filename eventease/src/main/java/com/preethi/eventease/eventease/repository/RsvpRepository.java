package com.preethi.eventease.eventease.repository;

import com.preethi.eventease.eventease.model.Rsvp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RsvpRepository extends JpaRepository<Rsvp, Long> {
    List<Rsvp> findByEventId(Long eventId);
}
