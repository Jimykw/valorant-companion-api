package com.valorantcompanion.dto.response;

public record MapResponse(
        String uuid,
        String displayName,
        String narrativeDescription,
        String splash,
        String displayIcon
) {
}
