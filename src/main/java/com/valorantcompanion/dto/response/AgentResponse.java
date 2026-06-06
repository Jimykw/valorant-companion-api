package com.valorantcompanion.dto.response;

public record AgentResponse(
        String uuid,
        String displayName,
        String description,
        String displayIcon,
        String role
) {
}
