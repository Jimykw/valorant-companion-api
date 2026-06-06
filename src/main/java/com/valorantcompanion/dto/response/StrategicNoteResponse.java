package com.valorantcompanion.dto.response;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record StrategicNoteResponse(
        UUID id,
        String title,
        String mapUuid,
        String content,
        List<String> relatedAgentUuids,
        Instant createdAt,
        Instant updatedAt
) {
}
