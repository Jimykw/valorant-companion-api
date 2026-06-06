package com.valorantcompanion.dto.response;

public record GamemodeResponse(
        String uuid,
        String displayName,
        String description,
        String displayIcon,
        Boolean isQueue
) {
}
