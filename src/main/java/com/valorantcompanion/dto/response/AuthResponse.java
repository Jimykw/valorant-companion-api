package com.valorantcompanion.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Token JWT de autenticação")
public record AuthResponse(
        @Schema(example = "eyJhbGciOiJIUzI1NiJ9...")
        String accessToken,
        @Schema(example = "Bearer")
        String tokenType,
        @Schema(example = "86400000")
        long expiresIn
) {
}
