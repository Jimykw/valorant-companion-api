package com.valorantcompanion.dto.external;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeaponExternalDto(
        String uuid,
        String displayName,
        String category,
        String displayIcon,
        String weaponType,
        WeaponStatsExternalDto weaponStats
) {
}
