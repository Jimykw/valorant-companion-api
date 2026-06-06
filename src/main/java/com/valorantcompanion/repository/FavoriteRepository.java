package com.valorantcompanion.repository;

import com.valorantcompanion.domain.entity.Favorite;
import com.valorantcompanion.domain.enums.FavoriteItemType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {

    Page<Favorite> findByUserId(UUID userId, Pageable pageable);

    Optional<Favorite> findByIdAndUserId(UUID id, UUID userId);

    boolean existsByUserIdAndExternalIdAndItemType(UUID userId, String externalId, FavoriteItemType itemType);
}
