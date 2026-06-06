package com.valorantcompanion.dto.external;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MapExternalDto(
        String uuid,
        String displayName,
        String narrativeDescription,
        String splash,
        String displayIcon
) {
}
