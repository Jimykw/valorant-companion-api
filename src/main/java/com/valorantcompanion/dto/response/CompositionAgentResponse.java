package com.valorantcompanion.dto.response;

public record CompositionAgentResponse(
        String agentUuid,
        Integer slotOrder,
        String suggestedRole
) {
}
