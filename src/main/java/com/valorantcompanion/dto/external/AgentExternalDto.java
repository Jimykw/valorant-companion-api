package com.valorantcompanion.dto.external;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AgentExternalDto(
        String uuid,
        String displayName,
        String description,
        String displayIcon,
        ValorantRoleDto role,
        Boolean isPlayableCharacter
) {
}
