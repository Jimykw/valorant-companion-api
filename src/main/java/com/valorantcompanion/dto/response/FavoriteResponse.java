package com.valorantcompanion.dto.response;

import com.valorantcompanion.domain.enums.FavoriteItemType;

import java.time.Instant;
import java.util.UUID;

public record FavoriteResponse(
        UUID id,
        String externalId,
        FavoriteItemType itemType,
        String displayName,
        Instant createdAt
) {
}
