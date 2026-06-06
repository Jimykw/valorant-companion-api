package com.valorantcompanion.repository;

import com.valorantcompanion.domain.entity.TeamComposition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TeamCompositionRepository extends JpaRepository<TeamComposition, UUID> {

    @EntityGraph(attributePaths = "agents")
    Page<TeamComposition> findByUserId(UUID userId, Pageable pageable);

    @EntityGraph(attributePaths = "agents")
    Optional<TeamComposition> findByIdAndUserId(UUID id, UUID userId);
}
