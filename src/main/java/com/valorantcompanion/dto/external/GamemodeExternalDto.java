package com.valorantcompanion.dto.external;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GamemodeExternalDto(
        String uuid,
        String displayName,
        String description,
        String displayIcon,
        Boolean isQueue
) {
}
