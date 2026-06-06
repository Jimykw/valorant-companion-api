package com.valorantcompanion.dto.response;

import com.valorantcompanion.domain.enums.Role;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String username,
        String email,
        Role role,
        Instant createdAt
) {
}
