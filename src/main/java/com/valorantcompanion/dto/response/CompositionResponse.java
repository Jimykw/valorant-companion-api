package com.valorantcompanion.dto.response;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record CompositionResponse(
        UUID id,
        String name,
        String mapUuid,
        String description,
        List<CompositionAgentResponse> agents,
        Instant createdAt,
        Instant updatedAt
) {
}
