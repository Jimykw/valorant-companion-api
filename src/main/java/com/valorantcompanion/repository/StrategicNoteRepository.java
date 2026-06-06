package com.valorantcompanion.repository;

import com.valorantcompanion.domain.entity.StrategicNote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StrategicNoteRepository extends JpaRepository<StrategicNote, UUID> {

    Page<StrategicNote> findByUserId(UUID userId, Pageable pageable);

    Optional<StrategicNote> findByIdAndUserId(UUID id, UUID userId);
}
