package com.preethi.eventease.eventease.repository;

import com.preethi.eventease.eventease.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // You can add custom queries later if needed
}
