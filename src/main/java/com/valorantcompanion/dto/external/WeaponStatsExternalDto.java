package com.valorantcompanion.dto.external;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeaponStatsExternalDto(
        Double fireRate,
        Integer magazineSize
) {
}
