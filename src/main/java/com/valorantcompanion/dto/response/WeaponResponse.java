package com.valorantcompanion.dto.response;

public record WeaponResponse(
        String uuid,
        String displayName,
        String category,
        String displayIcon,
        String weaponType,
        Double fireRate,
        Integer magazineSize
) {
}
